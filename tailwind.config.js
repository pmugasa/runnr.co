/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      nunito: "Nunito, sans-serif",
    },
    extend: {
      colors: {
        secondary: "#f0b000",
        primary: "#f4f0ec",
        txtColor: "#201e1d",
      },
    },
  },
  plugins: [],
};
