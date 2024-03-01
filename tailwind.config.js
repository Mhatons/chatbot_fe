/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: { 
        smm: "560px",
        smmm: "424px"
      }
    },
  },
  plugins: [],
}

