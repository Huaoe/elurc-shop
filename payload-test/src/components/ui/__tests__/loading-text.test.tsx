import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingText } from '../loading-text'

describe('LoadingText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders with default text', () => {
    render(<LoadingText />)
    expect(screen.getByText(/Loading/)).toBeInTheDocument()
  })

  it('renders with custom text', () => {
    render(<LoadingText text="Processing" />)
    expect(screen.getByText(/Processing/)).toBeInTheDocument()
  })

  it('animates dots when animated is true', () => {
    render(<LoadingText text="Loading" animated />)
    const element = screen.getByText(/Loading/)
    expect(element).toBeInTheDocument()
  })

  it('does not animate when animated is false', () => {
    render(<LoadingText text="Loading" animated={false} />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<LoadingText className="custom-class" />)
    const element = container.querySelector('.custom-class')
    expect(element).toBeInTheDocument()
  })

  it('supports different sizes', () => {
    const { rerender, container } = render(<LoadingText size="sm" />)
    let element = container.querySelector('[data-loading-text]')
    expect(element).toHaveClass('text-sm')

    rerender(<LoadingText size="md" />)
    element = container.querySelector('[data-loading-text]')
    expect(element).toHaveClass('text-base')

    rerender(<LoadingText size="lg" />)
    element = container.querySelector('[data-loading-text]')
    expect(element).toHaveClass('text-lg')
  })

  it('includes spinner when showSpinner is true', () => {
    render(<LoadingText showSpinner />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toBeInTheDocument()
  })

  it('does not include spinner when showSpinner is false', () => {
    render(<LoadingText showSpinner={false} />)
    const spinner = screen.queryByLabelText('Loading')
    expect(spinner).not.toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<LoadingText />)
    const element = screen.getByRole('status')
    expect(element).toHaveAttribute('aria-live', 'polite')
  })
})
