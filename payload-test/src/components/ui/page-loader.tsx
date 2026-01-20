"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { LoadingSpinner } from "./loading-spinner"

interface PageLoaderProps {
  className?: string
  message?: string
  fullScreen?: boolean
}

export const PageLoader = ({ 
  className, 
  message = "Loading page...", 
  fullScreen = false 
}: PageLoaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        fullScreen ? "min-h-screen" : "min-h-[400px]",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner size="lg" variant="primary" />
      {message && (
        <p className="text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  )
}
