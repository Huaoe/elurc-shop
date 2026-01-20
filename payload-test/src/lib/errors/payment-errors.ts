import { ERROR_MESSAGES } from "./error-messages"
import { AppError } from "./error-handler"

export enum PaymentErrorCode {
  TIMEOUT = "PAYMENT_TIMEOUT",
  AMOUNT_MISMATCH = "AMOUNT_MISMATCH",
  TRANSACTION_FAILED = "TRANSACTION_FAILED",
  INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
  INVALID_ADDRESS = "INVALID_ADDRESS",
}

export class PaymentError extends AppError {
  constructor(code: PaymentErrorCode, message: string, details?: unknown) {
    super(code, message, 400, details)
    this.name = "PaymentError"
  }
}

export const getPaymentErrorMessage = (error: unknown) => {
  if (error instanceof PaymentError) {
    switch (error.code) {
      case PaymentErrorCode.TIMEOUT:
        return ERROR_MESSAGES.PAYMENT.TIMEOUT
      case PaymentErrorCode.AMOUNT_MISMATCH:
        return ERROR_MESSAGES.PAYMENT.AMOUNT_MISMATCH
      case PaymentErrorCode.INSUFFICIENT_FUNDS:
        return ERROR_MESSAGES.WALLET.INSUFFICIENT_BALANCE
      case PaymentErrorCode.TRANSACTION_FAILED:
        return ERROR_MESSAGES.PAYMENT.TRANSACTION_ERROR
      default:
        return ERROR_MESSAGES.PAYMENT.FAILED
    }
  }

  return ERROR_MESSAGES.PAYMENT.FAILED
}

export const isPaymentError = (error: unknown): error is PaymentError => {
  return error instanceof PaymentError
}
