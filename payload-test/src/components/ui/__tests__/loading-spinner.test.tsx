import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '../loading-spinner'

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeDefined()
    expect(spinner.getAttribute('aria-label')).toBe('Loading')
  })

  it('renders with custom label', () => {
    render(<LoadingSpinner label="Processing" />)
    const spinner = screen.getByRole('status')
    expect(spinner.getAttribute('aria-label')).toBe('Processing')
  })

  it('applies size variants correctly', () => {
    const { rerender, container } = render(<LoadingSpinner size="sm" />)
    let spinner = container.querySelector('[role="status"]')
    expect(spinner?.className).toContain('size-4')

    rerender(<LoadingSpinner size="lg" />)
    spinner = container.querySelector('[role="status"]')
    expect(spinner?.className).toContain('size-8')
  })

  it('applies variant styles correctly', () => {
    const { rerender, container } = render(<LoadingSpinner variant="primary" />)
    let spinner = container.querySelector('[role="status"]')
    expect(spinner?.className).toContain('text-primary')

    rerender(<LoadingSpinner variant="destructive" />)
    spinner = container.querySelector('[role="status"]')
    expect(spinner?.className).toContain('text-destructive')
  })

  it('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />)
    const spinner = container.querySelector('.custom-class')
    expect(spinner).toBeDefined()
  })

  it('has animation class', () => {
    const { container } = render(<LoadingSpinner />)
    const spinner = container.querySelector('[role="status"]')
    expect(spinner?.className).toContain('animate-spin')
  })
})
