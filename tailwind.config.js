/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundSize: {
        "40%": "40%",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
    container: false,
  },
};
