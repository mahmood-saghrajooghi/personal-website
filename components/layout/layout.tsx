import { BlurAnimationProvider } from '../blur-animation/context';
import { Footer } from './footer';

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <BlurAnimationProvider>
      <main>
        {children}
      </main>
      <Footer />
    </BlurAnimationProvider>
  );
}
