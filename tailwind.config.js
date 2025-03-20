
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary palette
        'mystic': {
          50: '#FFF7E6',
          100: '#FFE8BF',
          200: '#FFD280',
          300: '#FFBD40',
          400: '#FFAD00',
          500: '#FF9933', // Primary saffron
          600: '#E6780D',
          700: '#CC5800',
          800: '#A34700',
          900: '#7A3500',
        },
        // Accent palette
        'indigo': {
          50: '#EEE8FF',
          100: '#D8CCFF',
          200: '#B399FF',
          300: '#8E66FF',
          400: '#7233FF',
          500: '#5B00FF',
          600: '#4D00DB',
          700: '#3800A3',
          800: '#29007A',
          900: '#1A0052',
        },
        // Background palette
        'background': {
          light: '#FFF9F1',
          default: '#FFFFFF',
          dark: '#0F172A',
        },
        // Text palette
        'text': {
          primary: '#1E293B',
          secondary: '#475569',
          light: '#FFFFFF',
          muted: '#64748B',
        },
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'hero-pattern': "url('/lovable-uploads/hero-pattern.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'abstract-light': "url('/lovable-uploads/abstract-light.jpg')",
        'abstract-dark': "url('/lovable-uploads/abstract-dark.jpg')",
        'mystic-glow': 'linear-gradient(to right, rgba(255, 153, 51, 0.3), rgba(91, 0, 255, 0.3))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'mystic': '0 10px 25px -5px rgba(255, 153, 51, 0.2), 0 10px 10px -5px rgba(255, 153, 51, 0.1)',
        'indigo': '0 10px 25px -5px rgba(91, 0, 255, 0.2), 0 10px 10px -5px rgba(91, 0, 255, 0.1)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'neon': '0 0 10px rgba(255, 153, 51, 0.5), 0 0 20px rgba(255, 153, 51, 0.3)',
        'neon-indigo': '0 0 10px rgba(91, 0, 255, 0.5), 0 0 20px rgba(91, 0, 255, 0.3)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-gradient-mystic': {
          background: 'linear-gradient(to right, #FF9933, #FFC266)',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
        '.text-gradient-indigo': {
          background: 'linear-gradient(to right, #5B00FF, #8E66FF)',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
        '.glass-morphism': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.18)',
          'border-radius': '16px',
          'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        },
        '.glass-morphism-dark': {
          'background': 'rgba(15, 23, 42, 0.6)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.08)',
          'border-radius': '16px',
          'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
