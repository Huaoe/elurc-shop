import { ERROR_MESSAGES } from "./error-messages"

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export const validateField = (
  value: string,
  rules: ValidationRule
): ValidationResult => {
  if (rules.required && !value.trim()) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FORM.REQUIRED_FIELD,
    }
  }

  if (rules.minLength && value.length < rules.minLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FORM.MIN_LENGTH(rules.minLength),
    }
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FORM.MAX_LENGTH(rules.maxLength),
    }
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return {
      isValid: false,
      error: "Invalid format",
    }
  }

  if (rules.custom) {
    const customError = rules.custom(value)
    if (customError) {
      return {
        isValid: false,
        error: customError,
      }
    }
  }

  return { isValid: true }
}

export const validateEmail = (email: string): ValidationResult => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email.trim()) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FORM.REQUIRED_FIELD,
    }
  }

  if (!emailPattern.test(email)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FORM.INVALID_EMAIL,
    }
  }

  return { isValid: true }
}

export const validatePhone = (phone: string): ValidationResult => {
  const phonePattern = /^\+?[\d\s-()]+$/
  
  if (!phone.trim()) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FORM.REQUIRED_FIELD,
    }
  }

  if (!phonePattern.test(phone) || phone.replace(/\D/g, "").length < 10) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FORM.INVALID_PHONE,
    }
  }

  return { isValid: true }
}
