/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f6f8fb",
          100: "#eef2f7",
          200: "#e3e8f0",
        }
      },
      boxShadow: {
        soft: "0 6px 28px rgba(0,0,0,0.06)"
      }
    },
  },
  plugins: [],
}
