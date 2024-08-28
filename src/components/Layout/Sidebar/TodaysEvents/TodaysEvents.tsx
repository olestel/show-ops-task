import React from 'react';
import { Flex, Skeleton, Text } from '@radix-ui/themes';

import MenuItem1 from '../../../../../public/assets/menu-item1.svg';
import MenuItem2 from '../../../../../public/assets/menu-item2.svg';
import MenuItem3 from '../../../../../public/assets/menu-item3.svg';

import styles from "@/styles/Sidebar.module.css";

interface TodaysEventsProps {
  darkMode: boolean;
  loading: boolean;
}

const todaysEventsItems = [
  {
    title: "Tourist",
    name: "The Viper Room",
    icon: <MenuItem1 />
  },
  {
    title: "Jason Isbell",
    name: "The Wiltern",
    icon: <MenuItem2 />
  },
  {
    title: "Brenn!",
    name: "The Troubadour",
    icon: <MenuItem3 />
  }
];

export const TodaysEvents = ({ darkMode, loading }: TodaysEventsProps) => (
  <Flex gap="8px" direction="column">
    <Text size="2" weight="bold" className={`${styles.eventsTitle} ${darkMode ? '' : styles.lightEventsTitle}`}>Today`s Events</Text>
    {loading
      ? [...Array(3)].map((_i, index) => <Skeleton key={index} height="64px" width="100%" />)
      : todaysEventsItems.map(el => (
        <Flex
          key={el.name}
          align="center"
          gap="16px"
          p="12px 16px"
          className={`${styles.pointer} ${darkMode ? styles.eventsItem : styles.eventsItemLight}`}
        >
          {el.icon}
          <Flex direction="column">
            <Text size="2" weight="light" className={styles.eventsItemName}>{el.title}</Text>
            <Text size="3" weight="medium" className={styles.eventsItemName}>{el.name}</Text>
          </Flex>
        </Flex>
    ))}
  </Flex>
);
