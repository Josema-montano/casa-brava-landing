/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#0D0D0D',
        wine: '#6E1F2A',
        ember: '#B23A2E',
        sand: '#D8C3A5',
        bone: '#F4EFE7',
        stone: '#5E5A55',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(178, 58, 46, 0.35), 0 18px 48px rgba(0, 0, 0, 0.45)',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-ember': 'radial-gradient(circle at center, rgba(178,58,46,0.32), transparent 65%)',
        'grain-overlay': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};