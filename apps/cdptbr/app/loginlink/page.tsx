"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { showNotification } from '@mantine/notifications';
import { Center, Text, Loader } from '@mantine/core';
//import { auth  } from '../../firebase/config';
import { auth  } from '@repo/firebase/config';

export default function LoginLinkPage() {
  const router = useRouter();

  useEffect(() => {
    const email = window.localStorage.getItem('emailForSignIn');
    if (isSignInWithEmailLink(auth, window.location.href) && email) {
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          // Get stored redirect URL or fallback to home
          const redirectTo = window.localStorage.getItem('redirectAfterLogin') || '/';
          window.localStorage.removeItem('redirectAfterLogin');
          showNotification({
            title: 'Login bem-sucedido',
            message: 'Você foi autenticado com sucesso.',
            color: 'green',
            position: 'top-right',  
          });
          router.push(redirectTo);
        })
        .catch((error) => {
          console.error('Error signing in with email link', error);
          // Clean up stored redirect URL on error
          window.localStorage.removeItem('redirectAfterLogin');
          showNotification({
            title: 'Erro de login',
            message: 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.',
            color: 'red',
            autoClose: 20000,
            position: 'top-right',            
          });
          router.push('/login'); // Redireciona para o login
        });
    }
    else {
      // Clean up stored redirect URL on invalid link
      window.localStorage.removeItem('redirectAfterLogin');
      showNotification({
          title: 'Erro no login por email',
          message: 'Este link de login não é válido. Por favor, tente novamente.',
          color: 'red',
          autoClose: 20000,
          position: 'top-right',  
        });
      router.push('/login'); // Redireciona para o login
    }
  }, [router]);

  return (
    <Center style={{ height: '100vh' }}>
        <Loader />
        <Text ml="md">Verificando seu link de login...</Text>
    </Center>
  );
};

