/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07080a',
        accent: {
          DEFAULT: '#00ff66',
          dim: 'rgba(0, 255, 102, 0.15)',
          glow: 'rgba(0, 255, 102, 0.25)',
        },
        panel: '#111215',
        border: '#1d2026',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
      backgroundImage: {
        'grid-overlay':
          'linear-gradient(rgba(0, 255, 102, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 102, 0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-size': '40px 40px',
      },
    },
  },
  plugins: [],
};
