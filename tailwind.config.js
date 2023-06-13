module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    screens: {
      phone: { min: "240px", max: "810px" },
      laptop: { min: "811px" },
    },
    extend: {
      fontFamily: {
        mono: ["mono", "serif"],
      },
      spacing: {
        "1/12": "8.333333%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
