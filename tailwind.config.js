/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F4F1EB',
        sand: '#EDE9DF',
        charcoal: {
          DEFAULT: '#0A0A0A',
          soft: '#1A1A1A',
        },
        terra: {
          DEFAULT: '#C84B2F',
          deep: '#A83A22',
        },
        gold: '#C9A84C',
        ink: {
          gray: '#5A564E',
          light: '#9A958A',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '2px',
      },
      boxShadow: {
        terra: '0 4px 20px rgba(200, 75, 47, 0.25)',
        'terra-lg': '0 8px 28px rgba(200, 75, 47, 0.35)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200, 75, 47, 0.45)' },
          '50%': { boxShadow: '0 0 0 14px rgba(200, 75, 47, 0)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        pulseGlow: 'pulseGlow 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
