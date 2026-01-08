/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tipwave-teal': '#1DBBB4',
        'tipwave-magenta': '#E91E8C',
        'deep-charcoal': '#111827',
        'soft-gray': '#F9FAFB',
      },
    },
  },
  plugins: [],
}
