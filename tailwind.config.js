/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#171717',
        hover: '#474747',
        light: '#e6e5e5',
        lightTransparent: 'rgba(230,229,229,0.66)',
        hoverLight: '#cac9c9',
      },
    },
  },
  plugins: [],
}

