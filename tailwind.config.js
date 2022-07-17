/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        content: "82%",
      },
      height: {
        "navbar-dropdown": "300px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
