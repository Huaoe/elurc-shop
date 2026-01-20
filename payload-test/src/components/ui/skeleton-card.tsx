import * as React from "react"
import { Skeleton } from "./skeleton"
import { Card, CardContent, CardHeader } from "./card"
import { cn } from "@/lib/utils"

interface SkeletonCardProps {
  className?: string
  showHeader?: boolean
  showFooter?: boolean
  lines?: number
}

export const SkeletonCard = ({ 
  className, 
  showHeader = true, 
  showFooter = false,
  lines = 3 
}: SkeletonCardProps) => {
  return (
    <Card className={cn("w-full", className)}>
      {showHeader && (
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
      )}
      <CardContent className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={cn(
              "h-4",
              i === lines - 1 ? "w-2/3" : "w-full"
            )} 
          />
        ))}
      </CardContent>
      {showFooter && (
        <div className="px-6 pb-6">
          <Skeleton className="h-10 w-full" />
        </div>
      )}
    </Card>
  )
}
