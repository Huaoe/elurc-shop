import { WalletError } from "@solana/wallet-adapter-base"
import { ERROR_MESSAGES } from "./error-messages"

export const getWalletErrorMessage = (error: unknown) => {
  if (error instanceof WalletError) {
    switch (error.name) {
      case "WalletNotConnectedError":
        return ERROR_MESSAGES.WALLET.NOT_CONNECTED
      case "WalletConnectionError":
        return ERROR_MESSAGES.WALLET.CONNECTION_FAILED
      case "WalletDisconnectedError":
        return ERROR_MESSAGES.WALLET.CONNECTION_FAILED
      case "WalletSignTransactionError":
        return ERROR_MESSAGES.WALLET.TRANSACTION_REJECTED
      default:
        return ERROR_MESSAGES.WALLET.CONNECTION_FAILED
    }
  }

  const errorMessage = error instanceof Error ? error.message.toLowerCase() : ""

  if (errorMessage.includes("user rejected")) {
    return ERROR_MESSAGES.WALLET.TRANSACTION_REJECTED
  }

  if (errorMessage.includes("insufficient")) {
    return ERROR_MESSAGES.WALLET.INSUFFICIENT_BALANCE
  }

  if (errorMessage.includes("wrong network") || errorMessage.includes("network")) {
    return ERROR_MESSAGES.WALLET.WRONG_NETWORK
  }

  return ERROR_MESSAGES.WALLET.CONNECTION_FAILED
}

export const isWalletError = (error: unknown): error is WalletError => {
  return error instanceof WalletError
}
