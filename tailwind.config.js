/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-1": "#3a7bfd",
        "primary-2": "#57ddff",
        "primary-3": "#c058f3",
        "light-1": "#fafafa",
        "light-2": "#e4e5f1",
        "light-3": "#d2d3db",
        "light-4": "#9394a5",
        "light-5": "#484b6a",
        "dark-1": "#161722",
        "dark-2": "#25273c",
        "dark-3": "#cacde8",
        "dark-4": "#e4e5f1",
        "dark-5": "#777a92",
        "dark-6": "#4d5066",
        "dark-7": "#393a4c",
      },
      fontFamily: {
        JosefinSans: ["JosefinSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
