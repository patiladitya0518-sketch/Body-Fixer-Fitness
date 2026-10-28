/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
      },
      colors: {
        'neon-green': '#00ff41',
        'gym-orange': '#ff6b35',
        'deep-black': '#0a0a0a',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'dumbbell-fall': 'dumbbell-fall 2s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 255, 65, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'dumbbell-fall': {
          '0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: '0' },
          '100%': { transform: 'translateY(0px) rotate(360deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
