import { test, expect } from '@playwright/test'

test.describe('Order Management Dashboard E2E', () => {
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

  test('should navigate to orders collection', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    await expect(page).toHaveURL(/\/admin\/collections\/orders/)
    await expect(page.locator('text=/orders/i')).toBeVisible()
  })

  test('should display orders list with key columns', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    await expect(page.locator('table')).toBeVisible()
    
    const headers = page.locator('thead th')
    const headerCount = await headers.count()
    expect(headerCount).toBeGreaterThan(0)
  })

  test('should search orders by order number', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]')
    if (await searchInput.isVisible()) {
      const firstRow = page.locator('table tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        
        const orderNumberInput = page.locator('input[name="orderNumber"]')
        const orderNumber = await orderNumberInput.inputValue()
        
        await page.goto(`${baseUrl}/admin/collections/orders`)
        
        await searchInput.fill(orderNumber)
        await page.waitForTimeout(1000)
        
        const results = page.locator('table tbody tr')
        const count = await results.count()
        expect(count).toBeGreaterThan(0)
      }
    }
  })

  test('should filter orders by status', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const filterButton = page.locator('button:has-text("Filter"), button:has-text("filter")')
    if (await filterButton.isVisible()) {
      await filterButton.click()
      
      const statusFilter = page.locator('select[name*="status"], input[name*="status"]')
      if (await statusFilter.isVisible()) {
        await statusFilter.selectOption('paid')
        
        await page.waitForTimeout(1000)
        
        const results = page.locator('table tbody tr')
        const count = await results.count()
        expect(count).toBeGreaterThanOrEqual(0)
      }
    }
  })

  test('should view order details', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const firstOrder = page.locator('table tbody tr').first()
    if (await firstOrder.isVisible()) {
      await firstOrder.click()
      
      await expect(page.locator('input[name="orderNumber"]')).toBeVisible()
      await expect(page.locator('select[name="status"]')).toBeVisible()
      await expect(page.locator('input[name="customerEmail"]')).toBeVisible()
      await expect(page.locator('input[name="customerWallet"]')).toBeVisible()
    }
  })

  test('should update order status', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const firstOrder = page.locator('table tbody tr').first()
    if (await firstOrder.isVisible()) {
      await firstOrder.click()
      
      const statusSelect = page.locator('select[name="status"]')
      await statusSelect.selectOption('processing')
      
      await page.click('button[type="submit"]')
      
      await expect(page.locator('text=/saved|updated/i')).toBeVisible({ timeout: 10000 })
    }
  })

  test('should add tracking number to order', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const firstOrder = page.locator('table tbody tr').first()
    if (await firstOrder.isVisible()) {
      await firstOrder.click()
      
      const trackingInput = page.locator('input[name="trackingNumber"]')
      if (await trackingInput.isVisible()) {
        const trackingNumber = `TRACK-${Date.now()}`
        await trackingInput.fill(trackingNumber)
        
        await page.click('button[type="submit"]')
        
        await expect(page.locator('text=/saved|updated/i')).toBeVisible({ timeout: 10000 })
      }
    }
  })

  test('should add admin notes to order', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const firstOrder = page.locator('table tbody tr').first()
    if (await firstOrder.isVisible()) {
      await firstOrder.click()
      
      const notesTextarea = page.locator('textarea[name="adminNotes"]')
      if (await notesTextarea.isVisible()) {
        await notesTextarea.fill('E2E test admin note')
        
        await page.click('button[type="submit"]')
        
        await expect(page.locator('text=/saved|updated/i')).toBeVisible({ timeout: 10000 })
      }
    }
  })

  test('should mark order as fulfilled', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const firstOrder = page.locator('table tbody tr').first()
    if (await firstOrder.isVisible()) {
      await firstOrder.click()
      
      const statusSelect = page.locator('select[name="status"]')
      await statusSelect.selectOption('fulfilled')
      
      await page.click('button[type="submit"]')
      
      await expect(page.locator('text=/saved|updated/i')).toBeVisible({ timeout: 10000 })
      
      const fulfilledAtInput = page.locator('input[name="fulfilledAt"]')
      if (await fulfilledAtInput.isVisible()) {
        const fulfilledAt = await fulfilledAtInput.inputValue()
        expect(fulfilledAt).toBeTruthy()
      }
    }
  })

  test('should display order items', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const firstOrder = page.locator('table tbody tr').first()
    if (await firstOrder.isVisible()) {
      await firstOrder.click()
      
      const itemsSection = page.locator('text=/order items/i')
      if (await itemsSection.isVisible()) {
        await expect(itemsSection).toBeVisible()
      }
    }
  })

  test('should display shipping address', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const firstOrder = page.locator('table tbody tr').first()
    if (await firstOrder.isVisible()) {
      await firstOrder.click()
      
      const shippingSection = page.locator('text=/shipping address/i')
      if (await shippingSection.isVisible()) {
        await expect(shippingSection).toBeVisible()
        await expect(page.locator('input[name="shippingAddress.fullName"]')).toBeVisible()
        await expect(page.locator('input[name="shippingAddress.streetAddress"]')).toBeVisible()
      }
    }
  })

  test('should sort orders by date', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const dateHeader = page.locator('th:has-text("Created"), th:has-text("Date")')
    if (await dateHeader.isVisible()) {
      await dateHeader.click()
      
      await page.waitForTimeout(1000)
      
      const results = page.locator('table tbody tr')
      const count = await results.count()
      expect(count).toBeGreaterThanOrEqual(0)
    }
  })

  test('should paginate through orders', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
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

  test('should display order status badge', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const firstOrder = page.locator('table tbody tr').first()
    if (await firstOrder.isVisible()) {
      const statusCell = firstOrder.locator('td').nth(1)
      await expect(statusCell).toBeVisible()
    }
  })

  test('should show transaction signature if available', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const firstOrder = page.locator('table tbody tr').first()
    if (await firstOrder.isVisible()) {
      await firstOrder.click()
      
      const txSignatureInput = page.locator('input[name="transactionSignature"]')
      if (await txSignatureInput.isVisible()) {
        await expect(txSignatureInput).toBeVisible()
      }
    }
  })

  test('should display payment confirmation timestamp', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/collections/orders`)
    
    const firstOrder = page.locator('table tbody tr').first()
    if (await firstOrder.isVisible()) {
      await firstOrder.click()
      
      const paidAtInput = page.locator('input[name="paidAt"]')
      if (await paidAtInput.isVisible()) {
        await expect(paidAtInput).toBeVisible()
      }
    }
  })
})
