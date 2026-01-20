"use client"

import * as React from "react"
import { PageLoader } from "./page-loader"

interface LoadingBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  message?: string
}

export const LoadingBoundary = ({ 
  children, 
  fallback, 
  message 
}: LoadingBoundaryProps) => {
  return (
    <React.Suspense 
      fallback={fallback || <PageLoader message={message} />}
    >
      {children}
    </React.Suspense>
  )
}
