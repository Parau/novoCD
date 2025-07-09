"use client";
import { useRouter, useSearchParams } from 'next/navigation';
//import { useAuth  } from '../../firebase/AuthContext';
import { useAuth  } from '@repo/firebase/AuthContext';
import { AuthenticationForm } from '../../components/AuthenticationForm/AuthenticationForm';  

export default function LoginPage()  {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const handleLogin = async (type: 'Google' | 'Microsoft' | 'Email', email?: string) => {
    try {
      console.log(`Função handleLogin acionada para ${type}`);
      if (type === 'Email' && email) {
        // Store redirect URL for email login
        const redirectTo = searchParams.get('redirect') || '/';
        window.localStorage.setItem('redirectAfterLogin', redirectTo);
        await login(type, email);
      } else {
        await login(type);
        // Redirect to the original page or home
        const redirectTo = searchParams.get('redirect') || '/';
        router.push(redirectTo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AuthenticationForm handleLogin={handleLogin} />
    </div>
  );
};
