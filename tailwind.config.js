/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        content: "calc(100vh - 64px)",
      }
    },
  },
  plugins: [require("daisyui")],
};
