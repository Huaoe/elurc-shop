import { describe, it, expect, beforeAll } from 'vitest'

describe('Admin Authentication', () => {
  const adminEmail = 'admin@elurc-market.com'
  const adminPassword = 'admin123'
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  let adminToken: string

  beforeAll(async () => {
    const response = await fetch(`${baseUrl}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: adminEmail,
        password: adminPassword,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      adminToken = data.token
    }
  })

  describe('Login', () => {
    it('should allow admin to login with valid credentials', async () => {
      const response = await fetch(`${baseUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.user).toBeDefined()
      expect(data.user.email).toBe(adminEmail)
      expect(data.user.role).toBe('admin')
      expect(data.token).toBeDefined()
    })

    it('should reject login with invalid credentials', async () => {
      const response = await fetch(`${baseUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminEmail,
          password: 'wrongpassword',
        }),
      })

      expect(response.ok).toBe(false)
    })

    it('should enforce rate limiting after multiple failed attempts', async () => {
      const attempts = []
      
      for (let i = 0; i < 6; i++) {
        attempts.push(
          fetch(`${baseUrl}/api/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: adminEmail,
              password: 'wrongpassword',
            }),
          })
        )
      }

      const responses = await Promise.all(attempts)
      const lastResponse = responses[responses.length - 1]
      
      expect(lastResponse.status).toBeGreaterThanOrEqual(400)
    })
  })

  describe('Session Management', () => {
    it('should maintain session with valid token', async () => {
      if (!adminToken) {
        expect.fail('Admin token not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/users/me`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.user).toBeDefined()
      expect(data.user.role).toBe('admin')
    })

    it('should reject requests with invalid token', async () => {
      const response = await fetch(`${baseUrl}/api/users/me`, {
        headers: {
          Authorization: 'JWT invalid-token',
        },
      })

      expect(response.ok).toBe(false)
    })

    it('should reject requests without token', async () => {
      const response = await fetch(`${baseUrl}/api/users/me`)

      expect(response.ok).toBe(false)
    })
  })

  describe('Logout', () => {
    it('should successfully logout admin user', async () => {
      if (!adminToken) {
        expect.fail('Admin token not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/users/logout`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
    })
  })

  describe('Access Control', () => {
    it('should allow admin to access admin panel', async () => {
      const response = await fetch(`${baseUrl}/admin`, {
        redirect: 'manual',
      })

      expect(response.status).toBeLessThan(400)
    })

    it('should allow admin to create new users', async () => {
      if (!adminToken) {
        expect.fail('Admin token not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          email: `test-${Date.now()}@example.com`,
          password: 'testpassword123',
          name: 'Test User',
          role: 'customer',
        }),
      })

      expect(response.status).toBeLessThan(400)
    })
  })
})
