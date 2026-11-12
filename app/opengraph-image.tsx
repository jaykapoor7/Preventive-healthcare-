import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Light-theme colours from app/globals.css.
const background = "#FBFAF8";
const foreground = "#1A1D1C";
const muted = "#6B6F6C";
const border = "#E7E5DF";
const accent = "#047861"; // juno-700
const mark = "#11B890"; // juno-500

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background,
          color: foreground,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke={mark}
              strokeWidth="2.2"
              strokeDasharray="66 24"
              strokeLinecap="round"
            />
            <path
              d="M9 17.5l3.5 3.5L23 11"
              fill="none"
              stroke={accent}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ fontSize: 40, letterSpacing: -1 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 80,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            <span>Healthcare shouldn’t start</span>
            <span style={{ color: accent }}>at the hospital.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.35,
              color: muted,
              maxWidth: 900,
            }}
          >
            Preventive health and patient-literacy tools for India.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${border}`,
            paddingTop: 28,
            fontSize: 24,
            color: muted,
          }}
        >
          <div style={{ display: "flex" }}>Seven tools · No account needed</div>
          <div style={{ display: "flex", color: accent }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size
  );
}
