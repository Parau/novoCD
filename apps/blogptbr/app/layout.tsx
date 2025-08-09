import '@mantine/core/styles.css';
import './globals.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

export const metadata = {
  title: 'Blog PT-BR',
  description: 'Um blog em português',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
