"use client"; 

import { ThemeProvider as NewThemeProvider } from "styled-components";
import theme from "../styles/theme";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <NewThemeProvider theme={theme}>{children}</NewThemeProvider>;
}
