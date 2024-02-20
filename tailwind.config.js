/** @type {import("tailwindcss").config} */

module.exports = {
  content: ["./src/client/**/*.{ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        custom100: "#000000",
        custom200: "#1c2541",
        custom300: "#3a506b",
        custom400: "#5bc0be",
        custom500: "#6fffe9",
        custom600: "#ffffff"
      }
    }
  },
  plugins: []
};
