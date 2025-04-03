/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        backgroundHover: 'var(--background-hover)',
        foreground: 'var(--foreground)',
        foregroundHover: 'var(--foreground-hover)',
        primary: 'var(--primary)',
        primaryHover: 'var(--primary-hover)',
      },
    },
  },
  plugins: [],
}

