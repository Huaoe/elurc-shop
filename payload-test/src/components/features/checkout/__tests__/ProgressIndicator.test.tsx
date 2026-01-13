import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ProgressIndicator from '../ProgressIndicator'

describe('ProgressIndicator', () => {
  it('should render all three steps', () => {
    const { container } = render(<ProgressIndicator currentStep={1} />)
    expect(container.textContent).toContain('Wallet')
    expect(container.textContent).toContain('Shipping')
    expect(container.textContent).toContain('Payment')
  })

  it('should highlight current step', () => {
    const { container } = render(<ProgressIndicator currentStep={2} />)
    const steps = container.querySelectorAll('[aria-current="step"]')
    expect(steps).toHaveLength(1)
  })

  it('should show completed steps with primary color', () => {
    const { container } = render(<ProgressIndicator currentStep={3} />)
    const primarySteps = container.querySelectorAll('.bg-primary')
    expect(primarySteps.length).toBeGreaterThanOrEqual(3)
  })
})
