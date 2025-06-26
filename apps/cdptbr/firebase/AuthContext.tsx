// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,       // Para Microsoft
  sendSignInLinkToEmail,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from './config'; // Nossa configuração centralizada
import { useRouter } from 'next/navigation'; // Importação correta para App Router
import { showNotification } from '@mantine/notifications';
import {pathWithBase} from '../lib/pathWithBase'; // Importa a função para lidar com o caminho base


// Tipos
type AuthProviderType = 'Google' | 'Microsoft' | 'Email';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  login: (provider: AuthProviderType, email?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

// Create Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
);

export const useAuth = () => useContext(AuthContext);

// Componente Provedor
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (provider: AuthProviderType, email?: string) => {
    try {
      let authProvider;
      switch (provider) {
        case 'Google':
          authProvider = new GoogleAuthProvider();
          await signInWithPopup(auth, authProvider);
          break;
        case 'Microsoft':
          authProvider = new OAuthProvider('microsoft.com');
          await signInWithPopup(auth, authProvider);
          break;
        case 'Email':
          if (!email) throw new Error('Email é obrigatório para este login.');
          //console.log(`${window.location.origin}${pathWithBase("/loginlink")}`);
          const actionCodeSettings = {
            url: `${window.location.origin}${pathWithBase("/loginlink")}`, // Redireciona para o dashboard após login
            handleCodeInApp: true,
          };
          //console.log('chamando sendSignInLinkToEmail com email:', email);
          await sendSignInLinkToEmail(auth, email, actionCodeSettings);
          window.localStorage.setItem('emailForSignIn', email);
          console.log('localStorage.setItem');
          showNotification({
            title: 'Link de login enviado',
            message: `Um link de login foi enviado para ${email}. Verifique sua caixa de entrada.`,
            color: 'green',
            autoClose: 20000,
            position: 'top-right',  
          });
          break;
        default:
          throw new Error('Provedor não suportado');
      }
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        switch (error.code) {
          case 'auth/network-request-failed':
            showNotification({
              title: 'Problema de conexão',
              message: 'Por favor, verifique sua internet e tente novamente.',
              color: 'red',
              autoClose: 10000,
              position: 'top-right',  
            });
            break;
          case 'auth/admin-restricted-operation':
            showNotification({
              title: 'Acesso restrito',
              message: `Nenhuma licença do CRIATIVIDADE.digital foi encontrada para o e-mail ${email}.`,
              color: 'red',
              autoClose: 10000,
              position: 'top-right',  
            });
            break;
          case 'auth/invalid-email':
            showNotification({
              title: 'Digite um e-mail válido',
              message: `${email} não é um e-mail válido.`,
              color: 'red',
              autoClose: 10000,
              position: 'top-right',  
            });
            break;
          case 'auth/popup-blocked':
            showNotification({
              title: 'Janela de login bloqueada',
              message: 'O navegador bloqueou a janela de login. Por favor, ajuste as configurações do navegador para permitir a abertura de janelas pop-up para fazer o login.',
              color: 'red',
              autoClose: 10000,
              position: 'top-right',  
            });
            break;
          default:
            console.error(error.message);
        }
      } else {
        console.error('An unknown error occurred during login');
      }
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingSpinner />  : children}
    </AuthContext.Provider>
  );
};

// ATENÇÃO: Configuração da Apple
// Para o login da Apple funcionar, você precisa:
// 1. Habilitar o provedor Apple no seu Console do Firebase.
// 2. Configurar um "Services ID" no seu portal de desenvolvedor da Apple.
// 3. Adicionar o domínio de autenticação do Firebase (`seu-projeto.firebaseapp.com`) como um domínio autorizado nesse Services ID.
// É o provedor mais complexo de configurar.