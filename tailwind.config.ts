import type { Config } from 'tailwindcss';

/** Design tokens from the ActARion redesign (one system for site and ROI calculator). */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F4F7FA',
        ink: { DEFAULT: '#10253A', 2: '#17324D', 3: '#2C4560' },
        primary: { DEFAULT: '#166FA9', hover: '#125C8C', focus: '#1B81C4' },
        sky: '#A9DBF5',
        tint: '#E6F1F9',
        line: '#DCE4EB',
        muted: { DEFAULT: '#4A5D6E', light: '#B8CBDA', lighter: '#D7E3EC' },
        warn: { bg: '#FFF1D6', fg: '#6B4A00' },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: { card: '24px', panel: '32px' },
      maxWidth: { site: '1200px', prose: '720px' },
      boxShadow: { float: '0 18px 40px rgba(16,37,58,.16)' },
    },
  },
  plugins: [],
};
export default config;
