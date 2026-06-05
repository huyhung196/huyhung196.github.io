---
name: Core Logic
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#f7f6ff'
  on-tertiary: '#2c303c'
  tertiary-container: '#d7daea'
  on-tertiary-container: '#5c5f6d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#dfe2f2'
  tertiary-fixed-dim: '#c3c6d6'
  on-tertiary-fixed: '#171b27'
  on-tertiary-fixed-variant: '#434653'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display:
    fontFamily: IBM Plex Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
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
  margin-desktop: 80px
  margin-mobile: 24px
  container-max: 1200px
---

## Brand & Style

This design system is engineered to project the precision of backend architecture and the innovation of artificial intelligence. It balances high-tech aesthetics with recruiter-focused professionalism, avoiding excessive "gamer" tropes in favor of a sophisticated, data-driven environment.

The style is a hybrid of **Glassmorphism** and **Minimalism**, utilizing dark-mode depth and translucent layers to simulate a powerful terminal or dashboard interface. The emotional response is one of technical mastery, stability, and forward-thinking intelligence.

## Colors

The palette is anchored by a deep navy-charcoal foundation, creating a high-contrast environment where accents vibrate with intent.

- **Backgrounds:** Use `#0B0F1A` for the base layer. Higher-level containers should use low-opacity white overlays rather than lighter grays to maintain the glass effect.
- **Accents:** Electric Cyan (`#00F2FF`) is used for primary actions and "success" states. Deep Violet (`#8B5CF6`) is used for secondary accents and to signify AI-driven or complex logic features.
- **Gradients:** Interactive elements or hero highlights should utilize a 45-degree linear gradient transitioning from Deep Violet to Electric Cyan.
- **Typography:** Headlines must be Crisp White (`#FFFFFF`). Body text should be Muted Gray (`#94A3B8`) to reduce visual noise during long-form reading.

## Typography

The typography strategy leverages three distinct typefaces to establish a technical hierarchy:

1.  **IBM Plex Sans (Headlines):** Provides a structured, industrial feel that suggests engineering rigor.
2.  **Inter (Body):** Ensures high legibility for technical descriptions and project summaries.
3.  **JetBrains Mono (Labels/Metadata):** Used for tags, snippets, and data points to reinforce the "coder" persona.

Maintain generous line-height for body text to ensure the portfolio remains readable for recruiters scanning quickly. Use the mono font sparingly for secondary information like dates, categories, or tech stacks.

## Layout & Spacing

This design system follows a **Fixed Grid** model for desktop, centering content within a 1200px container to maintain focus. 

- **Grid:** Use a 12-column grid for desktop with 24px gutters. Elements should snap to grid lines to emphasize precision.
- **Rhythm:** Use increments of 4px for all padding and margins. Vertical section spacing should be aggressive (120px - 160px) to give the technical content room to breathe.
- **Mobile:** Transition to a 4-column grid with 24px side margins. Cards should stack vertically, and the display typography should scale down to ensure no horizontal overflow.

## Elevation & Depth

Depth is communicated through light and transparency rather than traditional shadows.

1.  **Backdrop Blur:** All cards and overlays must use a `blur(12px)` background filter with a semi-transparent surface color (`rgba(255, 255, 255, 0.03)`).
2.  **Borders:** Use 1px "ghost borders" (`rgba(255, 255, 255, 0.08)`) to define element edges.
3.  **Neon Glows:** For primary interactive elements or "active" states, apply an outer glow using the primary cyan color with a 20px blur at 30% opacity. 
4.  **Z-Indexing:** Higher-order elements (modals, dropdowns) should increase the background opacity slightly (to 0.08) and double the border opacity to 0.16.

## Shapes

The design system uses a logic of **"Structured Softness."** 

Base components like cards, buttons, and input fields use an 8px (`0.5rem`) corner radius. This is sharp enough to feel professional and technical, but rounded enough to feel modern and accessible.

- **Small elements:** Tags and chips should use a 4px radius.
- **Interactive containers:** Hover states can trigger a transition where the border-color brightens, but the shape remains static to preserve the layout's structural integrity.

## Components

### Buttons
- **Primary:** Solid Electric Cyan background with black text. No border. On hover, add a cyan neon glow.
- **Secondary:** Transparent background, 1px Cyan border, Cyan text. On hover, fill with a 5% cyan tint.
- **Ghost:** White text, no border or background. Used for low-priority actions.

### Cards
- **Project Cards:** Glassmorphic base with a 1px top-light border (white at 15% opacity). Content should be padded by 32px.
- **Hover State:** Increase border opacity and apply a subtle Deep Violet glow to the bottom-left corner.

### Form Inputs
- **Fields:** Darker navy background (`#05070A`), 1px muted border. 
- **Focus State:** Border changes to Electric Cyan with a 2px outer glow. Labels should use the Mono font.

### Chips/Tags
- **Tech Stack Tags:** JetBrains Mono font, 12px size, 4px border radius. Use a subtle violet background at 10% opacity with a matching 1px border.

### Status Indicators
- **AI/Active Logic:** A pulsing Cyan dot with a soft glow to represent "live" systems or backend processes.