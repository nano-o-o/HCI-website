---
version: alpha
name: Golden Morning & Lantern Night
description: Visual language for the Global Cultural Atlas, an interactive globe for discovering world festivals. Day by default; night festivals switch the page to night.
colors:
  surface-bar: "#fff6ea"
  text: "#2b1a3d"
  text-muted: "#54445f"
  accent-text: "#9a4a0c"
  focus: "#2b1a3d"
  chip-bg: "rgba(255, 255, 255, 0.72)"
  chip-border: "rgba(43, 26, 61, 0.14)"
  line: "rgba(43, 26, 61, 0.12)"
  sky-top: "#bfe2f2"
  sky-mid: "#fbe6cc"
  sky-bottom: "#f6cfa8"
  daylight: "#fff6ea"
  amber-text: "#9a4a0c"
  night-900: "#0e0820"
  night-800: "#1a1033"
  night-700: "#2e1a4f"
  night-sky-top: "#0b0926"
  night-sky-mid: "#24134a"
  night-sky-bottom: "#4a2638"
  on-night: "#f8f1ff"
  on-night-muted: "#cdbfe0"
  gold: "#f2b84b"
  cream: "#fdf6e9"
  cream-edge: "#ecd3a0"
  ink: "#2b1a3d"
  ink-soft: "#4a3b57"
  ink-muted: "#6e5d7c"
  globe-day-ocean: "#4fb0c6"
  globe-day-land: "#ecd8a8"
  globe-day-coast: "#a8804c"
  globe-day-halo: "#ffffff"
  globe-night-ocean: "#241640"
  globe-night-land: "#6b4f26"
  globe-night-coast: "#e9c46a"
  globe-night-halo: "#f2b84b"
  festival-diwali: "#a16207"
  festival-lunar: "#dc2626"
  festival-eid: "#115e59"
  festival-rio: "#4d7c0f"
  festival-oktoberfest: "#2563eb"
  festival-holi: "#db2777"
  festival-songkran: "#0e7490"
  festival-muertos: "#9a3412"
  glow-diwali: "#fde047"
  glow-lunar: "#f87171"
  glow-eid: "#2dd4bf"
  glow-rio: "#a3e635"
  glow-oktoberfest: "#93c5fd"
  glow-holi: "#f472b6"
  glow-songkran: "#67e8f9"
  glow-muertos: "#fdba74"
typography:
  display:
    fontFamily: Fraunces
    fontWeight: 600
  body:
    fontFamily: Alegreya Sans
rounded:
  base: 16px
omitted:
  - spacing
---

# Golden Morning & Lantern Night

## Overview

The site is a festival atlas with a 3D globe as the hero. It opens in a warm morning light. Festivals celebrated after dark (Diwali, Lunar New Year, Rio Carnival) switch the whole page to a lantern-lit night, and closing the festival returns it to morning. Text stays in the left column and the details panel, so nothing competes with the globe.

## Colors

- **Semantic roles (`surface-bar`, `text`, `text-muted`, `accent-text`, `focus`, `chip-*`, `line`):** components use only these roles, never the raw day or night colours, so they follow the theme automatically. The values in the frontmatter are the day values; the night values are in Themes.
- **Day sky (`sky-*`):** a top-to-bottom gradient behind the globe, from pale blue down to peach.
- **Night sky (`night-sky-*`):** a top-to-bottom gradient mirroring the day sky (deep indigo, violet, a dim lantern glow at the bottom), with a soft `night-700` glow behind the globe, layered over the day sky. Gradients cannot animate, so a soft-edged mask slides it across the stage: night arrives from the east (right) like dusk and recedes the same way.
- **Accent:** `amber-text` by day and `gold` at night, for hovers. On light surfaces `gold` is decoration only, never text.
- **Cards (`cream`, `ink*`):** the same paper card in both themes. Inside a card the focus ring is always `ink`.
- **Globe (`globe-day-*`, `globe-night-*`):** both sets are always defined. The globe draws a day map and a night map and crossfades between them. The map has a faint 30° graticule and thin country borders in the coast colour; at night, stars (`on-night`) fade in behind it.
- **Festival colours:** every festival owns one pair. `festival-*` is the only one allowed behind text (badges, the pressed list item) and is also the day pin and day country highlight. `glow-*` is the night pin and night country highlight. The eight pairs were chosen to stay as far apart as possible (smallest CIEDE2000 difference 13.7 by day and 14.8 at night), because the list is the pins' colour key; check a new festival's pair against the others before adding it. The selected pin's ring uses `ink` by day and white at night so it stands out against its own highlighted country.
- **Code ownership:** `style.css` `:root` is the only place these values live, and `globe.js` reads them from there.

## Themes

The page theme is the `data-theme` attribute on `<html>` (`day` by default, `night` for night festivals). Theme changes take 1 second (the night sky sweeps, everything else fades), or happen instantly when the device asks for reduced motion.

| Token | Day (default) | Night |
| --- | --- | --- |
| surface-bar | `#fff6ea` | `#0e0820` |
| text | `#2b1a3d` | `#f8f1ff` |
| text-muted | `#54445f` | `#cdbfe0` |
| accent-text | `#9a4a0c` | `#f2b84b` |
| focus | `#2b1a3d` | `#f2b84b` |
| chip-bg | `rgba(255, 255, 255, 0.72)` | `rgba(14, 8, 32, 0.75)` |
| chip-border | `rgba(43, 26, 61, 0.14)` | `rgba(242, 184, 75, 0.25)` |
| line | `rgba(43, 26, 61, 0.12)` | `rgba(242, 184, 75, 0.18)` |

## Typography

- **Display (Fraunces):** the hero heading and card titles. The hero heading has no accent word and is always two lines: "A world of / festivals" on home, "A night of / Diwali" or "A day of / Eid al-Fitr" while a festival is open.
- **Body (Alegreya Sans):** all other text, a humanist sans whose calligraphic strokes echo Fraunces. Buttons and labels use the bold weight.
- **Fonts are bundled locally** in `vendor/fonts` so the site works offline.

## Layout

- **No header bar or footer:** the globe stage is the whole page, so the page doesn't scroll (except on screens shorter than the stage's 520px minimum). The site's credit line lives in the About dialog.
- **Desktop:** the globe fills the stage. The left column holds the intro and the festival list. The details panel slides in on the right, and the globe shifts left so it stays centred between the list and the panel.
- **Phones:** the intro sits at the top and the festival list becomes a horizontally scrolling row at the bottom. The panel becomes a bottom sheet, and the globe slides up above it.

## Elevation & Depth

Depth comes from light, not grey shadows. Cards cast a soft gold glow, and the globe sits in a rim glow, brightest at its edge (white by day, gold at night).

## Shapes

Cards and the details panel use `rounded.base`. Festival list items use a smaller radius, the badges, tooltip, mood tag and card buttons are full pills, and the close button is a circle.

## Components

- **Festival list:** headed "All festivals" in the same style as the right column's headings (hidden on phones, where the list is a row). In calendar order (Eid last, as its date varies). Each item shows a colour dot (the pin's colour), the festival name and region, and the month in its own right-hand column. When pressed it fills with the festival's `festival-*` colour. The list doubles as the colour key for the pins. It scrolls with a thin scrollbar that turns `accent-text` on hover, and soft fades at both ends.
- **Pins:** one pin per country (festivals group by their first country, at the first festival's spot there). A country with several festivals has a small count badge and slowly cycles its pin through their colours (2.5 s hold, 1.5 s fade; paused while hovered, held on the open festival's colour). Clicking it spins and zooms to the country like a festival does, but the details panel shows the country's festival list (photo, name, month, one line) instead of a card, with the country lit in `accent-text` (`gold` at night) and the theme unchanged (the count badge hides while the list or one of its cards is open, so the pin shows); choosing one opens its card, whose back chevron returns to the list. The list has no address of its own. The list, "Coming up" and links still open a festival directly. Each design has a small idle motion: the pushpin wobbles, the lantern sways and its glow pulses, the flag's pennant waves (pole fixed), the candle flame flickers, the marker bobs, and the firework's rays burst outward and fade in a slow 3 s loop. Every pin has its own phase. The motion is doubled for a hovered or selected pin and for festivals on now; dimmed pins and pins on the far side of the globe hold still. When the globe is zoomed in, pins grow on screen only gently (their size in the world shrinks as zoom^-0.6, the click area with it) so they neither balloon nor shrink. Zoomed in past about 1.8x (it collapses again below about 1.6x), a country pin with several festivals splits into one smaller pin per festival, in a tight ring around the country's spot (no real coordinates: Diwali has no single place). Each fanned pin keeps the chosen design in its own festival colour, opens its festival's card directly, and dims, brightens, pulses and moves like any pin. The ring radius follows the pins' size, so neighbours stay about three pin widths apart at every zoom. Colour cycling pauses while fanned. While a festival or country list is open, only that country fans. Phones and windows up to 720px wide stop at 1.3x and never fan.
- **Selecting a festival:** the globe spins, tilts and zooms to centre its country, lights up the country (Eid also faintly lights the other Muslim-majority countries), keeps the selected pin pulsing and dims the other pins to 30%. It then applies the festival's theme. A country's festival list does the same, except that it lights the country in the accent colour and leaves the theme as it was until a festival is chosen.
- **Festival pattern strip:** under each card's photo, a row of that festival's motif in its `festival-*` colour (diya flames, a fret, eight-point stars, sequin scallops, Bavarian lozenges, colour-powder splashes, water drops, papel picado). The region and country pills on the photo take the festival colour (Eid says "Worldwide"). It replaces the gold top edge, and is the one decorative flourish on the page.
- **Copy:** no middle-dot meta strings and no arrows on links; the card link reads "Read more about <festival>" and opens the festival's reading view, which ends with its sources.
- **Greeting:** under the mood tag, the festival's greeting in its own script and language (marked with `lang`), in its `festival-*` colour, with a transliteration and meaning beneath.
- **Pins switch:** under the festival list, a "Pins" group of six pill radio buttons in two rows of three (Pushpin, Lantern, Flag; Marker, Candle, Firework) that changes the pin design. Pushpin is the default; the choice is remembered per visitor. Hidden on phones. The chosen pill fills with `text`. Flag pins carry a 3D pennant fixed to the pole, so it turns with the globe. Marker (a map-style teardrop) and Candle (a candle in the festival colour with a gold flame) stand on the surface without a needle; Firework is a small ball bursting into rays of the festival colour.
- **Coming up:** on the home view, when the page is at least 1240px wide, the right column mirrors the festival list: "Happening now" (festivals in the current month) and "Coming up" (the next three by month), as copies of the list's buttons. Its first heading lines up with "All festivals", and it scrolls on short screens. It fades out while a festival is open, as the details panel takes its place.
- **On now:** list items for festivals in the current month carry an "On now" pill in their colour, and a pin pulses twice as wide if any of its festivals is on now.
- **Year ring:** on the home view, when the stage is at least 1100px wide, a calendar ring circles the globe: month names, a dot per festival in its month, and the current month in `accent-text`. Hovering a month dims the pins none of whose festivals are in it to 30% and names its festivals in the tooltip. Clicking a month keeps that dimming (its arc turns `accent-text`) until the same month is clicked again, empty space is clicked, Escape is pressed or a festival opens; hovering another month still previews it. The globe keeps spinning while the pointer is on the ring. It fades out while a festival is open, and when the globe is zoomed in past about 1.15x (it no longer fits), returning on zoom-out.
- **Region filter:** on the "All festivals" heading line (hidden on phones), a small "Region: All" pill opens a drop-down of pill buttons: All plus the list's own region labels (Americas, East Asia, Europe, Middle East, South Asia, Southeast Asia). Picking one dims the other list items, and the pins none of whose festivals are in it, to 30%, like the year ring, and the pill names the region. The chosen pill fills with `text`. Escape closes the drop-down first; Escape on the home view, or opening a festival, clears the region.
- **Keyboard:** the globe is focusable. Arrow keys turn it, the pin facing the viewer is highlighted and announced, and Enter opens it (for a country with several festivals, its list in the panel: focus moves into it, arrows and Tab move through the rows, Escape closes the panel, and it is announced). Clicking or tabbing to the globe focuses it; the globe's label names the keys for screen readers. `+` and `-` zoom in and out and `0` resets the zoom. Fanned pins are not keyboard targets and never take Tab: Enter on the facing country still opens its festival list, and the country's fanned pins light up together while it faces the viewer.
- **Zoom:** the mouse wheel or a trackpad pinch over the globe (not over the list or panel), a two-finger pinch on touch screens (the globe has `touch-action: none`, so the page itself never zooms), `+`, `-` and `0` while the globe is focused, and a small pill of buttons (−, the current zoom such as "2.5×" which resets it, +) at the bottom centre of the stage, left of the About chip on phones. The range is 1x to 2.5x; phones and windows up to 720px wide stop at 1.3x. Zoom eases like the other globe motion and is instant under reduced motion. Zoom is about the globe's centre (drag turns it). Selecting a festival or country list raises the zoom to at least 1.25x and never zooms out; closing returns to 1x, and the reset button and `0` return to 1x (1.25x while something is open). The map is drawn at 2048x1024 and rebuilt at 4096x2048 the first time a larger screen zooms past 1.3x, so it stays sharp; phones keep 2048 and the 1.3x cap.
- **Zoom labels:** when zoomed in, each country with a pin gets a small chip label under its pin (`chip-bg`, `chip-border`, `text`, `text-muted`, `accent-text` on hover) with the country and its festival count; above about 1.9x it also lists the festival names. Labels fade in from 1.4x (1.2x on phones, so the capped zoom still shows them), hide on the far side of the globe, dim to 30% with their pin (month, region or open festival), and where two overlap the lower-priority one (open festival first, then undimmed, then nearer the centre) is hidden. Clicking a label does what clicking its pin does. Labels are visual only (hidden from screen readers and not tabbable); keyboard users use Enter on the facing pin. A fanned pin's label shows its festival's name. The country's own label (name and count) moves above the ring, drops its festival names and still opens the festival list.
- **Shareable links:** an open festival is `#<id>` in the address bar (`HCI.html#diwali`). Opening from home adds one history entry, so Back or the close button returns home; switching festivals replaces it. A card opened from a country's list sits one entry above the list, so Back goes festival, list, home; its back chevron returns to the list and a second cross beside it closes straight to the globe.
- **Reading view:** `#<id>/about` widens the panel into a long read (what it celebrates, how, food, dates, where, sources). It sits one history entry above the card, so Back returns to the card, and the close button becomes a back button there, drawn as a ">" chevron (the owner's choice).
- **Reading-view photos:** the long read may carry up to two credited figures, one after the paragraph it illustrates (for example the food photo under Food). Each is full width at a 16:10 crop and lazy-loaded, with a one-line caption below. Clicking one opens it in the photo viewer.
- **Photo viewer:** clicking a card photo (a button labelled "View full photo: <alt>") opens it uncropped in a modal dialog over a dimmed page, with the card's close button and credit pill. A click anywhere but the credit, or Escape, closes only the photo and returns focus to it.
- **Credits:** photos from Wikimedia Commons are credited by author and licence in a small dark pill at the bottom-right of each card photo and reading-view photo (linking to the file page).
- **Scrollbars:** the festival list, the details panel and the right column use the same thin scrollbar (`chip-border`, `accent-text` on hover). The page's own scrollbar (only on very short screens) matches it without the hover colour.
- **About:** a round chip with an info icon (`chip-bg`, `chip-border`, `accent-text` border on hover) in the stage's bottom-right corner, top-right on phones; the details panel covers it when open. It opens a small cream card dialog with the site's credit line ("Global Cultural Atlas, an HCI project…"), closed by its close button, Escape or a click on the backdrop.
- **Mood tag:** each card states "Celebrated at night" or "Celebrated by day", so the theme change has a visible reason. The sun and moon icons are inline SVG in `currentColor`, hidden from screen readers.
- **Motion:** the globe spin (which also holds still while zoomed in past 1.05x), pin pulses and idle pin motion, zoom (wheel, pinch and buttons) and label fades, theme fade and panel slides all switch off under `prefers-reduced-motion`. So do the page-load entrance (title, list and globe fade in, 0.45–0.8 s), the list hover slide and border highlight (0.3 s), the dialog and region-popover open/close (scale and fade, 0.25 s, pills pop in one by one) and the "On now" pill pulse (2.4 s loop). The reading view eases in and out (panel width 0.35 s, long read fade 0.3 s; a bottom sheet eases its height instead), and the same applies to Back; it is instant when the page opens straight onto `/about`. A country's list slides in like a card. Under reduced motion a multi-festival pin holds its first festival's colour (the badge still shows). The fan-out and collapse ease (0.3 s) is instant under reduced motion.
