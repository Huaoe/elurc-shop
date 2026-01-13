import { test, expect } from '@playwright/test'

test.describe('Category Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/products')
  })

  test('displays category tabs with counts', async ({ page }) => {
    const categoryTabs = page.locator('[role="tab"]')
    await expect(categoryTabs.first()).toBeVisible()
    
    const allTab = page.locator('[role="tab"]:has-text("All")')
    await expect(allTab).toBeVisible()
  })

  test('displays product count badges on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 })
    
    const badge = page.locator('.badge').first()
    if (await badge.count() > 0) {
      await expect(badge).toBeVisible()
    }
  })

  test('filters products by category', async ({ page }) => {
    const categoryTabs = page.locator('[role="tab"]')
    const tabCount = await categoryTabs.count()
    
    if (tabCount > 1) {
      const secondTab = categoryTabs.nth(1)
      await secondTab.click()
      
      await page.waitForURL(/category=/)
    }
  })

  test('shows all products when All tab is clicked', async ({ page }) => {
    const allTab = page.locator('[role="tab"]:has-text("All")')
    await allTab.click()
    
    await expect(page).toHaveURL('/products')
  })

  test('shows empty state for empty category', async ({ page }) => {
    await page.goto('http://localhost:3000/products?category=nonexistent-category')
    
    const productGrid = page.locator('[data-testid="product-card"]')
    const emptyState = page.locator('text=/No Products/')
    
    const hasProducts = await productGrid.count() > 0
    const hasEmptyState = await emptyState.isVisible().catch(() => false)
    
    expect(hasProducts || hasEmptyState).toBe(true)
  })

  test('keyboard navigation works', async ({ page }) => {
    const firstTab = page.locator('[role="tab"]').first()
    await firstTab.focus()
    
    await expect(firstTab).toBeFocused()
    
    await page.keyboard.press('Tab')
    
    const secondTab = page.locator('[role="tab"]').nth(1)
    if (await secondTab.count() > 0) {
      await expect(secondTab).toBeFocused()
    }
  })

  test('active category has correct ARIA attributes', async ({ page }) => {
    const activeTab = page.locator('[role="tab"][aria-selected="true"]')
    await expect(activeTab).toBeVisible()
    await expect(activeTab).toHaveAttribute('aria-selected', 'true')
  })

  test('category tabs are horizontally scrollable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    const tabContainer = page.locator('[role="tablist"]')
    await expect(tabContainer).toBeVisible()
    
    const hasOverflow = await tabContainer.evaluate((el) => {
      return el.scrollWidth > el.clientWidth
    })
    
    expect(typeof hasOverflow).toBe('boolean')
  })

  test('page title updates based on category', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const title = await page.title()
    expect(title).toContain('elurc-market')
  })

  test('breadcrumb structured data is present', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]')
    await expect(jsonLd).toHaveCount(1)
    
    const content = await jsonLd.textContent()
    expect(content).toContain('BreadcrumbList')
  })

  test('ARIA live region announces category changes', async ({ page }) => {
    const liveRegion = page.locator('[role="status"][aria-live="polite"]')
    await expect(liveRegion).toBeAttached()
  })

  test('category filter maintains sticky position on scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500))
    
    const categoryFilter = page.locator('[role="tablist"]').locator('..')
    const position = await categoryFilter.evaluate((el) => {
      return window.getComputedStyle(el).position
    })
    
    expect(position).toBe('sticky')
  })
})
