import { HTMLProps } from 'react';

type Props = HTMLProps<HTMLAnchorElement>;

export default function Link({ children, className, ...props }: Props) {
  return (
    <a
      className={`link text-sm ${className || ''}`}
      {...props}
    >
      {children}
    </a>
  )
}
