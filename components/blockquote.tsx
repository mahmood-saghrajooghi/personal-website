'use client';
import { forwardRef } from 'react';

export const Blockquote = forwardRef<HTMLQuoteElement, { children: React.ReactNode, className?: string }>(({ children, className }, ref) => {
  return (
    <blockquote ref={ref} className={`px-4 border-l-2 border-neutral-500 color-sub ${className}`}>
      {children}
    </blockquote>
  );
});
