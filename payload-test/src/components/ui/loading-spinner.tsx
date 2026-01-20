import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-12",
      },
      variant: {
        default: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
  label?: string
}

const LoadingSpinner = React.forwardRef<SVGSVGElement, LoadingSpinnerProps>(
  ({ size, variant, className, label = "Loading" }, ref) => {
    return (
      <Loader2
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), className)}
        aria-label={label}
        role="status"
      />
    )
  }
)

LoadingSpinner.displayName = "LoadingSpinner"

export { LoadingSpinner, spinnerVariants }
