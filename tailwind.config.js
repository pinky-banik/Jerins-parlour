/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F63E7B",
          secondary: "#FFF8F5",
          accent: "#F63E7B",
          neutral: "#3d4451",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
