import { PrismaClient, PlanCategory, PlanStyle } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create sample tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: "cozy" },
      update: {},
      create: { name: "Cozy", slug: "cozy" },
    }),
    prisma.tag.upsert({
      where: { slug: "open-plan" },
      update: {},
      create: { name: "Open Plan", slug: "open-plan" },
    }),
    prisma.tag.upsert({
      where: { slug: "budget-friendly" },
      update: {},
      create: { name: "Budget Friendly", slug: "budget-friendly" },
    }),
    prisma.tag.upsert({
      where: { slug: "luxury" },
      update: {},
      create: { name: "Luxury", slug: "luxury" },
    }),
  ]);

  // Create sample design plans
  await prisma.designPlan.upsert({
    where: { slug: "scandinavian-living-room-refresh" },
    update: {},
    create: {
      title: "Scandinavian Living Room Refresh",
      slug: "scandinavian-living-room-refresh",
      description:
        "A clean, minimal Scandinavian living room with neutral tones, natural wood accents, and cozy textiles. Perfect for apartments under 400 sq ft.",
      category: PlanCategory.LIVING_ROOM,
      style: PlanStyle.SCANDINAVIAN,
      roomSizeSqFt: 350,
      estimatedBudgetUsd: 250000, // $2,500
      featured: true,
      published: true,
      tags: {
        connect: [{ slug: "cozy" }, { slug: "budget-friendly" }],
      },
    },
  });

  await prisma.designPlan.upsert({
    where: { slug: "modern-home-office-setup" },
    update: {},
    create: {
      title: "Modern Home Office Setup",
      slug: "modern-home-office-setup",
      description:
        "A productivity-focused home office with ergonomic furniture, cable management, and good lighting. Fits in a spare bedroom or dedicated nook.",
      category: PlanCategory.HOME_OFFICE,
      style: PlanStyle.MODERN,
      roomSizeSqFt: 120,
      estimatedBudgetUsd: 150000, // $1,500
      featured: true,
      published: true,
      tags: {
        connect: [{ slug: "budget-friendly" }],
      },
    },
  });

  await prisma.designPlan.upsert({
    where: { slug: "industrial-loft-bedroom" },
    update: {},
    create: {
      title: "Industrial Loft Bedroom",
      slug: "industrial-loft-bedroom",
      description:
        "A bold industrial bedroom with exposed textures, dark accents, warm Edison bulbs, and mixed metal and wood elements.",
      category: PlanCategory.BEDROOM,
      style: PlanStyle.INDUSTRIAL,
      roomSizeSqFt: 280,
      estimatedBudgetUsd: 400000, // $4,000
      featured: false,
      published: true,
      tags: {
        connect: [{ slug: "luxury" }],
      },
    },
  });

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
