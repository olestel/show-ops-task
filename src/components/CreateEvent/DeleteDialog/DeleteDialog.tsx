import React from 'react';
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';

interface DeleteDialogProps {
  handleDeleteClick: () => void
}

export const DeleteDialog = ({ handleDeleteClick }: DeleteDialogProps) => (
  <AlertDialog.Content maxWidth="430px">
    <AlertDialog.Title>
      <Text size="5" weight="bold">
        Delete Event
      </Text>
      </AlertDialog.Title>
    <AlertDialog.Description>
      <Text size="2" weight="regular">
        You are about to permanently delete this event. This action can`t be undone.
      </Text>
    </AlertDialog.Description>

    <Flex gap="3" justify="end" mt="16px">
      <AlertDialog.Cancel>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button variant="soft" color="red" onClick={handleDeleteClick}>
          Delete
        </Button>
      </AlertDialog.Action>
    </Flex>
  </AlertDialog.Content>
);
