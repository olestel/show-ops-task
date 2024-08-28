import Head from "next/head";
import { Dispatch, SetStateAction } from "react";

import { Layout } from "@/components/Layout/Layout";

interface HomeProps {
  themeColor: "light" | "dark",
  setThemeColor: Dispatch<SetStateAction<"light" | "dark">>;
}

export default function Home({ themeColor, setThemeColor }: HomeProps) {
  return (
    <>
      <Head>
        <title>ShowOps Task</title>
        <meta name="description" content="ShowOps Task" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout darkMode={themeColor === 'dark'} setThemeColor={setThemeColor} />
    </>
  );
}
