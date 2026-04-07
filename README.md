# At Home Plans Website (Plans + Blog)

Unified Astro site for At Home Plans with:

- Main catalog-style plans experience at `/plans` and `/plans/[slug]`
- Blog index at `/blog` and article pages at `/blog/[slug]`
- Shared branding/navigation so both experiences feel like one product
- Cloudflare Pages Git integration deployment

## Content and plan editing workflow

### Blog content

1. Open `/admin`
2. Log in with GitHub credentials (requires Decap OAuth setup)
3. Create/edit posts in `content/posts`
4. Publish changes to `main`

### Plans catalog

- Plan entries live in `content/plans/*.json`
- Each plan includes `title`, `summary`, `details`, and budget/style metadata
- The plans pages are generated from those files

## Environment variables

Set these for production:

- `PUBLIC_SITE_URL=https://athomeplans.com`
- `PUBLIC_EMAIL_CAPTURE_URL=<your-email-platform-form-url>`

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Cloudflare Pages (GitHub direct integration)

Use Cloudflare's native GitHub integration for production deploys from `main`.
No deploy hook secret is required.

Recommended setup:

1. Connect this repository to a single Cloudflare Pages project for `athomeplans.com`.
2. Set production branch to `main`.
3. Keep repository root as the project root directory.
4. Build command: `npm run build`
5. Build output directory: `dist`
6. Configure environment variables listed above.
7. Push to `main` to trigger Cloudflare production deployment directly from GitHub.

Troubleshooting:

- If production responds with placeholder content, verify Cloudflare project settings:
  - repository connection points to `cemare/athomeplans`
  - production branch is `main`
  - root directory is the repository root
  - build settings are `npm run build` + `dist`
