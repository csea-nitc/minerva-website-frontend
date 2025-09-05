/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#800080",
      },
      fontFamily: {
        sairaalt: ["Saira", "Sans"],
        verdana: ["Verdana", "sans-serif"],
        saira: ["Saira Semi Condensed", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
        Teko: ["Teko", "sans-serif"],
        teko: ["Teko", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        jakarta: ["Jakarta", "sans-serif"],
      },
      screens: {
        // Extra small devices
        sm: "640px", // Small devices
        xs: "480px",
        xs2: { max: "480px" },
        "sm-md": "704px", // Middle of small and medium
        md: "768px", // Medium devices
        "md-lg": "896px", // Middle of medium and large
        lg: "1024px", // Large devices
        "lg-xl": "1152px", // Middle of large and extra large
        xl: "1280px", // Extra large devices
        "xl-2xl": "1408px", // Middle of extra large and 2xl
        "2xl": "1536px", // Default 2xl
        "3xl": "1920px", // Custom large screen
        "max-920": { max: "920px" }, // Max-width screens
        "max-1060": { max: "1060px" },
        "max-800": { max: "800px" },
        "max-1240": { max: "1240px" },
        "max-400": { max: "400px" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
