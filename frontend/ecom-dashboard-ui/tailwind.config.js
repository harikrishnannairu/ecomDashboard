/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}", // Scan all Angular templates & components
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], //  global font
      },
    },
  },
  plugins: [],
}