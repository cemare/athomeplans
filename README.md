# At Home Plans Website (Plans + Blog)

Unified Next.js site for At Home Plans with:

- Main catalog-style plans experience at `/plans` and `/plans/[slug]`
- Blog index at `/blog` and article pages at `/blog/[slug]`
- Shared branding/navigation so both experiences feel like one product
- Cloudflare Pages-ready deployment workflow

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

## Deploy to Cloudflare Pages

Use Cloudflare Pages for hosting and GitHub Actions for automatic deploy triggers on `main`.

Recommended architecture:

1. Create one Cloudflare Pages project for this unified site (custom domain `athomeplans.com`).
2. Configure framework preset as `Next.js`.
3. Set build command `npm run build` and output directory `.next`.
4. Configure environment variables listed above.
5. Create a deploy hook for the production branch.
6. Add GitHub secret `CLOUDFLARE_PAGES_DEPLOY_HOOK_URL` with that hook URL.
7. Keep `.github/workflows/cloudflare-pages-deploy.yml` in this repository.
8. Push to `main` (or run the workflow manually).

This approach retires the previous split-prototype setup and keeps plans + blog on a single production surface while still supporting independent content updates.
