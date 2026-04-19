import type { APIRoute } from "astro";
import { getAllPosts } from "../lib/blog";

export const prerender = true;

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || "https://athomeplans.com";
  const posts = getAllPosts();

  const staticPages = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "/blog", priority: "0.9", changefreq: "weekly" },
    { path: "/shop", priority: "0.8", changefreq: "monthly" },
    { path: "/ebooks", priority: "0.8", changefreq: "monthly" },
    { path: "/affiliate-disclosure", priority: "0.3", changefreq: "yearly" },
  ];

  const staticUrls = staticPages
    .map(
      ({ path, priority, changefreq }) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("\n");

  const postUrls = posts
    .map(({ slug, publishedAt }) => {
      const lastmod = publishedAt ? `\n    <lastmod>${publishedAt.split("T")[0]}</lastmod>` : "";
      return `  <url>
    <loc>${siteUrl}/blog/${slug}</loc>${lastmod}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
