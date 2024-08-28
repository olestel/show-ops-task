import React, { useState } from 'react';
import { Box, Flex } from '@radix-ui/themes';

import Dashboard from '../../../../../public/assets/dashboard.svg';
import Calendar from '../../../../../public/assets/calendar.svg';
import Events from '../../../../../public/assets/events.svg';
import Offers from '../../../../../public/assets/offers.svg';
import Settings from '../../../../../public/assets/settings.svg';

import styles from "@/styles/Sidebar.module.css";

interface MenuProps {
  darkMode: boolean;
}

const menuItems = [
  {
    name: "Dashboard",
    icon: <Dashboard />
  },
  {
    name: "Calendar",
    icon: <Calendar />
  },
  {
    name: "Events",
    icon: <Events />
  },
  {
    name: "Offers & Deals",
    icon: <Offers />
  },
  {
    name: "Settings",
    icon: <Settings />
  }
];

export const Menu = ({ darkMode }: MenuProps) => {
  const [activeItem, setActiveItem] = useState<string>('Dashboard');
  const handleMenuItemChange = (itemName: string) => setActiveItem(itemName);

  return (
    <Flex gap="0" direction="column">
      {menuItems.map(el => (
        <Flex
          key={el.name}
          align="center"
          gap="16px"
          p="12px 16px"
          onClick={handleMenuItemChange.bind(null, el.name)}
          className={`${styles.pointer} ${darkMode ? styles.menuItem : styles.menuItemLight} ${activeItem === el.name && darkMode ? styles.activeItem : ''} ${activeItem === el.name && !darkMode ? styles.lightActiveItem : ''}`}
        >
          <Box width="16px">
            {el.icon}
          </Box>
          {el.name}
        </Flex>
      ))}
    </Flex>
  );
};
