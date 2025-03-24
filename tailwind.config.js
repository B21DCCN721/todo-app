/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple: "#6C63FF",
        "purple-2": "#534CC2",
      }
    },
  },
  plugins: [],
}