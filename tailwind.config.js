/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/content.json"
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        cream: '#faf9f7',
        'section-header': '#1a1a1a',
        'bg-portfolio': '#f8f7f5',
        'nav-bg': 'rgba(250,249,247,0.85)',
        'fuchsia-accent': '#e879f9',
        'violet-accent': '#a78bfa',
        'cyan-accent': '#22d3ee',
        'rose-accent': '#f472b6',
        'yellow-accent': '#fbbf24',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
