import "@/styles/globals.css";
import '@radix-ui/themes/styles.css';

import { useState } from "react";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";

export default function App({ Component, pageProps }: AppProps) {
  const [themeColor, setThemeColor] = useState<'light' | 'dark'>('dark');

  return (
    <Theme appearance={themeColor}>
      <Component {...pageProps} themeColor={themeColor} setThemeColor={setThemeColor} />
    </Theme>
  );
}
