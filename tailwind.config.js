/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          dark: '#0A0A0F',
          card: '#12131C',
          light: '#E6E7E9',
          lightCard: '#F4F5F7',
        },
        brand: {
          indigo: '#6366F1',
          cyan: '#22D3EE',
          violet: '#8B5CF6',
          crimson: '#E84A35',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        'glow-indigo': '0 0 30px -5px rgba(99, 102, 241, 0.45)',
        'glow-cyan': '0 0 30px -5px rgba(34, 211, 238, 0.4)',
        'glow-crimson': '0 0 30px -5px rgba(232, 74, 53, 0.4)',
        'glass-dark': '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glass-light': '0 20px 45px rgba(15, 23, 42, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'spin-reverse-slow': 'spin-reverse 30s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
};
