import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPlans, getPlanBySlug } from "@/lib/plans";

export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://athomeplans.com";

function formatBudget(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function generateStaticParams() {
  return getAllPlans().map((plan) => ({ slug: plan.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) return {};

  const image = plan.coverImage || "/images/og-default.svg";

  return {
    title: plan.title,
    description: plan.summary,
    alternates: { canonical: `/plans/${plan.slug}` },
    openGraph: {
      type: "website",
      title: plan.title,
      description: plan.summary,
      url: `${siteUrl}/plans/${plan.slug}`,
      images: [{ url: image, alt: plan.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: plan.title,
      description: plan.summary,
      images: [image],
    },
  };
}

export default async function PlanDetailPage({ params }: Props) {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);

  if (!plan) {
    notFound();
  }

  return (
    <section className="container sectionPad">
      <article className="postDetail">
        <p className="metaLine">
          <Link href="/plans">← Back to plans</Link>
        </p>
        <h1>{plan.title}</h1>
        <p className="lead">
          {plan.category} · {plan.style}
          {plan.roomSizeSqFt ? ` · ${plan.roomSizeSqFt} sq ft` : ""}
        </p>
        {plan.coverImage ? (
          <div className="coverMedia detailCoverMedia">
            <Image src={plan.coverImage} alt={plan.title} fill sizes="(max-width: 900px) 100vw, 760px" priority />
          </div>
        ) : null}
        <p>{plan.summary}</p>
        <p>
          Estimated budget: <strong>{formatBudget(plan.estimatedBudgetUsd)}</strong>
        </p>

        <div className="articleBody">
          {plan.details.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
        </div>

        {plan.shoppingLinks?.length ? (
          <div className="sidebarBlock">
            <h2>Shopping Links</h2>
            <ul>
              {plan.shoppingLinks.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </section>
  );
}
