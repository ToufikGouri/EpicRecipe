/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        primaryFont: "'Inria Serif', serif"
      },
      colors: {
        primaryBlue: "#004D84",
        primaryRed: "#F4796C",
        primaryGrey: "#595959",
        secondaryGrey: "#D4D4D4",
      },

    },
  },
  plugins: [],
}