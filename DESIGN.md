---
name: coredev.uk
description: Paul's site, set in Meridian, the desktop it was built on.
colors:
  ground: "#151920"
  plate: "#222830"
  inset: "#191d24"
  hover: "#2d333e"
  rule: "#363d49"
  selection: "#47505e"
  text: "#ece5d3"
  text2: "#a9a493"
  muted: "#6d717a"
  gilt: "#c9a24f"
  gilt-hover: "#d8b468"
  fill: "#bdb9a9"
  ok: "#6fb39a"
  caution: "#e0954f"
  alert: "#e06c5a"
  link: "#8fb0d3"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 1.4rem + 6.6vw, 8rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontFeature: "\"tnum\" 1"
  title:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.9rem + 3.4vw, 5.25rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontFeature: "\"tnum\" 1"
  headline:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.45rem + 0.9vw, 2.375rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontFeature: "\"tnum\" 1"
  subhead:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.25rem + 0.4vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontFeature: "\"tnum\" 1"
  lead:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.45vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "\"tnum\" 1"
  body:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "\"tnum\" 1"
  small:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    fontFeature: "\"tnum\" 1"
  label:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0"
    fontFeature: "\"tnum\" 1"
  code:
    fontFamily: "Fira Code Variable, ui-monospace, Menlo, monospace"
    fontSize: "0.85em"
    fontWeight: 400
    fontFeature: "normal"
rounded:
  plate: "10px"
  inset: "8px"
  row: "6px"
  track: "2px"
spacing:
  bar-h: "44px"
  max: "80rem"
  margin: "clamp(1.25rem, 3vw, 2.5rem)"
  gutter: "clamp(1rem, 2vw, 2rem)"
  section-gap: "clamp(6rem, 11vw, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.gilt}"
    textColor: "{colors.ground}"
    rounded: "{rounded.inset}"
    padding: "0 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.gilt-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.inset}"
    padding: "0 18px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.hover}"
  button-small:
    rounded: "{rounded.row}"
    padding: "0 12px"
    height: "36px"
  instrument-bar:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text2}"
    typography: "{typography.small}"
    height: "{spacing.bar-h}"
  bar-item-current:
    textColor: "{colors.gilt}"
  plate:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.plate}"
  window-frame:
    backgroundColor: "{colors.inset}"
    rounded: "{rounded.plate}"
  list-row:
    backgroundColor: "transparent"
    rounded: "{rounded.row}"
    padding: "8px 12px"
    height: "48px"
  list-row-hover:
    backgroundColor: "{colors.hover}"
  back-row:
    typography: "{typography.label}"
    rounded: "{rounded.row}"
    padding: "0 12px 0 6px"
    height: "36px"
  facts-plate:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.plate}"
    padding: "6px 16px"
  readout-track:
    backgroundColor: "{colors.inset}"
    rounded: "{rounded.track}"
    height: "4px"
  readout-track-level:
    backgroundColor: "{colors.fill}"
    rounded: "{rounded.track}"
  contents-rail-item:
    textColor: "{colors.text2}"
    typography: "{typography.small}"
    padding: "6px 0 6px 16px"
  contents-rail-item-current:
    textColor: "{colors.gilt}"
  panel-row:
    rounded: "{rounded.row}"
    padding: "8px 12px"
    height: "48px"
  inline-code:
    backgroundColor: "{colors.inset}"
    typography: "{typography.code}"
    rounded: "{rounded.row}"
    padding: "0.1em 0.35em"
  code-block:
    backgroundColor: "{colors.inset}"
    textColor: "{colors.text}"
    typography: "{typography.code}"
    rounded: "{rounded.inset}"
---

# Design System: coredev.uk

## Overview

**Creative North Star: "The Desktop It Was Built On"**

The site is Meridian, the atlas desktop's shell theme, set for the web. Pages read as the shell's own surfaces: an instrument bar across the top, plates and windows stepped by tone, rows that fill under the pointer, and readouts that report rather than decorate. It refuses the generic dark portfolio; every device here has a counterpart in the shell.

Two registers carry the whole site. The Window register is for page openers: names and page titles in Light at display scale, rising once on arrival. The Instrument register is for everything else: rows, plates, facts and readouts, set in bold labels over text2 values, where nothing moves that didn't change. Density is calm and generous at the section scale, and tight and regular inside a plate.

The user rejected the mockup's day arc and any clock or time-of-day indicator. They are not part of the system.

**Key Characteristics:**
- Night-slate grounds stepped ground → plate → inset, with a 1px rule on every edge.
- Enamel legends on a text → text2 → muted ramp.
- Gilt only for "here" and "on", plus one primary button per page.
- One family, Atkinson Hyperlegible Next, with tabular figures throughout; Fira Code for code only.
- Corners step 10/8/6/2.
- One easing family: OutCubic in, InCubic out.

## Colors

Warm enamel legends on cool night-slate, with a single gilt accent and four state colours that only report.

### Primary
- **Gilt**: "here" (the current bar item, the contents rail's current section), "on" ("now", Active status, the current role), the focus ring, and the fill of the page's one primary button. **Gilt Hover** is its pointer state only.

### Neutral
- **Ground**: the page and the instrument bar.
- **Plate**: raised panels: the project list, the facts plate, readouts, tools, 404 links.
- **Inset**: wells set into a plate or the page: window frames, code blocks, inline code, level tracks.
- **Hover**: the fill under the pointer on rows, the back row, secondary buttons.
- **Rule**: every edge and divider, the scrollbar thumb, the contents rail's spine.
- **Selection**: text selection only.
- **Text**: primary legends and headings. **Text2**: labels, sublabels, values, captions, inactive bar items. **Muted**: chevrons and list bullets.
- **Fill**: the enamel fill of a level track, and punctuation in code.

### State
- **Ok**, **Caution**, **Alert**: status in readouts ("up" is Ok). **Link**: underlined links in running copy and prose.

### Named Rules
**The Here and On Rule.** Gilt marks only where you are and what is running, plus one primary button per page. If gilt is doing anything else, it is wrong.

**The Reporting State Rule.** Ok, Caution and Alert report a state; they never decorate.

## Typography

**Body Font:** Atkinson Hyperlegible Next Variable (with system-ui, sans-serif), self-hosted.
**Code Font:** Fira Code Variable (with ui-monospace, Menlo, monospace), for code only.

**Character:** one legible humanist family across every role, separated by weight and scale rather than by a second face. Light at display scale for openers, Medium for headings, Bold for labels and row titles.

### Hierarchy
- **Display** (300, the homepage name, line-height 0.95, -0.03em): the hero name only.
- **Title** (300, line-height 0.95, -0.03em): page titles via the display class; the Window register.
- **Headline** (500, 1.15, -0.015em): section titles.
- **Subhead** (500, 1.15): third-level headings.
- **Lead** (400, 1.4): the line under an opener, held to 32–44ch.
- **Body** (400, 1.55; prose 1.7 at 68ch): running copy.
- **Small**: the bar, rail items, sublabels.
- **Label** (700, letter-spacing 0, sentence case, text2): the label over a value or list.

### Named Rules
**The Tabular Rule.** Tabular figures (`tnum`) are on everywhere in the sans; only code turns them off.

**The One Family Rule.** Fira Code appears only in code, inline or block, in the Meridian syntax theme on the inset ground (keywords violet, strings green, functions blue, types teal, constants orange, parameters coral, comments text2 italic).

## Layout

One measure for the whole site: content capped at 80rem plus equal fluid margins, on a 12-column grid with a fluid gutter. Sections are separated by a large fluid section gap. Document pages (write-ups and posts) run: the back row, the title in columns 1–7 with the facts plate in 9–12, a 2:1 picture across the measure, then the reading column (1–7) with an aside (9–12) holding the sticky contents rail, and the `.next` panel row under the body. Below 960px every document column spans full width and the rail is hidden. The instrument bar is sticky at 44px; sticky elements and heading anchors offset by the bar plus 24px. Inside plates, rhythm is a 6px plate padding with 8–14px row padding and 48px row height.

## Elevation & Depth

Flat by tone. Depth comes from the ground → plate → inset steps and a 1px rule on every edge, never from shadow. The one shadow, Float, belongs only to the homepage hero window, which floats free of the page.

### Shadow Vocabulary
- **Float** (`0 8px 32px rgb(0 0 0 / 0.35)`): the homepage hero window only.

### Named Rules
**The Flat By Tone Rule.** A surface is distinguished by its tone and its rule edge. A window set into the page stays flat.

## Shapes

Corners step down with depth: plates and windows at 10px, buttons, insets and code blocks at 8px, rows, small buttons, inline code and the focus ring at 6px, level tracks at 2px. Every container edge is a 1px rule. The one recurring mark is the 2px gilt rule: 14px wide under the current bar item, and the full-height index on the contents rail. Chevrons are 16px and muted.

## Components

Quiet until touched. Hover fills and colour shifts take 160ms on OutCubic, and only on fine pointers.

### Buttons
- **Shape:** gently rounded (8px; small buttons 6px at 36px high).
- **Primary:** gilt fill, ground text, bold, 44px high. One per page.
- **Secondary:** transparent with a rule border and text legend; the hover fill under the pointer.
- **Focus:** a 2px gilt outline at 2px offset.

### Instrument Bar
- Sticky ground strip, 44px, rule on its lower edge. Pages are workspace items in text2; the current page is gilt and bold over a 14×2 gilt rule on the bar's inner edge. Contact sits on the right in text. The bar is excluded from the page transition and holds still.

### Windows
- Screenshots in an inset frame with 10px corners and a rule edge, a text2 caption beneath. Only the homepage hero window carries Float.

### Plates
- Plate tone, 10px corners, rule edge. Groups inside a plate are divided by rules.

### List Rows
- Transparent at rest, 48px, 6px corners; bold name, text2 detail, years right-aligned, muted chevron. The hover fill under the pointer turns the chevron to text. The whole row is the link; focus draws the gilt ring inset.

### Back Row
- A muted chevron and a bold label heading the sub-view, 36px, with the hover fill.

### Facts Plate
- A plate beside a document title: label over value, rows divided by rules.

### Readouts
- The homelab's numbers as the shell shows them: text2 label, value right-aligned, rows divided by rules. State values take Ok or Alert. Level rows set a 4px inset track with an enamel fill and the value beside it.

### Contents Rail (signature)
- A sticky list on a 1px rule spine. Items in text2; the current section gilt and bold, with a 2px gilt index that glides to it (300ms, OutCubic; no transition under reduced motion). Hidden below 960px.

### Panel Rows
- The `.next` row and the 404 links: bold title over a text2 sublabel, muted chevron, hover fill.

### Motion
- State changes 160ms, moves 300ms, both on OutCubic. Page openers rise once over 650ms (28px, or 8px to settle), staggered, and only without reduced motion. The page transition fades in over 160ms on OutCubic and out over 120ms on InCubic.

## Do's and Don'ts

### Do:
- **Do** keep gilt to "here", "on" and the page's one primary button.
- **Do** separate surfaces by tone and a 1px rule.
- **Do** step corners 10/8/6/2 by depth.
- **Do** use OutCubic in and InCubic out, at 160ms for state and 300ms for moves.
- **Do** keep tabular figures on in the sans.

### Don't:
- **Don't** add a second gilt primary button to a page.
- **Don't** put Float on anything but the homepage hero window.
- **Don't** use Fira Code outside code.
- **Don't** add the day arc, a clock, or any time-of-day indicator.
- **Don't** use state colours as decoration.
- **Don't** animate the instrument bar on page changes.
