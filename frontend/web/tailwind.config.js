/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#0E0E0E',
        ivory: '#F7F5F2',
        'soft-gray': '#8B8B8B',
        'muted-gold': '#C9B37E',
        'bg-dark': '#121212',
        'bg-dark-secondary': '#1A1A1A',
        'bg-dark-elevated': '#242424',
        'text-warm-white': '#F5F1E8',
        'text-warm-gray': '#C4C0B8',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
