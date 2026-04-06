"use client";

import { FormEvent, useEffect, useState } from "react";

type MeResponse = {
  user: null | { id: string; email: string; savedPlanCount: number };
};

type SavedPlan = {
  id: string;
  title: string;
  shareToken: string;
  createdAt: string;
  sourcePlan?: { title: string; slug: string } | null;
};

export default function AccountDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [me, setMe] = useState<MeResponse["user"]>(null);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);

  const load = async () => {
    const meRes = await fetch("/api/me", { cache: "no-store" });
    const meJson = (await meRes.json()) as MeResponse;
    setMe(meJson.user);

    if (meJson.user) {
      const plansRes = await fetch("/api/saved-plans", { cache: "no-store" });
      const plansJson = await plansRes.json();
      setSavedPlans(plansJson.data ?? []);
    } else {
      setSavedPlans([]);
    }
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const auth = async (mode: "signup" | "login", event: FormEvent) => {
    event.preventDefault();
    setAuthMessage(null);

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      setAuthMessage(json.error || "Auth failed.");
      return;
    }

    setAuthMessage(mode === "signup" ? "Account created." : "Logged in.");
    setPassword("");
    await load();
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthMessage("Logged out.");
    await load();
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem 3rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>Account</h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}>
        Sign up, save plans, and share links with your friends or clients.
      </p>

      {!me ? (
        <form onSubmit={(e) => auth("login", e)} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "1rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Sign Up / Log In</h2>
          <label style={{ display: "block", marginBottom: "0.6rem" }}>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", marginTop: "0.3rem", padding: "0.5rem" }} />
          </label>
          <label style={{ display: "block", marginBottom: "0.8rem" }}>
            Password (8+ chars)
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", marginTop: "0.3rem", padding: "0.5rem" }} />
          </label>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button type="submit" style={{ border: 0, borderRadius: "var(--radius)", background: "var(--color-accent)", color: "#fff", padding: "0.6rem 1rem", cursor: "pointer" }}>
              Log In
            </button>
            <button type="button" onClick={(e) => auth("signup", e)} style={{ border: 0, borderRadius: "var(--radius)", background: "#111", color: "#fff", padding: "0.6rem 1rem", cursor: "pointer" }}>
              Sign Up
            </button>
          </div>
          {authMessage ? <p style={{ marginTop: "0.6rem", color: "var(--color-muted)" }}>{authMessage}</p> : null}
        </form>
      ) : (
        <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>{me.email}</h2>
              <p style={{ color: "var(--color-muted)" }}>{me.savedPlanCount} saved plans</p>
            </div>
            <button type="button" onClick={logout} style={{ border: 0, borderRadius: "var(--radius)", background: "#111", color: "#fff", padding: "0.6rem 1rem", cursor: "pointer" }}>
              Log Out
            </button>
          </div>
          {authMessage ? <p style={{ marginTop: "0.6rem", color: "var(--color-muted)" }}>{authMessage}</p> : null}
        </section>
      )}

      <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "1rem" }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Saved Plans Dashboard</h2>
        {savedPlans.length === 0 ? (
          <p style={{ color: "var(--color-muted)" }}>No saved plans yet. Save one from a plan detail page.</p>
        ) : (
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {savedPlans.map((plan) => (
              <article key={plan.id} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "0.75rem" }}>
                <h3 style={{ marginBottom: "0.4rem" }}>{plan.title}</h3>
                <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  Saved {new Date(plan.createdAt).toLocaleString()}
                  {plan.sourcePlan ? ` · from ${plan.sourcePlan.title}` : ""}
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
                  <a href={`/share/${plan.shareToken}`}>Open shared view</a>
                  <code>{`/share/${plan.shareToken}`}</code>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
