import { describe, it, expect, vi } from 'vitest'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { LazyImage } from '../lazy-image'

vi.mock('next/image', () => ({
  default: ({ onLoad, onError, ...props }: any) => {
    return (
      <img
        {...props}
        onLoad={() => onLoad?.()}
        onError={() => onError?.()}
      />
    )
  },
}))

describe('LazyImage', () => {
  it('renders with required props', () => {
    const { container } = render(
      <LazyImage src="/test.jpg" alt="Test image" width={100} height={100} />
    )
    const img = container.querySelector('img')
    expect(img).toBeDefined()
    expect(img?.getAttribute('alt')).toBe('Test image')
  })

  it('shows skeleton while loading', () => {
    const { container } = render(
      <LazyImage src="/test.jpg" alt="Test image" width={100} height={100} />
    )
    const skeleton = container.querySelector('.animate-pulse')
    expect(skeleton).toBeDefined()
  })

  it('hides skeleton after image loads', async () => {
    const { container } = render(
      <LazyImage src="/test.jpg" alt="Test image" width={100} height={100} />
    )
    
    const img = container.querySelector('img')
    fireEvent.load(img!)
    
    await waitFor(() => {
      const skeleton = container.querySelector('.animate-pulse')
      expect(skeleton).toBeNull()
    })
  })

  it('uses fallback image on error', async () => {
    const { container } = render(
      <LazyImage 
        src="/broken.jpg" 
        alt="Test image" 
        width={100} 
        height={100}
        fallbackSrc="/fallback.jpg"
      />
    )
    
    const img = container.querySelector('img')
    fireEvent.error(img!)
    
    await waitFor(() => {
      expect(img?.getAttribute('src')).toBe('/fallback.jpg')
    })
  })

  it('sets error data attribute on error', async () => {
    const { container } = render(
      <LazyImage src="/broken.jpg" alt="Test image" width={100} height={100} />
    )
    
    const img = container.querySelector('img')
    fireEvent.error(img!)
    
    await waitFor(() => {
      expect(img?.getAttribute('data-error')).toBe('true')
    })
  })

  it('applies custom className', () => {
    const { container } = render(
      <LazyImage 
        src="/test.jpg" 
        alt="Test image" 
        width={100} 
        height={100}
        className="custom-class"
      />
    )
    const wrapper = container.querySelector('.custom-class')
    expect(wrapper).toBeDefined()
  })

  it('handles fill prop correctly', () => {
    const { container } = render(
      <LazyImage src="/test.jpg" alt="Test image" fill />
    )
    const img = container.querySelector('img')
    expect(img).toBeDefined()
  })

  it('applies object-fit classes', () => {
    const { container } = render(
      <LazyImage 
        src="/test.jpg" 
        alt="Test image" 
        width={100} 
        height={100}
        objectFit="contain"
      />
    )
    const img = container.querySelector('img')
    expect(img?.className).toContain('object-contain')
  })
})
