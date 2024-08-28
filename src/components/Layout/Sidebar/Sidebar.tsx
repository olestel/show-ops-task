import { Flex } from '@radix-ui/themes';
import React, { Dispatch, SetStateAction } from 'react';

import Logo from '../../../../public/assets/logo.svg';
import { Menu } from './Menu/Menu';
import { Footer } from './Footer/Footer';
import { TodaysEvents } from './TodaysEvents/TodaysEvents';

import styles from "@/styles/Sidebar.module.css";

interface SidebarProps {
  darkMode: boolean;
  loading: boolean;
  setThemeColor: Dispatch<SetStateAction<"light" | "dark">>
}

export const Sidebar = ({ darkMode, setThemeColor, loading }: SidebarProps) => (
  <Flex width="250px" p="16px 14px 32px 24px" direction="column" gap="32px" maxHeight="982px">
    <Logo className={`${styles.logo} ${darkMode ? '' : styles.darkLogo}`}/>
    <Menu darkMode={darkMode} />
    <TodaysEvents darkMode={darkMode} loading={loading} />
    <Footer darkMode={darkMode} setThemeColor={setThemeColor} />
  </Flex>
);
