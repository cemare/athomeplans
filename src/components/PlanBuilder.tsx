"use client";

import { useMemo, useState } from "react";

type RoomType = "living-room" | "bedroom" | "kitchen" | "office";
type DecorStyle = "modern" | "minimalist" | "bohemian" | "industrial";
type Palette = "neutral" | "earthy" | "coastal" | "monochrome";
type FurnitureType = "sofa" | "coffee-table" | "bed" | "desk" | "bookshelf" | "dining-table";

type PlacedFurniture = {
  id: string;
  type: FurnitureType;
  x: number;
  y: number;
  width: number;
  depth: number;
};

const roomLabels: Record<RoomType, string> = {
  "living-room": "Living Room",
  bedroom: "Bedroom",
  kitchen: "Kitchen",
  office: "Home Office",
};

const styleLabels: Record<DecorStyle, string> = {
  modern: "Modern",
  minimalist: "Minimalist",
  bohemian: "Bohemian",
  industrial: "Industrial",
};

const paletteLabels: Record<Palette, string> = {
  neutral: "Neutral",
  earthy: "Earthy",
  coastal: "Coastal",
  monochrome: "Monochrome",
};

const furnitureLabels: Record<FurnitureType, string> = {
  sofa: "Sofa",
  "coffee-table": "Coffee Table",
  bed: "Bed",
  desk: "Desk",
  bookshelf: "Bookshelf",
  "dining-table": "Dining Table",
};

const defaultFurnitureSize: Record<FurnitureType, { width: number; depth: number }> = {
  sofa: { width: 30, depth: 18 },
  "coffee-table": { width: 18, depth: 12 },
  bed: { width: 36, depth: 22 },
  desk: { width: 24, depth: 14 },
  bookshelf: { width: 16, depth: 10 },
  "dining-table": { width: 28, depth: 16 },
};

export default function PlanBuilder() {
  const [roomType, setRoomType] = useState<RoomType>("living-room");
  const [style, setStyle] = useState<DecorStyle>("modern");
  const [palette, setPalette] = useState<Palette>("neutral");
  const [roomWidthFeet, setRoomWidthFeet] = useState(14);
  const [roomDepthFeet, setRoomDepthFeet] = useState(12);
  const [furnitureType, setFurnitureType] = useState<FurnitureType>("sofa");
  const [placed, setPlaced] = useState<PlacedFurniture[]>([]);
  const [planTitle, setPlanTitle] = useState("My Custom Room Plan");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const roomAspectRatio = useMemo(() => roomWidthFeet / roomDepthFeet, [roomDepthFeet, roomWidthFeet]);

  const addFurniture = () => {
    const size = defaultFurnitureSize[furnitureType];
    setPlaced((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: furnitureType,
        x: Math.max(5, Math.min(75, 50 - size.width / 2)),
        y: Math.max(5, Math.min(75, 50 - size.depth / 2)),
        width: size.width,
        depth: size.depth,
      },
    ]);
  };

  const removeFurniture = (id: string) => {
    setPlaced((prev) => prev.filter((item) => item.id !== id));
  };

  const updateFurniture = (id: string, patch: Partial<PlacedFurniture>) => {
    setPlaced((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const exportPlan = () => {
    const payload = {
      version: 1,
      roomType,
      style,
      palette,
      dimensions: { widthFeet: roomWidthFeet, depthFeet: roomDepthFeet },
      furniture: placed,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `custom-plan-${roomType}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const savePlanToAccount = async () => {
    setSaveStatus(null);
    const response = await fetch("/api/saved-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: planTitle,
        layout: {
          roomType,
          style,
          palette,
          dimensions: { widthFeet: roomWidthFeet, depthFeet: roomDepthFeet },
          furniture: placed,
        },
      }),
    });

    const json = await response.json().catch(() => ({}));
    if (response.status === 401) {
      setSaveStatus("Please sign in at /account, then save again.");
      return;
    }
    if (!response.ok) {
      setSaveStatus(json.error || "Could not save this plan.");
      return;
    }
    setSaveStatus("Saved to your account dashboard.");
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1rem 3rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>Custom Plan Builder</h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}>
        Configure your room, place furniture blocks, and export your custom layout.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >
        <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "1rem" }}>
          <h2 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>Room Setup</h2>

          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Room type
            <select value={roomType} onChange={(e) => setRoomType(e.target.value as RoomType)} style={{ width: "100%", marginTop: "0.3rem" }}>
              {Object.entries(roomLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Decor style
            <select value={style} onChange={(e) => setStyle(e.target.value as DecorStyle)} style={{ width: "100%", marginTop: "0.3rem" }}>
              {Object.entries(styleLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            Color palette
            <select value={palette} onChange={(e) => setPalette(e.target.value as Palette)} style={{ width: "100%", marginTop: "0.3rem" }}>
              {Object.entries(paletteLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            Room width: <strong>{roomWidthFeet} ft</strong>
            <input type="range" min={8} max={24} value={roomWidthFeet} onChange={(e) => setRoomWidthFeet(Number(e.target.value))} style={{ width: "100%" }} />
          </label>

          <label style={{ display: "block", marginBottom: "1rem" }}>
            Room depth: <strong>{roomDepthFeet} ft</strong>
            <input type="range" min={8} max={24} value={roomDepthFeet} onChange={(e) => setRoomDepthFeet(Number(e.target.value))} style={{ width: "100%" }} />
          </label>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
            <select value={furnitureType} onChange={(e) => setFurnitureType(e.target.value as FurnitureType)} style={{ flex: "1 1 200px", minWidth: 0 }}>
              {Object.entries(furnitureLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addFurniture}
              style={{ border: 0, borderRadius: "var(--radius)", background: "var(--color-accent)", color: "#fff", padding: "0.55rem 0.9rem", cursor: "pointer" }}
            >
              Add Furniture
            </button>
          </div>

          <label style={{ display: "block", marginBottom: "0.6rem" }}>
            Plan title
            <input value={planTitle} onChange={(e) => setPlanTitle(e.target.value)} style={{ width: "100%", marginTop: "0.3rem", padding: "0.45rem" }} />
          </label>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={savePlanToAccount}
              style={{ border: 0, borderRadius: "var(--radius)", background: "var(--color-accent)", color: "#fff", padding: "0.55rem 0.9rem", cursor: "pointer" }}
            >
              Save to Account
            </button>
          <button
            type="button"
            onClick={exportPlan}
            style={{ border: 0, borderRadius: "var(--radius)", background: "#111", color: "#fff", padding: "0.55rem 0.9rem", cursor: "pointer" }}
          >
            Export Plan (JSON)
          </button>
          </div>
          {saveStatus ? <p style={{ marginTop: "0.5rem", color: "var(--color-muted)", fontSize: "0.9rem" }}>{saveStatus}</p> : null}
        </section>

        <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "1rem" }}>
          <h2 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>Live Layout Preview</h2>
          <div
            style={{
              width: "100%",
              aspectRatio: `${roomAspectRatio}`,
              border: "2px dashed #999",
              borderRadius: "var(--radius)",
              position: "relative",
              background:
                palette === "neutral"
                  ? "#f5f4ef"
                  : palette === "earthy"
                    ? "#f0e6d7"
                    : palette === "coastal"
                      ? "#e8f2f7"
                      : "#f0f0f0",
            }}
          >
            {placed.length === 0 ? (
              <p style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--color-muted)" }}>
                Add furniture to start customizing.
              </p>
            ) : null}
            {placed.map((item) => (
              <div
                key={item.id}
                title={furnitureLabels[item.type]}
                style={{
                  position: "absolute",
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  width: `${item.width}%`,
                  height: `${item.depth}%`,
                  borderRadius: "6px",
                  border: "1px solid #333",
                  background: style === "bohemian" ? "#d4a373" : style === "industrial" ? "#b0b0b0" : style === "minimalist" ? "#dcdcdc" : "#8ecae6",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {furnitureLabels[item.type]}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Furniture Adjustments</h3>
            {placed.length === 0 ? <p style={{ color: "var(--color-muted)" }}>No furniture placed yet.</p> : null}
            {placed.map((item) => (
              <div key={item.id} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "0.75rem", marginBottom: "0.6rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", gap: "0.5rem" }}>
                  <strong>{furnitureLabels[item.type]}</strong>
                  <button type="button" onClick={() => removeFurniture(item.id)} style={{ border: 0, background: "transparent", color: "#b91c1c", cursor: "pointer" }}>
                    Remove
                  </button>
                </div>
                <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                  X: {item.x}%
                  <input type="range" min={0} max={100 - item.width} value={item.x} onChange={(e) => updateFurniture(item.id, { x: Number(e.target.value) })} style={{ width: "100%" }} />
                </label>
                <label style={{ display: "block", fontSize: "0.9rem" }}>
                  Y: {item.y}%
                  <input type="range" min={0} max={100 - item.depth} value={item.y} onChange={(e) => updateFurniture(item.id, { y: Number(e.target.value) })} style={{ width: "100%" }} />
                </label>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
