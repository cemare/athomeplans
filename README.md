# At Home Plans Website (Plans + Blog)

Unified Next.js site for At Home Plans with:

- Main catalog-style plans experience at `/plans` and `/plans/[slug]`
- Blog index at `/blog` and article pages at `/blog/[slug]`
- Shared branding/navigation so both experiences feel like one product
- Cloudflare direct Git integration deployment (Workers/Pages)

## Content and plan editing workflow

### Blog content

1. Open `/admin`
2. Log in with GitHub credentials (requires Decap OAuth setup)
3. Create/edit posts in `content/posts`
4. Publish changes to `main`

### Plans catalog

- Plan entries live in `content/plans/*.json`
- Each plan includes `title`, `summary`, `details`, and budget/style metadata
- The plans pages are statically generated from those files

## Environment variables

Set these for production:

- `NEXT_PUBLIC_SITE_URL=https://athomeplans.com`
- `NEXT_PUBLIC_EMAIL_CAPTURE_URL=<your-email-platform-form-url>`
- `BLOG_DRAFT_PREVIEW_TOKEN=<long-random-token>`

Draft behavior:

- Posts with `"draft": true` are hidden from public pages.
- Admin/special users can preview drafts by opening pages with `?draftToken=<BLOG_DRAFT_PREVIEW_TOKEN>`.
- Supported on `/`, `/blog`, and `/blog/[slug]`.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Cloudflare (GitHub direct integration)

Use Cloudflare's native GitHub integration for production deploys from `main`.
No deploy hook secret is required.

Recommended setup:

1. Connect this repository to a single Cloudflare project for `athomeplans.com`.
2. Set production branch to `main`.
3. Keep repository root as the project root directory.
4. Use `wrangler.toml` from this repo as the source of truth for build/runtime config.
5. If prompted for build details in dashboard UI, use:
   - Build command: `npx opennextjs-cloudflare build`
   - Deploy command: `npx wrangler deploy`
   - Output directory: `.open-next/assets`
6. Configure environment variables listed above.
7. Keep `.github/workflows/cloudflare-pages-deploy.yml` only for CI validation; it does not deploy.
8. Push to `main` to trigger Cloudflare production deployment directly from GitHub.

Troubleshooting:

- If production responds with placeholder content (for example `Hello world`), verify Cloudflare project settings:
  - repository connection points to `cemare/athomeplans`
  - production branch is `main`
  - root directory is the repository root
  - build/runtime settings match `wrangler.toml` in this repository
