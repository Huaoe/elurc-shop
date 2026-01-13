import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  CheckCircle, 
  Package, 
  XCircle, 
  AlertCircle 
} from 'lucide-react'

type OrderStatus = 'pending' | 'paid' | 'processing' | 'fulfilled' | 'cancelled' | 'timeout'

interface OrderStatusBadgeProps {
  status: OrderStatus
  isPolling?: boolean
}

const statusConfig = {
  pending: {
    label: 'Pending Payment',
    variant: 'secondary' as const,
    icon: Clock,
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  },
  paid: {
    label: 'Paid',
    variant: 'default' as const,
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  processing: {
    label: 'Processing',
    variant: 'secondary' as const,
    icon: Package,
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  fulfilled: {
    label: 'Fulfilled',
    variant: 'default' as const,
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'destructive' as const,
    icon: XCircle,
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
  timeout: {
    label: 'Timeout',
    variant: 'secondary' as const,
    icon: AlertCircle,
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  },
}

export default function OrderStatusBadge({ status, isPolling = false }: OrderStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon
  const shouldAnimate = status === 'pending' && isPolling

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon 
        className={`h-3 w-3 mr-1 ${shouldAnimate ? 'animate-pulse' : ''}`}
      />
      {config.label}
    </Badge>
  )
}
