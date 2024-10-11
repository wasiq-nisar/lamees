/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#616161"
      }, 
      screens: {
      'xs': {'max': '340px'}
      }
    },
  },
  plugins: [],
}

