// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from 'react';
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

export const ACCESS_STATUS = {
  GRANTED: 1,
  FORBIDDEN: 0,
  EXPIRED: 2,
} as const;

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  login: (provider: AuthProviderType, email?: string) => Promise<void>;
  logout: () => Promise<void>;
  //Controle de acesso aos guias e ferramentas (são armazenados no custom claims com o nome de books)
  //O book tem este formato: {books: {0: '0250801'}, {1:'0250804'}, {5:'0250801'}} 
  // onde o "0", "1" e "5" identificam os guias e ferramentas que ele tem acesso 
  // e o string com os números representam a data de validade com um formato
  // especial em que o ano tem 3 digitos para economizar espaço no custom claims.
  books: Record<string, Date> | null;
  hasAccess: (bookId: string) => number;
  getExpiry: (bookId: string) => Date | null;
  getAllAccess: () => Record<string, Date> | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  books: null,
  hasAccess: () => ACCESS_STATUS.FORBIDDEN,
  getExpiry: () => null,
  getAllAccess: () => null,
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
  const [books, setBooks] = useState<Record<string, Date> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          // Processa os books dos custom claims
          const userBooks = idTokenResult.claims.books;
          if (userBooks && Object.keys(userBooks).length > 0) {
            // Convert string values to Date objects
            const convertedBooks: Record<string, Date> = {};
            Object.entries(userBooks).forEach(([bookId, dateString]) => {
              if (typeof dateString === 'string' && dateString.length === 7) {
                // Add "2" prefix to make year 4 digits: '0250801' -> '20250801'
                const fullDateString = '2' + dateString;
                // Parse: year (4 chars), month (2 chars), day (2 chars)
                const year = parseInt(fullDateString.substring(0, 4), 10);
                const month = parseInt(fullDateString.substring(4, 6), 10) - 1; // Month is 0-indexed
                const day = parseInt(fullDateString.substring(6, 8), 10);
                convertedBooks[bookId] = new Date(year, month, day);
              }
            });
            setBooks(convertedBooks);
          } else {
            setBooks(null);
          }
        }
        catch (error) {
          console.error('Error fetching user claims:', error);
          setBooks(null);
        }
      } else {
        setBooks(null);
      }       
    });
    return () => unsubscribe();
  }, []);

  // Funções para consultar books
  const hasAccess = useCallback((bookId: string): number => {
    if (!books || !books[bookId]) {
      return ACCESS_STATUS.FORBIDDEN;
    }

    /* AINDA NÃO ESTÁ CONSIDERANDO O CASO DE EXPIRAÇÃO
    // Create a new Date object to avoid mutating the state
    const expiryDate = new Date(books[bookId]);
    expiryDate.setHours(23, 59, 59, 999); // Check against the end of the expiry day

    if (expiryDate < new Date()) {
      return ACCESS_STATUS.EXPIRED;
    }
    */
    return ACCESS_STATUS.GRANTED;
  }, [books]);

  const getExpiry = useCallback((bookId: string): Date | null => {
    return books && books[bookId] ? books[bookId] : null;
  }, [books]);

  const getAllAccess = useCallback((): Record<string, Date> | null => {
    return books;
  }, [books]);

  const login = useCallback(async (provider: AuthProviderType, email?: string) => {
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
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    router.push('/');
  }, [router]);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    books,
    hasAccess,
    getExpiry,
    getAllAccess
  }), [user, loading, login, logout, books, hasAccess, getExpiry, getAllAccess]);

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