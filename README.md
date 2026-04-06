# At Home Plans Blog

Production-ready Next.js blog for At Home Plans, configured for SEO and content publishing.

## What is included

- Blog index at `/blog` and article pages at `/blog/[slug]`
- JSON content source in `content/posts` for fast static rendering
- Decap CMS admin at `/admin` for non-technical post creation/editing
- SEO metadata, Open Graph, Twitter cards, Pinterest rich pin tag, and `BlogPosting` JSON-LD
- Email capture widget (`NEXT_PUBLIC_EMAIL_CAPTURE_URL`) and Etsy links in nav/sidebar/footer
- Mobile-responsive layout and lightweight static assets

## Content editing workflow

1. Open `/admin`
2. Log in with GitHub credentials (requires Decap OAuth setup)
3. Create/edit posts in `content/posts`
4. Publish changes to `main`

## Environment variables

Set these for production:

- `NEXT_PUBLIC_SITE_URL=https://athomeplans.com`
- `NEXT_PUBLIC_EMAIL_CAPTURE_URL=<your-email-platform-form-url>`

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

1. Install Wrangler and authenticate account API token.
2. Build:

```bash
npm run build
```

3. Deploy static output (`.next`) through Cloudflare Pages Next.js integration or CI pipeline.

Recommended: connect the GitHub repo (`cemare/athomeplans`) to Cloudflare Pages and enable automatic deploys from `main`.
