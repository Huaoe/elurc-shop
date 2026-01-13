import { CheckCircle, Circle, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface OrderTimelineProps {
  status: 'pending' | 'paid' | 'processing' | 'fulfilled' | 'cancelled' | 'timeout'
  createdAt: number
  paidAt: number | null
}

interface TimelineStep {
  label: string
  status: 'completed' | 'current' | 'pending' | 'skipped'
  timestamp?: number
}

export default function OrderTimeline({
  status,
  createdAt,
  paidAt,
}: OrderTimelineProps) {
  const steps: TimelineStep[] = [
    {
      label: 'Order Placed',
      status: 'completed',
      timestamp: createdAt,
    },
    {
      label: 'Payment Confirmed',
      status: paidAt ? 'completed' : status === 'paid' ? 'current' : status === 'pending' ? 'pending' : 'skipped',
      timestamp: paidAt || undefined,
    },
    {
      label: 'Processing',
      status: status === 'processing' ? 'current' : status === 'fulfilled' ? 'completed' : 'pending',
    },
    {
      label: 'Shipped',
      status: status === 'fulfilled' ? 'completed' : 'pending',
    },
    {
      label: 'Delivered',
      status: 'pending',
    },
  ]

  if (status === 'cancelled' || status === 'timeout') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-lg font-semibold text-destructive">
              {status === 'cancelled' ? 'Order Cancelled' : 'Payment Timeout'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {status === 'cancelled'
                ? 'This order has been cancelled'
                : 'Payment was not received within the time limit'}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {steps.map((step, index) => (
            <div key={step.label} className="flex gap-4 pb-8 last:pb-0">
              <div className="relative flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step.status === 'completed'
                      ? 'border-green-500 bg-green-500 text-white'
                      : step.status === 'current'
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {step.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : step.status === 'current' ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-full w-0.5 ${
                      step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 pt-1">
                <p
                  className={`font-semibold ${
                    step.status === 'completed' || step.status === 'current'
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </p>
                {step.timestamp && (
                  <p className="text-sm text-muted-foreground">
                    {new Date(step.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                )}
                {step.status === 'current' && !step.timestamp && (
                  <p className="text-sm text-blue-600">In progress</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
