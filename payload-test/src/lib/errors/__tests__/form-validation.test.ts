import { describe, it, expect } from "vitest"
import { validateField, validateEmail, validatePhone } from "../form-validation"
import { ERROR_MESSAGES } from "../error-messages"

describe("Form Validation", () => {
  describe("validateField", () => {
    it("validates required fields", () => {
      const result = validateField("", { required: true })
      expect(result.isValid).toBe(false)
      expect(result.error).toBe(ERROR_MESSAGES.FORM.REQUIRED_FIELD)
    })

    it("passes validation for non-empty required fields", () => {
      const result = validateField("test", { required: true })
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it("validates minimum length", () => {
      const result = validateField("ab", { minLength: 3 })
      expect(result.isValid).toBe(false)
      expect(result.error).toBe(ERROR_MESSAGES.FORM.MIN_LENGTH(3))
    })

    it("passes minimum length validation", () => {
      const result = validateField("abc", { minLength: 3 })
      expect(result.isValid).toBe(true)
    })

    it("validates maximum length", () => {
      const result = validateField("abcdef", { maxLength: 5 })
      expect(result.isValid).toBe(false)
      expect(result.error).toBe(ERROR_MESSAGES.FORM.MAX_LENGTH(5))
    })

    it("passes maximum length validation", () => {
      const result = validateField("abcde", { maxLength: 5 })
      expect(result.isValid).toBe(true)
    })

    it("validates pattern", () => {
      const result = validateField("abc", { pattern: /^\d+$/ })
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("Invalid format")
    })

    it("passes pattern validation", () => {
      const result = validateField("123", { pattern: /^\d+$/ })
      expect(result.isValid).toBe(true)
    })

    it("validates custom rules", () => {
      const customRule = (value: string) =>
        value === "forbidden" ? "This value is not allowed" : null

      const result = validateField("forbidden", { custom: customRule })
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("This value is not allowed")
    })

    it("passes custom validation", () => {
      const customRule = (value: string) =>
        value === "forbidden" ? "This value is not allowed" : null

      const result = validateField("allowed", { custom: customRule })
      expect(result.isValid).toBe(true)
    })
  })

  describe("validateEmail", () => {
    it("validates empty email", () => {
      const result = validateEmail("")
      expect(result.isValid).toBe(false)
      expect(result.error).toBe(ERROR_MESSAGES.FORM.REQUIRED_FIELD)
    })

    it("validates invalid email format", () => {
      const result = validateEmail("invalid-email")
      expect(result.isValid).toBe(false)
      expect(result.error).toBe(ERROR_MESSAGES.FORM.INVALID_EMAIL)
    })

    it("validates invalid email without domain", () => {
      const result = validateEmail("test@")
      expect(result.isValid).toBe(false)
      expect(result.error).toBe(ERROR_MESSAGES.FORM.INVALID_EMAIL)
    })

    it("passes valid email validation", () => {
      const result = validateEmail("test@example.com")
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })
  })

  describe("validatePhone", () => {
    it("validates empty phone", () => {
      const result = validatePhone("")
      expect(result.isValid).toBe(false)
      expect(result.error).toBe(ERROR_MESSAGES.FORM.REQUIRED_FIELD)
    })

    it("validates invalid phone format", () => {
      const result = validatePhone("abc")
      expect(result.isValid).toBe(false)
      expect(result.error).toBe(ERROR_MESSAGES.FORM.INVALID_PHONE)
    })

    it("validates phone too short", () => {
      const result = validatePhone("123")
      expect(result.isValid).toBe(false)
      expect(result.error).toBe(ERROR_MESSAGES.FORM.INVALID_PHONE)
    })

    it("passes valid phone validation", () => {
      const result = validatePhone("1234567890")
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it("passes valid phone with formatting", () => {
      const result = validatePhone("+1 (234) 567-8900")
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })
  })
})
