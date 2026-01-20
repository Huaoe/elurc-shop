import { AppError } from "../errors/error-handler"

export interface ApiRequestOptions extends RequestInit {
  timeout?: number
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl
  }

  private async fetchWithTimeout(
    url: string,
    options: ApiRequestOptions = {}
  ): Promise<Response> {
    const { timeout = 30000, ...fetchOptions } = options

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = "An error occurred"
      
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch {
        errorMessage = response.statusText || errorMessage
      }

      throw new AppError(
        `HTTP_${response.status}`,
        errorMessage,
        response.status
      )
    }

    return response.json()
  }

  async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: "GET",
    })
    return this.handleResponse<T>(response)
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: ApiRequestOptions
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: ApiRequestOptions
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: "DELETE",
    })
    return this.handleResponse<T>(response)
  }
}

export const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_URL || "/api"
)
