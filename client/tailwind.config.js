/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // We define colors aligning to custom requirements
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          text: '#F8FAFC',
          secondary: '#94A3B8',
        },
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E5E7EB',
          text: '#111827',
        },
        brand: {
          primary: '#2563EB',
          success: '#22C55E',
          danger: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
