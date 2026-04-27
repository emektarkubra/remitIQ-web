/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./src/**/*.scss",  // ← bunu ekle
  ],
  darkMode: "class",
  theme: {
    colors: {
      // ── Legacy ──────────────────────────────────────────────
      darkColor:              "rgb(35,35,41)",
      softDarkColor:          "rgb(42,42,49)",
      lightColor:             "rgb(221,221,221)",
      softLightColor:         "rgb(153,153,153)",
      lightGray:              "#434343",
      transparentWhite02:     "rgba(255,255,255,0.2)",
      transparentWhite04:     "rgba(255,255,255,0.4)",
      transparentWhite06:     "rgba(255,255,255,0.6)",
      transparentWhite08:     "rgba(255,255,255,0.8)",

      // ── Dark Backgrounds ─────────────────────────────────────
      "dark-bg-primary":      "#0f1117",
      "dark-bg-secondary":    "#161b27",
      "dark-bg-tertiary":     "#1e2435",
      "dark-bg-overlay":      "#252d40",

      // ── Dark Borders ─────────────────────────────────────────
      "dark-border":          "#2a3147",
      "dark-border-muted":    "#1e2435",

      // ── Dark Text ────────────────────────────────────────────
      "dark-text":            "#e8edf5",
      "dark-text-secondary":  "#8b95a8",
      "dark-text-muted":      "#5a6278",

      // ── Light Backgrounds ────────────────────────────────────
      "light-bg-primary":     "#f7f6f2",
      "light-bg-secondary":   "#ffffff",
      "light-bg-tertiary":    "#f0eee9",
      "light-bg-overlay":     "#ffffff",

      // ── Light Borders ────────────────────────────────────────
      "light-border":         "#e4e1d8",
      "light-border-muted":   "#d4d0c4",

      // ── Light Text ───────────────────────────────────────────
      "light-text":           "#1a1814",
      "light-text-secondary": "#6b6760",
      "light-text-muted":     "#9e9a92",

      // ── Blue ─────────────────────────────────────────────────
      "blue":                 "#1b4fd8",
      "blue-hover":           "#1640b8",
      "blue-light":           "#4d7ef5",
      "blue-bg":              "#1a2540",
      "blue-bg-light":        "#eef2ff",
      "blue-border":          "#1b4fd840",
      "blue-border-light":    "#c7d2fe",
      "blue-text":            "#6494f7",
      "blue-text-light":      "#1b4fd8",

      // ── Green ────────────────────────────────────────────────
      "green":                "#0ea371",
      "green-hover":          "#0b8a5f",
      "green-light":          "#34c88a",
      "green-bg":             "#0d2620",
      "green-bg-light":       "#edfaf4",
      "green-border":         "#0ea37140",
      "green-border-light":   "#6ee7b7",
      "green-text":           "#3ed49a",
      "green-text-light":     "#065f46",

      // ── Red ──────────────────────────────────────────────────
      "red":                  "#e5484d",
      "red-hover":            "#cc3338",
      "red-bg":               "#2a1418",
      "red-bg-light":         "#fef2f2",
      "red-border":           "#e5484d40",
      "red-border-light":     "#fecaca",
      "red-text":             "#f27679",
      "red-text-light":       "#991b1b",

      // ── Yellow ───────────────────────────────────────────────
      "yellow":               "#d97706",
      "yellow-hover":         "#b86305",
      "yellow-bg":            "#271e0a",
      "yellow-bg-light":      "#fef3c7",
      "yellow-border":        "#d9770640",
      "yellow-border-light":  "#fcd34d",
      "yellow-text":          "#f5a623",
      "yellow-text-light":    "#92400e",

      // ── Purple ───────────────────────────────────────────────
      "purple":               "#7c3aed",
      "purple-hover":         "#6829d4",
      "purple-bg":            "#1e1530",
      "purple-bg-light":      "#f5f3ff",
      "purple-border":        "#7c3aed40",
      "purple-border-light":  "#ddd6fe",
      "purple-text":          "#a78bfa",
      "purple-text-light":    "#5b21b6",

      // ── Teal ─────────────────────────────────────────────────
      "teal":                 "#0891b2",
      "teal-bg":              "#0a2030",
      "teal-bg-light":        "#ecfeff",
      "teal-border":          "#0891b240",
      "teal-border-light":    "#a5f3fc",
      "teal-text":            "#22d3ee",
      "teal-text-light":      "#155e75",

      // ── Utilities ────────────────────────────────────────────
      transparent:            "transparent",
      current:                "currentColor",
      white:                  "#ffffff",
      black:                  "#000000",
    },
  },
  plugins: [],
}