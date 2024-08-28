import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Theme } from "@radix-ui/themes";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [themeColor, setThemeColor] = useState<'light' | 'dark'>('dark');

  return (
    <>
      <Head>
        <title>ShowOps Task</title>
        <meta name="description" content="ShowOps Task" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Theme appearance={themeColor}>
        <main className={`${styles.main} ${inter.className}`}>
          ShowOps test
        </main>
      </Theme>
    </>
  );
}
