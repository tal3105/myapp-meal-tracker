/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                 // חשוב ל‑Vite
    "./src/**/*.{js,jsx,ts,tsx}",   // כל הקבצים בקוד
  ],
  safelist: [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "text-center",
    "text-left",
    "text-right"
  ],
  theme: { extend: {} },
  plugins: [],
}
