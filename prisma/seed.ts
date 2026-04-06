import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const plans = [
  // LIVING ROOM
  {
    title: "Scandinavian Living Room Refresh",
    slug: "scandinavian-living-room-refresh",
    description:
      "A clean, minimal Scandinavian living room with neutral tones, natural wood accents, and cozy textiles. Perfect for apartments under 400 sq ft. Includes a low-profile sofa, birch coffee table, and sheepskin throws.",
    category: "LIVING_ROOM",
    style: "SCANDINAVIAN",
    roomSizeSqFt: 350,
    estimatedBudgetUsd: 250000,
    featured: true,
    published: true,
    tags: ["cozy", "budget-friendly"],
  },
  {
    title: "Modern Open-Plan Living Room",
    slug: "modern-open-plan-living-room",
    description:
      "A bold, open-concept living space with clean lines, statement lighting, and a neutral palette punctuated by geometric accents. Designed for loft-style spaces.",
    category: "LIVING_ROOM",
    style: "MODERN",
    roomSizeSqFt: 600,
    estimatedBudgetUsd: 550000,
    featured: true,
    published: true,
    tags: ["open-plan", "luxury"],
  },
  {
    title: "Bohemian Living Room Retreat",
    slug: "bohemian-living-room-retreat",
    description:
      "Layered textures, eclectic art, macramé wall hangings, and warm earthy tones create a cozy bohemian sanctuary. Mix of vintage and handcrafted pieces.",
    category: "LIVING_ROOM",
    style: "BOHEMIAN",
    roomSizeSqFt: 400,
    estimatedBudgetUsd: 180000,
    featured: false,
    published: true,
    tags: ["cozy", "budget-friendly"],
  },
  {
    title: "Coastal Living Room with Ocean Views",
    slug: "coastal-living-room-ocean-views",
    description:
      "Light-filled coastal living room with linen sofas, driftwood accents, and a blue-and-white palette. Designed to bring the outside in.",
    category: "LIVING_ROOM",
    style: "COASTAL",
    roomSizeSqFt: 480,
    estimatedBudgetUsd: 320000,
    featured: false,
    published: true,
    tags: ["open-plan"],
  },

  // BEDROOM
  {
    title: "Industrial Loft Bedroom",
    slug: "industrial-loft-bedroom",
    description:
      "A bold industrial bedroom with exposed brick textures, dark accents, warm Edison bulbs, and mixed metal and wood elements. Great for warehouse conversions.",
    category: "BEDROOM",
    style: "INDUSTRIAL",
    roomSizeSqFt: 280,
    estimatedBudgetUsd: 400000,
    featured: false,
    published: true,
    tags: ["luxury"],
  },
  {
    title: "Minimalist Master Bedroom",
    slug: "minimalist-master-bedroom",
    description:
      "Clutter-free and calming — this minimalist bedroom features a platform bed, integrated storage, and a muted palette of whites and greys. Ideal for stress-free mornings.",
    category: "BEDROOM",
    style: "MINIMALIST",
    roomSizeSqFt: 300,
    estimatedBudgetUsd: 200000,
    featured: true,
    published: true,
    tags: ["budget-friendly"],
  },
  {
    title: "Traditional Guest Bedroom",
    slug: "traditional-guest-bedroom",
    description:
      "A warm and welcoming traditional guest room with a four-poster bed, antique dressing table, floral wallpaper, and rich wood tones. Guests will feel at home.",
    category: "BEDROOM",
    style: "TRADITIONAL",
    roomSizeSqFt: 220,
    estimatedBudgetUsd: 350000,
    featured: false,
    published: true,
    tags: ["cozy"],
  },
  {
    title: "Coastal Kids Bedroom",
    slug: "coastal-kids-bedroom",
    description:
      "A playful coastal bedroom for kids featuring bunk beds, nautical decor, rope accents, and plenty of storage for toys and books.",
    category: "BEDROOM",
    style: "COASTAL",
    roomSizeSqFt: 200,
    estimatedBudgetUsd: 280000,
    featured: false,
    published: true,
    tags: ["budget-friendly", "cozy"],
  },

  // KITCHEN
  {
    title: "Modern Galley Kitchen",
    slug: "modern-galley-kitchen",
    description:
      "Efficient galley kitchen with handleless cabinets, quartz countertops, stainless steel appliances, and under-cabinet LED lighting. Maximum function in minimum space.",
    category: "KITCHEN",
    style: "MODERN",
    roomSizeSqFt: 150,
    estimatedBudgetUsd: 800000,
    featured: true,
    published: true,
    tags: ["budget-friendly"],
  },
  {
    title: "Bohemian Kitchen with Open Shelving",
    slug: "bohemian-kitchen-open-shelving",
    description:
      "Colorful tiles, open wooden shelves, hanging herbs, and vintage ceramics make this bohemian kitchen a creative cook's paradise.",
    category: "KITCHEN",
    style: "BOHEMIAN",
    roomSizeSqFt: 180,
    estimatedBudgetUsd: 450000,
    featured: false,
    published: true,
    tags: ["cozy", "budget-friendly"],
  },

  // BATHROOM
  {
    title: "Spa-Inspired Minimalist Bathroom",
    slug: "spa-inspired-minimalist-bathroom",
    description:
      "A serene, spa-like bathroom with a freestanding tub, walk-in rain shower, heated stone floors, and seamless white tiles. Your personal retreat.",
    category: "BATHROOM",
    style: "MINIMALIST",
    roomSizeSqFt: 120,
    estimatedBudgetUsd: 1200000,
    featured: true,
    published: true,
    tags: ["luxury"],
  },
  {
    title: "Scandinavian Powder Room",
    slug: "scandinavian-powder-room",
    description:
      "A compact and charming powder room with light wood vanity, white subway tiles, round mirror, and a single pendant light. Elegant and unfussy.",
    category: "BATHROOM",
    style: "SCANDINAVIAN",
    roomSizeSqFt: 55,
    estimatedBudgetUsd: 300000,
    featured: false,
    published: true,
    tags: ["budget-friendly"],
  },

  // DINING ROOM
  {
    title: "Contemporary Dining Room",
    slug: "contemporary-dining-room",
    description:
      "Sleek dining table for 8, statement chandelier, upholstered chairs, and a sideboard with art display. Perfect for dinner parties and family gatherings.",
    category: "DINING_ROOM",
    style: "CONTEMPORARY",
    roomSizeSqFt: 260,
    estimatedBudgetUsd: 600000,
    featured: false,
    published: true,
    tags: ["luxury", "open-plan"],
  },
  {
    title: "Traditional Formal Dining Room",
    slug: "traditional-formal-dining-room",
    description:
      "A stately formal dining room with a mahogany extending table, wingback chairs, china cabinet, and rich drapes. Built for memorable celebrations.",
    category: "DINING_ROOM",
    style: "TRADITIONAL",
    roomSizeSqFt: 300,
    estimatedBudgetUsd: 900000,
    featured: false,
    published: true,
    tags: ["luxury"],
  },

  // HOME OFFICE
  {
    title: "Modern Home Office Setup",
    slug: "modern-home-office-setup",
    description:
      "A productivity-focused home office with ergonomic furniture, cable management, monitor arm, acoustic panels, and good lighting. Fits in a spare bedroom or dedicated nook.",
    category: "HOME_OFFICE",
    style: "MODERN",
    roomSizeSqFt: 120,
    estimatedBudgetUsd: 150000,
    featured: true,
    published: true,
    tags: ["budget-friendly"],
  },
  {
    title: "Industrial Home Studio & Office",
    slug: "industrial-home-studio-office",
    description:
      "Exposed brick, pipe shelving, a custom standing desk, and track lighting create a creative industrial workspace that doubles as a photography or art studio.",
    category: "HOME_OFFICE",
    style: "INDUSTRIAL",
    roomSizeSqFt: 200,
    estimatedBudgetUsd: 350000,
    featured: false,
    published: true,
    tags: ["open-plan"],
  },

  // FULL HOME
  {
    title: "Minimalist Apartment — Full Redesign",
    slug: "minimalist-apartment-full-redesign",
    description:
      "A complete 700 sq ft apartment redesign in a minimalist style: open-plan living/dining, integrated kitchen, tranquil bedroom, and clean bathroom. Everything curated and cohesive.",
    category: "FULL_HOME",
    style: "MINIMALIST",
    roomSizeSqFt: 700,
    estimatedBudgetUsd: 2500000,
    featured: true,
    published: true,
    tags: ["open-plan", "luxury"],
  },
  {
    title: "Coastal Beach House Interior",
    slug: "coastal-beach-house-interior",
    description:
      "Full interior for a 1,200 sq ft beach house: whitewashed wood, natural stone, linen furnishings, and ocean-inspired art throughout every room.",
    category: "FULL_HOME",
    style: "COASTAL",
    roomSizeSqFt: 1200,
    estimatedBudgetUsd: 4500000,
    featured: false,
    published: true,
    tags: ["luxury", "open-plan"],
  },
];

const allTagSlugs = ["cozy", "open-plan", "budget-friendly", "luxury"];
const tagDefs = [
  { name: "Cozy", slug: "cozy" },
  { name: "Open Plan", slug: "open-plan" },
  { name: "Budget Friendly", slug: "budget-friendly" },
  { name: "Luxury", slug: "luxury" },
];

async function main() {
  console.log("Seeding database...");

  // Upsert tags
  await Promise.all(
    tagDefs.map((t) =>
      prisma.tag.upsert({
        where: { slug: t.slug },
        update: {},
        create: t,
      })
    )
  );

  // Upsert plans
  for (const plan of plans) {
    const { tags, ...planData } = plan;
    await prisma.designPlan.upsert({
      where: { slug: planData.slug },
      update: {},
      create: {
        ...planData,
        tags: {
          connect: tags.map((slug) => ({ slug })),
        },
      },
    });
  }

  const count = await prisma.designPlan.count({ where: { published: true } });
  console.log(`Seed complete. ${count} published plans.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
