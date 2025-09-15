import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
  return  <Component {...pageProps} />;
}
