'use client'

import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface WalletErrorProps {
  type: 'not-installed' | 'rejected' | 'network-error'
  onRetry?: () => void
}

export default function WalletError({ type, onRetry }: WalletErrorProps) {
  const errorConfig = {
    'not-installed': {
      title: 'Phantom Wallet Not Installed',
      description: 'Please install Phantom wallet to connect.',
      action: {
        label: 'Install Phantom',
        href: 'https://phantom.app/download',
      },
    },
    'rejected': {
      title: 'Connection Rejected',
      description: 'You rejected the connection request. Please try again.',
      action: {
        label: 'Retry Connection',
        onClick: onRetry,
      },
    },
    'network-error': {
      title: 'Network Error',
      description: 'Failed to connect to the network. Please check your connection and try again.',
      action: {
        label: 'Retry',
        onClick: onRetry,
      },
    },
  }

  const config = errorConfig[type]

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{config.title}</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3">{config.description}</p>
        {'href' in config.action ? (
          <Button asChild variant="outline" size="sm">
            <a 
              href={config.action.href} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {config.action.label}
            </a>
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={config.action.onClick}
          >
            {config.action.label}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
