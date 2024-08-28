import React, { Dispatch, SetStateAction } from 'react';
import { Flex, Switch, Text } from '@radix-ui/themes';

import styles from "@/styles/Sidebar.module.css";

interface FooterProps {
  darkMode: boolean;
  setThemeColor: Dispatch<SetStateAction<"light" | "dark">>;
}

export const Footer = ({ darkMode, setThemeColor }: FooterProps) => {
  const handleDarkModeChange = () => setThemeColor(darkMode ? 'light' : 'dark');

  return (
    <Flex gap="8px" direction="column" mt="auto">
      <Text as="label" size="2" weight="regular" className={styles.pointer}>
        <Flex gap="16px">
          <Switch
            size="1"
            variant="classic"
            color="gray"
            highContrast={false}
            checked={darkMode}
            onClick={handleDarkModeChange}
            className={styles.pointer}
          />
          Dark Mode
        </Flex>
      </Text>
      <Text size="2" weight="regular" className={darkMode ? styles.footerLinkDark : styles.footerLink}>
        Terms of Use
      </Text>
      <Text size="2" weight="regular" className={darkMode ? styles.footerLinkDark : styles.footerLink}>
        Privacy Policy
      </Text>
    </Flex>
  );
};
