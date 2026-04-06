"use client";

import { useState } from "react";

type SavePlanButtonProps = {
  title: string;
  sourcePlanSlug?: string;
  layout?: Record<string, unknown>;
};

export default function SavePlanButton({ title, sourcePlanSlug, layout }: SavePlanButtonProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setLoading(true);
    setStatus(null);

    const response = await fetch("/api/saved-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        sourcePlanSlug,
        layout,
      }),
    });

    const json = await response.json().catch(() => ({}));
    setLoading(false);

    if (response.status === 401) {
      setStatus("Please sign in first at /account.");
      return;
    }

    if (!response.ok) {
      setStatus(json.error || "Could not save plan.");
      return;
    }

    setStatus("Saved. View it in /account.");
  };

  return (
    <div>
      <button
        type="button"
        onClick={onSave}
        disabled={loading}
        style={{
          background: "#111",
          color: "#fff",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "var(--radius)",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Saving..." : "Save to Account"}
      </button>
      {status ? <p style={{ marginTop: "0.5rem", color: "var(--color-muted)", fontSize: "0.9rem" }}>{status}</p> : null}
    </div>
  );
}
