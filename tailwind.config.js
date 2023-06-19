module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        "theme-brown": {
          300: "#d36741",
        },
        "theme-purple": {
          300: "#4a3c64",
          200: "#584060",
          100: "#cbbcdf",
          50: "#E6E1EF"
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
