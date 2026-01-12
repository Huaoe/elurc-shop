import { cn } from "@/lib/utils"

interface PriceDisplayProps {
  elurc: number
  eur: number
  size?: "sm" | "md" | "lg"
  showCurrency?: boolean
  className?: string
}

export const PriceDisplay = ({
  elurc,
  eur,
  size = "md",
  showCurrency = true,
  className,
}: PriceDisplayProps) => {
  const sizeClasses = {
    sm: {
      elurc: "text-sm",
      eur: "text-xs",
    },
    md: {
      elurc: "text-xl",
      eur: "text-sm",
    },
    lg: {
      elurc: "text-2xl",
      eur: "text-base",
    },
  }

  const formatNumber = (num: number) => {
    return num.toFixed(2)
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div
        className={cn(
          "font-mono font-semibold text-foreground",
          sizeClasses[size].elurc
        )}
      >
        {showCurrency && <span className="text-muted-foreground mr-1">ELURC</span>}
        {formatNumber(elurc)}
      </div>
      <div
        className={cn(
          "text-muted-foreground",
          sizeClasses[size].eur
        )}
      >
        €{formatNumber(eur)}
      </div>
    </div>
  )
}
