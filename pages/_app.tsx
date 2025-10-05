import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }));

  useEffect(() => {
    const routeChangeCompleteHandler = (route: string) => {
      const url = new URL(route, window.location.href);
      if(!url.hash) return;
      window.location.hash = `${url.hash}-${Math.random().toString(36).slice(2)}`;
      queueMicrotask(() => {
        window.location.hash = url.hash;
      });
    };
    router.events.on('routeChangeComplete', routeChangeCompleteHandler);

    return () => router.events.off('routeChangeComplete', routeChangeCompleteHandler);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
