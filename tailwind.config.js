module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        "theme-green": {
          300: "#43BC89",
          200: "#78EDAA",
        },
        "theme-blue": {
          200: "#80A3AF",
          500: "#4B9FBE",
        },
        "theme-orange": {
          500: "#E55A29",
        },
        "theme-red": {
          800: "#A90A0A",
        },
        slate: {
          70090: "rgba(51, 65, 85, 0.9)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
