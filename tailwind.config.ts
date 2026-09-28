import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        civic: {
          50: '#f0f4f8', 100: '#d9e2ec', 200: '#bcccdc', 300: '#9fb3c8',
          400: '#829ab1', 500: '#627d98', 600: '#486581', 700: '#334e68',
          800: '#243b53', 900: '#102a43', 950: '#0b1d30',
        },
        navy: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
          400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
          800: '#1e293b', 900: '#0f172a', 950: '#020617',
        },
        saffron: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#9a3412', 900: '#7c2d12',
        },
        indiaGreen: {
          50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
          400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
          800: '#166534', 900: '#14532d',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.04), 0 0 0 1px rgba(15,23,42,0.04)',
        'premium-hover': '0 20px 40px -10px rgba(15,23,42,0.12), 0 8px 16px -6px rgba(15,23,42,0.08)',
        'civic-card': '0 1px 3px 0 rgba(15,23,42,0.06), 0 1px 2px -1px rgba(15,23,42,0.04)',
        'civic-card-hover': '0 10px 25px -5px rgba(15,23,42,0.08), 0 8px 10px -6px rgba(15,23,42,0.04)',
        'civic-glow': '0 0 20px -5px rgba(30,58,138,0.15)',
        'blue-glow': '0 0 30px -5px rgba(37,99,235,0.3)',
        'teal-glow': '0 0 30px -5px rgba(13,148,136,0.25)',
        'globe': '0 0 50px 10px rgba(37,99,235,0.3), inset 0 0 30px rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(ellipse at 60% 50%, rgba(219,234,254,0.6) 0%, rgba(209,250,229,0.3) 40%, transparent 70%)',
        'blue-teal-gradient': 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'spin-slow-reverse': 'spin 18s linear infinite reverse',
        'float-1': 'float-1 6s ease-in-out infinite',
        'float-2': 'float-2 8s ease-in-out infinite',
        'float-3': 'float-3 7s ease-in-out 1s infinite',
        'globe-glow': 'globe-glow 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        'float-1': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translateY(-4px)' },
          '50%': { transform: 'translateY(4px)' },
        },
        'globe-glow': {
          '0%, 100%': { boxShadow: '0 0 40px 10px rgba(37,99,235,0.25)' },
          '50%': { boxShadow: '0 0 60px 20px rgba(37,99,235,0.4)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '0.3' },
          '100%': { transform: 'scale(0.95)', opacity: '0.7' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
