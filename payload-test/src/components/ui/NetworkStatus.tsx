"use client"

import { useNetworkStatus } from "@/hooks/useNetworkStatus"
import { ErrorMessage } from "./error-message"

export const NetworkStatus = () => {
  const { isOffline } = useNetworkStatus()

  if (!isOffline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <ErrorMessage
        variant="network"
        title="No Internet Connection"
        message="You're currently offline. Some features may not be available."
      />
    </div>
  )
}
