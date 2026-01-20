import * as React from "react"
import { Button, buttonVariants } from "./button"
import { LoadingSpinner } from "./loading-spinner"
import { cn } from "@/lib/utils"
import { type VariantProps } from "class-variance-authority"

interface LoadingButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  loadingText?: string
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ 
    children, 
    loading = false, 
    loadingText, 
    disabled, 
    className,
    variant,
    size,
    ...props 
  }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={cn(className)}
        variant={variant}
        size={size}
        {...props}
      >
        {loading && (
          <LoadingSpinner 
            size={size === "sm" ? "sm" : size === "lg" ? "md" : "sm"} 
            className="mr-2" 
          />
        )}
        {loading && loadingText ? loadingText : children}
      </Button>
    )
  }
)

LoadingButton.displayName = "LoadingButton"

export { LoadingButton }
