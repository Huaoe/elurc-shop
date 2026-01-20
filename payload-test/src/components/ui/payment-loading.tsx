"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { LoadingSpinner } from "./loading-spinner"
import { ProgressBar } from "./progress-bar"

interface PaymentLoadingProps {
  stage: "generating" | "polling" | "confirming" | "complete"
  message?: string
  estimatedTime?: number
  className?: string
}

const stageMessages = {
  generating: "Generating payment QR code...",
  polling: "Waiting for payment...",
  confirming: "Confirming transaction...",
  complete: "Payment confirmed!",
}

const stageProgress = {
  generating: 25,
  polling: 50,
  confirming: 75,
  complete: 100,
}

export const PaymentLoading = ({
  stage,
  message,
  estimatedTime,
  className,
}: PaymentLoadingProps) => {
  const displayMessage = message || stageMessages[stage]
  const progress = stageProgress[stage]

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-6",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {stage !== "complete" && (
        <LoadingSpinner size="lg" variant="primary" />
      )}
      
      <div className="w-full max-w-md space-y-2">
        <p className="text-center text-sm font-medium">{displayMessage}</p>
        
        <ProgressBar
          value={progress}
          variant={stage === "complete" ? "success" : "default"}
          size="md"
        />
        
        {estimatedTime && stage !== "complete" && (
          <p className="text-center text-xs text-muted-foreground">
            Estimated time: {estimatedTime}s
          </p>
        )}
      </div>
    </div>
  )
}
