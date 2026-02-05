import { test, expect } from '@playwright/test';

test.describe('Bill of Computational Rights Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Bill of Computational Rights/);
    
    // Check for key content
    await expect(page.locator('h1')).toContainText('Bill of Computational Rights');
    
    // Check that the bill content is visible
    await expect(page.locator('text=We hold these truths to be self-evident')).toBeVisible();
  });

  test('navigation works correctly', async ({ page }) => {
    // Check if sponsors page link exists and works
    const sponsorsLink = page.locator('a[href="/sponsors"]');
    if (await sponsorsLink.count() > 0) {
      await sponsorsLink.click();
      await expect(page).toHaveURL('/sponsors');
      await expect(page.locator('h1')).toContainText('Sponsors');
    }

    // Check if legal page link exists and works
    await page.goto('/');
    const legalLink = page.locator('a[href="/legal"]');
    if (await legalLink.count() > 0) {
      await legalLink.click();
      await expect(page).toHaveURL('/legal');
      await expect(page.locator('h1')).toContainText(/Legal|Terms|Privacy/);
    }
  });

  test('signatories section displays correctly', async ({ page }) => {
    // Look for signatures section
    const signatoriesSection = page.locator('text=Signatories').or(page.locator('text=Signatures'));
    
    if (await signatoriesSection.count() > 0) {
      await expect(signatoriesSection).toBeVisible();
      
      // Check that some signatures are displayed
      const signatureItems = page.locator('[data-testid="signature"]').or(page.locator('.signature'));
      if (await signatureItems.count() > 0) {
        await expect(signatureItems.first()).toBeVisible();
      }
    }
  });

  test('responsive design works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    
    await expect(page.locator('h1')).toBeVisible();
    
    // Check that content is still readable on mobile
    await expect(page.locator('body')).toHaveCSS('overflow-x', 'visible');
  });

  test('RSS feed is accessible', async ({ page, context }) => {
    const responsePromise = context.waitForEvent('response');
    await page.goto('/feed.xml');
    const response = await responsePromise;
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('xml');
  });

  test('sitemap is accessible', async ({ page, context }) => {
    const responsePromise = context.waitForEvent('response');
    await page.goto('/sitemap.xml');
    const response = await responsePromise;
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('xml');
  });

  test('robots.txt is accessible', async ({ page, context }) => {
    const responsePromise = context.waitForEvent('response');
    await page.goto('/robots.txt');
    const response = await responsePromise;
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text');
  });
});

test.describe('Accessibility', () => {
  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const h1s = await page.locator('h1').count();
    expect(h1s).toBeGreaterThanOrEqual(1);
    expect(h1s).toBeLessThanOrEqual(1); // Should have exactly one h1
    
    // Check for logical heading progression
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('page has proper alt text for images', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).not.toBeNull();
        expect(alt?.length).toBeGreaterThan(0);
      }
    }
  });

  test('page has proper link text', async ({ page }) => {
    await page.goto('/');
    
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    
    if (linkCount > 0) {
      for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        
        // Link should have either text content or aria-label
        expect(text?.trim() || ariaLabel?.trim()).toBeTruthy();
        
        // Avoid generic link text
        if (text) {
          expect(text.toLowerCase().trim()).not.toBe('click here');
          expect(text.toLowerCase().trim()).not.toBe('read more');
          expect(text.toLowerCase().trim()).not.toBe('link');
        }
      }
    }
  });

  test('page has proper color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Check that text has sufficient contrast (basic check)
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => 
      getComputedStyle(el).backgroundColor
    );
    const color = await body.evaluate(el => 
      getComputedStyle(el).color
    );
    
    expect(backgroundColor).toBeTruthy();
    expect(color).toBeTruthy();
    expect(backgroundColor).not.toBe(color);
  });
});

test.describe('Performance', () => {
  test('page loads within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
  });

  test('images load correctly', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        
        // Check that image loads successfully
        const isVisible = await img.isVisible();
        if (isVisible) {
          const naturalWidth = await img.evaluate(img => img.naturalWidth);
          expect(naturalWidth).toBeGreaterThan(0);
        }
      }
    }
  });
});

test.describe('SEO', () => {
  test('page has proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check for essential meta tags
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title.length).toBeLessThan(60); // Good SEO practice
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description?.length).toBeGreaterThan(50);
    expect(description?.length).toBeLessThan(160); // Good SEO practice
    
    // Check for Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    
    expect(ogTitle || title).toBeTruthy();
    expect(ogDescription || description).toBeTruthy();
  });

  test('page has proper canonical URL', async ({ page }) => {
    await page.goto('/');
    
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count() > 0) {
      const href = await canonical.getAttribute('href');
      expect(href).toContain('computationalrights.org');
    }
  });

  test('page has structured data', async ({ page }) => {
    await page.goto('/');
    
    // Check for JSON-LD structured data
    const structuredData = page.locator('script[type="application/ld+json"]');
    if (await structuredData.count() > 0) {
      const content = await structuredData.textContent();
      expect(content).toBeTruthy();
      
      // Should be valid JSON
      expect(() => JSON.parse(content || '')).not.toThrow();
    }
  });
});