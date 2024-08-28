import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import { Flex } from '@radix-ui/themes';

import { Sidebar } from './Sidebar/Sidebar';
import { CreateEvent } from '../CreateEvent/CreateEvent';
import { Header } from '../Header/Header';

import styles from "@/styles/Sidebar.module.css";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  darkMode: boolean;
  setThemeColor: Dispatch<SetStateAction<"light" | "dark">>;
}

export const Layout = ({ darkMode, setThemeColor }: LayoutProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loading = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loading);
  }, []);


  return (
    <main className={`${styles.main} ${inter.className}`}>
      <Flex gap="96px" className="layout">
        <Sidebar
          darkMode={darkMode}
          setThemeColor={setThemeColor}
          loading={loading}
        />
        <Flex width="calc(100% - 344px)" direction="column" overflow="auto" height="100vh">
          <Header darkMode={darkMode} />
          <CreateEvent darkMode={darkMode} loading={loading} />
        </Flex>
      </Flex>
    </main>
  );
};
