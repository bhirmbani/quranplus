/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        content: "calc(100vh - 64px)",
      },
      height: {
        "navbar-dropdown": "300px",
      },
    },
  },
  plugins: [require("daisyui")],
};
