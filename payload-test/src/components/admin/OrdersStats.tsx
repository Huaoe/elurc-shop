'use client'

import React from 'react'

const OrdersStats: React.FC = () => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">Pending Orders</h3>
        <p className="mt-2 text-3xl font-bold text-yellow-600">-</p>
        <p className="mt-1 text-xs text-muted-foreground">Awaiting payment</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">Processing</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">-</p>
        <p className="mt-1 text-xs text-muted-foreground">Ready to fulfill</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">Fulfilled</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">-</p>
        <p className="mt-1 text-xs text-muted-foreground">Completed orders</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
        <p className="mt-2 text-3xl font-bold">- ELURC</p>
        <p className="mt-1 text-xs text-muted-foreground">All time</p>
      </div>
    </div>
  )
}

export default OrdersStats
