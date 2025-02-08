module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a202c", // Default primary color (dark blue-gray)
        orange: "#FF5733",
        green: "#33FF57",
        blue: "#3357FF",
        pink: "#FF33A1",
        yellow: "#F3FF33",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(primary|orange|green|blue|pink|yellow)/, // Safelist dynamic classes
    },
  ],
};
