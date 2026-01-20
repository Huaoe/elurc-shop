"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

interface LoadingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  animated?: boolean
  size?: "sm" | "md" | "lg"
  showSpinner?: boolean
}

const LoadingText = React.forwardRef<HTMLDivElement, LoadingTextProps>(
  ({ 
    text = "Loading", 
    animated = true, 
    size = "md", 
    showSpinner = false,
    className,
    ...props 
  }, ref) => {
    const [dots, setDots] = React.useState("")

    React.useEffect(() => {
      if (!animated) return

      const interval = setInterval(() => {
        setDots((prev) => {
          if (prev === "...") return ""
          return prev + "."
        })
      }, 500)

      return () => clearInterval(interval)
    }, [animated])

    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    }

    const displayText = animated ? `${text}${dots}` : text

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        data-loading-text
        className={cn(
          "flex items-center gap-2 text-muted-foreground",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showSpinner && <Spinner size={size === "lg" ? "md" : "sm"} />}
        <span>{displayText}</span>
      </div>
    )
  }
)

LoadingText.displayName = "LoadingText"

export { LoadingText }
