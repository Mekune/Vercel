/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        mobil: "0px",
        // => @media (min-width: 640px) { ... }

        tablet: "426px",
        // => @media (min-width: 1024px) { ... }

        desktop: "769px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};
