"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
}

export const LazyImage = ({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = "/images/placeholder.png",
  priority = false,
  fill = false,
  sizes,
  objectFit = "cover",
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)
  const [imageSrc, setImageSrc] = React.useState(src)

  React.useEffect(() => {
    setImageSrc(src)
    setHasError(false)
    setIsLoading(true)
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    if (fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <Skeleton 
          className={cn(
            "absolute inset-0",
            fill ? "w-full h-full" : ""
          )} 
          style={!fill && width && height ? { width, height } : undefined}
        />
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down"
        )}
        data-error={hasError}
      />
    </div>
  )
}
