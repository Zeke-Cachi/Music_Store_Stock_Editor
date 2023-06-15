/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'background': '#faf0f2',
        'primary': '#5cbe46',
        'accent': '#293775'
      },
      keyframes: {
        appear: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1'}
        }
      },
      animation: {
         show: 'appear 200ms ease-in' 
      }
    },
  },
  plugins: [require("daisyui")],
}
