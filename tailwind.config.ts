import type { Config } from "tailwindcss";

const createPxMap = (size: number): Record<string, string> => {
  return Array.from({ length: size + 1 }, (_, i) => `${i}px`).reduce(
    (acc, val, i) => {
      acc[i] = val;
      return acc;
    },
    {} as Record<string, string>,
  );
};

const px0_10 = createPxMap(10);
const px0_100 = createPxMap(100);
const px0_500 = createPxMap(500);

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: px0_10,
      borderRadius: px0_100,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_500,
      minHeight: px0_500,
      spacing: px0_500,
      keyframes: {
        buttonHover: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-10px)",
          },
        },
        floatingEmoji: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-60px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        buttonHover: "buttonHover 0.3s ease forwards",
        emojiFloating: "floatingEmoji 3s ease-in-out infinite;",
      },
      colors: {
        white: "#ffffff",
        blue: "#3692ff",
        "blue-hover": "#1967D6",
        "blue-active": "#1251AA",
        red: "#f74747",
        "gray-50": "#f7f7f8",
        "gray-100": "#e8ebed",
        "gray-200": "#e5e7eb",
        "gray-400": "#9ea4a8",
        "gray-500": "#72787f",
        "gray-600": "#454c53",
        "gray-800": "#26282b",
        "gray-900": "#1b1d1f",
        "cool-gray-50": "#F9FAFB",
        "cool-gray-100": "#f3f4f6",
        "cool-gray-200": "#E5E7EB",
        "cool-gray-400": "#9ca3af",
        "cool-gray-500": "#6b7280",
        "cool-gray-600": "#4b5563",
        "cool-gray-800": "#1f2937",
        disable: "#9CA3AF",
        error: "#f74747",
      },
      fontFamily: {
        pretendard: ["Pretendard"],
      },
      gridTemplateAreas: {
        footer: ["menus socials", "copyright copyright"],
        postInfo: ["writer favorites createdAt"],
      },
      gridTemplateColumns: {
        postInfo: "auto auto 1fr",
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
export default config;
