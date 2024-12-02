import Link from 'next/link'

type Props = React.ComponentProps<typeof Link>;

export default function NavLink({ children, className, ...props }: Props) {
  return (
    <Link
      className={`link text-sm ${className || ''}`}
      {...props}
    >
      {children}
    </Link>
  )
}
