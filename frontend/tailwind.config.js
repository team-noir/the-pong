const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    colors: {
      ...colors,
      primary: colors.blue,
      secondary: colors.yellow,
      neutral: colors.neutral,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
