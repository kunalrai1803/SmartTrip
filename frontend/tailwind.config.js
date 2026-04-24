/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        slateNight: "#081120",
        cyanGlow: "#4fd1ff",
        mintGlow: "#6ef7c8",
        roseGlow: "#ff7aa2",
      },
      boxShadow: {
        glass: "0 10px 40px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top left, rgba(79, 209, 255, 0.16), transparent 35%), radial-gradient(circle at top right, rgba(255, 122, 162, 0.18), transparent 30%), linear-gradient(135deg, #040815 0%, #081120 35%, #0d1d31 100%)",
      },
    },
  },
  plugins: [],
};

