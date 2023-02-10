/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        containerColor: 'rgb(180, 187, 187)',
      },
      fontFamily: {
        boogaloo: ['"Boogaloo"', 'cursive'],
      },
    },
  },
  plugins: [],
};
