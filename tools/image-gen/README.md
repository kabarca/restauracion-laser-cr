# restauracion-laser image generator

CLI tool to generate website/social images with kie.ai's GPT-4o Image API,
optionally guided by local reference images (logos, product photos, brand shots).

## Setup

Run all commands below from this directory (`tools/image-gen/`):

```bash
cd tools/image-gen
pip install -r requirements.txt
```

Your kie.ai API key is already set in `.env` (`KIE_API_KEY`). Never commit `.env`
— it's already in `.gitignore`.

## Usage

Drop reference images into `references/`, then run:

```bash
# Text-only prompt
python3 kie_image.py "modern hero banner for a laser hair removal clinic, clean clinical aesthetic, soft blue tones"

# Prompt + reference image(s)
python3 kie_image.py "recreate this logo on a dark background for Instagram" --ref references/logo.png

# Multiple references, custom aspect ratio and output name
python3 kie_image.py "before/after style promo banner using these two photos" \
  --ref references/before.jpg references/after.jpg \
  --size 3:2 \
  --name promo-banner

# Generate several variations in one run
python3 kie_image.py "social post announcing summer promo" --count 4 --name summer-promo
```

Generated images land in `output/` (git-ignored) as `{name}_{n}.{ext}`.

## Options

| Flag | Description |
|------|-------------|
| `--ref PATH [PATH ...]` | Local reference image(s), up to 5 |
| `--size {1:1,3:2,2:3}` | Aspect ratio (default `1:1`) |
| `--name NAME` | Output filename prefix (default `image`) |
| `--out DIR` | Output directory (default `output/`) |
| `--count N` | Number of generation runs (default `1`) |

## Notes

- At least one of prompt or `--ref` is required.
- Reference images are uploaded to kie.ai temporarily (auto-deleted after 3 days on their end) to obtain the public URL the API requires.
- Generated image URLs from kie.ai expire after 14 days — this tool downloads them into `output/` immediately.
