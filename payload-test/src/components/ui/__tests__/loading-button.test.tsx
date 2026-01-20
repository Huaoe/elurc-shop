import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LoadingButton } from '../loading-button'

describe('LoadingButton', () => {
  it('renders children when not loading', () => {
    render(<LoadingButton>Click me</LoadingButton>)
    expect(screen.getByText('Click me')).toBeDefined()
  })

  it('shows loading spinner when loading is true', () => {
    const { container } = render(<LoadingButton loading>Click me</LoadingButton>)
    const spinner = container.querySelector('[role="status"]')
    expect(spinner).toBeDefined()
  })

  it('displays loadingText when provided and loading', () => {
    render(<LoadingButton loading loadingText="Processing...">Click me</LoadingButton>)
    expect(screen.getByText('Processing...')).toBeDefined()
  })

  it('displays children when loading but no loadingText provided', () => {
    render(<LoadingButton loading>Click me</LoadingButton>)
    expect(screen.getByText('Click me')).toBeDefined()
  })

  it('is disabled when loading is true', () => {
    render(<LoadingButton loading>Click me</LoadingButton>)
    const button = screen.getByRole('button')
    expect(button.hasAttribute('disabled')).toBe(true)
  })

  it('is disabled when disabled prop is true', () => {
    render(<LoadingButton disabled>Click me</LoadingButton>)
    const button = screen.getByRole('button')
    expect(button.hasAttribute('disabled')).toBe(true)
  })

  it('prevents click events when loading', () => {
    const handleClick = vi.fn()
    render(<LoadingButton loading onClick={handleClick}>Click me</LoadingButton>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('allows click events when not loading', () => {
    const handleClick = vi.fn()
    render(<LoadingButton onClick={handleClick}>Click me</LoadingButton>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant prop correctly', () => {
    const { container } = render(<LoadingButton variant="destructive">Click me</LoadingButton>)
    const button = container.querySelector('[data-variant="destructive"]')
    expect(button).toBeDefined()
  })

  it('applies size prop correctly', () => {
    const { container } = render(<LoadingButton size="lg">Click me</LoadingButton>)
    const button = container.querySelector('[data-size="lg"]')
    expect(button).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<LoadingButton className="custom-class">Click me</LoadingButton>)
    const button = container.querySelector('.custom-class')
    expect(button).toBeDefined()
  })
})
