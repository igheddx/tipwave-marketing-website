/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tipwave-blue': '#1A73E8',
        'deep-charcoal': '#111827',
        'emerald': '#10B981',
        'soft-gray': '#F9FAFB',
      },
    },
  },
  plugins: [],
}
