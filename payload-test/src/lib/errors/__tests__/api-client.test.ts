import { describe, it, expect, vi, beforeEach } from "vitest"
import { ApiClient } from "../../api/api-client"
import { AppError } from "../error-handler"

global.fetch = vi.fn()

describe("ApiClient", () => {
  let apiClient: ApiClient

  beforeEach(() => {
    apiClient = new ApiClient("https://api.example.com")
    vi.clearAllMocks()
  })

  describe("GET requests", () => {
    it("makes successful GET request", async () => {
      const mockData = { id: 1, name: "Test" }
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await apiClient.get("/test")

      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.example.com/test",
        expect.objectContaining({ method: "GET" })
      )
      expect(result).toEqual(mockData)
    })

    it("throws AppError on 404", async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
        json: async () => ({ message: "Resource not found" }),
      })

      await expect(apiClient.get("/test")).rejects.toThrow(AppError)
    })

    it("throws AppError on 500", async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        json: async () => ({ message: "Server error" }),
      })

      await expect(apiClient.get("/test")).rejects.toThrow(AppError)
    })
  })

  describe("POST requests", () => {
    it("makes successful POST request", async () => {
      const mockData = { id: 1, name: "Created" }
      const postData = { name: "New Item" }
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await apiClient.post("/test", postData)

      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.example.com/test",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(postData),
        })
      )
      expect(result).toEqual(mockData)
    })

    it("throws AppError on 400", async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        json: async () => ({ message: "Invalid data" }),
      })

      await expect(apiClient.post("/test", {})).rejects.toThrow(AppError)
    })
  })

  describe("timeout handling", () => {
    it("aborts request on timeout", async () => {
      ;(global.fetch as any).mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 5000)
          })
      )

      await expect(
        apiClient.get("/test", { timeout: 100 })
      ).rejects.toThrow()
    })
  })
})
