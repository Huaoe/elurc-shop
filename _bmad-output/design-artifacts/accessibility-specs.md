# Accessibility Specifications - elurc-market

## WCAG 2.1 AA Compliance

### Overview
elurc-market is committed to providing an accessible experience for all users, including those with disabilities. This document outlines the accessibility requirements and implementation guidelines to achieve WCAG 2.1 Level AA compliance.

---

## 1. Perceivable

### 1.1 Text Alternatives

**Images (1.1.1 - Level A)**
- All product images must have descriptive alt text
- Decorative images must have empty alt attributes (`alt=""`)
- Icons must have accessible labels via `aria-label` or visually hidden text

**Examples:**
```html
<!-- Product image -->
<img src="tomatoes.jpg" alt="Fresh organic tomatoes from local Bretaigne farm" />

<!-- Decorative image -->
<img src="pattern.svg" alt="" role="presentation" />

<!-- Icon button -->
<button aria-label="Add to cart">
  <ShoppingCartIcon aria-hidden="true" />
</button>
```

### 1.2 Time-based Media

**Audio and Video (1.2.1-1.2.3 - Level A)**
- Not applicable for MVP (no video/audio content)
- If added in future: Provide captions and transcripts

### 1.3 Adaptable

**Info and Relationships (1.3.1 - Level A)**
- Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Form inputs must have associated `<label>` elements
- Use proper heading hierarchy (H1 → H2 → H3)
- Tables must use `<th>` for headers with `scope` attributes

**Examples:**
```html
<!-- Semantic structure -->
<header>
  <nav aria-label="Main navigation">...</nav>
</header>
<main>
  <h1>Products</h1>
  <section>
    <h2>Fresh Products</h2>
  </section>
</main>

<!-- Form labels -->
<label for="shipping-name">Full Name</label>
<input id="shipping-name" type="text" required />
```

**Meaningful Sequence (1.3.2 - Level A)**
- Content order in DOM must match visual order
- Use CSS for visual positioning, not for content order
- Tab order must follow logical reading sequence

**Sensory Characteristics (1.3.3 - Level A)**
- Don't rely solely on color to convey information
- Use icons + text for status indicators
- Provide text alternatives for visual cues

**Examples:**
```html
<!-- Good: Icon + text + color -->
<span class="stock-badge in-stock">
  <CheckIcon aria-hidden="true" />
  In Stock
</span>

<!-- Bad: Color only -->
<span class="green-badge">Available</span>
```

**Orientation (1.3.4 - Level AA)**
- Support both portrait and landscape orientations
- Don't lock orientation unless essential

**Identify Input Purpose (1.3.5 - Level AA)**
- Use `autocomplete` attributes for common fields
- Help password managers and autofill

**Examples:**
```html
<input type="text" autocomplete="name" />
<input type="email" autocomplete="email" />
<input type="tel" autocomplete="tel" />
<input type="text" autocomplete="street-address" />
```

### 1.4 Distinguishable

**Use of Color (1.4.1 - Level A)**
- Never use color as the only means of conveying information
- Stock status: Use icon + text + color
- Errors: Use icon + message + color
- Links: Use underline or other visual indicator

**Audio Control (1.4.2 - Level A)**
- Not applicable (no auto-playing audio)

**Contrast (Minimum) (1.4.3 - Level AA)**
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18px+ or 14px+ bold): 3:1 minimum
- UI components and graphics: 3:1 minimum

**Color Contrast Requirements:**
```
Text on White (#FFFFFF):
✓ Gray 900 (#111827) - 16.2:1
✓ Gray 700 (#374151) - 10.8:1
✓ Gray 500 (#6B7280) - 5.9:1
✗ Gray 400 (#9CA3AF) - 3.9:1 (use for large text only)

Primary (#2563EB) on White:
✓ 4.6:1 (meets AA for normal text)

Success (#10B981) on White:
✓ 3.4:1 (meets AA for large text, UI components)

Error (#EF4444) on White:
✓ 4.0:1 (meets AA for large text, UI components)
```

**Resize Text (1.4.4 - Level AA)**
- Text must be resizable up to 200% without loss of content or functionality
- Use relative units (rem, em) instead of fixed pixels
- Test with browser zoom at 200%

**Images of Text (1.4.5 - Level AA)**
- Avoid images of text
- Use actual text with CSS styling
- Exception: Logos

**Reflow (1.4.10 - Level AA)**
- Content must reflow to 320px width without horizontal scrolling
- No loss of information or functionality
- Exception: Data tables, images, video

**Non-text Contrast (1.4.11 - Level AA)**
- UI components: 3:1 contrast ratio
- Graphical objects: 3:1 contrast ratio
- Focus indicators: 3:1 contrast ratio

**Text Spacing (1.4.12 - Level AA)**
- Support user-defined text spacing:
  - Line height: 1.5x font size
  - Paragraph spacing: 2x font size
  - Letter spacing: 0.12x font size
  - Word spacing: 0.16x font size

**Content on Hover or Focus (1.4.13 - Level AA)**
- Tooltips must be dismissible (Esc key)
- Tooltips must be hoverable
- Tooltips must persist until dismissed

---

## 2. Operable

### 2.1 Keyboard Accessible

**Keyboard (2.1.1 - Level A)**
- All functionality must be available via keyboard
- No keyboard traps
- Test all interactions with Tab, Enter, Space, Arrow keys

**Keyboard Navigation Order:**
1. Skip to main content link
2. Header navigation
3. Main content
4. Footer

**No Keyboard Trap (2.1.2 - Level A)**
- Users must be able to navigate away from any component using keyboard
- Modals: Esc key closes, focus returns to trigger element
- Dropdowns: Esc key closes

**Keyboard Shortcuts (2.1.4 - Level A)**
- If implementing shortcuts, provide way to disable or remap
- Not applicable for MVP

### 2.2 Enough Time

**Timing Adjustable (2.2.1 - Level A)**
- Payment timeout (10 minutes): Provide warning at 8 minutes
- Allow user to extend timeout
- Cart expiration: Warn before expiring

**Pause, Stop, Hide (2.2.2 - Level A)**
- Auto-updating content (payment status): Provide pause control
- Animations: Respect `prefers-reduced-motion`

**Examples:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2.3 Seizures and Physical Reactions

**Three Flashes or Below Threshold (2.3.1 - Level A)**
- No content flashes more than 3 times per second
- Avoid rapid animations

### 2.4 Navigable

**Bypass Blocks (2.4.1 - Level A)**
- Provide "Skip to main content" link
- First focusable element on page

**Example:**
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
<main id="main-content">...</main>
```

**Page Titled (2.4.2 - Level A)**
- Every page must have unique, descriptive title
- Format: `[Page Name] | elurc-market`

**Examples:**
- Homepage: `Organic Groceries with ELURC | elurc-market`
- Products: `Fresh Products | elurc-market`
- Checkout: `Checkout | elurc-market`
- Order: `Order #001 | elurc-market`

**Focus Order (2.4.3 - Level A)**
- Tab order must follow logical reading order
- Use `tabindex="0"` for custom interactive elements
- Never use positive `tabindex` values

**Link Purpose (2.4.4 - Level A)**
- Link text must describe destination
- Avoid "click here" or "read more"
- Use aria-label for icon-only links

**Examples:**
```html
<!-- Good -->
<a href="/products/tomatoes">View organic tomatoes</a>

<!-- Bad -->
<a href="/products/tomatoes">Click here</a>

<!-- Icon link -->
<a href="/cart" aria-label="View shopping cart">
  <ShoppingCartIcon aria-hidden="true" />
</a>
```

**Multiple Ways (2.4.5 - Level AA)**
- Provide multiple ways to find pages:
  - Navigation menu
  - Search (growth phase)
  - Sitemap (growth phase)

**Headings and Labels (2.4.6 - Level AA)**
- Headings must describe topic or purpose
- Form labels must describe input purpose
- Use clear, concise language

**Focus Visible (2.4.7 - Level AA)**
- Keyboard focus must be clearly visible
- 2px solid outline with 2px offset
- High contrast color

**Example:**
```css
:focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### 2.5 Input Modalities

**Pointer Gestures (2.5.1 - Level A)**
- All multi-point or path-based gestures must have single-pointer alternative
- Swipe gestures: Provide button alternatives

**Pointer Cancellation (2.5.2 - Level A)**
- Click events on mouse up, not mouse down
- Allow users to cancel accidental clicks

**Label in Name (2.5.3 - Level A)**
- Visible label text must be included in accessible name
- Helps voice control users

**Motion Actuation (2.5.4 - Level A)**
- Not applicable (no device motion features)

**Target Size (2.5.5 - Level AAA - Recommended)**
- Touch targets: 44x44px minimum (WCAG AAA)
- Spacing between targets: 8px minimum
- We're implementing this as best practice

---

## 3. Understandable

### 3.1 Readable

**Language of Page (3.1.1 - Level A)**
- Set `lang` attribute on `<html>` element
- Default: English (`en`)
- Support for Breton (`br`) in future

**Example:**
```html
<html lang="en">
```

**Language of Parts (3.1.2 - Level AA)**
- Mark up text in different languages
- Not applicable for MVP (single language)

### 3.2 Predictable

**On Focus (3.2.1 - Level A)**
- Focus must not trigger context changes
- No automatic form submission on focus
- No automatic navigation

**On Input (3.2.2 - Level A)**
- Input must not trigger unexpected context changes
- Provide submit button for forms
- Warn before auto-submitting

**Consistent Navigation (3.2.3 - Level AA)**
- Navigation must be in same order across pages
- Header and footer consistent throughout

**Consistent Identification (3.2.4 - Level AA)**
- Icons and components with same function must be identified consistently
- Cart icon always means "shopping cart"
- Wallet icon always means "wallet connection"

### 3.3 Input Assistance

**Error Identification (3.3.1 - Level A)**
- Clearly identify form errors
- Use color + icon + text
- Associate error messages with inputs

**Example:**
```html
<label for="email">Email</label>
<input 
  id="email" 
  type="email" 
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" class="error-message">
  <AlertIcon aria-hidden="true" />
  Please enter a valid email address
</span>
```

**Labels or Instructions (3.3.2 - Level A)**
- Provide labels for all form inputs
- Provide instructions for complex inputs
- Indicate required fields

**Example:**
```html
<label for="wallet-address">
  Wallet Address <span aria-label="required">*</span>
</label>
<input 
  id="wallet-address" 
  type="text"
  required
  aria-required="true"
  aria-describedby="wallet-help"
/>
<span id="wallet-help" class="helper-text">
  Your Phantom wallet address (starts with 0x)
</span>
```

**Error Suggestion (3.3.3 - Level AA)**
- Provide suggestions to fix errors
- Example: "Email must include @"
- Example: "Postal code must be 5 digits"

**Error Prevention (Legal, Financial, Data) (3.3.4 - Level AA)**
- For ELURC payments (financial):
  - Provide review step before submission
  - Allow user to correct information
  - Provide confirmation after submission

**Payment Flow:**
1. Review order summary
2. Confirm wallet address
3. Display payment amount clearly
4. Provide confirmation screen
5. Send email confirmation

---

## 4. Robust

### 4.1 Compatible

**Parsing (4.1.1 - Level A - Deprecated in WCAG 2.2)**
- Use valid HTML
- No duplicate IDs
- Proper nesting of elements

**Name, Role, Value (4.1.2 - Level A)**
- All UI components must have accessible name
- Role must be programmatically determined
- States and properties must be available

**Examples:**
```html
<!-- Button with accessible name -->
<button aria-label="Close modal">
  <XIcon aria-hidden="true" />
</button>

<!-- Checkbox with state -->
<input 
  type="checkbox" 
  id="terms"
  aria-checked="false"
/>

<!-- Custom component -->
<div 
  role="button"
  tabindex="0"
  aria-pressed="false"
>
  Toggle
</div>
```

**Status Messages (4.1.3 - Level AA)**
- Use ARIA live regions for dynamic updates
- Announce payment status changes
- Announce cart updates

**Examples:**
```html
<!-- Payment status -->
<div role="status" aria-live="polite" aria-atomic="true">
  Payment confirmed! Order #001 created.
</div>

<!-- Cart update -->
<div role="status" aria-live="polite">
  Tomatoes added to cart
</div>

<!-- Error alert -->
<div role="alert" aria-live="assertive">
  Payment failed. Please try again.
</div>
```

---

## Implementation Checklist

### HTML/Semantic Structure
- [ ] Use semantic HTML5 elements
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] All images have alt text
- [ ] Forms have associated labels
- [ ] Skip to main content link
- [ ] Language attribute on html element
- [ ] Unique page titles

### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Visible focus indicators
- [ ] Logical tab order
- [ ] No keyboard traps
- [ ] Esc closes modals/dropdowns
- [ ] Enter/Space activates buttons

### Color and Contrast
- [ ] Text contrast: 4.5:1 minimum
- [ ] Large text contrast: 3:1 minimum
- [ ] UI component contrast: 3:1 minimum
- [ ] Don't rely on color alone
- [ ] Focus indicators: 3:1 contrast

### Forms
- [ ] All inputs have labels
- [ ] Required fields indicated
- [ ] Error messages clear and helpful
- [ ] Autocomplete attributes
- [ ] Validation on submit, not on blur
- [ ] Error summary at top of form

### Dynamic Content
- [ ] ARIA live regions for updates
- [ ] Loading states announced
- [ ] Error states announced
- [ ] Success states announced

### Touch/Mobile
- [ ] Touch targets: 44x44px minimum
- [ ] Spacing between targets: 8px
- [ ] Support pinch-to-zoom
- [ ] Responsive to 320px width
- [ ] Both orientations supported

### Testing
- [ ] Keyboard-only navigation
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Browser zoom to 200%
- [ ] Color contrast checker
- [ ] Automated testing (axe, Lighthouse)
- [ ] Mobile accessibility testing

---

## Screen Reader Testing

### Recommended Screen Readers
- **Windows:** NVDA (free), JAWS
- **macOS:** VoiceOver (built-in)
- **iOS:** VoiceOver (built-in)
- **Android:** TalkBack (built-in)

### Testing Scenarios

**Product Browsing:**
1. Navigate to product catalog
2. Hear category filters announced
3. Navigate through product cards
4. Hear product name, price, stock status
5. Activate "Add to cart" button
6. Hear confirmation announcement

**Checkout Flow:**
1. Navigate to cart
2. Hear cart items and totals
3. Proceed to checkout
4. Hear progress indicator (Step 1 of 3)
5. Connect wallet (hear status change)
6. Fill shipping form (hear labels and errors)
7. Reach payment step
8. Hear payment instructions
9. Hear payment confirmation

**Admin Panel:**
1. Navigate to orders
2. Hear order list
3. Select order
4. Hear order details
5. Activate "Mark as fulfilled"
6. Hear confirmation

---

## Automated Testing Tools

### Browser Extensions
- **axe DevTools:** Comprehensive accessibility testing
- **WAVE:** Visual feedback on accessibility issues
- **Lighthouse:** Built into Chrome DevTools

### CI/CD Integration
- **axe-core:** JavaScript accessibility testing library
- **jest-axe:** Jest integration for React components
- **pa11y:** Command-line accessibility testing

### Example Test:
```javascript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Product card should be accessible', async () => {
  const { container } = render(<ProductCard {...props} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## ARIA Patterns

### Common Patterns Used

**Modal Dialog**
```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm Order</h2>
  <div>...</div>
  <button>Confirm</button>
  <button>Cancel</button>
</div>
```

**Dropdown Menu**
```html
<button aria-expanded="false" aria-controls="menu">
  Categories
</button>
<ul id="menu" role="menu" hidden>
  <li role="menuitem">Fresh Products</li>
  <li role="menuitem">Dry Products</li>
</ul>
```

**Tab Panel**
```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    All
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">
    Fresh
  </button>
</div>
<div id="panel-1" role="tabpanel">...</div>
<div id="panel-2" role="tabpanel" hidden>...</div>
```

**Progress Indicator**
```html
<div role="progressbar" 
     aria-valuenow="2" 
     aria-valuemin="1" 
     aria-valuemax="3"
     aria-label="Checkout progress: step 2 of 3">
  Step 2 of 3
</div>
```

---

## Accessibility Statement

**To be published on website:**

> elurc-market is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
>
> **Conformance Status**
> The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. We aim to conform to WCAG 2.1 Level AA.
>
> **Feedback**
> We welcome your feedback on the accessibility of elurc-market. Please contact us if you encounter accessibility barriers.
>
> **Compatibility**
> elurc-market is designed to be compatible with assistive technologies including screen readers, keyboard navigation, and voice control software.

---

## Ongoing Compliance

### Regular Audits
- Quarterly accessibility audits
- Test with real users with disabilities
- Monitor WCAG updates
- Update as standards evolve

### Team Training
- Accessibility awareness training
- Developer guidelines
- Design review process
- QA testing procedures

### Documentation
- Maintain accessibility documentation
- Document ARIA patterns used
- Keep testing results
- Track remediation efforts
