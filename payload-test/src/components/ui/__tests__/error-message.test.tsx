import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ErrorMessage } from "../error-message"

describe("ErrorMessage", () => {
  it("renders error message with title and message", () => {
    render(
      <ErrorMessage
        title="Error Title"
        message="This is an error message"
      />
    )

    expect(screen.getByText("Error Title")).toBeDefined()
    expect(screen.getByText("This is an error message")).toBeDefined()
  })

  it("renders without title", () => {
    render(<ErrorMessage message="Error without title" />)

    expect(screen.queryByRole("heading")).toBeNull()
    expect(screen.getByText("Error without title")).toBeDefined()
  })

  it("renders with error variant by default", () => {
    const { container } = render(<ErrorMessage message="Default error" />)
    const alert = container.querySelector('[role="alert"]')

    expect(alert?.className).toContain("border-destructive/50")
  })

  it("renders with warning variant", () => {
    const { container } = render(
      <ErrorMessage variant="warning" message="Warning message" />
    )
    const alert = container.querySelector('[role="alert"]')

    expect(alert?.className).toContain("border-yellow-500/50")
  })

  it("renders with info variant", () => {
    const { container } = render(
      <ErrorMessage variant="info" message="Info message" />
    )
    const alert = container.querySelector('[role="alert"]')

    expect(alert?.className).toContain("border-blue-500/50")
  })

  it("renders with network variant", () => {
    const { container } = render(
      <ErrorMessage variant="network" message="Network message" />
    )
    const alert = container.querySelector('[role="alert"]')

    expect(alert?.className).toContain("border-orange-500/50")
  })

  it("renders action button when provided", () => {
    render(
      <ErrorMessage
        message="Error with action"
        action={<button>Retry</button>}
      />
    )

    expect(screen.getByRole("button", { name: "Retry" })).toBeDefined()
  })

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn()

    render(
      <ErrorMessage
        message="Dismissible error"
        onDismiss={onDismiss}
      />
    )

    const dismissButton = screen.getByRole("button", { name: "Dismiss" })
    fireEvent.click(dismissButton)

    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it("does not render dismiss button when onDismiss is not provided", () => {
    render(<ErrorMessage message="Non-dismissible error" />)

    expect(screen.queryByRole("button", { name: "Dismiss" })).toBeNull()
  })

  it("has proper accessibility attributes", () => {
    const { container } = render(<ErrorMessage message="Accessible error" />)
    const alert = container.querySelector('[role="alert"]')

    expect(alert?.getAttribute("aria-live")).toBe("polite")
  })

  it("applies custom className", () => {
    const { container } = render(
      <ErrorMessage message="Custom class" className="custom-class" />
    )
    const alert = container.querySelector('[role="alert"]')

    expect(alert?.className).toContain("custom-class")
  })
})
