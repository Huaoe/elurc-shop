import { toast } from "sonner"
import { ERROR_MESSAGES } from "./error-messages"

export interface ErrorHandlerOptions {
  showToast?: boolean
  logError?: boolean
  customMessage?: string
}

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message)
    this.name = "AppError"
  }
}

export const handleNetworkError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
): void => {
  const { showToast = true, logError = true } = options

  if (logError) {
    console.error("[Network Error]", error)
  }

  if (!navigator.onLine) {
    if (showToast) {
      toast.error(ERROR_MESSAGES.NETWORK.OFFLINE.title, {
        description: ERROR_MESSAGES.NETWORK.OFFLINE.message,
      })
    }
    return
  }

  if (error instanceof Error && error.name === "AbortError") {
    if (showToast) {
      toast.error(ERROR_MESSAGES.NETWORK.TIMEOUT.title, {
        description: ERROR_MESSAGES.NETWORK.TIMEOUT.message,
      })
    }
    return
  }

  if (showToast) {
    toast.error(ERROR_MESSAGES.NETWORK.FAILED.title, {
      description: options.customMessage || ERROR_MESSAGES.NETWORK.FAILED.message,
    })
  }
}

export const handleWalletError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
): void => {
  const { showToast = true, logError = true } = options

  if (logError) {
    console.error("[Wallet Error]", error)
  }

  const errorMessage = error instanceof Error ? error.message.toLowerCase() : ""

  if (errorMessage.includes("user rejected")) {
    if (showToast) {
      toast.error(ERROR_MESSAGES.WALLET.TRANSACTION_REJECTED.title, {
        description: ERROR_MESSAGES.WALLET.TRANSACTION_REJECTED.message,
      })
    }
    return
  }

  if (errorMessage.includes("insufficient")) {
    if (showToast) {
      toast.error(ERROR_MESSAGES.WALLET.INSUFFICIENT_BALANCE.title, {
        description: ERROR_MESSAGES.WALLET.INSUFFICIENT_BALANCE.message,
      })
    }
    return
  }

  if (showToast) {
    toast.error(ERROR_MESSAGES.WALLET.CONNECTION_FAILED.title, {
      description: options.customMessage || ERROR_MESSAGES.WALLET.CONNECTION_FAILED.message,
    })
  }
}

export const handlePaymentError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
): void => {
  const { showToast = true, logError = true } = options

  if (logError) {
    console.error("[Payment Error]", error)
  }

  if (error instanceof AppError) {
    if (error.code === "PAYMENT_TIMEOUT") {
      if (showToast) {
        toast.error(ERROR_MESSAGES.PAYMENT.TIMEOUT.title, {
          description: ERROR_MESSAGES.PAYMENT.TIMEOUT.message,
        })
      }
      return
    }

    if (error.code === "AMOUNT_MISMATCH") {
      if (showToast) {
        toast.error(ERROR_MESSAGES.PAYMENT.AMOUNT_MISMATCH.title, {
          description: ERROR_MESSAGES.PAYMENT.AMOUNT_MISMATCH.message,
        })
      }
      return
    }
  }

  if (showToast) {
    toast.error(ERROR_MESSAGES.PAYMENT.FAILED.title, {
      description: options.customMessage || ERROR_MESSAGES.PAYMENT.FAILED.message,
    })
  }
}

export const handleApiError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
): void => {
  const { showToast = true, logError = true } = options

  if (logError) {
    console.error("[API Error]", error)
  }

  if (error instanceof AppError) {
    const statusCode = error.statusCode || 500

    if (statusCode === 400) {
      if (showToast) {
        toast.error(ERROR_MESSAGES.API.BAD_REQUEST.title, {
          description: options.customMessage || ERROR_MESSAGES.API.BAD_REQUEST.message,
        })
      }
      return
    }

    if (statusCode === 401) {
      if (showToast) {
        toast.error(ERROR_MESSAGES.API.UNAUTHORIZED.title, {
          description: ERROR_MESSAGES.API.UNAUTHORIZED.message,
        })
      }
      return
    }

    if (statusCode === 403) {
      if (showToast) {
        toast.error(ERROR_MESSAGES.API.FORBIDDEN.title, {
          description: ERROR_MESSAGES.API.FORBIDDEN.message,
        })
      }
      return
    }

    if (statusCode === 404) {
      if (showToast) {
        toast.error(ERROR_MESSAGES.API.NOT_FOUND.title, {
          description: ERROR_MESSAGES.API.NOT_FOUND.message,
        })
      }
      return
    }

    if (statusCode === 429) {
      if (showToast) {
        toast.error(ERROR_MESSAGES.API.RATE_LIMIT.title, {
          description: ERROR_MESSAGES.API.RATE_LIMIT.message,
        })
      }
      return
    }
  }

  if (showToast) {
    toast.error(ERROR_MESSAGES.API.SERVER_ERROR.title, {
      description: options.customMessage || ERROR_MESSAGES.API.SERVER_ERROR.message,
    })
  }
}

export const handleError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
): void => {
  const { showToast = true, logError = true } = options

  if (logError) {
    console.error("[Error]", error)
  }

  if (error instanceof AppError) {
    handleApiError(error, options)
    return
  }

  if (error instanceof TypeError && !navigator.onLine) {
    handleNetworkError(error, options)
    return
  }

  if (showToast) {
    toast.error(ERROR_MESSAGES.GENERAL.UNKNOWN.title, {
      description: options.customMessage || ERROR_MESSAGES.GENERAL.UNKNOWN.message,
    })
  }
}
