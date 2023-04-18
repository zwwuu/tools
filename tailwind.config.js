const { withAnimations } = require("animated-tailwindcss");

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = withAnimations({
  darkMode: "class",
  tailwindFunctions: ["clsx", "cva"],
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    container: ({ theme }) => ({
      padding: theme("spacing.4"),
      center: true,
    }),
    extend: {
      transitionProperty: {
        size: "height, width",
        border: "border-width",
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
      },
      colors: {
        input: {
          DEFAULT: "var(--input)",
          content: "var(--input-content)",
        },
        base: {
          100: "var(--base-100)",
          200: "var(--base-200)",
          300: "var(--base-300)",
          400: "var(--base-400)",
          content: "var(--base-content)",
          focus: "var(--base-focus)",
        },
        primary: {
          DEFAULT: "rgb(var(--primary-500) / <alpha-value>)",
          100: "rgb(var(--primary-100) / <alpha-value>)",
          200: "rgb(var(--primary-200) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          400: "rgb(var(--primary-400) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
          800: "rgb(var(--primary-800) / <alpha-value>)",
          900: "rgb(var(--primary-900) / <alpha-value>)",
        },
      },
      borderColor: {
        DEFAULT: colors.black,
      },
      boxShadowColor: {
        DEFAULT: colors.black,
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        dots: "repeating-radial-gradient(var(--bg-dots), var(--bg-dots) 1px, var(--base-100) 1px, var(--base-100) 100%)",
      },
      boxShadow: {
        DEFAULT: `4px 4px var(--tw-shadow-color, ${colors.black})`,
        center: `0 0 0 2px var(--tw-shadow-color,  ${colors.black})`,
        sm: `2px 2px var(--tw-shadow-color, ${colors.black})`,
        md: `4px 4px var(--tw-shadow-color, ${colors.black})`,
        lg: `6px 6px var(--tw-shadow-color, ${colors.black})`,
        xl: `8px 8px var(--tw-shadow-color, ${colors.black})`,
      },
      keyframes: {
        "accordion-open": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-close": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-open": "accordion-open 0.2s ease-out",
        "accordion-close": "accordion-close 0.2s ease-out",
      },
      borderWidth: {
        DEFAULT: "2px",
        sm: "2px",
        md: "4px",
        lg: "6px",
      },
      dropShadow: {
        visible: "0 1px 3px rgb(0 0 0 / 0.5)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "base",
    }),
    require("tailwindcss-fluid-type")({
      settings: {
        fontSizeMin: 1,
        fontSizeMax: 1.125,
        ratioMin: 1,
        ratioMax: 1.2,
      },
    }),
  ],
});
