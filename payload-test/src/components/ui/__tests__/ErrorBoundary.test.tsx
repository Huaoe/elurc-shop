import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ErrorBoundary } from "../ErrorBoundary"

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error")
  }
  return <div>No error</div>
}

describe("ErrorBoundary", () => {
  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText("No error")).toBeDefined()
  })

  it("renders error UI when error occurs", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText("Something went wrong")).toBeDefined()
    expect(screen.getByRole("button", { name: /try again/i })).toBeDefined()
    expect(screen.getByRole("button", { name: /reload page/i })).toBeDefined()

    consoleError.mockRestore()
  })

  it("renders custom fallback when provided", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})

    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText("Custom error UI")).toBeDefined()

    consoleError.mockRestore()
  })

  it("calls onError callback when error occurs", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    const onError = vi.fn()

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalled()

    consoleError.mockRestore()
  })

  it("resets error state when Try Again is clicked", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})

    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText("Something went wrong")).toBeDefined()

    const tryAgainButton = screen.getByRole("button", { name: /try again/i })
    fireEvent.click(tryAgainButton)

    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText("No error")).toBeDefined()

    consoleError.mockRestore()
  })
})
