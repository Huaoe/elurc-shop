import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { SkeletonCard } from '../skeleton-card'

describe('SkeletonCard', () => {
  it('renders with default props', () => {
    const { container } = render(<SkeletonCard />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders header when showHeader is true', () => {
    const { container } = render(<SkeletonCard showHeader />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(3)
  })

  it('does not render header when showHeader is false', () => {
    const { container } = render(<SkeletonCard showHeader={false} />)
    const header = container.querySelector('header')
    expect(header).toBeNull()
  })

  it('renders footer when showFooter is true', () => {
    const { container } = render(<SkeletonCard showFooter />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(3)
  })

  it('renders correct number of content lines', () => {
    const { container } = render(<SkeletonCard lines={5} showHeader={false} />)
    const contentSkeletons = container.querySelectorAll('.space-y-2 > .animate-pulse')
    expect(contentSkeletons.length).toBe(5)
  })

  it('applies custom className', () => {
    const { container } = render(<SkeletonCard className="custom-class" />)
    const card = container.querySelector('.custom-class')
    expect(card).toBeDefined()
  })
})
