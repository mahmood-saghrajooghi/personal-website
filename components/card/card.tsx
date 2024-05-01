'use client'

import { useSpring, animated } from 'react-spring';
import styles from './card.module.scss';
import { ComponentProps, useLayoutEffect, useState } from 'react';

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export default function Card({ children, style }: CardProps) {
  const [visible, setVisible] = useState(false);
  const springStyle = useSpring({
    config: { tension: visible ? 400 : 1000, friction: 100, precision: visible ? 0.001 : 0.01 },
    from: { scale: 0.95, opacity: 0 },
    to: visible ? {
        opacity: 2,
        scale: 1,
      } : {
        opacity: 0,
        scale: 0.95,
      },
  });


  useLayoutEffect(() => {
    setTimeout(() => {
      setVisible(true)

      setTimeout(() => setVisible(false), 10000);
    }, 15000);
  }, []);


  return (
    <animated.div className={`${styles.card}`} style={{ ...style, ...springStyle }}>
      {children}
    </animated.div>
  );
}
