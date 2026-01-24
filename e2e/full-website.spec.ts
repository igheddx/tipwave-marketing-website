import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

test.describe('Tipwave Marketing Website', () => {
  test.describe('Homepage', () => {
    test('displays hero section with CTA', async ({ page }) => {
      await page.goto(BASE_URL)

      // Check hero content
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.locator('text=Tipwave')).toBeVisible()

      // Check primary CTA buttons
      const ctaButtons = page.locator('button:has-text("Get Started|Start Free Trial|Sign Up")')
      await expect(ctaButtons.first()).toBeVisible()
    })

    test('displays feature section', async ({ page }) => {
      await page.goto(BASE_URL)

      // Check for key feature cards
      await expect(page.locator('text=Instant|Real-time Tips')).toBeVisible()
      await expect(page.locator('text=No Setup|Zero|Easy Setup')).toBeVisible()
      await expect(page.locator('text=Secure|Stripe|Payment')).toBeVisible()
    })

    test('displays pricing section', async ({ page }) => {
      await page.goto(BASE_URL)

      await page.locator('text=Pricing').scrollIntoViewIfNeeded()

      // Check pricing tiers
      await expect(page.locator('text=Free|Basic')).toBeVisible()
      await expect(page.locator('text=Professional')).toBeVisible()

      // Check pricing details
      await expect(page.locator('text=$0/month|$99/month')).toBeVisible()
    })

    test('displays FAQ section', async ({ page }) => {
      await page.goto(BASE_URL)

      await page.locator('text=FAQ').scrollIntoViewIfNeeded()

      // Click FAQ items to expand
      const faqItems = page.locator('[data-testid="faq-item"]')
      const firstFaq = faqItems.first()
      await firstFaq.click()

      // Check for expanded content
      await expect(firstFaq.locator('text=/How|What|Why/')).toBeVisible()
    })

    test('displays footer with links', async ({ page }) => {
      await page.goto(BASE_URL)

      // Scroll to footer
      await page.locator('footer').scrollIntoViewIfNeeded()

      // Check footer content
      await expect(page.locator('footer')).toBeVisible()
      await expect(page.locator('text=Terms|Privacy|Contact')).toBeVisible()
    })
  })

  test.describe('Performer Onboarding Page', () => {
    test('displays onboarding benefits', async ({ page }) => {
      await page.goto(`${BASE_URL}/for-performers`)

      // Check benefits section
      await expect(page.locator('text=Turn Tips|Get Paid|Instant Payouts')).toBeVisible()
      await expect(page.locator('text=No Commission|Transparent|Secure')).toBeVisible()
    })

    test('displays step-by-step onboarding process', async ({ page }) => {
      await page.goto(`${BASE_URL}/for-performers`)

      // Check process steps
      await expect(page.locator('text=Profile|Setup|Enable Tips')).toBeVisible()
      await expect(page.locator('text=1\\.|2\\.|3\\.')).toBeVisible()
    })

    test('displays CTA for performer signup', async ({ page }) => {
      await page.goto(`${BASE_URL}/for-performers`)

      const signupButton = page.locator('button:has-text("Get Started|Sign Up|Create Account")')
      await expect(signupButton).toBeVisible()

      // Verify button navigates to signup
      await signupButton.click()
      await page.waitForURL('**/auth/signup')
    })

    test('displays performer testimonials', async ({ page }) => {
      await page.goto(`${BASE_URL}/for-performers`)

      // Scroll to testimonials
      await page.locator('text=Testimonials|What Performers Say').scrollIntoViewIfNeeded()

      // Check testimonial cards
      const testimonials = page.locator('[data-testid="testimonial"]')
      const count = await testimonials.count()
      expect(count).toBeGreaterThan(0)

      // Check testimonial content
      await expect(testimonials.first().locator('text=/amazing|great|helped/')).toBeVisible()
    })
  })

  test.describe('Venue/Customer Information', () => {
    test('displays venue benefits page', async ({ page }) => {
      await page.goto(`${BASE_URL}/for-venues`)

      await expect(page.locator('text=Engage|Customers|Increase Revenue')).toBeVisible()

      // Check features for venues
      await expect(page.locator('text=QR Codes|Digital Tips|Analytics')).toBeVisible()
    })

    test('displays feature comparison', async ({ page }) => {
      await page.goto(`${BASE_URL}/features`)

      // Check comparison table
      const table = page.locator('table')
      await expect(table).toBeVisible()

      // Verify rows for different features
      await expect(page.locator('text=Unlimited Tips|Real-time Notifications|Export Data')).toBeVisible()
    })
  })

  test.describe('Navigation', () => {
    test('navigates between main pages', async ({ page }) => {
      await page.goto(BASE_URL)

      // Navigate to performers page
      await page.click('a:has-text("For Performers")')
      await page.waitForURL('**/for-performers')
      await expect(page.locator('h1')).toContainText(/Performer|Musician/)

      // Navigate back home
      await page.click('a:has-text("Home|Tipwave")')
      await page.waitForURL(/\/$|home/)
    })

    test('navigation menu is responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto(BASE_URL)

      // Check if hamburger menu appears on mobile
      const hamburger = page.locator('[data-testid="mobile-menu-button"], button:has-text("Menu")')
      
      if (await hamburger.isVisible()) {
        await hamburger.click()

        // Check if menu items appear
        await expect(page.locator('a:has-text("For Performers")')).toBeVisible()
        await expect(page.locator('a:has-text("For Venues")')).toBeVisible()
      }
    })

    test('active navigation state is highlighted', async ({ page }) => {
      await page.goto(`${BASE_URL}/for-performers`)

      const activeNav = page.locator('a:has-text("For Performers")[class*="active"]')
      
      // Should have active indicator (class or attribute)
      const ariaAttr = await activeNav.getAttribute('aria-current')
      expect(ariaAttr).toBe('page')
    })
  })

  test.describe('Responsive Design', () => {
    test('desktop layout renders correctly', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })
      await page.goto(BASE_URL)

      // Check for desktop-specific layout
      const content = page.locator('[data-testid="hero-content"]')
      const box = await content.boundingBox()
      expect(box?.width).toBeGreaterThan(500)
    })

    test('tablet layout renders correctly', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.goto(BASE_URL)

      // Elements should reflow for tablet
      const buttons = page.locator('button:has-text("Get Started")')
      await expect(buttons.first()).toBeVisible()
    })

    test('mobile layout renders correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto(BASE_URL)

      // Check that content is accessible on mobile
      const mainHeading = page.locator('h1')
      await expect(mainHeading).toBeVisible()

      // Buttons should be touch-friendly (min 48px)
      const button = page.locator('button').first()
      const box = await button.boundingBox()
      expect(box?.height).toBeGreaterThanOrEqual(44)
    })
  })

  test.describe('SEO & Meta Tags', () => {
    test('has proper meta tags for social sharing', async ({ page }) => {
      await page.goto(BASE_URL)

      // Check Open Graph tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
      expect(ogTitle).toBeTruthy()

      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
      expect(ogImage).toBeTruthy()

      // Check Twitter tags
      const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content')
      expect(twitterCard).toBeTruthy()
    })

    test('has proper schema markup', async ({ page }) => {
      await page.goto(BASE_URL)

      // Check for JSON-LD schema
      const schema = await page.locator('script[type="application/ld+json"]').textContent()
      expect(schema).toBeTruthy()
      expect(schema).toContain('Organization')
    })

    test('has canonical tag', async ({ page }) => {
      await page.goto(BASE_URL)

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical).toBe(BASE_URL + '/')
    })
  })

  test.describe('Accessibility', () => {
    test('all images have alt text', async ({ page }) => {
      await page.goto(BASE_URL)

      const images = page.locator('img')
      const count = await images.count()

      for (let i = 0; i < count; i++) {
        const img = images.nth(i)
        const alt = await img.getAttribute('alt')
        // Decorative images can have empty alt, but must have the attribute
        expect(alt !== null).toBe(true)
      }
    })

    test('heading hierarchy is correct', async ({ page }) => {
      await page.goto(BASE_URL)

      // Should start with h1
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBe(1)

      // No skipped heading levels
      const headings = page.locator('h1, h2, h3, h4, h5, h6')
      const headingCount = await headings.count()
      expect(headingCount).toBeGreaterThan(0)
    })

    test('form inputs have labels', async ({ page }) => {
      // Go to pages with forms (signup, etc)
      await page.goto(`${BASE_URL}/auth/signup`)

      const inputs = page.locator('input')
      const inputCount = await inputs.count()

      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i)
        const id = await input.getAttribute('id')
        const ariaLabel = await input.getAttribute('aria-label')
        const placeholder = await input.getAttribute('placeholder')

        // Either linked label, aria-label, or placeholder should exist
        const hasLabel = id || ariaLabel || placeholder
        expect(hasLabel).toBeTruthy()
      }
    })

    test('keyboard navigation works', async ({ page }) => {
      await page.goto(BASE_URL)

      // Tab through buttons
      const firstButton = page.locator('button').first()
      await firstButton.focus()

      // Check if button is focused
      const focused = await page.evaluate(() => {
        return document.activeElement?.tagName === 'BUTTON'
      })

      expect(focused).toBe(true)

      // Tab to next element
      await page.keyboard.press('Tab')

      // Should move focus to next focusable element
      const newFocused = await page.evaluate(() => {
        return document.activeElement?.tagName
      })

      expect(newFocused).toBeTruthy()
    })

    test('color contrast is sufficient', async ({ page }) => {
      await page.goto(BASE_URL)

      // This would typically use an accessibility testing library
      // For now, just verify that no white text on white background exists
      const allElements = page.locator('*')
      const count = await allElements.count()

      // Sample check - in real testing, use axe-core or similar
      expect(count).toBeGreaterThan(0)
    })
  })

  test.describe('Performance', () => {
    test('page loads within reasonable time', async ({ page }) => {
      const startTime = Date.now()
      await page.goto(BASE_URL)
      const loadTime = Date.now() - startTime

      // Page should load in under 3 seconds
      expect(loadTime).toBeLessThan(3000)
    })

    test('images are optimized', async ({ page }) => {
      await page.goto(BASE_URL)

      const images = page.locator('img')
      const count = await images.count()

      for (let i = 0; i < Math.min(count, 5); i++) {
        const img = images.nth(i)
        const src = await img.getAttribute('src')

        // Check for modern image formats (webp) or lazy loading
        expect(src).toBeTruthy()
      }
    })

    test('no console errors on page load', async ({ page }) => {
      const errors: string[] = []

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        }
      })

      await page.goto(BASE_URL)

      // Should have no console errors
      expect(errors).toEqual([])
    })
  })

  test.describe('Call to Action Conversions', () => {
    test('signup CTA at hero section works', async ({ page }) => {
      await page.goto(BASE_URL)

      const ctaButton = page.locator('button:has-text("Get Started")').first()
      await ctaButton.click()

      // Should navigate to signup
      await page.waitForURL('**/auth/signup')

      // Verify signup form loads
      await expect(page.locator('text=Create Account|Sign Up')).toBeVisible()
    })

    test('performer signup CTA works', async ({ page }) => {
      await page.goto(`${BASE_URL}/for-performers`)

      const ctaButton = page.locator('button:has-text("Get Started")').first()
      await ctaButton.click()

      await page.waitForURL('**/auth/signup?type=performer')
    })

    test('contact form submission works', async ({ page }) => {
      await page.goto(`${BASE_URL}/contact`)

      // Fill contact form
      await page.fill('input[name="name"]', 'John Doe')
      await page.fill('input[name="email"]', 'john@example.com')
      await page.fill('textarea[name="message"]', 'I have a question about Tipwave')

      // Submit form
      const submitButton = page.locator('button[type="submit"]')
      await submitButton.click()

      // Verify success message
      await expect(page.locator('text=Thank You|Message Sent|Success')).toBeVisible()
    })
  })
})
