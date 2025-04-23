/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#FFD369',
        background: '#F7F6FB',
        text: '#1E1E1E',
        card: '#FFFFFF',
        accent: '#FF6B6B',
      },
    },
  },
  plugins: [],
}
