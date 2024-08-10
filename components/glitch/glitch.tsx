import { forwardRef, useEffect, useRef, useState } from 'react';
import Cursor from './cursor';

type Props = {
  children: string;
}

const Glitch = forwardRef<HTMLSpanElement, Props>(function ({ children }, ref) {
  const [customCursorVisible, setCustomCursorVisible] = useState(false);

  const handleMouseEnter = () => {
    setCustomCursorVisible(true);
  }

  const handleMouseLeave = () => {
    setCustomCursorVisible(false);
  }

  return (
    <>
      <Cursor visible={customCursorVisible} />
      <span
        className={`glitch cursor-default inline-block${customCursorVisible ? ' !cursor-none' : ''}`}
        data-text={children}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
      >{children}</span>
    </>
  )
});
export default Glitch;
