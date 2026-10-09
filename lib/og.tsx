import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

export function renderOg({ title, subtitle }: { title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0b0f19",
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#94a3b8" }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 34, color: "#94a3b8", marginTop: 20, lineHeight: 1.4, maxWidth: 960 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", width: 80, height: 6, backgroundColor: "#3b82f6" }} />
      </div>
    ),
    ogSize
  );
}
