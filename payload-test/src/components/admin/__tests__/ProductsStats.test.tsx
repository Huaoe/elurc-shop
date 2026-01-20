import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductsStats } from '../ProductsStats'

describe('ProductsStats Component', () => {
  it('should render product statistics cards', () => {
    render(<ProductsStats />)
    
    expect(screen.getByText('Total Products')).toBeInTheDocument()
    expect(screen.getByText('Low Stock Items')).toBeInTheDocument()
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })

  it('should display placeholder values', () => {
    render(<ProductsStats />)
    
    expect(screen.getByText('Across all categories')).toBeInTheDocument()
    expect(screen.getByText('Below threshold')).toBeInTheDocument()
    expect(screen.getByText('Needs restocking')).toBeInTheDocument()
  })

  it('should have proper grid layout classes', () => {
    const { container } = render(<ProductsStats />)
    const gridElement = container.querySelector('.grid')
    
    expect(gridElement).toBeInTheDocument()
    expect(gridElement?.className).toContain('grid-cols-1')
    expect(gridElement?.className).toContain('md:grid-cols-3')
  })
})
