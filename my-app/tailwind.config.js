/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'text-c': '#6AABD2',
        'navbar-bg': '#616161',
        'blueButton-c': '#CEECF5',
        'redButton-c': '#FF6666',
        'greenButton-c': '#B1DEA5',
        'loginPage-bg': '#F0F0F0',
        'ccBlue': '#CEECF5',
        'loginPageB': 'F5F5F5',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'], // This sets Arial as the default sans-serif font
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
