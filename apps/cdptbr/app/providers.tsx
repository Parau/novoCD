"use client"; // ESSENCIAL: Marca este componente como um Componente de Cliente.

import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
//import { AuthContextProvider } from '../firebase/AuthContext';
import { AuthContextProvider } from '@repo/firebase/AuthContext';
import { theme } from './theme';
import nextConfig from '../next.config.js';


export function Providers({ children }: { children: ReactNode }) {
  // A ordem dos provedores aqui é importante.
  // Como as notificações podem ser usadas em qualquer lugar,
  // é bom que o MantineProvider envolva os outros.
  // E o AuthContext pode ser necessário em vários lugares.
  return (
    <MantineProvider theme={theme}>
        <Notifications />
        <AuthContextProvider basePath={nextConfig.basePath}>
            {children}
        </AuthContextProvider>
    </MantineProvider>
  );
}