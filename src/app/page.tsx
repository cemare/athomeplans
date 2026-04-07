import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import { getAllPosts } from "@/lib/blog";
import { getAllPlans } from "@/lib/plans";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const featuredPlans = getAllPlans().filter((plan) => plan.featured).slice(0, 3);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">At Home Plans</p>
          <h1>Design Plans and Home Styling Guides, Together</h1>
          <p>
            Browse ready-made interior design plans and learn practical styling strategies from our
            blog, all in one place.
          </p>
          <div className="heroCtas">
            <Link href="/plans" className="btnPrimary">
              Browse Plans
            </Link>
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
        <div className="blogIntro">
          <h2>Featured Plans</h2>
          <p>Start with proven room layouts and curated shopping guidance.</p>
        </div>
        <div className="postGrid">
          {featuredPlans.map((plan) => (
            <article className="postCard" key={plan.slug}>
              <p className="metaLine">
                {plan.category} · {plan.style}
              </p>
              <h3>
                <Link href={`/plans/${plan.slug}`}>{plan.title}</Link>
              </h3>
              <p>{plan.summary}</p>
              <Link href={`/plans/${plan.slug}`} className="readMoreLink">
                View plan
              </Link>
            </article>
          ))}
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
