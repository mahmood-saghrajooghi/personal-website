'use client';

import { useLayoutEffect, useId } from 'react';
import { useBlurAnimationContext } from './context';
import { Primitive } from '@radix-ui/react-primitive';

type BlurInProps = React.ComponentProps<typeof Primitive.div>;

export default function BlurIn({ children, ...props }: BlurInProps) {
  const id = useId();
  const { register, idIndexMap } = useBlurAnimationContext();

  useLayoutEffect(() => {
    register(id);
  }, [id]);

  return (
    <Primitive.div
      {...props}
      style={{ '--index': idIndexMap[id] } as React.CSSProperties}
      data-blur-in-animation
    >
      {children}
    </Primitive.div>
  );
}
