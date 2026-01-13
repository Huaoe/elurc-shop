'use client'

import { QRCodeSVG } from 'qrcode.react'
import { useState, useEffect } from 'react'

interface PaymentQRCodeProps {
  paymentURI: string
  size?: number
}

export default function PaymentQRCode({ 
  paymentURI, 
  size = 200 
}: PaymentQRCodeProps) {
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!paymentURI || !paymentURI.startsWith('solana:')) {
      setError(true)
    }
  }, [paymentURI])

  if (error) {
    return (
      <div className="flex items-center justify-center bg-muted rounded-lg p-8">
        <p className="text-muted-foreground text-center">
          QR code unavailable. Please use the wallet address below.
        </p>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <QRCodeSVG
          value={paymentURI}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>
    </div>
  )
}
