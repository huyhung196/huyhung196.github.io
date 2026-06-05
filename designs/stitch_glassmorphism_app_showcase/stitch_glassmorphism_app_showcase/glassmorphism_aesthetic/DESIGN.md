---
name: Glassmorphism Aesthetic
colors:
  surface: '#faf9fe'
  surface-dim: '#dad9df'
  surface-bright: '#faf9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#eeedf3'
  surface-container-high: '#e9e7ed'
  surface-container-highest: '#e3e2e7'
  on-surface: '#1a1b1f'
  on-surface-variant: '#414755'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f5'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc1'
  primary: '#0058bc'
  on-primary: '#ffffff'
  primary-container: '#0070eb'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#006687'
  on-secondary: '#ffffff'
  secondary-container: '#60cdff'
  on-secondary-container: '#005572'
  tertiary: '#00666c'
  on-tertiary: '#ffffff'
  tertiary-container: '#008189'
  on-tertiary-container: '#f4feff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#c1e8ff'
  secondary-fixed-dim: '#74d1ff'
  on-secondary-fixed: '#001e2b'
  on-secondary-fixed-variant: '#004d67'
  tertiary-fixed: '#74f5ff'
  tertiary-fixed-dim: '#00dbe7'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#faf9fe'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e7'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 20px
  card-padding: 24px
---

## Brand & Style

The design system is centered on a high-fidelity, tech-forward aesthetic that prioritizes depth, clarity, and a sense of weightlessness. Drawing inspiration from modern OS-level interfaces, it utilizes **Glassmorphism** as its core visual driver—relying on multi-layered translucency, high-refraction background blurs, and vibrant accents to create a premium, immersive user experience.

The target audience consists of professional users and tech enthusiasts who value a sophisticated, "air-light" interface that feels both organic and highly engineered. The emotional response should be one of calm focus, precision, and futuristic elegance.

## Colors

The palette is built upon a foundation of "Translucent White," designed to interact dynamically with a multi-layered background. 

- **Primary Blue:** A vibrant, high-saturation blue used for interactive states and key brand moments.
- **Surface Layering:** Surfaces are not solid colors but are defined by alpha-blended whites (`rgba(255, 255, 255, 0.7)`).
- **The Background Canvas:** The application background must feature large, soft, organic blurs of teal and blue at low opacity to provide the necessary color bleed for the frosted glass effects to manifest.
- **Accents:** Secondary and tertiary teals provide a refreshing energy, used sparingly in gradients or active status indicators.

## Typography

This design system utilizes **Inter** for its neutral, systematic, and highly legible qualities. The typographic hierarchy is designed to be clean and unobtrusive, allowing the visual depth of the UI to remain the focal point.

Large display type uses tighter letter spacing and heavier weights to feel "anchored" on the glass surfaces. Body text maintains a generous line height to ensure readability against semi-transparent backgrounds. On mobile devices, headline sizes scale down to prevent excessive wrapping while maintaining a strong visual anchor for the glass cards.

## Layout & Spacing

The layout philosophy follows a **fixed-width grid** for desktop productivity and a fluid-width model for mobile. It uses a base 8px rhythmic scale.

- **Desktop:** A 12-column grid with 24px gutters. Content is centered with a maximum width of 1280px to maintain focus.
- **Mobile:** A single-column layout with 20px side margins.
- **Layering Spacing:** Vertical rhythm is strictly enforced; cards and sections are separated by large gaps (48px+) to allow the background blurs to "breathe" between elements.

## Elevation & Depth

Depth is the primary communicator of hierarchy. Instead of traditional dark shadows, this design system uses:

1.  **Backdrop-Filter:** A heavy blur (20px to 40px) applied to the surface to simulate frosted glass.
2.  **Inner Glows:** A subtle 1px white inner border (`rgba(255, 255, 255, 0.4)`) on the top and left edges to simulate light hitting the edge of a glass pane.
3.  **Soft Ambient Shadows:** Shadows are extremely diffused, using the primary color or a neutral gray at very low opacity (e.g., `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05)`).
4.  **Z-Axis Stacking:** Higher-level elements (like modals) increase the blur intensity and shadow spread, while decreasing the surface opacity to appear "closer" to the user.

## Shapes

The shape language is sophisticated and "squircle" inspired, avoiding sharp corners to maintain a soft, premium feel.

- **Standard Elements:** Use a 0.5rem (8px) radius.
- **Large Cards:** Use a 1.5rem (24px) radius to create a distinct frame for content.
- **Buttons:** Use a 1rem (16px) or fully rounded pill-shape to differentiate them as the primary interactive targets.

## Components

### Buttons
Primary buttons feature a vibrant, high-gloss solid blue finish. They should have a subtle linear gradient (Top: #007AFF, Bottom: #005DC2) and a slight inner glow on the top edge. Text should be white and semibold.

### Cards
Cards are the "frosted glass" containers. They must have `backdrop-filter: blur(30px)`, a semi-transparent white background, and a 1px white border at 40% opacity. Avoid using solid backgrounds within cards; use typography and iconography to define sections.

### Input Fields
Fields should be treated as "etched" into the glass—using a slightly darker translucent gray background with a 1px border that becomes vibrant blue on focus.

### Chips & Tags
Chips use a reduced blur (10px) and a pill-shaped geometry. For active states, use the primary blue with 20% opacity and a solid blue text label.

### Glass Lists
Lists should not have dividers between every item. Instead, use subtle hover states that brighten the glass background of the specific row.