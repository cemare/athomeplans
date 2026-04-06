"use client";

import { useRouter, usePathname } from "next/navigation";
import type { PlanCategory, PlanStyle } from "@/types";

type Props = {
  categories: { value: PlanCategory; label: string }[];
  styles: { value: PlanStyle; label: string }[];
  currentCategory?: PlanCategory;
  currentStyle?: PlanStyle;
  currentQ?: string;
  currentFeatured?: boolean;
};

export default function CatalogFilterBar({
  categories,
  styles,
  currentCategory,
  currentStyle,
  currentQ,
  currentFeatured,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const current: Record<string, string | undefined> = {
      category: currentCategory,
      style: currentStyle,
      q: currentQ,
      featured: currentFeatured ? "true" : undefined,
    };
    const merged = { ...current, ...updates };
    for (const [k, v] of Object.entries(merged)) {
      if (v) params.set(k, v);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasFilters = !!(currentCategory || currentStyle || currentQ || currentFeatured);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
        alignItems: "center",
        marginBottom: "2rem",
        padding: "1rem",
        background: "#fafafa",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius)",
      }}
    >
      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          updateParams({ q: (fd.get("q") as string) || undefined });
        }}
        style={{ display: "flex", gap: "0.5rem", flex: "1 1 220px" }}
      >
        <input
          name="q"
          defaultValue={currentQ ?? ""}
          placeholder="Search plans..."
          style={{
            flex: 1,
            padding: "0.5rem 0.75rem",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            fontSize: "0.875rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 0.75rem",
            background: "var(--color-accent)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius)",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Search
        </button>
      </form>

      {/* Category filter */}
      <select
        value={currentCategory ?? ""}
        onChange={(e) => updateParams({ category: e.target.value || undefined })}
        style={{
          padding: "0.5rem 0.75rem",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
          fontSize: "0.875rem",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        <option value="">All Rooms</option>
        {categories.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      {/* Style filter */}
      <select
        value={currentStyle ?? ""}
        onChange={(e) => updateParams({ style: e.target.value || undefined })}
        style={{
          padding: "0.5rem 0.75rem",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
          fontSize: "0.875rem",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        <option value="">All Styles</option>
        {styles.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      {/* Featured toggle */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.875rem",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <input
          type="checkbox"
          checked={!!currentFeatured}
          onChange={(e) => updateParams({ featured: e.target.checked ? "true" : undefined })}
        />
        Featured only
      </label>

      {/* Clear */}
      {hasFilters && (
        <a
          href={pathname}
          style={{
            fontSize: "0.8rem",
            color: "var(--color-muted)",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Clear all
        </a>
      )}
    </div>
  );
}
