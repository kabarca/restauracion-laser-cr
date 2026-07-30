#!/usr/bin/env python3
"""CLI to generate images with kie.ai's GPT-4o Image API, optionally guided by
local reference images (e.g. logos, product photos, brand shots)."""

import argparse
import base64
import mimetypes
import os
import sys
import time
from pathlib import Path

import requests

DOWNLOAD_HEADERS = {"User-Agent": "Mozilla/5.0"}

API_BASE = "https://api.kie.ai/api/v1"
UPLOAD_URL = "https://kieai.redpandaai.co/api/file-base64-upload"
GENERATE_URL = f"{API_BASE}/gpt4o-image/generate"
STATUS_URL = f"{API_BASE}/gpt4o-image/record-info"

ROOT = Path(__file__).resolve().parent
DEFAULT_OUT_DIR = ROOT / "output"


def load_env():
    env_path = ROOT / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip())


def get_api_key():
    key = os.environ.get("KIE_API_KEY")
    if not key:
        sys.exit("Missing KIE_API_KEY. Set it in .env or export it in your shell.")
    return key


def auth_headers(api_key):
    return {"Authorization": f"Bearer {api_key}"}


def upload_reference(path: Path, api_key: str) -> str:
    """Upload a local image to kie.ai and return its public download URL."""
    mime, _ = mimetypes.guess_type(path.name)
    mime = mime or "application/octet-stream"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    payload = {
        "base64Data": f"data:{mime};base64,{b64}",
        "uploadPath": "restauracion-laser/references",
        "fileName": path.name,
    }
    resp = requests.post(UPLOAD_URL, json=payload, headers=auth_headers(api_key), timeout=60)
    data = resp.json()
    if resp.status_code != 200 or not data.get("success", data.get("code") == 200):
        raise RuntimeError(f"Upload failed for {path.name}: {data}")
    url = data["data"]["downloadUrl"]
    print(f"  uploaded {path.name} -> {url}")
    return url


def start_generation(prompt: str, ref_urls: list, size: str, api_key: str) -> str:
    payload = {"size": size}
    if prompt:
        payload["prompt"] = prompt
    if ref_urls:
        payload["filesUrl"] = ref_urls

    resp = requests.post(GENERATE_URL, json=payload, headers=auth_headers(api_key), timeout=60)
    data = resp.json()
    if resp.status_code != 200 or data.get("code") != 200:
        raise RuntimeError(f"Generation request failed: {data}")
    return data["data"]["taskId"]


def poll_task(task_id: str, api_key: str, interval: float = 5.0, timeout: float = 600.0) -> list:
    deadline = time.time() + timeout
    while time.time() < deadline:
        resp = requests.get(
            STATUS_URL,
            params={"taskId": task_id},
            headers=auth_headers(api_key),
            timeout=30,
        )
        data = resp.json()
        if resp.status_code != 200 or data.get("code") != 200:
            raise RuntimeError(f"Status check failed: {data}")

        info = data["data"]
        status = info.get("status")
        if status == "SUCCESS":
            return info["response"]["resultUrls"]
        if status in ("CREATE_TASK_FAILED", "GENERATE_FAILED"):
            raise RuntimeError(f"Generation failed: {info.get('errorMessage')}")

        print(f"  status: {status} (progress {info.get('progress', '?')})")
        time.sleep(interval)

    raise TimeoutError(f"Task {task_id} did not finish within {timeout}s")


def download_image(url: str, out_dir: Path, prefix: str, index) -> Path:
    ext = os.path.splitext(url.split("?")[0])[1] or ".png"
    out_path = out_dir / f"{prefix}_{index}{ext}"
    resp = requests.get(url, headers=DOWNLOAD_HEADERS, timeout=60)
    resp.raise_for_status()
    out_path.write_bytes(resp.content)
    return out_path


def main():
    parser = argparse.ArgumentParser(description="Generate images via kie.ai GPT-4o Image API")
    parser.add_argument("prompt", nargs="?", default="", help="Text description of the desired image")
    parser.add_argument(
        "--ref",
        "--refs",
        dest="refs",
        nargs="*",
        default=[],
        metavar="PATH",
        help="Local reference image path(s), e.g. files in references/",
    )
    parser.add_argument(
        "--size",
        choices=["1:1", "3:2", "2:3"],
        default="1:1",
        help="Aspect ratio (default: 1:1)",
    )
    parser.add_argument(
        "--name",
        default="image",
        help="Filename prefix for downloaded images (default: image)",
    )
    parser.add_argument(
        "--out",
        default=str(DEFAULT_OUT_DIR),
        help="Output directory (default: output/)",
    )
    parser.add_argument(
        "--count",
        type=int,
        default=1,
        help="Number of times to run the generation (default: 1)",
    )
    args = parser.parse_args()

    if not args.prompt and not args.refs:
        parser.error("Provide a prompt, reference image(s), or both.")

    load_env()
    api_key = get_api_key()

    ref_paths = [Path(r).expanduser() for r in args.refs]
    for p in ref_paths:
        if not p.exists():
            sys.exit(f"Reference image not found: {p}")

    out_dir = Path(args.out).expanduser()
    out_dir.mkdir(parents=True, exist_ok=True)

    ref_urls = []
    if ref_paths:
        print(f"Uploading {len(ref_paths)} reference image(s)...")
        ref_urls = [upload_reference(p, api_key) for p in ref_paths]

    saved = []
    for run in range(1, args.count + 1):
        label = f"[{run}/{args.count}]" if args.count > 1 else ""
        print(f"Requesting generation {label}...".strip())
        task_id = start_generation(args.prompt, ref_urls, args.size, api_key)
        print(f"  task id: {task_id}")
        result_urls = poll_task(task_id, api_key)

        for i, url in enumerate(result_urls, start=1):
            index = f"{run}-{i}" if args.count > 1 or len(result_urls) > 1 else run
            out_path = download_image(url, out_dir, args.name, index)
            print(f"  saved: {out_path}")
            saved.append(out_path)

    print(f"\nDone. {len(saved)} image(s) saved to {out_dir}")


if __name__ == "__main__":
    main()
