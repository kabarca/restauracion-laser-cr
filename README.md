# restauracionlaser.cr

Monorepo for the restauracionlaser.cr project.

## Structure

```
.
├── tools/
│   └── image-gen/     kie.ai CLI for generating website/social images from prompts + reference photos
└── (website code goes here, e.g. /src, /public, package.json, once scaffolded)
```

## tools/image-gen

Generates images via kie.ai's GPT-4o Image API. See [tools/image-gen/README.md](tools/image-gen/README.md)
for usage. Drop reference photos in `tools/image-gen/references/`, generated
images land in `tools/image-gen/output/`.
