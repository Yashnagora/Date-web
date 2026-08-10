import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "13": "3.25rem"
      },
      boxShadow: {
        blush: "0 20px 60px rgba(233, 97, 154, 0.18)",
        glow: "0 0 40px rgba(255, 170, 207, 0.24)"
      },
      colors: {
        blush: {
          50: "#fff5f8",
          100: "#ffe7f0",
          200: "#ffcde0",
          300: "#ffaccd",
          400: "#ff86bb",
          500: "#f35fa3",
          600: "#d94689"
        },
        plum: {
          500: "#8b5cf6",
          700: "#5b3cb0"
        }
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "twinkle-soft": "twinkleSoft 2.6s ease-in-out infinite",
        "pulse-heart": "pulseHeart 1.8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        ripple: "ripple 650ms ease-out forwards",
        heartFloat: "heartFloat var(--heart-duration, 9s) ease-in-out infinite"
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        twinkleSoft: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.96)" },
          "50%": { opacity: "1", transform: "scale(1.08)" }
        },
        pulseHeart: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.65" },
          "100%": { transform: "scale(2.2)", opacity: "0" }
        },
        heartFloat: {
          "0%, 100%": { transform: "translateY(0) rotate(-4deg)", opacity: "0.55" },
          "50%": { transform: "translateY(-22px) rotate(4deg)", opacity: "0.95" }
        }
      }
    }
  },
  plugins: []
};

export default config;
