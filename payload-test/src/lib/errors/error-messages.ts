export const ERROR_MESSAGES = {
  NETWORK: {
    OFFLINE: {
      title: "No Internet Connection",
      message: "Please check your internet connection and try again.",
      action: "Retry",
    },
    TIMEOUT: {
      title: "Request Timeout",
      message: "The request took too long to complete. Please try again.",
      action: "Retry",
    },
    FAILED: {
      title: "Network Error",
      message: "Unable to connect to the server. Please check your connection.",
      action: "Retry",
    },
  },
  WALLET: {
    NOT_CONNECTED: {
      title: "Wallet Not Connected",
      message: "Please connect your wallet to continue.",
      action: "Connect Wallet",
    },
    WRONG_NETWORK: {
      title: "Wrong Network",
      message: "Please switch to Solana Mainnet to continue.",
      action: "Switch Network",
    },
    INSUFFICIENT_BALANCE: {
      title: "Insufficient Balance",
      message: "You don't have enough SOL to complete this transaction.",
      action: "Add Funds",
    },
    TRANSACTION_REJECTED: {
      title: "Transaction Rejected",
      message: "You rejected the transaction in your wallet.",
      action: "Try Again",
    },
    CONNECTION_FAILED: {
      title: "Connection Failed",
      message: "Failed to connect to your wallet. Please try again.",
      action: "Retry",
    },
  },
  PAYMENT: {
    FAILED: {
      title: "Payment Failed",
      message: "Your payment could not be processed. Please try again.",
      action: "Retry Payment",
    },
    TIMEOUT: {
      title: "Payment Timeout",
      message: "Payment was not received within the time limit.",
      action: "Start New Payment",
    },
    AMOUNT_MISMATCH: {
      title: "Incorrect Amount",
      message: "The payment amount doesn't match the order total.",
      action: "Contact Support",
    },
    TRANSACTION_ERROR: {
      title: "Transaction Error",
      message: "There was an error processing your transaction.",
      action: "Try Again",
    },
  },
  FORM: {
    REQUIRED_FIELD: "This field is required",
    INVALID_EMAIL: "Please enter a valid email address",
    INVALID_PHONE: "Please enter a valid phone number",
    INVALID_ADDRESS: "Please enter a valid address",
    MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
    MAX_LENGTH: (max: number) => `Must be no more than ${max} characters`,
  },
  API: {
    BAD_REQUEST: {
      title: "Invalid Request",
      message: "The request could not be processed. Please check your input.",
    },
    UNAUTHORIZED: {
      title: "Unauthorized",
      message: "You need to be logged in to perform this action.",
      action: "Sign In",
    },
    FORBIDDEN: {
      title: "Access Denied",
      message: "You don't have permission to access this resource.",
    },
    NOT_FOUND: {
      title: "Not Found",
      message: "The requested resource could not be found.",
    },
    SERVER_ERROR: {
      title: "Server Error",
      message: "Something went wrong on our end. Please try again later.",
      action: "Retry",
    },
    RATE_LIMIT: {
      title: "Too Many Requests",
      message: "You've made too many requests. Please wait a moment and try again.",
    },
  },
  GENERAL: {
    UNKNOWN: {
      title: "Something Went Wrong",
      message: "An unexpected error occurred. Please try again.",
      action: "Retry",
    },
  },
} as const

export type ErrorCategory = keyof typeof ERROR_MESSAGES
export type ErrorType<T extends ErrorCategory> = keyof typeof ERROR_MESSAGES[T]
