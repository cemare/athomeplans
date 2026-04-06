import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  coverImage: string;
  tags: string[];
  etsyLinks: Array<{ label: string; url: string }>;
  body: string;
};

const contentDir = path.join(process.cwd(), "content", "posts");

function readPostFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw) as BlogPost;

  if (!parsed.slug || !parsed.title || !parsed.publishedAt || !parsed.body) {
    throw new Error(`Invalid blog post schema: ${filePath}`);
  }

  return parsed;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs
    .readdirSync(contentDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(contentDir, name));

  return files
    .map(readPostFile)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = getAllPosts().find((entry) => entry.slug === slug);
  return post ?? null;
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((post) => post.tags))].sort();
}
