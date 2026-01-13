import { test, expect } from '@playwright/test'

test.describe('Product Management E2E', () => {
  const adminEmail = 'admin@elurc-market.com'
  const adminPassword = 'admin123'
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/admin/login`)
    await page.fill('input[name="email"]', adminEmail)
    await page.fill('input[name="password"]', adminPassword)
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/admin/)
  })

  test('should navigate to products collection', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_products`)
    
    await expect(page).toHaveURL(/\/admin\/collections\/cms_products/)
    await expect(page.locator('text=/products/i')).toBeVisible()
  })

  test('should create a new product', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_products`)
    
    await page.click('text=/create new/i')
    
    await page.fill('input[name="name"]', `E2E Test Product ${Date.now()}`)
    await page.fill('textarea[name="description"]', 'This is a test product created by E2E tests')
    await page.fill('input[name="price_elurc"]', '1000')
    await page.fill('input[name="price_eur"]', '10000')
    await page.fill('input[name="stock"]', '50')
    
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=/saved|success/i')).toBeVisible({ timeout: 10000 })
  })

  test('should edit an existing product', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_products`)
    
    const firstProduct = page.locator('table tbody tr').first()
    await firstProduct.click()
    
    await page.fill('input[name="price_elurc"]', '2000')
    await page.fill('input[name="stock"]', '100')
    
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=/saved|updated/i')).toBeVisible({ timeout: 10000 })
  })

  test('should filter products by search', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_products`)
    
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]')
    if (await searchInput.isVisible()) {
      await searchInput.fill('Test')
      
      await page.waitForTimeout(1000)
      
      const results = page.locator('table tbody tr')
      const count = await results.count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test('should show product details', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_products`)
    
    const firstProduct = page.locator('table tbody tr').first()
    await firstProduct.click()
    
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="price_elurc"]')).toBeVisible()
    await expect(page.locator('input[name="stock"]')).toBeVisible()
  })

  test('should update stock and auto-update in_stock status', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_products`)
    
    const firstProduct = page.locator('table tbody tr').first()
    await firstProduct.click()
    
    await page.fill('input[name="stock"]', '0')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=/saved|updated/i')).toBeVisible({ timeout: 10000 })
    
    const inStockCheckbox = page.locator('input[name="in_stock"]')
    await expect(inStockCheckbox).not.toBeChecked()
  })

  test('should navigate to categories collection', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_categories`)
    
    await expect(page).toHaveURL(/\/admin\/collections\/cms_categories/)
    await expect(page.locator('text=/categories/i')).toBeVisible()
  })

  test('should create a new category', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_categories`)
    
    await page.click('text=/create new/i')
    
    await page.fill('input[name="name"]', `E2E Test Category ${Date.now()}`)
    await page.fill('textarea[name="description"]', 'Test category description')
    
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=/saved|success/i')).toBeVisible({ timeout: 10000 })
  })

  test('should auto-generate slug from product name', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_products`)
    
    await page.click('text=/create new/i')
    
    const productName = `Test Product With Spaces ${Date.now()}`
    await page.fill('input[name="name"]', productName)
    
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=/saved|success/i')).toBeVisible({ timeout: 10000 })
    
    const slugInput = page.locator('input[name="slug"]')
    const slugValue = await slugInput.inputValue()
    expect(slugValue).toMatch(/test-product-with-spaces/)
  })

  test('should show validation errors for required fields', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_products`)
    
    await page.click('text=/create new/i')
    
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=/required|field is required/i')).toBeVisible()
  })

  test('should delete a product', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_products`)
    
    await page.click('text=/create new/i')
    
    await page.fill('input[name="name"]', `Delete Test ${Date.now()}`)
    await page.fill('input[name="price_elurc"]', '100')
    await page.fill('input[name="price_eur"]', '1000')
    await page.fill('input[name="stock"]', '10')
    
    await page.click('button[type="submit"]')
    await expect(page.locator('text=/saved|success/i')).toBeVisible({ timeout: 10000 })
    
    const deleteButton = page.locator('button:has-text("Delete"), button:has-text("delete")')
    if (await deleteButton.isVisible()) {
      await deleteButton.click()
      
      const confirmButton = page.locator('button:has-text("Confirm"), button:has-text("confirm"), button:has-text("Delete"), button:has-text("delete")')
      await confirmButton.last().click()
      
      await expect(page).toHaveURL(/\/admin\/collections\/cms_products/)
    }
  })

  test('should paginate through products', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/cms_products`)
    
    const pagination = page.locator('nav[aria-label="pagination"], .pagination')
    if (await pagination.isVisible()) {
      const nextButton = page.locator('button:has-text("Next"), a:has-text("Next")')
      if (await nextButton.isVisible() && await nextButton.isEnabled()) {
        await nextButton.click()
        await page.waitForTimeout(500)
        await expect(page).toHaveURL(/page=2/)
      }
    }
  })
})
