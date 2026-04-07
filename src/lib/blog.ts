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
  draft?: boolean;
};

type BlogQueryOptions = {
  includeDrafts?: boolean;
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

function readAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs
    .readdirSync(contentDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(contentDir, name));

  return files
    .map(readPostFile)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getAllPosts(options: BlogQueryOptions = {}): BlogPost[] {
  return readAllPosts().filter((post) => (options.includeDrafts ? true : !post.draft));
}

export function getPostBySlug(slug: string, options: BlogQueryOptions = {}): BlogPost | null {
  const post = getAllPosts(options).find((entry) => entry.slug === slug);
  return post ?? null;
}

export function getAllTags(options: BlogQueryOptions = {}): string[] {
  return [...new Set(getAllPosts(options).flatMap((post) => post.tags))].sort();
}

export function canViewDrafts(previewToken?: string): boolean {
  const configuredToken = process.env.BLOG_DRAFT_PREVIEW_TOKEN;
  if (!configuredToken) return false;
  return previewToken === configuredToken;
}
