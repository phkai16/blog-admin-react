/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1677ff",
        secondary: "#538fdd",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
