
import { useLayoutEffect, useState } from 'react';

import style from './cursor.module.scss';
import CursorIcon from './cursor-icon';

type Props = {
  visible: boolean;

}

export default function Cursor({ visible }: Props) {
  const [cursorCoordinates, setCursorCoordinates] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorCoordinates({ x: e.pageX, y: e.pageY });
    }
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  if(!visible) return null;

  return (
    <span className={style.container} style={{ left: cursorCoordinates.x, top: cursorCoordinates.y }}>
      <CursorIcon className={style.cursor} />
      <CursorIcon className={style.before} />
      <CursorIcon className={style.after} />
    </span>
  );
}
