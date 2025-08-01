import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "40%": "40%",
        "45%": "45%",
        "75%": "75%",
        "50%": "50%",
        50: "50rem",
      },
      maxWidth: {
        'screen-xl': '73.13rem',
        'screen-2xl': '83.75rem',
      },
      height: {
        150: '750px',
        6.25: '6.25rem',
        49: '350px',
        47:'304px',
      },
      width:{
      
      },
      zIndex: {
        '1': '1',
        '999': '999'
      },
      colors: {
        primary: "#2F73F2", 
        danger :"#DC3545",
        danger_text: "#FF3C78",
        green:"#3CD278",
        grey: "#8E8E8E",
        muted: "#547593",
        midnight_text: "#102D47", 
        border: "#DFEBFC",
        darkmode: "#08162B",
        heroBg: "#F3F9FD",
        darkHeroBg: "#121C2E",
        darkheader: "#141D2F",
        dark_border: "#253C50",
        foottext: "#668199",
        search: "#163858" ,
        dark_b:"#1B2C44",
      },
      fontSize: {
        50: [
          "3.125rem",
          {
            lineHeight: "1.2",
          },
        ],
        48: [
          "3rem",
          {
            lineHeight: "1.2",
          }
        ],
        40: [
          "2.5rem",
          {
            lineHeight: "1.2",
          },
        ],
        28: [
          "1.75rem",
          {
            lineHeight: "1.2",
          }
        ],
        35: [
          "2.1875rem",
          {
            lineHeight: "1.2",
          }
        ],
        24: [
          "1.5rem",
          {
            lineHeight: "1.2",
          }
        ],
        25: [
          "1.5625rem",
          {
            lineHeight: "1.2",
          }
        ],
        22: [
          "1.375rem",
          {
            lineHeight: "1.2",
          },
        ],
        20: [
          "1.25rem",
          {
            lineHeight: "1.2",
          }
        ],
         19: [
          "1.1875rem",
          {
          lineHeight:  "1.8",
          }
        ],
        18: [
          "1.125rem",
          {
            lineHeight: "1.2",
          },
        ],
        16: [
          "1rem",
          {
            lineHeight: "1.2",
          }
        ],
        14: [
          "0.875rem",
          {
            lineHeight: "1.2",
          }
        ],
        13: [
          "0.8125rem",
          {
            lineHeight: "1.2",
          }
        ],
      
      },
      letterSpacing: {
        widest: '.2em',
      },
      backgroundImage: {
        footerBg: "url('/images/bg_images/footer-bg.png')",
      }
    },
  },
  plugins: [],
};
export default config;
