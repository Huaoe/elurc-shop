import { test, expect } from '@playwright/test'

test.describe('Admin Authentication E2E', () => {
  const adminEmail = 'admin@elurc-market.com'
  const adminPassword = 'admin123'
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl)
  })

  test('should redirect to login when accessing admin without authentication', async ({ page }) => {
    await page.goto(`${baseUrl}/admin`)
    
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('should successfully login as admin', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/login`)
    
    await page.fill('input[name="email"]', adminEmail)
    await page.fill('input[name="password"]', adminPassword)
    
    await page.click('button[type="submit"]')
    
    await expect(page).toHaveURL(/\/admin/)
    await expect(page.locator('text=Dashboard')).toBeVisible()
  })

  test('should show error message with invalid credentials', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/login`)
    
    await page.fill('input[name="email"]', adminEmail)
    await page.fill('input[name="password"]', 'wrongpassword')
    
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=/invalid|incorrect|error/i')).toBeVisible()
  })

  test('should maintain session across page refreshes', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/login`)
    
    await page.fill('input[name="email"]', adminEmail)
    await page.fill('input[name="password"]', adminPassword)
    await page.click('button[type="submit"]')
    
    await expect(page).toHaveURL(/\/admin/)
    
    await page.reload()
    
    await expect(page).toHaveURL(/\/admin/)
    await expect(page.locator('text=/logout|sign out/i')).toBeVisible()
  })

  test('should successfully logout', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/login`)
    
    await page.fill('input[name="email"]', adminEmail)
    await page.fill('input[name="password"]', adminPassword)
    await page.click('button[type="submit"]')
    
    await expect(page).toHaveURL(/\/admin/)
    
    await page.click('text=/logout|sign out/i')
    
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('should protect admin routes after logout', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/login`)
    
    await page.fill('input[name="email"]', adminEmail)
    await page.fill('input[name="password"]', adminPassword)
    await page.click('button[type="submit"]')
    
    await page.click('text=/logout|sign out/i')
    
    await page.goto(`${baseUrl}/admin`)
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('should allow admin to access user management', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/login`)
    
    await page.fill('input[name="email"]', adminEmail)
    await page.fill('input[name="password"]', adminPassword)
    await page.click('button[type="submit"]')
    
    await page.goto(`${baseUrl}/admin/collections/users`)
    
    await expect(page).toHaveURL(/\/admin\/collections\/users/)
    await expect(page.locator('text=/users|user management/i')).toBeVisible()
  })

  test('should allow admin to access product management', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/login`)
    
    await page.fill('input[name="email"]', adminEmail)
    await page.fill('input[name="password"]', adminPassword)
    await page.click('button[type="submit"]')
    
    await page.goto(`${baseUrl}/admin/collections/cms-products`)
    
    await expect(page).toHaveURL(/\/admin\/collections\/cms-products/)
  })

  test('should allow admin to access order management', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/login`)
    
    await page.fill('input[name="email"]', adminEmail)
    await page.fill('input[name="password"]', adminPassword)
    await page.click('button[type="submit"]')
    
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    await expect(page).toHaveURL(/\/admin\/collections\/orders/)
  })
})
