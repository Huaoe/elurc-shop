'use client'

import { useState, useEffect, useRef } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'

interface PaymentTimerProps {
  startTime: number
  onTimeout: () => void
  onWarning: () => void
}

export default function PaymentTimer({
  startTime,
  onTimeout,
  onWarning,
}: PaymentTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [hasWarned, setHasWarned] = useState(false)
  const [hasTimedOut, setHasTimedOut] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const TIMEOUT_DURATION = 10 * 60 * 1000
  const WARNING_THRESHOLD = 2 * 60 * 1000

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, TIMEOUT_DURATION - elapsed)
      return remaining
    }

    const updateTimer = () => {
      const remaining = calculateTimeRemaining()
      setTimeRemaining(remaining)

      if (remaining <= 0 && !hasTimedOut) {
        setHasTimedOut(true)
        onTimeout()
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        return
      }

      if (remaining <= WARNING_THRESHOLD && remaining > 0 && !hasWarned) {
        setHasWarned(true)
        onWarning()
      }
    }

    updateTimer()

    if (!hasTimedOut) {
      intervalRef.current = setInterval(updateTimer, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [startTime, onTimeout, onWarning, hasWarned, hasTimedOut, TIMEOUT_DURATION, WARNING_THRESHOLD])

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const isWarning = timeRemaining <= WARNING_THRESHOLD && timeRemaining > 0

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${
        isWarning
          ? 'bg-destructive/10 border-destructive text-destructive'
          : 'bg-muted border-border'
      }`}
      data-warning={isWarning}
    >
      {isWarning ? (
        <AlertTriangle className="h-5 w-5" />
      ) : (
        <Clock className="h-5 w-5" />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {isWarning ? 'Payment Expires Soon' : 'Time Remaining'}
        </span>
        <span className="text-2xl font-bold tabular-nums">
          {formatTime(timeRemaining)}
        </span>
      </div>
    </div>
  )
}
