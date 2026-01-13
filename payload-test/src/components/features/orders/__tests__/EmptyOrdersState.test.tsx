import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import EmptyOrdersState from '../EmptyOrdersState'

describe('EmptyOrdersState', () => {
  it('should render empty state message', () => {
    const { container } = render(<EmptyOrdersState />)
    expect(container.textContent).toContain('No orders yet')
  })

  it('should render call-to-action text', () => {
    const { container } = render(<EmptyOrdersState />)
    expect(container.textContent).toContain('Start shopping to see your order history here')
  })

  it('should render browse products button', () => {
    const { container } = render(<EmptyOrdersState />)
    expect(container.textContent).toContain('Browse Products')
  })

  it('should link to products page', () => {
    const { container } = render(<EmptyOrdersState />)
    const link = container.querySelector('a[href="/products"]')
    expect(link).toBeTruthy()
  })

  it('should render shopping bag icon', () => {
    const { container } = render(<EmptyOrdersState />)
    const icon = container.querySelector('svg')
    expect(icon).toBeTruthy()
  })
})
