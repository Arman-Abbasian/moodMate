/** @type {import('tailwindcss').Config} */

const { colors } = require('./src/constants/color')

module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/ui/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
}
