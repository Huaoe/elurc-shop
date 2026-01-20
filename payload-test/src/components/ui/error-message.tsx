import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, AlertTriangle, Info, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const errorMessageVariants = cva(
  "flex items-start gap-3 rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        error: "border-destructive/50 bg-destructive/10 text-destructive",
        warning: "border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
        info: "border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-400",
        network: "border-orange-500/50 bg-orange-500/10 text-orange-700 dark:text-orange-400",
      },
    },
    defaultVariants: {
      variant: "error",
    },
  }
)

const iconMap = {
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  network: AlertCircle,
}

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorMessageVariants> {
  title?: string
  message: string
  action?: React.ReactNode
  onDismiss?: () => void
}

const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ className, variant = "error", title, message, action, onDismiss, ...props }, ref) => {
    const Icon = iconMap[variant || "error"]

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(errorMessageVariants({ variant }), className)}
        {...props}
      >
        <Icon className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 space-y-1">
          {title && (
            <h3 className="font-semibold leading-none tracking-tight">
              {title}
            </h3>
          )}
          <p className="leading-relaxed">{message}</p>
          {action && <div className="mt-3">{action}</div>}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <XCircle className="size-4" />
          </button>
        )}
      </div>
    )
  }
)
ErrorMessage.displayName = "ErrorMessage"

export { ErrorMessage, errorMessageVariants }
