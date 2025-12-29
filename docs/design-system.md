# Luxury Fashion Platform - Design System

**Philosophy**: Quiet Luxury • Editorial Fashion • Timeless Elegance

---

## 🎨 Color System

### Primary Colors

```css
/* Deep Charcoal Black */
--color-charcoal: #0e0e0e;
--color-charcoal-rgb: 14, 14, 14;

/* Ivory White */
--color-ivory: #f7f5f2;
--color-ivory-rgb: 247, 245, 242;
```

### Secondary Colors

```css
/* Soft Gray */
--color-soft-gray: #8b8b8b;
--color-soft-gray-light: #b8b8b8;
--color-soft-gray-dark: #5a5a5a;

/* Muted Gold Accent */
--color-muted-gold: #c9b37e;
--color-muted-gold-light: #d4c59a;
--color-muted-gold-dark: #b39f6a;
```

### Dark Mode Palette (Default)

```css
/* Backgrounds */
--bg-dark-primary: #121212;
--bg-dark-secondary: #1a1a1a;
--bg-dark-elevated: #242424;

/* Text */
--text-warm-white: #f5f1e8;
--text-warm-gray: #c4c0b8;
--text-muted: #8b8b8b;

/* Borders */
--border-subtle: rgba(247, 245, 242, 0.08);
--border-medium: rgba(247, 245, 242, 0.12);
```

### Light Mode Palette (Optional)

```css
/* Backgrounds */
--bg-light-primary: #fafaf9;
--bg-light-secondary: #f7f5f2;
--bg-light-elevated: #ffffff;

/* Text */
--text-dark-primary: #0e0e0e;
--text-dark-secondary: #3a3a3a;
--text-dark-muted: #6b6b6b;

/* Borders */
--border-light-subtle: rgba(14, 14, 14, 0.06);
--border-light-medium: rgba(14, 14, 14, 0.1);
```

### Usage Rules

- **90% Neutral**: Use charcoal, ivory, and gray for 90% of the interface
- **10% Accent**: Gold accent ONLY for:
  - Hover states
  - Active/selected states
  - Focus indicators
  - Call-to-action highlights
- **NO**: Neon colors, flashy gradients, bright colors

---

## ✍️ Typography System

### Font Families

```css
/* Headings - Elegant Serif */
--font-heading: "Playfair Display", serif;

/* Body & UI - Modern Sans-Serif */
--font-body: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
```

**Font Loading:**

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Type Scale (Fluid Typography)

```css
/* Display - Hero Titles */
--text-display: clamp(3rem, 5vw + 1rem, 5rem);
--line-height-display: 1.1;
--letter-spacing-display: -0.02em;

/* Heading 1 */
--text-h1: clamp(2.5rem, 4vw + 0.5rem, 4rem);
--line-height-h1: 1.2;
--letter-spacing-h1: -0.015em;

/* Heading 2 */
--text-h2: clamp(2rem, 3vw + 0.5rem, 3rem);
--line-height-h2: 1.3;
--letter-spacing-h2: -0.01em;

/* Heading 3 */
--text-h3: clamp(1.5rem, 2vw + 0.5rem, 2rem);
--line-height-h3: 1.4;
--letter-spacing-h3: -0.005em;

/* Body Large */
--text-body-lg: clamp(1.125rem, 1vw + 0.5rem, 1.25rem);
--line-height-body-lg: 1.7;
--letter-spacing-body-lg: 0;

/* Body Regular */
--text-body: 1rem;
--line-height-body: 1.6;
--letter-spacing-body: 0;

/* Body Small */
--text-body-sm: 0.875rem;
--line-height-body-sm: 1.5;
--letter-spacing-body-sm: 0.01em;

/* Caption */
--text-caption: 0.75rem;
--line-height-caption: 1.4;
--letter-spacing-caption: 0.02em;
```

### Typography Classes

```css
.display {
  font-family: var(--font-heading);
  font-size: var(--text-display);
  line-height: var(--line-height-display);
  letter-spacing: var(--letter-spacing-display);
  font-weight: 600;
}

.heading-1 {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  line-height: var(--line-height-h1);
  letter-spacing: var(--letter-spacing-h1);
  font-weight: 500;
}

.body-editorial {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  line-height: var(--line-height-body-lg);
  font-weight: 300;
  color: var(--text-warm-gray);
}
```

---

## 📐 Spacing System

### Scale

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.5rem; /* 24px */
--space-6: 2rem; /* 32px */
--space-8: 3rem; /* 48px */
--space-10: 4rem; /* 64px */
--space-12: 6rem; /* 96px */
--space-16: 8rem; /* 128px */
--space-20: 12rem; /* 192px */
```

### Layout Spacing

```css
/* Section Spacing */
--section-padding-mobile: var(--space-10);
--section-padding-tablet: var(--space-12);
--section-padding-desktop: var(--space-16);

/* Container Max Width */
--container-max: 1440px;
--container-narrow: 960px;
--container-wide: 1920px;

/* Grid Gaps */
--grid-gap-sm: var(--space-4);
--grid-gap-md: var(--space-6);
--grid-gap-lg: var(--space-8);
```

---

## 🎭 Motion & Animation

### Timing Functions

```css
/* Elegant Ease */
--ease-elegant: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in-elegant: cubic-bezier(0.4, 0, 1, 1);
--ease-out-elegant: cubic-bezier(0, 0, 0.2, 1);

/* Subtle Ease */
--ease-subtle: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### Duration

```css
--duration-instant: 150ms;
--duration-fast: 300ms;
--duration-medium: 400ms;
--duration-slow: 600ms;
--duration-slower: 800ms;
```

### Allowed Animations

**✅ Permitted:**

```css
/* Fade */
.fade-in {
  animation: fadeIn var(--duration-medium) var(--ease-elegant);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide */
.slide-up {
  animation: slideUp var(--duration-slow) var(--ease-elegant);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover Effects */
.product-card {
  transition: transform var(--duration-medium) var(--ease-elegant);
}

.product-card:hover {
  transform: scale(1.02);
}

.product-card img {
  transition: transform var(--duration-slow) var(--ease-elegant);
}

.product-card:hover img {
  transform: scale(1.05);
}
```

**❌ Forbidden:**

- Bounce effects
- Elastic animations
- Flashy entrance animations
- Aggressive motion
- Auto-playing animations

---

## 🧩 Component Library

### Buttons

```css
/* Primary Button */
.btn-primary {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  padding: 1rem 2.5rem;
  background: var(--color-charcoal);
  color: var(--color-ivory);
  border: 1px solid var(--color-charcoal);

  transition: all var(--duration-medium) var(--ease-elegant);
}

.btn-primary:hover {
  background: var(--color-muted-gold);
  border-color: var(--color-muted-gold);
  color: var(--color-charcoal);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--text-warm-white);
  border: 1px solid var(--border-medium);
}

.btn-secondary:hover {
  border-color: var(--color-muted-gold);
  color: var(--color-muted-gold);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--text-warm-white);
  border: none;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.btn-ghost:hover {
  color: var(--color-muted-gold);
}
```

### Product Cards

```css
.product-card {
  background: var(--bg-dark-secondary);
  border-radius: 0; /* No rounded corners */
  overflow: hidden;
  transition: transform var(--duration-medium) var(--ease-elegant);
}

.product-card__image {
  aspect-ratio: 3/4;
  overflow: hidden;
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-elegant);
}

.product-card:hover img {
  transform: scale(1.05);
}

.product-card__content {
  padding: var(--space-5);
}

.product-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: 400;
  margin-bottom: var(--space-2);
}

.product-card__price {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--text-warm-gray);
}
```

### Form Inputs

```css
.input {
  font-family: var(--font-body);
  font-size: var(--text-body);

  padding: 1rem 1.5rem;
  background: var(--bg-dark-elevated);
  color: var(--text-warm-white);
  border: 1px solid var(--border-medium);
  border-radius: 0;

  transition: border-color var(--duration-fast) var(--ease-elegant);
}

.input:focus {
  outline: none;
  border-color: var(--color-muted-gold);
}

.input::placeholder {
  color: var(--text-muted);
}

/* Label */
.label {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-warm-gray);
  margin-bottom: var(--space-2);
}
```

### Modal / Dialog

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);

  display: flex;
  align-items: center;
  justify-content: center;

  animation: fadeIn var(--duration-medium) var(--ease-elegant);
}

.modal {
  background: var(--bg-dark-primary);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;

  animation: slideUp var(--duration-slow) var(--ease-elegant);
}

/* Fullscreen Modal (for AI Try-On) */
.modal--fullscreen {
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}
```

---

## 📱 Layout System

### Grid System

```css
/* Product Grid */
.product-grid {
  display: grid;
  gap: var(--grid-gap-lg);
}

/* Responsive Grid */
@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1440px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Bento Grid (Featured Section) */
.bento-grid {
  display: grid;
  gap: var(--grid-gap-md);
  grid-template-columns: repeat(12, 1fr);
}

.bento-item--large {
  grid-column: span 8;
  grid-row: span 2;
}

.bento-item--medium {
  grid-column: span 4;
}

.bento-item--small {
  grid-column: span 4;
}
```

### Container

```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-6);
}

@media (min-width: 1024px) {
  .container {
    padding-inline: var(--space-8);
  }
}

.container--narrow {
  max-width: var(--container-narrow);
}
```

---

## 🖼️ Image Guidelines

### Product Images

- **Aspect Ratio**: 3:4 (portrait) for clothing, 1:1 (square) for accessories
- **Quality**: High resolution (min 1200px width)
- **Format**: WebP with JPEG fallback
- **Background**: Clean, minimal, neutral tones
- **Lighting**: Soft, natural, editorial style

### Hero/Banner Images

- **Aspect Ratio**: 16:9 (desktop), 4:5 (mobile)
- **Quality**: Ultra high resolution (min 1920px width)
- **Format**: WebP with JPEG fallback
- **Style**: Editorial, atmospheric, lifestyle

### Optimization

```html
<!-- Responsive Images -->
<picture>
  <source
    srcset="image-mobile.webp"
    media="(max-width: 768px)"
    type="image/webp"
  />
  <source
    srcset="image-desktop.webp"
    media="(min-width: 769px)"
    type="image/webp"
  />
  <img src="image-desktop.jpg" alt="Product description" loading="lazy" />
</picture>
```

---

## 📝 Content Tone & Voice

### Writing Principles

- **Minimal**: Say more with less
- **Refined**: Elegant, sophisticated language
- **Poetic**: Evocative, not descriptive
- **Editorial**: Fashion magazine voice

### Examples

**❌ Avoid:**

- "Buy now and get 50% off!"
- "Limited time offer - don't miss out!"
- "Best quality guaranteed"

**✅ Use:**

- "Crafted with intention."
- "Designed to last."
- "Tailored by AI."
- "Where tradition meets innovation."

### Microcopy

```
Button Text:
- "View Collection" (not "Shop Now")
- "Add to Cart" (not "Buy Now")
- "Explore" (not "Click Here")

Product Descriptions:
- Short, poetic sentences
- Focus on craftsmanship, materials, feeling
- Avoid salesy language
```

---

## ♿ Accessibility

### Color Contrast

- Minimum contrast ratio: 4.5:1 for body text
- Minimum contrast ratio: 3:1 for large text (18px+)
- Test all color combinations

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--color-muted-gold);
  outline-offset: 4px;
}
```

### ARIA Labels

- All interactive elements must have accessible names
- Use semantic HTML
- Provide alt text for all images

---

## 📊 Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px; /* Small tablets */
--breakpoint-md: 768px; /* Tablets */
--breakpoint-lg: 1024px; /* Small laptops */
--breakpoint-xl: 1280px; /* Desktops */
--breakpoint-2xl: 1536px; /* Large desktops */
```

---

## 🎯 Design Principles Summary

1. **Quiet Luxury**: Understated elegance over flashy design
2. **Editorial Layout**: Magazine-inspired, generous white space
3. **Timeless**: Design that lasts 5+ years
4. **Emotional**: Subtle delight, never overwhelming
5. **Minimal Motion**: Slow, purposeful animations only
6. **Premium Feel**: Every detail refined
7. **Responsive**: Flawless on all devices and zoom levels
8. **Accessible**: WCAG AA compliant minimum
