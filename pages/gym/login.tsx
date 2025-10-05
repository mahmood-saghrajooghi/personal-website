import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import AuthForm from '../../components/auth/AuthForm';
import { useGymData } from '../../utils/useGymData';

export default function GymLogin() {
  const router = useRouter();
  const { isAuthenticated, isLoaded } = useGymData();

  useEffect(() => {
    // Redirect to gym page if already authenticated
    if (isLoaded && isAuthenticated) {
      router.push('/gym');
    }
  }, [isAuthenticated, isLoaded, router]);

  // Show loading state
  if (!isLoaded) {
    return (
      <Layout>
        <div className='main-grid'>
          <article className='color-text'>
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            </div>
          </article>
        </div>
      </Layout>
    );
  }

  // Show auth form if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className='main-grid'>
          <article className='color-text'>
            <AuthForm onAuthSuccess={() => router.push('/gym')} />
          </article>
        </div>
      </Layout>
    );
  }

  // This shouldn't be reached due to the useEffect redirect
  return null;
}
