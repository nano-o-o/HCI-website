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
  festival-timkat: "#6d28d9"
  festival-holi: "#db2777"
  festival-songkran: "#0e7490"
  festival-muertos: "#9a3412"
  festival-hanukkah: "#57534e"
  festival-matariki: "#312e81"
  festival-osun: "#166534"
  festival-vesak: "#9f1239"
  glow-diwali: "#fde047"
  glow-lunar: "#f87171"
  glow-eid: "#2dd4bf"
  glow-rio: "#a3e635"
  glow-oktoberfest: "#93c5fd"
  glow-timkat: "#c4b5fd"
  glow-holi: "#f472b6"
  glow-songkran: "#67e8f9"
  glow-muertos: "#fdba74"
  glow-hanukkah: "#d6d3d1"
  glow-matariki: "#818cf8"
  glow-osun: "#86efac"
  glow-vesak: "#fda4af"
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
- **Festival colours:** every festival owns one pair. `festival-*` is the only one allowed behind text (badges, the pressed list item) and is also the day pin and day country highlight. `glow-*` is the night pin and night country highlight. The thirteen pairs were chosen to stay as far apart as possible (smallest CIEDE2000 difference 13.4 in both themes), because the list is the pins' colour key; check a new festival's pair against the others before adding it. The selected pin's ring uses `ink` by day and white at night so it stands out against its own highlighted country.
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

- **No header bar:** the globe stage fills the whole first screen; the footer sits below it.
- **Desktop:** the globe fills the stage. The left column holds the intro and the festival list. The details panel slides in on the right, and the globe shifts left so it stays centred between the list and the panel.
- **Phones:** the intro sits at the top and the festival list becomes a horizontally scrolling row at the bottom. The panel becomes a bottom sheet, and the globe slides up above it.

## Elevation & Depth

Depth comes from light, not grey shadows. Cards cast a soft gold glow, and the globe sits in a rim glow, brightest at its edge (white by day, gold at night).

## Shapes

Cards and the details panel use `rounded.base`. Festival list items use a smaller radius, the badges, tooltip, mood tag and card buttons are full pills, and the close button is a circle.

## Components

- **Festival list:** headed "All festivals" in the same style as the right column's headings (hidden on phones, where the list is a row). In calendar order (Eid last, as its date varies). Each item shows a colour dot (the pin's colour), the festival name and region, and the month in its own right-hand column. When pressed it fills with the festival's `festival-*` colour. The list doubles as the colour key for the pins. It scrolls with a thin scrollbar that turns `accent-text` on hover, and soft fades at both ends.
- **Selecting a festival:** the globe spins, tilts and zooms to centre its country, lights up the country (Eid also faintly lights the other Muslim-majority countries), keeps the selected pin pulsing and dims the other pins to 30%. It then applies the festival's theme.
- **Festival pattern strip:** under each card's photo, a row of that festival's motif in its `festival-*` colour (diya flames, a fret, eight-point stars, sequin scallops, Bavarian lozenges, Ethiopian crosses, colour-powder splashes, water drops, papel picado, menorah flames, a star cluster, river waves, lotus flowers). The region and country pills on the photo take the festival colour (Eid and Hanukkah say "Worldwide"). It replaces the gold top edge, and is the one decorative flourish on the page.
- **Copy:** no middle-dot meta strings and no arrows on links; the card link reads "Read more about <festival>" and opens the festival's reading view, which ends with its sources.
- **Greeting:** under the mood tag, the festival's greeting in its own script and language (marked with `lang`), in its `festival-*` colour, with a transliteration and meaning beneath.
- **Pins switch:** under the festival list, a "Pins" row of three pill radio buttons (Pushpin, Lantern, Flag) that changes the pin design. Pushpin is the default; the choice is remembered per visitor. Hidden on phones. The chosen pill fills with `text`. Flag pins carry a 3D pennant fixed to the pole, so it turns with the globe.
- **Coming up:** on the home view, when the page is at least 1240px wide, the right column mirrors the festival list: "Happening now" (festivals in the current month) and "Coming up" (the next three by month), as copies of the list's buttons. Its first heading lines up with "All festivals", and it scrolls on short screens. It fades out while a festival is open, as the details panel takes its place.
- **On now:** list items for festivals in the current month carry an "On now" pill in their colour, and their pins pulse twice as wide.
- **Year ring:** on the home view, when the stage is at least 1100px wide, a calendar ring circles the globe: month names, a dot per festival in its month, and the current month in `accent-text`. Hovering a month dims the pins outside it to 30% and names its festivals in the tooltip. Clicking a month keeps that dimming (its arc turns `accent-text`) until the same month is clicked again, empty space is clicked, Escape is pressed or a festival opens; hovering another month still previews it. The globe keeps spinning while the pointer is on the ring. It fades out while a festival is open.
- **Keyboard:** the globe is focusable. Arrow keys turn it, the pin facing the viewer is highlighted and announced, and Enter opens it. Clicking or tabbing to the globe focuses it; the globe's label names the keys for screen readers.
- **Shareable links:** an open festival is `#<id>` in the address bar (`HCI.html#diwali`). Opening from home adds one history entry, so Back or the close button returns home; switching festivals replaces it.
- **Reading view:** `#<id>/about` widens the panel into a long read (what it celebrates, how, food, dates, where, sources). It sits one history entry above the card, so Back returns to the card, and the close button becomes a back button there, drawn as a ">" chevron (the owner's choice).
- **Credits:** photos from Wikimedia Commons are credited by author and licence in a small dark pill at the bottom-right of each card photo (linking to the file page).
- **Scrollbars:** the festival list, the details panel and the right column use the same thin scrollbar (`chip-border`, `accent-text` on hover).
- **Mood tag:** each card states "Celebrated at night" or "Celebrated by day", so the theme change has a visible reason. The sun and moon icons are inline SVG in `currentColor`, hidden from screen readers.
- **Motion:** the globe spin, pin pulses, zoom, theme fade and panel slides all switch off under `prefers-reduced-motion`.
