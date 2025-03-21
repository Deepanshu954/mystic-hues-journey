
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern color palette
        'neo': {
          'violet': '#8B5CF6',
          'blue': '#3B82F6',
          'teal': '#14B8A6',
          'gray-50': '#F9FAFB',
          'gray-100': '#F3F4F6',
          'gray-200': '#E5E7EB',
          'gray-300': '#D1D5DB',
          'gray-400': '#9CA3AF',
          'gray-500': '#6B7280',
          'gray-600': '#4B5563',
          'gray-700': '#374151',
          'gray-800': '#1F2937',
          'gray-900': '#111827',
          'black': '#030712',
          'dark': '#0F172A',
        },
        'saffron': {
          '50': '#FFF9E6',
          '100': '#FFF0BF',
          '200': '#FFE499',
          '300': '#FFD266',
          '400': '#FFC433',
          '500': '#FF9933', // Primary saffron
          '600': '#E67300',
          '700': '#B35A00',
          '800': '#804000',
          '900': '#663300',
        },
        'light': {
          'background': '#F9FAFB',
          'text': '#111827',
          'muted': '#4B5563',
          'border': '#E5E7EB',
        },
        'dark': {
          'background': '#0F172A',
          'surface': '#1E293B',
          'text': '#F3F4F6',
          'muted': '#9CA3AF',
          'border': '#374151',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neo-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        'gradient-shine': 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 10s linear infinite',
      },
      boxShadow: {
        'neo': '0 10px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities, addComponents }) {
      const newUtilities = {
        '.text-gradient-neo': {
          background: 'linear-gradient(to right, #8B5CF6, #6366F1)',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
        '.bg-shimmer': {
          backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 10s infinite linear',
        },
      };
      
      const newComponents = {
        '.neo-card': {
          '@apply bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl shadow-sm transition-all duration-300': {},
        },
        '.neo-button': {
          '@apply px-4 py-2 bg-neo-violet/10 dark:bg-neo-violet/20 text-neo-violet dark:text-white border border-neo-violet/20 dark:border-neo-violet/30 rounded-lg font-medium transition-all duration-300 hover:bg-neo-violet/20 dark:hover:bg-neo-violet/30': {},
        },
        '.neo-input': {
          '@apply bg-light-background dark:bg-dark-surface border border-light-border dark:border-dark-border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-violet/30 dark:focus:ring-neo-violet/50 transition-all duration-300': {},
        },
        '.neo-panel': {
          '@apply bg-white/10 dark:bg-dark-surface/40 backdrop-blur-sm border border-light-border/40 dark:border-dark-border/30 rounded-xl shadow-sm transition-all duration-300': {},
        },
        '.region-badge': {
          '@apply bg-neo-violet/20 dark:bg-neo-violet/30 text-neo-violet dark:text-white text-xs font-medium px-2.5 py-1 rounded-full': {},
        },
        '.card-3d': {
          perspective: '1000px',
        },
        '.card-3d-content': {
          '@apply transition-all duration-300': {},
          transform: 'translateZ(0px)',
          transformStyle: 'preserve-3d',
        },
        '.neo-spinner': {
          '@apply w-8 h-8 border-4 border-neo-gray-300 dark:border-neo-gray-700 border-t-neo-violet rounded-full animate-spin': {},
        },
        '.neo-gradient-text': {
          '@apply text-transparent bg-clip-text bg-gradient-to-r from-neo-violet to-neo-blue': {},
        },
      };

      addUtilities(newUtilities);
      addComponents(newComponents);
    },
  ],
};
