import { test, expect } from '@playwright/test'

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    await page.evaluate(() => localStorage.clear())
  })

  test('adds product to cart from detail page', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    await page.waitForURL(/\/products\//)
    
    const addButton = page.locator('button:has-text("Add")')
    await addButton.click()
    
    await expect(page.locator('text=/Added.*to cart/')).toBeVisible()
    
    const cartBadge = page.locator('header').locator('text=/^[1-9]/')
    await expect(cartBadge).toBeVisible()
  })

  test('adds product via quick-add button', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    const quickAddButton = firstProduct.locator('button:has-text("Add to Cart")')
    await quickAddButton.click()
    
    await expect(page.locator('text=/added to cart/')).toBeVisible()
    
    const cartBadge = page.locator('header').locator('text=/^1$/')
    await expect(cartBadge).toBeVisible()
  })

  test('cart badge updates when adding multiple items', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const productCards = page.locator('[data-testid="product-card"]')
    const count = await productCards.count()
    
    if (count > 1) {
      await productCards.first().locator('button:has-text("Add to Cart")').click()
      await page.waitForTimeout(500)
      
      let cartBadge = page.locator('header').locator('text=/^1$/')
      await expect(cartBadge).toBeVisible()
      
      await productCards.nth(1).locator('button:has-text("Add to Cart")').click()
      await page.waitForTimeout(500)
      
      cartBadge = page.locator('header').locator('text=/^2$/')
      await expect(cartBadge).toBeVisible()
    }
  })

  test('cart persists across page refresh', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.locator('button:has-text("Add to Cart")').click()
    
    await page.waitForTimeout(500)
    
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    const cartBadge = page.locator('header').locator('text=/^1$/')
    await expect(cartBadge).toBeVisible()
  })

  test('cart badge shows correct count for multiple quantities', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    await page.waitForURL(/\/products\//)
    
    const incrementButton = page.locator('button[aria-label="Increase quantity"]')
    await incrementButton.click()
    await incrementButton.click()
    
    const addButton = page.locator('button:has-text("Add")')
    await addButton.click()
    
    await page.waitForTimeout(500)
    
    const cartBadge = page.locator('header').locator('text=/^3$/')
    await expect(cartBadge).toBeVisible()
  })

  test('cart badge not visible when cart is empty', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const cartBadge = page.locator('header').locator('.absolute.-top-2.-right-2')
    await expect(cartBadge).not.toBeVisible()
  })

  test('cart badge shows 99+ for large quantities', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    await page.evaluate(() => {
      const mockProduct = {
        id: '1',
        name: 'Test Product',
        slug: 'test-product',
        price_elurc: 1000000,
        price_eur: 300,
        stock: 200,
        in_stock: true,
        category: { id: 'cat1', name: 'Test', slug: 'test' },
        images: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      const store = (window as any).useCartStore?.getState()
      if (store) {
        store.addItem(mockProduct, 100)
      }
    })
    
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    const cartBadge = page.locator('header').locator('text="99+"')
    await expect(cartBadge).toBeVisible()
  })

  test('cart link in header navigates to cart page', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.locator('button:has-text("Add to Cart")').click()
    
    await page.waitForTimeout(500)
    
    const cartLink = page.locator('header').locator('a[href="/cart"]').first()
    await cartLink.click()
    
    await expect(page).toHaveURL('/cart')
  })
})
