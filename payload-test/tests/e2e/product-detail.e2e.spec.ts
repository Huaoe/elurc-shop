import { test, expect } from '@playwright/test'

test.describe('Product Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('displays product detail page with valid slug', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=/ELURC/')).toBeVisible()
    await expect(page.locator('text=/€/')).toBeVisible()
  })

  test('shows 404 page for invalid product slug', async ({ page }) => {
    await page.goto('http://localhost:3000/products/invalid-product-slug-12345')
    
    await expect(page.locator('h1:has-text("Product Not Found")')).toBeVisible()
    await expect(page.locator('text=/doesn\'t exist or has been removed/')).toBeVisible()
    
    const browseButton = page.locator('a:has-text("Browse All Products")')
    await expect(browseButton).toBeVisible()
  })

  test('image gallery displays and navigates correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    const image = page.locator('img').first()
    await expect(image).toBeVisible()
    
    const nextButton = page.locator('button[aria-label*="next"]').first()
    if (await nextButton.isVisible()) {
      await nextButton.click()
      await page.waitForTimeout(300)
    }
  })

  test('quantity selector works correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    const quantityInput = page.locator('input[type="number"][aria-label="Quantity"]')
    await expect(quantityInput).toBeVisible()
    
    const initialValue = await quantityInput.inputValue()
    expect(initialValue).toBe('1')
    
    const incrementButton = page.locator('button[aria-label="Increase quantity"]')
    await incrementButton.click()
    
    const newValue = await quantityInput.inputValue()
    expect(newValue).toBe('2')
    
    const decrementButton = page.locator('button[aria-label="Decrease quantity"]')
    await decrementButton.click()
    
    const finalValue = await quantityInput.inputValue()
    expect(finalValue).toBe('1')
  })

  test('add to cart button shows loading state and success toast', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    const addToCartButton = page.locator('button:has-text("Add")')
    await expect(addToCartButton).toBeVisible()
    await expect(addToCartButton).toBeEnabled()
    
    await addToCartButton.click()
    
    await expect(page.locator('text=/Added.*to cart/')).toBeVisible({ timeout: 3000 })
  })

  test('back button navigates to product listing', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    const backButton = page.locator('a:has-text("Back to Products")')
    await expect(backButton).toBeVisible()
    await backButton.click()
    
    await expect(page).toHaveURL(/\/products/)
  })

  test('displays product information correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    await expect(page.locator('h1')).toBeVisible()
    
    await expect(page.locator('text=/ELURC/')).toBeVisible()
    await expect(page.locator('text=/€/')).toBeVisible()
    
    const stockBadge = page.locator('text=/Stock|In Stock|Out of Stock/')
    await expect(stockBadge).toBeVisible()
    
    await expect(page.locator('h2:has-text("Description")')).toBeVisible()
    await expect(page.locator('h2:has-text("Details")')).toBeVisible()
  })

  test('page has correct SEO metadata', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    const title = await page.title()
    expect(title).toContain('elurc-market')
    
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveCount(1)
    
    const jsonLd = page.locator('script[type="application/ld+json"]')
    await expect(jsonLd).toHaveCount(1)
  })

  test('responsive layout on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    const addToCartBar = page.locator('div.sticky')
    await expect(addToCartBar).toBeVisible()
    
    const image = page.locator('img').first()
    await expect(image).toBeVisible()
  })

  test('keyboard navigation works for quantity selector', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    const quantityInput = page.locator('input[type="number"][aria-label="Quantity"]')
    await quantityInput.focus()
    
    await quantityInput.fill('5')
    const value = await quantityInput.inputValue()
    expect(value).toBe('5')
  })
})
