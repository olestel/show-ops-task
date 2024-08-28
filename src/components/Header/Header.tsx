import React from 'react';
import { Box, Flex, IconButton, TextField } from '@radix-ui/themes';

import Search from '../../../public/assets/search.svg';
import ShiftTab from '../../../public/assets/shift-tab.svg';
import Notification from '../../../public/assets/notification.svg';
import User from '../../../public/assets/user.svg';

import styles from '@/styles/Sidebar.module.css';

interface HeaderProps {
  darkMode: boolean;
}

export const Header = ({ darkMode }: HeaderProps) => (
  <Flex width="100%" py='24px' pr="32px" justify="between">
    {/* Search bar */}
    <Box width="393px">
      <TextField.Root placeholder="Search ShowOps" size="3">
        <TextField.Slot>
          <Search className={!darkMode ? styles.searchLight : ''} />
        </TextField.Slot>
        <TextField.Slot pr="3">
          <IconButton size="2" variant="ghost">
            <ShiftTab className={!darkMode ? styles.shiftTabLight : ''} />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    </Box>
    
    {/* Notification btn and user */}
    <Flex gap="16px" >
      <Flex
        width="40px"
        height="40px"
        align="center"
        justify="center"
        className={`${styles.pointer} ${darkMode ? styles.headerNotification : styles.headerLightNotification}`}
      >
        <Notification />
      </Flex>
      <User className={styles.pointer} />
    </Flex>
  </Flex>
);
