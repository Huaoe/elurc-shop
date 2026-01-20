import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormErrorProps {
  message?: string
  className?: string
}

export const FormError = ({ message, className }: FormErrorProps) => {
  if (!message) return null

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-destructive mt-1",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}
