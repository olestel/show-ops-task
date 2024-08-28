import React from 'react';
import { Box, Button, Flex, Text, TextArea, TextField} from '@radix-ui/themes';

import { CreateEventLoadingState } from './CreateEventLoadingState/CreateEventLoadingState';
import Link from '../../../public/assets/link.svg';

import styles from "@/styles/CreateEvent.module.css";

interface CreateEventProps {
  darkMode: boolean;
  loading: boolean;
}

export const CreateEvent = ({ darkMode, loading }: CreateEventProps) => (
  <Flex maxWidth="570px" pt='64px' pb="96px" gap="64px" direction="column">
    {loading ? <CreateEventLoadingState /> : (
      <>
        <Flex gap="16px" direction="column">
          <Text size="6" weight="medium">
            Create an event
          </Text>
          <Text size="2" weight="light" className={darkMode ? styles.subTitle : styles.lightSubTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          </Text>
        </Flex>

        <Flex gap="8px" direction="column">
          <Text size="3" weight="medium">
            Event name
          </Text>
          <TextField.Root
            placeholder="Your event name"
            size="3"
            className={darkMode ? styles.textField : styles.lightTextField}
          />
        </Flex>

        <Flex gap="8px" direction="column">
          <Text size="3" weight="medium">
            Date & time
          </Text>
          {/* <TextArea size="3" placeholder="Add event description..." /> */}
        </Flex>

        <Flex gap="8px" direction="column">
          <Text size="3" weight="medium">
            Description
          </Text>
          <TextArea
            size="3"
            placeholder="Add event description..."
            className={darkMode ? styles.textField : styles.lightTextField}
          />
        </Flex>

        <Flex gap="16px" direction="column">
          <Flex gap="8px" direction="column">
            <Text size="3" weight="medium">
              Video
            </Text>
            <TextField.Root
              placeholder="Add video link..."
              size="3"
              className={darkMode ? styles.textField : styles.lightTextField}
            >
              <TextField.Slot>
                <Link />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex gap="8px" direction="column">
            <Text size="3" weight="medium">
              Banner image
            </Text>
            {/* <TextField.Root placeholder="Add video link..." size="3">
              <TextField.Slot>
              <Link />
              </TextField.Slot>
              </TextField.Root> */}
          </Flex>
        </Flex>

        <Flex gap="8px">
          <Button size="3" variant="soft" className={darkMode ? styles.createBtn : styles.lightCreateBtn}>
            Create event
          </Button>
          <Button size="3" variant="soft" className={darkMode ? styles.cancelBtn : styles.lightCancelBtn}>
            Cancel
          </Button>
        </Flex>
      </>
    )}
  </Flex>
);
