"use client";

import { useTheme } from "./context/ThemeContext";

export default function ThemedBody({ children }) {
  const { theme } = useTheme();
  return <body className={theme}>{children}</body>;
}
