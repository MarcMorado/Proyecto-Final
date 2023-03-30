/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
      extend: {}
  },
  variants: {
      extend: {}
  },
  plugins: [require('daisyui')],
  daisyui:{
    themes:[
      {
        dark: {
					...require('daisyui/src/colors/themes')['[data-theme=dark]'],
					primary: '#104060',
					secondary: '#0a2440',
				}
      }
    ]
  }
};

