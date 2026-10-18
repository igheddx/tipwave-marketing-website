/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Same palette as the Tipwave app
        brand: {
          50: "#E6F6F9",
          100: "#C2EAF0",
          200: "#8DD8E3",
          300: "#52C2D2",
          400: "#22AABE",
          500: "#06B6C8",
          600: "#0891A6",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },
        accent: {
          50: "#FFF1F6",
          100: "#FFE0EB",
          400: "#F0709F",
          500: "#E5548C",
          600: "#CC3D75",
          700: "#A92F5E",
        },
        ink: {
          900: "#1B2530",
          700: "#334155",
          500: "#64748B",
          400: "#94A3B8",
        },
        surface: "#F5F7FA",
        // Older class names used by the About and Help pages, pointed at the new palette
        'tipwave-teal': '#0E7490',
        'tipwave-magenta': '#E5548C',
        'deep-charcoal': '#1B2530',
        'soft-gray': '#F5F7FA',
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)",
        lift: "0 12px 32px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
}
