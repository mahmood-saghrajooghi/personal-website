import styles from './glitch.module.scss'

type Props = {
  children: string;
  handleMouseEnter: React.MouseEventHandler<HTMLSpanElement>;
  handleMouseLeave: React.MouseEventHandler<HTMLSpanElement>;
  customCursorVisible: boolean;
}

function Glitch ({
  children,
  handleMouseEnter,
  handleMouseLeave,
  customCursorVisible
}: Props) {

  return (
    <span
      className={`${styles.glitch} cursor-default inline-block${customCursorVisible ? ' cursor-none!' : ''}`}
    >
      <span
        className={styles.glitchAnimation}
        data-text={children}
      >{children}</span>
      <span
        className={styles.glitchMain}
        aria-hidden="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >{children}</span>
    </span>
  )
};
export default Glitch;
