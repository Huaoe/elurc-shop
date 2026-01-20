import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  it('should not have accessibility violations on basic button', async () => {
    const { container } = render(
      <button type="button" aria-label="Click me">
        Click
      </button>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have violations on form with labels', async () => {
    const { container } = render(
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Submit</button>
      </form>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have violations on image with alt text', async () => {
    const { container } = render(
      <img src="/test.jpg" alt="Test description" />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have violations on navigation with landmarks', async () => {
    const { container } = render(
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
        </ul>
      </nav>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have violations on heading hierarchy', async () => {
    const { container } = render(
      <main>
        <h1>Main Title</h1>
        <section>
          <h2>Section Title</h2>
          <p>Content</p>
        </section>
      </main>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
