module.exports = {
  mode: "jit",
  content: [
    "./src/*.{vue, ts}",
    "./index.html",
    "./src/views/**/*.vue"
  ],
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
};