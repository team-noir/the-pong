const colors = require('tailwindcss/colors');

// TODO: remove
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    colors: {
      ...colors, // TODO: remove
      primary: {
        light: '#F5F0EE',
        DEFAULT: '#E2D8D5',
        dark: '#C4B7B4',
      },
      secondary: colors.yellow,
      neutral: colors.neutral,
      green: {
        ...colors.green,
        DEFAULT: '#4BA19D',
      },
      red: {
        ...colors.red,
        DEFAULT: '#CD392B',
      },
      gray: {
        lighter: '#F5F0EE',
        light: '#E2D8D5',
        DEFAULT: '#C3BCBA',
        dark: '#736C6B',
        darker: '#1A1C22',
      },
      text: {
        light: '#FBFBFB',
        dark: '#1A1C22',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
