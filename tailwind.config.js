module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ["'Patrick Hand', cursive"],
      },
      backgroundImage: {
        paper: "url('/public/paper-texture.jpg')", // Latar dengan tekstur kertas
      },
      colors: {
        brown: {
          500: "#8B4513", // Warna coklat terang (hover)
          600: "#5D2E00", // Warna coklat gelap (utama)
        },
      },
    },
  },
  plugins: [],
};
