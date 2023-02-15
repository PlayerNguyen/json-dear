/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.(js|ts|html|css)"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
