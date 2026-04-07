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

const postModules = import.meta.glob<BlogPost>("../../content/posts/*.json", {
  eager: true,
  import: "default",
});

function readAllPosts(): BlogPost[] {
  const posts = Object.values(postModules);

  for (const post of posts) {
    if (!post.slug || !post.title || !post.publishedAt || !post.body) {
      throw new Error(`Invalid blog post schema: ${post.slug ?? "unknown"}`);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
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
  const configuredToken = import.meta.env.BLOG_DRAFT_PREVIEW_TOKEN;
  if (!configuredToken) return false;
  return previewToken === configuredToken;
}
