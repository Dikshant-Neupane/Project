---
name: Solarium Narrative
colors:
  surface: '#fff8f4'
  surface-dim: '#f2d6b2'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e4'
  surface-container: '#ffebd4'
  surface-container-high: '#ffe4c3'
  surface-container-highest: '#fbdeba'
  on-surface: '#271903'
  on-surface-variant: '#484837'
  inverse-surface: '#3e2d15'
  inverse-on-surface: '#ffeedc'
  outline: '#797865'
  outline-variant: '#c9c7b2'
  surface-tint: '#606200'
  primary: '#606200'
  on-primary: '#ffffff'
  primary-container: '#999b2a'
  on-primary-container: '#303000'
  inverse-primary: '#cacc57'
  secondary: '#795925'
  on-secondary: '#ffffff'
  secondary-container: '#ffd394'
  on-secondary-container: '#7a5925'
  tertiary: '#646021'
  on-tertiary: '#ffffff'
  tertiary-container: '#b3ae66'
  on-tertiary-container: '#444103'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e7e970'
  primary-fixed-dim: '#cacc57'
  on-primary-fixed: '#1c1d00'
  on-primary-fixed-variant: '#484a00'
  secondary-fixed: '#ffddb0'
  secondary-fixed-dim: '#ebc081'
  on-secondary-fixed: '#281800'
  on-secondary-fixed-variant: '#5e410e'
  tertiary-fixed: '#ece598'
  tertiary-fixed-dim: '#cfc97f'
  on-tertiary-fixed: '#1e1c00'
  on-tertiary-fixed-variant: '#4c480a'
  background: '#fff8f4'
  on-background: '#271903'
  surface-variant: '#fbdeba'
typography:
  display-lg:
    fontFamily: Hanken Grotesque
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesque
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesque
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-page: 40px
  container-max: 1440px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is built upon the concept of a "Sunlit Sanctuary"—a digital workspace that moves away from the cold, clinical nature of traditional OS environments toward a warm, organic, and premium tactile experience. The target audience consists of knowledge workers and creative professionals who seek a focused, calm environment for AI-driven collaboration.

The visual style is a hybrid of **Organic Minimalism** and **Advanced Glassmorphism**. Inspired by high-end hardware and natural materials, the interface utilizes light-refracting surfaces, soft-focus background blurs, and "sun-bleached" tones. The emotional goal is to evoke a sense of clarity, breathability, and intellectual comfort, replacing dark-mode fatigue with a sophisticated, high-contrast, yet warm aesthetic.

## Colors

The palette is anchored in a "Warm Ivory" base to provide a paper-like reading experience that reduces eye strain. **Palm Green** serves as the primary action color, providing a natural, life-affirming contrast against the earth tones.

- **Surface Tiers:** Use #F6E8D4 for the main canvas. Layered panels use #E8D0A8 with variable opacity to create depth.
- **Accents:** Use **Natural Tan** for structural elements like sidebars or dividers. **Fresh Leaf** (#D4CD66) is reserved for subtle highlights, success states, or soft glowing indicators.
- **Typography:** Avoid pure black. Use **Deep Olive** (#4D4A1F) for all primary text to maintain the organic, premium feel.

## Typography

This design system utilizes **Hanken Grotesk** for display and headline roles to provide a sharp, contemporary edge that contrasts beautifully with the soft UI shapes. **Inter** is utilized for body and functional text due to its exceptional legibility in dense AI-generated data views.

Headlines should maintain tight tracking to feel "architectural," while body text remains neutral and accessible. Use the **label-caps** style for secondary metadata or categorizations to create a clear information hierarchy without relying on heavy color usage.

## Layout & Spacing

The layout philosophy follows a **Fluid Floating Grid**. Elements are not always tethered to the screen edges; instead, they float as "islands" within the warm ivory canvas.

- **Grid:** Use a 12-column grid for desktop with wide 24px gutters to allow the background to breathe.
- **Margins:** Desktop views require a minimum 40px outer margin to maintain the "premium gallery" feel. On mobile, this reduces to 16px.
- **Vertical Rhythm:** Components are spaced using a 4px baseline. Standardize on 16px (stack-md) for internal element grouping and 32px (stack-lg) for section separation.

## Elevation & Depth

Depth is achieved through **Optical Layering** rather than traditional drop shadows. 

1.  **Backdrop Blur:** Use a 20px to 40px Gaussian blur on all elevated panels. Panels should have a 60% opacity of the **Soft Cream** (#E8D0A8) color.
2.  **Inner Glow:** Apply a subtle 1px inner stroke (border) using a lighter tint of the surface color to simulate light catching the edge of a glass pane.
3.  **Shadows:** Use extremely diffused, low-opacity shadows. Instead of grey, the shadow should be a desaturated version of **Olive Brown** (#8B734F) at 10-15% opacity to maintain the warmth of the environment.
4.  **Z-Axis:** Higher elevation levels (like modals) should increase in blur intensity and surface brightness rather than just shadow size.

## Shapes

The shape language is "Organic Geometric." While the grid is strict, the corners are generous.

- **Main Containers:** Use `rounded-xl` (1.5rem / 24px) for primary application windows and large cards to mimic modern hardware industrial design.
- **Interactive Elements:** Buttons and input fields use `rounded-lg` (1rem / 16px).
- **Small Components:** Tags, chips, and checkboxes use `rounded-md` (0.5rem / 8px). 
Avoid hard 90-degree angles to maintain the soft, natural aesthetic.

## Components

- **Buttons:** Primary buttons use **Palm Green** with white or deep olive text. They should have a subtle "squish" animation on click. Secondary buttons use a frosted glass effect with a **Natural Tan** border.
- **Input Fields:** Fields are semi-transparent with a 1px border in **Warm Beige**. On focus, the border transitions to **Palm Green** with a soft outer glow.
- **Cards:** Cards do not use heavy shadows. They are defined by their slightly darker background (#E8D0A8) and a refined 1px border.
- **Glass Chips:** Used for filtering or tags. They should be highly translucent with a 40px backdrop blur and "Deep Olive" text.
- **AI Response Windows:** These should feature a unique **Fresh Leaf** (#D4CD66) left-edge accent to distinguish machine-generated content from user content.
- **Navigation Rail:** A vertical floating bar on the left, using the same glassmorphism rules as the main panels, providing a compact, persistent anchor for the OS.