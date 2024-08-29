import React from 'react';
import Image from 'next/image';
import { Text } from '@radix-ui/themes';
import * as Toast from '@radix-ui/react-toast';
import { format } from 'date-fns'

import CloseIcon from '../../../../public/assets/close-icon.svg';
import AlertGif from '../../../../public/assets/alert-gif.gif';

import styles from "@/styles/CreateEvent.module.css";

interface SuccessAlertDialogProps {
  open: boolean;
  darkMode: boolean;
  isGifShow: boolean;
  handleEdit: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SuccessAlertDialog = ({ open, darkMode, isGifShow, setOpen, handleEdit }: SuccessAlertDialogProps) => (
  <>
    <Toast.Root className={`${styles.Root} ${darkMode ? styles.rootDarkBg : styles.rootLightBg}`} open={open} onOpenChange={setOpen}>
      <Toast.Description asChild>
        <>
          <Text size="3" weight="medium">
            Event created on {format(new Date(), 'MMMM d, yyyy')}!
          </Text>
          {isGifShow && <Image src={AlertGif} alt="gif" className={styles.gif} width={260} height={260} />}
        </>
      </Toast.Description>
      <Toast.Action className={styles.Action} altText="Edit" onClick={handleEdit}>
        <Text size="3" weight="medium">
          Edit event
        </Text>
      </Toast.Action>
      <Toast.Action className={styles.CloseAction} onClick={() => setOpen(false)} altText="Close">
        <CloseIcon />
      </Toast.Action>
    </Toast.Root>
    <Toast.Viewport className={styles.Viewport} />
  </>
);
