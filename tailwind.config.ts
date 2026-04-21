import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
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
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
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
         chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "hero-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spotlight-spin": {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
        "float-1": {
            "0%": { transform: "translateY(0px) translateX(0px) rotate(0deg)", opacity: 0 },
            "20%": { opacity: 1 },
            "100%": { transform: "translateY(-100vh) translateX(100vw) rotate(360deg)", opacity: 0 },
        },
        "float-2": {
            "0%": { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: 0 },
            "10%": { opacity: 0.7 },
            "100%": { transform: "translateY(-80vh) translateX(-120vw) rotate(-300deg)", opacity: 0 },
        },
        "float-3": {
            "0%": { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: 0 },
            "15%": { opacity: 0.5 },
            "100%": { transform: "translateY(60vh) translateX(110vw) rotate(270deg)", opacity: 0 },
        },
        "float-4": {
            "0%": { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: 0 },
            "5%": { opacity: 0.6 },
            "100%": { transform: "translateY(-100vh) translateX(-30vw) rotate(-270deg)", opacity: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "hero-spin": "hero-spin 20s linear infinite",
        "spotlight-spin": "spotlight-spin 15s linear infinite",
        "spotlight-spin-slow": "spotlight-spin 25s linear infinite",
        "float-1": "float-1 30s ease-in-out infinite 2s",
        "float-2": "float-2 25s ease-in-out infinite 8s",
        "float-3": "float-3 35s ease-in-out infinite 15s",
        "float-4": "float-4 28s ease-in-out infinite 20s",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
