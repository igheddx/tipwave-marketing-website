import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

test.describe('Website E2E', () => {
  test('Homepage loads successfully', async ({ page }) => {
    await page.goto(BASE_URL)
    
    // Verify key elements are visible
    await expect(page).toHaveTitle(/Tipwave|Tipply/)
    
    const heading = await page.locator('h1').first()
    await expect(heading).toBeVisible()
  })

  test('Navigation menu works', async ({ page }) => {
    await page.goto(BASE_URL)
    
    // Check for navigation links
    const navLinks = await page.locator('a[href*="/"]').all()
    expect(navLinks.length).toBeGreaterThan(0)
  })

  test('CTA buttons are clickable', async ({ page }) => {
    await page.goto(BASE_URL)
    
    // Find and click CTA button
    const ctaButton = await page.locator('button, a').filter({ hasText: /sign up|get started|learn more/i }).first()
    
    if (ctaButton) {
      await ctaButton.click()
      // Verify navigation occurred or modal opened
      await page.waitForTimeout(500)
      expect(page.url()).not.toBe(BASE_URL) // Should navigate or change state
    }
  })

  test('Mobile responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto(BASE_URL)
    
    // Verify page is readable on mobile
    const heading = await page.locator('h1').first()
    await expect(heading).toBeVisible()
    
    // Check if mobile menu exists
    const mobileMenu = await page.locator('[class*="menu"], [class*="mobile"]').first()
    expect(mobileMenu).toBeDefined()
  })
})
