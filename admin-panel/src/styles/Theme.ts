// src/styles/theme.ts
import type { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  mode: "light",
  background: "#eeeeee",
  text: "#1a1a1a",
  primary: "#111111",
  secondary: "#444444",
  accent: "#008aad",
  card: "#f7f7f7",
  border: "#d4d4d4",
  shadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
  hover: "#e2e2e2",
  muted: "#6b7280", // e.g. Tailwind gray-500
};

export const darkTheme: DefaultTheme = {
  mode: "dark",
  background: "#121212",
  text: "#f0f0f0",
  primary: "#ffffff",
  secondary: "#bbbbbb",
  accent: "#00c6b3",
  card: "#1c1c1c",
  border: "#333333",
  shadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
  hover: "#1f1f1f",
  muted: "#9aa0a6", // softer gray for dark
};
