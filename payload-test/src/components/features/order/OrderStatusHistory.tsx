import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

interface StatusHistoryEntry {
  status: string
  timestamp: string
  changedBy?: 'system' | 'admin'
  reason?: string
}

interface OrderStatusHistoryProps {
  history: StatusHistoryEntry[]
}

const statusLabels = {
  pending: 'Order Placed',
  paid: 'Payment Confirmed',
  processing: 'Processing',
  fulfilled: 'Shipped',
  cancelled: 'Cancelled',
  timeout: 'Payment Timeout',
}

export default function OrderStatusHistory({
  history,
}: OrderStatusHistoryProps) {
  if (!history || history.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((entry, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-500 bg-green-500 text-white">
                  <CheckCircle className="h-4 w-4" />
                </div>
                {index < history.length - 1 && (
                  <div className="h-full w-0.5 bg-green-500" />
                )}
              </div>

              <div className="flex-1 pb-4">
                <p className="font-semibold">
                  {statusLabels[entry.status as keyof typeof statusLabels] || entry.status}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
                {entry.changedBy && (
                  <p className="text-xs text-muted-foreground">
                    Changed by: {entry.changedBy}
                  </p>
                )}
                {entry.reason && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {entry.reason}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
