/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Titillium Web', 'sans-serif'],
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      'light-green': '#E9EDC9',
      green: '#606C38',
      whiskey: '#BC6C25',
      'off-yellow': '#FEFAE0',
      transparent: '#00000000',
      "risk-low": "#809c13",
      "risk-medium": "#ff9a00",
      "risk-high": "#a70000"
    },
    extend: {},
  },
  plugins: [],
}
