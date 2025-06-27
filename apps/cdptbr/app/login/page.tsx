"use client";
import { useRouter } from 'next/navigation';
import { useAuth  } from '../../firebase/AuthContext';
import { AuthenticationForm } from '../../components/AuthenticationForm/AuthenticationForm';  

export default function LoginPage()  {
  const router = useRouter();
  const { login, user } = useAuth();

  const handleLogin = async (type: 'Google' | 'Microsoft' | 'Email', email?: string) => {
    try {
      console.log(`Função handleLogin acionada para ${type}`);
      if (type === 'Email' && email) {
        await login(type, email);
      } else {
        await login(type);
        router.push('/');
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
