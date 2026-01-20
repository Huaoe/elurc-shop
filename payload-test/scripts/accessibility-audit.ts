import { chromium } from 'playwright'
import { AxePuppeteer } from '@axe-core/playwright'
import fs from 'fs/promises'
import path from 'path'

interface AuditResult {
  url: string
  violations: any[]
  incomplete: any[]
  passes: number
  timestamp: string
}

const pages = [
  '/',
  '/products',
  '/cart',
  '/checkout',
  '/orders',
]

async function runAccessibilityAudit() {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const results: AuditResult[] = []

  console.log('🔍 Starting accessibility audit...\n')

  for (const pagePath of pages) {
    const page = await context.newPage()
    const url = `http://localhost:3000${pagePath}`
    
    try {
      console.log(`Auditing: ${url}`)
      await page.goto(url, { waitUntil: 'networkidle' })
      
      const axe = new AxePuppeteer(page)
      const axeResults = await axe
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      results.push({
        url,
        violations: axeResults.violations,
        incomplete: axeResults.incomplete,
        passes: axeResults.passes.length,
        timestamp: new Date().toISOString(),
      })

      console.log(`  ✓ Violations: ${axeResults.violations.length}`)
      console.log(`  ✓ Incomplete: ${axeResults.incomplete.length}`)
      console.log(`  ✓ Passes: ${axeResults.passes.length}\n`)
    } catch (error) {
      console.error(`  ✗ Error auditing ${url}:`, error)
    }

    await page.close()
  }

  await browser.close()

  const outputDir = path.join(process.cwd(), 'accessibility-reports')
  await fs.mkdir(outputDir, { recursive: true })
  
  const reportPath = path.join(outputDir, `audit-${Date.now()}.json`)
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2))

  console.log(`\n📊 Audit complete! Report saved to: ${reportPath}`)
  
  const totalViolations = results.reduce((sum, r) => sum + r.violations.length, 0)
  console.log(`\n📈 Summary:`)
  console.log(`   Total pages audited: ${results.length}`)
  console.log(`   Total violations: ${totalViolations}`)
  
  if (totalViolations > 0) {
    console.log(`\n⚠️  Found ${totalViolations} accessibility violations`)
    process.exit(1)
  } else {
    console.log(`\n✅ No accessibility violations found!`)
  }
}

runAccessibilityAudit().catch(console.error)
