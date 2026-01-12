import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      {/* Image Skeleton */}
      <Skeleton className="aspect-square w-full" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        {/* Price */}
        <div className="space-y-1">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Badge */}
        <Skeleton className="h-6 w-20" />

        {/* Button */}
        <Skeleton className="h-11 w-full" />
      </div>
    </Card>
  )
}
