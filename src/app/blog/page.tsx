import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Interior design blog posts from At Home Plans.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="container sectionPad">
      <div className="blogIntro">
        <p className="eyebrow">Blog</p>
        <h1>Interior Design Guides and Ideas</h1>
        <p>
          Browse practical tips for room planning, decor selection, and shopping smarter through
          Etsy-friendly recommendations.
        </p>
      </div>

      <div className="blogLayout">
        <section>
          <div className="postGrid">
            {posts.map((post) => (
              <article className="postCard" key={post.slug}>
                <p className="metaLine">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {" · "}
                  {post.author}
                </p>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <div className="tagRow">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className="readMoreLink">
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </section>

        <aside className="blogSidebar">
          <EmailCapture />
          <section className="sidebarBlock">
            <h2>Popular Etsy Links</h2>
            <ul>
              <li>
                <a href="https://www.etsy.com/shop/athomeplans" target="_blank" rel="noreferrer">
                  At Home Plans Etsy Store
                </a>
              </li>
              <li>
                <a
                  href="https://www.etsy.com/shop/athomeplans?section_id=0"
                  target="_blank"
                  rel="noreferrer"
                >
                  Best Selling Templates
                </a>
              </li>
            </ul>
          </section>
          <section className="sidebarBlock">
            <h2>Topics</h2>
            <div className="tagRow">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
