import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6F88A6',
          'primary-hover': '#5F7896',
          success: '#6F9683',
          warning: '#B79D72',
          danger: '#B98686',
          info: '#7396AA',
          accent: '#9A90AD',
          text: '#3A414D',
          heading: '#2D3440',
          muted: '#5B6470',
          subtle: '#8A929C',
          bg: '#FFFFFF',
          page: '#F8F9FA',
          surface: '#F4F6F8',
          'surface-hover': '#E5E7EB',
          border: '#E2E5E8',
        },
      },
      borderRadius: {
        DEFAULT: '4px',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in',
      },
    },
  },
  plugins: [],
} satisfies Config
