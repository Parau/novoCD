import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { ColorSchemeScript, mantineHtmlProps, Container } from '@mantine/core';
import { Providers } from './providers';


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
        <Providers>
            <Container p="md" pt={0}>
              {children}
            </Container>
        </Providers>
        <GoogleTagManager gtmId="GTM-WQG5CDQL" />
      </body>
    </html>
  );
}
