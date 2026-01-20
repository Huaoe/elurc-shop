import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressBar } from '../progress-bar'

describe('ProgressBar', () => {
  it('renders with default props', () => {
    render(<ProgressBar value={50} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  })

  it('renders with custom max value', () => {
    render(<ProgressBar value={25} max={50} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '25')
    expect(progressBar).toHaveAttribute('aria-valuemax', '50')
  })

  it('renders with label', () => {
    render(<ProgressBar value={75} label="Loading..." />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays percentage when showPercentage is true', () => {
    render(<ProgressBar value={33} showPercentage />)
    expect(screen.getByText('33%')).toBeInTheDocument()
  })

  it('applies correct width based on value', () => {
    const { container } = render(<ProgressBar value={60} />)
    const indicator = container.querySelector('[data-indicator]')
    expect(indicator).toHaveStyle({ width: '60%' })
  })

  it('handles 0% value', () => {
    render(<ProgressBar value={0} showPercentage />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('handles 100% value', () => {
    render(<ProgressBar value={100} showPercentage />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<ProgressBar value={50} className="custom-class" />)
    const progressBar = container.querySelector('.custom-class')
    expect(progressBar).toBeInTheDocument()
  })

  it('supports different sizes', () => {
    const { rerender, container } = render(<ProgressBar value={50} size="sm" />)
    let progressBar = container.querySelector('[role="progressbar"]')
    expect(progressBar).toHaveClass('h-1')

    rerender(<ProgressBar value={50} size="md" />)
    progressBar = container.querySelector('[role="progressbar"]')
    expect(progressBar).toHaveClass('h-2')

    rerender(<ProgressBar value={50} size="lg" />)
    progressBar = container.querySelector('[role="progressbar"]')
    expect(progressBar).toHaveClass('h-3')
  })

  it('supports different variants', () => {
    const { rerender, container } = render(<ProgressBar value={50} variant="default" />)
    let indicator = container.querySelector('[data-indicator]')
    expect(indicator).toHaveClass('bg-primary')

    rerender(<ProgressBar value={50} variant="success" />)
    indicator = container.querySelector('[data-indicator]')
    expect(indicator).toHaveClass('bg-green-500')

    rerender(<ProgressBar value={50} variant="warning" />)
    indicator = container.querySelector('[data-indicator]')
    expect(indicator).toHaveClass('bg-yellow-500')

    rerender(<ProgressBar value={50} variant="error" />)
    indicator = container.querySelector('[data-indicator]')
    expect(indicator).toHaveClass('bg-destructive')
  })
})
