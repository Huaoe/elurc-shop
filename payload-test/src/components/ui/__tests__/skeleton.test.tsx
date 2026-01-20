import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from '../skeleton'

describe('Skeleton', () => {
  it('renders with default styles', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('rounded-md', 'bg-muted')
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="h-10 w-full" />)
    const skeleton = container.querySelector('.h-10')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('w-full')
  })

  it('supports custom dimensions', () => {
    const { container } = render(<Skeleton className="h-20 w-40" />)
    const skeleton = container.querySelector('.h-20')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('w-40')
  })

  it('can be used for text lines', () => {
    const { container } = render(
      <div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    )
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons).toHaveLength(2)
  })

  it('can be used for circular avatars', () => {
    const { container } = render(<Skeleton className="h-12 w-12 rounded-full" />)
    const skeleton = container.querySelector('.rounded-full')
    expect(skeleton).toBeInTheDocument()
  })
})
