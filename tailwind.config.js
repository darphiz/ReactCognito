/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Pacifico: ['Pacifico', 'cursive'],
      },
      colors:{
        "cs-green" : "#163a3f",
        "cs-light-green" : "#466443",
        "cs-bg": "#f9fcf8"
      },
      backgroundImage: theme => ({
        'cs-image': "url('/src/assets/img/bgr.png')",
      })

    },
  },
  plugins: [],
}
