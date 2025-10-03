/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg,#7c3aed 0%,#06b6d4 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
      },
      colors: {
        'card-bg': 'rgba(255,255,255,0.03)',
      },
    },
  },
  plugins: [],
};
