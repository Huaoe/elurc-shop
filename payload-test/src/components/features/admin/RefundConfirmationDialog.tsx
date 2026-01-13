'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface RefundConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderNumber: string
  refundAmount: number
  walletAddress: string
  reason: string
  onConfirm: () => void
}

export const RefundConfirmationDialog = ({
  open,
  onOpenChange,
  orderNumber,
  refundAmount,
  walletAddress,
  reason,
  onConfirm,
}: RefundConfirmationDialogProps) => {
  const refundAmountElurc = (refundAmount / 1_000_000).toFixed(2)

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Refund</AlertDialogTitle>
          <AlertDialogDescription>
            Please review the refund details carefully before confirming. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex justify-between">
            <span className="font-medium">Order Number:</span>
            <span>{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Refund Amount:</span>
            <span className="font-mono">{refundAmountElurc} ELURC</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Wallet Address:</span>
            <span className="font-mono text-sm">
              {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
            </span>
          </div>
          <div>
            <span className="font-medium">Reason:</span>
            <p className="text-sm text-muted-foreground mt-1">{reason}</p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Confirm Refund
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
