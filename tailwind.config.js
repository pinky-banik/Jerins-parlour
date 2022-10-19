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
          accent: "#808080",
          neutral: "#FEECF2",
          "base-100": "#ffffff",
          "base-200": "#F4F7FC",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp') //require this 
  ],

}
