import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "success" | "warning" | "error"
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    value, 
    max = 100, 
    label, 
    showPercentage = false, 
    size = "md", 
    variant = "default",
    className,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizeClasses = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    }

    const variantClasses = {
      default: "bg-primary",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      error: "bg-destructive",
    }

    return (
      <div className={cn("w-full", className)} ref={ref} {...props}>
        {(label || showPercentage) && (
          <div className="flex justify-between items-center mb-2">
            {label && <span className="text-sm text-muted-foreground">{label}</span>}
            {showPercentage && (
              <span className="text-sm font-medium">{Math.round(percentage)}%</span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "w-full bg-muted rounded-full overflow-hidden",
            sizeClasses[size]
          )}
        >
          <div
            data-indicator
            className={cn(
              "h-full transition-all duration-300 ease-in-out",
              variantClasses[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
