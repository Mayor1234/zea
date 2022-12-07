/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        move: {
          '100%': {
            left: 0,
          },
        },
      },

      animation: {
        'banner-move': 'move 3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
