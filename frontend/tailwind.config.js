/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#172033",
        mist: "#f5f7fb",
        ocean: "#2563eb",
        mint: "#0f9f7a",
        amberline: "#b7791f"
      }
    }
  },
  plugins: []
};
