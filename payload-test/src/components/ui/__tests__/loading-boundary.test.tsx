import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingBoundary } from '../loading-boundary'

describe('LoadingBoundary', () => {
  it('renders children when loaded', () => {
    render(
      <LoadingBoundary>
        <div>Content loaded</div>
      </LoadingBoundary>
    )
    expect(screen.getByText('Content loaded')).toBeDefined()
  })

  it('uses default fallback when not provided', () => {
    const LazyComponent = () => {
      throw new Promise(() => {})
    }

    render(
      <LoadingBoundary message="Loading...">
        <LazyComponent />
      </LoadingBoundary>
    )
    
    expect(screen.getByText('Loading...')).toBeDefined()
  })

  it('uses custom fallback when provided', () => {
    const LazyComponent = () => {
      throw new Promise(() => {})
    }

    render(
      <LoadingBoundary fallback={<div>Custom loading...</div>}>
        <LazyComponent />
      </LoadingBoundary>
    )
    
    expect(screen.getByText('Custom loading...')).toBeDefined()
  })
})
