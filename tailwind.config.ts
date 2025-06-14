import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        layout: {
          bgColor: "white",
          mainColor: "rgb(61, 63, 67)",
        },
        customBlack: "rgb(75, 85, 99)",
        customBlue: "rgb(2, 132, 199)",
      },
    },
  },
  plugins: [],
};
export default config;
