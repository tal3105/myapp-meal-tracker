/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                 // חשוב ל-Vite
    "./src/**/*.{js,jsx,ts,tsx}",   // כל הקבצים בקוד
  ],
  safelist: [
    // כאן מכניסים מחלקות שיכולות להופיע בצורה דינמית
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "text-center",
    "text-right",
    "text-left",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
