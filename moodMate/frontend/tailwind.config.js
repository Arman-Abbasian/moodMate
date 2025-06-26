/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/ui/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#FF9494',
        secondary: '#FFD1D1',
        background: '#FFE3E1',
        text: '#1E1E1E',
        card: '#FFFFFF',
        accent: '#FF6B6B',
      },
    },
  },
  plugins: [],
}
