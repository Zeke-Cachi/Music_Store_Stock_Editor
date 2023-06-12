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
      }
    },
  },
  plugins: [require("daisyui")],
}
