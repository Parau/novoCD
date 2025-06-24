'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  components: {
    Container: {
      defaultProps: {
        // Você pode escolher o tamanho que quiser:
        // 'xs', 'sm', 'md', 'lg', 'xl' ou um número em pixels, como 1440
        size: 'lg',
      },
    },
  },
});
