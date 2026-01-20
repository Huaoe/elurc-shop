import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageLoader } from '../page-loader'

describe('PageLoader', () => {
  it('renders with default message', () => {
    render(<PageLoader />)
    expect(screen.getByText('Loading page...')).toBeDefined()
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('renders with custom message', () => {
    render(<PageLoader message="Loading products..." />)
    expect(screen.getByText('Loading products...')).toBeDefined()
  })

  it('renders without message when message is empty', () => {
    render(<PageLoader message="" />)
    expect(screen.queryByText(/Loading/)).toBeNull()
  })

  it('applies fullScreen class when fullScreen is true', () => {
    const { container } = render(<PageLoader fullScreen />)
    const loader = container.querySelector('[role="status"]')
    expect(loader?.className).toContain('min-h-screen')
  })

  it('applies default height when fullScreen is false', () => {
    const { container } = render(<PageLoader fullScreen={false} />)
    const loader = container.querySelector('[role="status"]')
    expect(loader?.className).toContain('min-h-[400px]')
  })

  it('applies custom className', () => {
    const { container } = render(<PageLoader className="custom-class" />)
    const loader = container.querySelector('.custom-class')
    expect(loader).toBeDefined()
  })

  it('has proper accessibility attributes', () => {
    render(<PageLoader />)
    const loader = screen.getByRole('status')
    expect(loader.getAttribute('aria-live')).toBe('polite')
  })
})
