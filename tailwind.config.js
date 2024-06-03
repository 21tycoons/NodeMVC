/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./app/views/**/*.{ejs,html,js,pug}'],
  plugins: [
    require('daisyui')
  ],
  theme: {
  extend: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
  },
  },
}