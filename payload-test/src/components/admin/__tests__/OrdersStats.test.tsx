import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OrdersStats } from '../OrdersStats'

describe('OrdersStats Component', () => {
  it('should render order statistics cards', () => {
    render(<OrdersStats />)
    
    expect(screen.getByText('Pending Orders')).toBeInTheDocument()
    expect(screen.getByText('Processing')).toBeInTheDocument()
    expect(screen.getByText('Fulfilled')).toBeInTheDocument()
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
  })

  it('should display status descriptions', () => {
    render(<OrdersStats />)
    
    expect(screen.getByText('Awaiting payment')).toBeInTheDocument()
    expect(screen.getByText('Ready to fulfill')).toBeInTheDocument()
    expect(screen.getByText('Completed orders')).toBeInTheDocument()
    expect(screen.getByText('All time')).toBeInTheDocument()
  })

  it('should have proper grid layout classes', () => {
    const { container } = render(<OrdersStats />)
    const gridElement = container.querySelector('.grid')
    
    expect(gridElement).toBeInTheDocument()
    expect(gridElement?.className).toContain('grid-cols-1')
    expect(gridElement?.className).toContain('md:grid-cols-4')
  })
})
