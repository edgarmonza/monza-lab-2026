import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        monza: {
          brown: "hsl(var(--monza-brown))",
          pink: "hsl(var(--monza-pink))",
          pinkLight: "hsl(var(--monza-pink-light))",
          typing: "hsl(var(--monza-typing))",
          petrol: "hsl(var(--monza-petrol))",
          cocoa: "hsl(var(--monza-cocoa))",
          ink: "#2B1F1F",
          cream: "hsl(var(--monza-cream))",
          sand: { 200: "#F3E7DD" },
          blush: { 200: "#F2D6DF" },
          rose: { 300: "#D9A1B6" },
          mauve: { 300: "#C58CA5", 400: "#B97D99" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        "worm-flow": {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-300" },
        },
        "infinity-trace": {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-300" },
        },
        "grid-beam-horizontal": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        "grid-beam-vertical": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        aurora: "aurora 60s linear infinite",
        "worm-flow": "worm-flow 3s linear infinite",
        "infinity-trace": "infinity-trace 12s ease-in-out infinite",
        "infinity-trace-slow": "infinity-trace 40s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        "grid-beam-horizontal": "grid-beam-horizontal 12s ease-in-out infinite",
        "grid-beam-vertical": "grid-beam-vertical 18s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["Public Sans", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Telegraf", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
  ],
} satisfies Config;

// Plugin to add each color as CSS variable
function addVariablesForColors({ addBase, theme }: { addBase: Function; theme: Function }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ":root": newVars });
}
