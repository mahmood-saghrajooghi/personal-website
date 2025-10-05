import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        default: "bg-[var(--sand-12)] text-[var(--sand-2)] hover:bg-[var(--sand-11)] focus-visible:ring-[var(--sand-8)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/30",
        outline:
          "border border-[var(--sand-6)] bg-[var(--sand-2)] text-[var(--sand-12)] hover:bg-[var(--sand-3)] hover:border-[var(--sand-7)] focus-visible:ring-[var(--sand-8)]",
        secondary:
          "bg-[var(--sand-4)] text-[var(--sand-12)] hover:bg-[var(--sand-5)] focus-visible:ring-[var(--sand-8)]",
        ghost:
          "text-[var(--sand-12)] hover:bg-[var(--sand-4)] hover:text-[var(--sand-12)] focus-visible:ring-[var(--sand-8)]",
        link: "text-[var(--sand-12)] underline-offset-4 hover:underline hover:text-[var(--sand-11)]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type buttonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, buttonProps>(({
  className,
  variant,
  size,
  asChild = false,
  ...props
} , ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})  

export { Button, buttonVariants }
