'use client'

import React from 'react'

const ProductsStats: React.FC = () => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">Total Products</h3>
        <p className="mt-2 text-3xl font-bold">-</p>
        <p className="mt-1 text-xs text-muted-foreground">Across all categories</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">Low Stock Items</h3>
        <p className="mt-2 text-3xl font-bold text-yellow-600">-</p>
        <p className="mt-1 text-xs text-muted-foreground">Below threshold</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">Out of Stock</h3>
        <p className="mt-2 text-3xl font-bold text-red-600">-</p>
        <p className="mt-1 text-xs text-muted-foreground">Needs restocking</p>
      </div>
    </div>
  )
}

export default ProductsStats
