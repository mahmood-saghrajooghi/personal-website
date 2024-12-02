import { useBlurAnimationContext } from '../blur-animation/context';

export function Footer() {
  const { currentIndexRef } = useBlurAnimationContext();

  return (
    <footer style={{ '--index': currentIndexRef.current } as React.CSSProperties} data-blur-in-animation>
      <div className='flex justify-between items-center text-sm h-full color-sub'>
        <div>Be the goat ツ</div>
      </div>
    </footer>
  );
};
