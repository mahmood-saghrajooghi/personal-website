import { createContext, useState, useContext, useRef } from 'react';

type BlurAnimationContextType = {
  register: (id: string) => void;
  idIndexMap: Record<string, number>;
  currentIndexRef: React.MutableRefObject<number>;
};

const BlurAnimationContext = createContext<BlurAnimationContextType | null>(null);

export function BlurAnimationProvider({ children }: { children: React.ReactNode }) {
  const currentIndexRef = useRef(0);
  const [idIndexMap, setIdIndexMap] = useState<Record<string, number>>({});

  function register(id: string) {
    const newIndex = currentIndexRef.current + 1;
    setIdIndexMap((prev) => ({ ...prev, [id]: newIndex }));
    currentIndexRef.current = newIndex;
  }

  return <BlurAnimationContext.Provider value={{ register, idIndexMap, currentIndexRef }}>{children}</BlurAnimationContext.Provider>;
}

export function useBlurAnimationContext() {
  const context = useContext(BlurAnimationContext);
  if (!context) {
    throw new Error('useBlurAnimationContext must be used within a BlurAnimationProvider');
  }
  return context;
}
