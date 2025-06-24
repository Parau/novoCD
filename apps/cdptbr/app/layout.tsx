import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider, Container } from '@mantine/core';
import { theme } from './theme';

export const metadata = {
  title: 'CRIATIVIDADE.digital',
  description: 'Tecnologias digitais que transformam criatividade em inovação.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="pt" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Container p="md">
            {children}
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
