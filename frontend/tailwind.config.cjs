/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens:{
        'xs':'350px'
      },
      spacing:{
        'verybig': '50rem',
        'big': '25rem',
        'smol': '19rem'
      },
      colors: {
        'navcolor': 'rgb(138, 73, 177)'
      },
      dropShadow:{
        'shadow': '1px 2px 3px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [require('daisyui','flowbite/plugin')],
}
