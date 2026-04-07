import Image from "next/image";
import Link from "next/link";
import { getAllPlans } from "@/lib/plans";

function formatBudget(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const metadata = {
  title: "Design Plans",
  description:
    "Explore ready-made interior design plans from At Home Plans for living rooms, bedrooms, and more.",
};

export default function PlansPage() {
  const plans = getAllPlans();

  return (
    <section className="container sectionPad">
      <div className="blogIntro">
        <p className="eyebrow">At Home Plans Catalog</p>
        <h1>Ready-Made Design Plans</h1>
        <p>
          Pick a room plan, follow the layout and shopping guide, then customize it to your space.
          Every plan is made to be practical for real homes and real budgets.
        </p>
      </div>

      <div className="postGrid">
        {plans.map((plan) => (
          <article className="postCard" key={plan.slug}>
            {plan.coverImage ? (
              <Link href={`/plans/${plan.slug}`} className="cardImageLink">
                <div className="coverMedia">
                  <Image src={plan.coverImage} alt={plan.title} fill sizes="(max-width: 900px) 100vw, 420px" />
                </div>
              </Link>
            ) : null}
            <p className="metaLine">
              {plan.category} · {plan.style}
            </p>
            <h2>
              <Link href={`/plans/${plan.slug}`}>{plan.title}</Link>
            </h2>
            <p>{plan.summary}</p>
            <p className="metaLine">
              Est. budget: <strong>{formatBudget(plan.estimatedBudgetUsd)}</strong>
            </p>
            <Link href={`/plans/${plan.slug}`} className="readMoreLink">
              View plan details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
