import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/gym?error=auth_failed');
          return;
        }

        if (data.session) {
          // Successful authentication
          router.push('/gym');
        } else {
          // No session found
          router.push('/gym?error=no_session');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/gym?error=auth_failed');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
