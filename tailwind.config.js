/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      mono: {
        100: '#1a1a1a',
        200: '#1c1c1c',
        300: '#232323',
        400: '#282828',
        500: '#2e2e2e',
        600: '#343434',
        700: '#3e3e3e',
        800: '#505050',
        900: '#707070',
        1000: '#7e7e7e',
        1100: '#a0a0a0',
        1200: '#ededed',
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
