import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { toast } from "sonner"
import {
  handleNetworkError,
  handleWalletError,
  handlePaymentError,
  handleApiError,
  handleError,
  AppError,
} from "../error-handler"
import { ERROR_MESSAGES } from "../error-messages"

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}))

describe("Error Handler", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("handleNetworkError", () => {
    it("shows offline message when navigator is offline", () => {
      Object.defineProperty(navigator, "onLine", {
        writable: true,
        value: false,
      })

      handleNetworkError(new Error("Network error"))

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.NETWORK.OFFLINE.title,
        { description: ERROR_MESSAGES.NETWORK.OFFLINE.message }
      )
    })

    it("shows timeout message for AbortError", () => {
      Object.defineProperty(navigator, "onLine", {
        writable: true,
        value: true,
      })

      const abortError = new Error("Aborted")
      abortError.name = "AbortError"

      handleNetworkError(abortError)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.NETWORK.TIMEOUT.title,
        { description: ERROR_MESSAGES.NETWORK.TIMEOUT.message }
      )
    })

    it("shows generic network error for other errors", () => {
      Object.defineProperty(navigator, "onLine", {
        writable: true,
        value: true,
      })

      handleNetworkError(new Error("Connection failed"))

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.NETWORK.FAILED.title,
        { description: ERROR_MESSAGES.NETWORK.FAILED.message }
      )
    })

    it("uses custom message when provided", () => {
      Object.defineProperty(navigator, "onLine", {
        writable: true,
        value: true,
      })

      handleNetworkError(new Error("Error"), {
        customMessage: "Custom network error",
      })

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.NETWORK.FAILED.title,
        { description: "Custom network error" }
      )
    })

    it("does not show toast when showToast is false", () => {
      handleNetworkError(new Error("Error"), { showToast: false })

      expect(toast.error).not.toHaveBeenCalled()
    })
  })

  describe("handleWalletError", () => {
    it("shows transaction rejected message", () => {
      const error = new Error("User rejected the transaction")

      handleWalletError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.WALLET.TRANSACTION_REJECTED.title,
        { description: ERROR_MESSAGES.WALLET.TRANSACTION_REJECTED.message }
      )
    })

    it("shows insufficient balance message", () => {
      const error = new Error("Insufficient funds")

      handleWalletError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.WALLET.INSUFFICIENT_BALANCE.title,
        { description: ERROR_MESSAGES.WALLET.INSUFFICIENT_BALANCE.message }
      )
    })

    it("shows generic connection failed message", () => {
      const error = new Error("Connection error")

      handleWalletError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.WALLET.CONNECTION_FAILED.title,
        { description: ERROR_MESSAGES.WALLET.CONNECTION_FAILED.message }
      )
    })
  })

  describe("handlePaymentError", () => {
    it("shows timeout message for PAYMENT_TIMEOUT", () => {
      const error = new AppError("PAYMENT_TIMEOUT", "Payment timeout")

      handlePaymentError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.PAYMENT.TIMEOUT.title,
        { description: ERROR_MESSAGES.PAYMENT.TIMEOUT.message }
      )
    })

    it("shows amount mismatch message for AMOUNT_MISMATCH", () => {
      const error = new AppError("AMOUNT_MISMATCH", "Amount mismatch")

      handlePaymentError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.PAYMENT.AMOUNT_MISMATCH.title,
        { description: ERROR_MESSAGES.PAYMENT.AMOUNT_MISMATCH.message }
      )
    })

    it("shows generic payment failed message", () => {
      const error = new Error("Payment error")

      handlePaymentError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.PAYMENT.FAILED.title,
        { description: ERROR_MESSAGES.PAYMENT.FAILED.message }
      )
    })
  })

  describe("handleApiError", () => {
    it("shows bad request message for 400 status", () => {
      const error = new AppError("BAD_REQUEST", "Bad request", 400)

      handleApiError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.API.BAD_REQUEST.title,
        { description: ERROR_MESSAGES.API.BAD_REQUEST.message }
      )
    })

    it("shows unauthorized message for 401 status", () => {
      const error = new AppError("UNAUTHORIZED", "Unauthorized", 401)

      handleApiError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.API.UNAUTHORIZED.title,
        { description: ERROR_MESSAGES.API.UNAUTHORIZED.message }
      )
    })

    it("shows forbidden message for 403 status", () => {
      const error = new AppError("FORBIDDEN", "Forbidden", 403)

      handleApiError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.API.FORBIDDEN.title,
        { description: ERROR_MESSAGES.API.FORBIDDEN.message }
      )
    })

    it("shows not found message for 404 status", () => {
      const error = new AppError("NOT_FOUND", "Not found", 404)

      handleApiError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.API.NOT_FOUND.title,
        { description: ERROR_MESSAGES.API.NOT_FOUND.message }
      )
    })

    it("shows rate limit message for 429 status", () => {
      const error = new AppError("RATE_LIMIT", "Rate limit", 429)

      handleApiError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.API.RATE_LIMIT.title,
        { description: ERROR_MESSAGES.API.RATE_LIMIT.message }
      )
    })

    it("shows server error message for 500 status", () => {
      const error = new AppError("SERVER_ERROR", "Server error", 500)

      handleApiError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.API.SERVER_ERROR.title,
        { description: ERROR_MESSAGES.API.SERVER_ERROR.message }
      )
    })
  })

  describe("handleError", () => {
    it("delegates to handleApiError for AppError", () => {
      const error = new AppError("ERROR", "Error", 500)

      handleError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.API.SERVER_ERROR.title,
        { description: ERROR_MESSAGES.API.SERVER_ERROR.message }
      )
    })

    it("delegates to handleNetworkError for TypeError when offline", () => {
      Object.defineProperty(navigator, "onLine", {
        writable: true,
        value: false,
      })

      const error = new TypeError("Network error")

      handleError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.NETWORK.OFFLINE.title,
        { description: ERROR_MESSAGES.NETWORK.OFFLINE.message }
      )
    })

    it("shows generic error message for unknown errors", () => {
      const error = new Error("Unknown error")

      handleError(error)

      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGES.GENERAL.UNKNOWN.title,
        { description: ERROR_MESSAGES.GENERAL.UNKNOWN.message }
      )
    })
  })

  describe("AppError", () => {
    it("creates AppError with all properties", () => {
      const error = new AppError("TEST_ERROR", "Test message", 400, { detail: "test" })

      expect(error.code).toBe("TEST_ERROR")
      expect(error.message).toBe("Test message")
      expect(error.statusCode).toBe(400)
      expect(error.details).toEqual({ detail: "test" })
      expect(error.name).toBe("AppError")
    })
  })
})
