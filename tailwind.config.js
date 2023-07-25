/** @type {import('tailwindcss').Config} */
export const content = ["./*.{html,js}"];
export const darkMode = "class";
export const theme = {
  extend: {
    colors: {
      main: "hsl(220, 98%, 61%)",
      gradientM: "linear-gradient(135deg ,hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      light: {
        bg: "hsl(236, 33%, 92%)",
        card: "hsl(0, 0%, 98%)",
        t: {
          100: "hsl(235, 19%, 35%)",
          500: "hsl(236, 9%, 61%)",
          900: "hsl(233, 11%, 84%)",
        },
      },
      dark: {
        bg: "hsl(235, 21%, 11%)",
        card: "hsl(235, 24%, 19%)",
        text: {
          n: "hsl(234, 39%, 85%)",
          h: "hsl(236, 33%, 92%)",
        },
        t: {
          100: "hsl(237, 14%, 26%)",
          500: "hsl(233, 14%, 35%)",
          900: "hsl(234, 11%, 52%)",
        },
      },
    },
  },
};
export const plugins = [];
