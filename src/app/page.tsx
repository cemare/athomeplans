import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">At Home Plans Blog</p>
          <h1>Design Ideas You Can Actually Use at Home</h1>
          <p>
            Weekly guides for furniture layout, decor, and floor-plan decisions that help you style
            your space faster.
          </p>
          <div className="heroCtas">
            <Link href="/blog" className="btnPrimary">
              Read the Blog
            </Link>
            <a
              href="https://www.etsy.com/shop/athomeplans"
              className="btnSecondary"
              target="_blank"
              rel="noreferrer"
            >
              Shop on Etsy
            </a>
          </div>
        </div>
      </section>

      <section className="container sectionPad">
        <div className="latestWrap">
          <div>
            <h2>Latest Articles</h2>
            <div className="postGrid">
              {latestPosts.map((post) => (
                <article className="postCard" key={post.slug}>
                  <p className="metaLine">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="readMoreLink">
                    Read article
                  </Link>
                </article>
              ))}
            </div>
          </div>
          <EmailCapture />
        </div>
      </section>
    </div>
  );
}
