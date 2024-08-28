import React from 'react';
import { Flex, Skeleton } from '@radix-ui/themes';

export const CreateEventLoadingState = () => (
  <>
    <Flex gap="16px" direction="column">
      <Skeleton height="30px" width="181px" />
      <Skeleton height="40px" width="570px" />
    </Flex>

    <Skeleton height="72px" width="570px" />

    <Skeleton height="120px" width="570px" />

    <Skeleton height="112px" width="570px" />

    <Flex gap="16px" direction="column">
      <Skeleton height="72px" width="570px" />
      <Skeleton height="152px" width="570px" />
    </Flex>

    <Skeleton height="40px" width="224px" />
  </>
);
