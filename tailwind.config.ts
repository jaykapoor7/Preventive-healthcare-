import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        // Brand
        juno: {
          50: "rgb(var(--juno-50) / <alpha-value>)",
          100: "rgb(var(--juno-100) / <alpha-value>)",
          200: "rgb(var(--juno-200) / <alpha-value>)",
          300: "rgb(var(--juno-300) / <alpha-value>)",
          400: "rgb(var(--juno-400) / <alpha-value>)",
          500: "rgb(var(--juno-500) / <alpha-value>)",
          600: "rgb(var(--juno-600) / <alpha-value>)",
          700: "rgb(var(--juno-700) / <alpha-value>)",
          800: "rgb(var(--juno-800) / <alpha-value>)",
          900: "rgb(var(--juno-900) / <alpha-value>)",
        },
        warm: {
          DEFAULT: "rgb(var(--warm) / <alpha-value>)",
          soft: "rgb(var(--warm-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        content: "1120px",
        prose: "68ch",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "draw-line": "draw-line 2.4s ease-out forwards",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at center, rgb(var(--foreground) / 0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
