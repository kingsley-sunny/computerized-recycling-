/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "banner-image": "url('/imgs/plastics.jpg')",
      },
    },
  },
  plugins: [],
};
