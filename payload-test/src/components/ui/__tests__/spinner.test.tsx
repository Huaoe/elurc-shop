import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spinner } from '../spinner'

describe('Spinner', () => {
  it('renders with default size', () => {
    render(<Spinner />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('size-6')
  })

  it('renders with small size', () => {
    render(<Spinner size="sm" />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toHaveClass('size-4')
  })

  it('renders with large size', () => {
    render(<Spinner size="lg" />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toHaveClass('size-8')
  })

  it('applies custom className', () => {
    render(<Spinner className="text-primary" />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toHaveClass('text-primary')
  })

  it('has animation class', () => {
    render(<Spinner />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toHaveClass('animate-spin')
  })

  it('has proper accessibility label', () => {
    render(<Spinner />)
    expect(screen.getByLabelText('Loading')).toBeInTheDocument()
  })
})
