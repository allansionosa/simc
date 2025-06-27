import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem', // 16px on mobile
        sm: '1.5rem', // 24px on small tablets
        md: '2rem', // 32px on tablets
        lg: '2.5rem', // 40px on laptops
        xl: '3rem', // 48px on desktops
      },
      screens: {
        sm: '640px', // Small tablets
        md: '768px', // Tablets
        lg: '1024px', // Laptops
        xl: '1280px', // Desktops
        '2xl': '1536px', // Large desktops
      },
    },
    screens: {
      xs: '375px', // Small phones
      sm: '640px', // Large phones/Small tablets
      md: '768px', // Tablets
      lg: '1024px', // Laptops
      xl: '1280px', // Desktops
      '2xl': '1536px', // Large desktops
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-yeseva)'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      spacing: {
        '4.5': '1.125rem', // 18px
        '5.5': '1.375rem', // 22px
        '6.5': '1.625rem', // 26px
        '7.5': '1.875rem', // 30px
      },
      maxWidth: {
        '8xl': '88rem', // 1408px
        '9xl': '96rem', // 1536px
      },
      minHeight: {
        'screen-75': '75vh',
        'screen-85': '85vh',
      },
    },
  },
  plugins: [],
};

export default config;
