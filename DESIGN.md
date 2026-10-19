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
  festival-tomatina: "#a5002d"
  festival-fallas: "#5a5a00"
  festival-venice: "#8700a5"
  festival-bastille: "#00875a"
  festival-mardigras: "#b400ff"
  festival-coachella: "#694b2d"
  festival-vina: "#1e5a1e"
  festival-guelaguetza: "#960f5a"
  festival-iemanja: "#2d00ff"
  festival-gnaoua: "#1e4ba5"
  festival-fez: "#937206"
  festival-cape: "#c34b00"
  festival-dsf: "#78780f"
  festival-nowruz: "#5a693c"
  festival-sapporo: "#1e78c3"
  festival-awa: "#784b78"
  festival-lantern: "#3c694b"
  festival-loy: "#b41e96"
  festival-bon: "#0f7869"
  festival-tet: "#00782d"
  festival-tshechu: "#5a6996"
  festival-tihar: "#874500"
  festival-durga: "#874b4b"
  festival-vivid: "#6f4bd8"
  festival-cup: "#005a78"
  festival-fringe: "#9960b1"
  festival-anzac: "#78693c"
  glow-diwali: "#fde047"
  glow-lunar: "#f87171"
  glow-eid: "#2dd4bf"
  glow-rio: "#a3e635"
  glow-oktoberfest: "#93c5fd"
  glow-holi: "#f472b6"
  glow-songkran: "#67e8f9"
  glow-muertos: "#fdba74"
  glow-tomatina: "#ffa587"
  glow-fallas: "#3cb400"
  glow-venice: "#ffb4ff"
  glow-bastille: "#00ff78"
  glow-mardigras: "#b4a5ff"
  glow-coachella: "#d2c387"
  glow-vina: "#00b478"
  glow-guelaguetza: "#ffa5b4"
  glow-iemanja: "#e178ff"
  glow-gnaoua: "#2da5ff"
  glow-fez: "#a5b43c"
  glow-cape: "#ff9600"
  glow-dsf: "#f0b41e"
  glow-nowruz: "#e1f096"
  glow-sapporo: "#1ec3ff"
  glow-awa: "#d2c3ff"
  glow-lantern: "#0fffd2"
  glow-loy: "#d296d2"
  glow-bon: "#96e1c3"
  glow-tet: "#0fd25a"
  glow-tshechu: "#ab9fcc"
  glow-tihar: "#fc722a"
  glow-durga: "#ff6c90"
  glow-vivid: "#87a5ff"
  glow-cup: "#1eb4d2"
  glow-fringe: "#fc9fcf"
  glow-anzac: "#e1ff2d"
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

The site is a festival atlas with a 3D globe as the hero. It opens in a warm morning light. Festivals celebrated after dark (Diwali, Chinese New Year, Rio Carnival) switch the whole page to a lantern-lit night, and closing the festival returns it to morning. Text stays in the left column and the details panel, so nothing competes with the globe.

## Colors

- **Semantic roles (`surface-bar`, `text`, `text-muted`, `accent-text`, `focus`, `chip-*`, `line`):** components use only these roles, never the raw day or night colours, so they follow the theme automatically. The values in the frontmatter are the day values; the night values are in Themes.
- **Day sky (`sky-*`):** a top-to-bottom gradient behind the globe, from pale blue down to peach.
- **Night sky (`night-sky-*`):** a top-to-bottom gradient mirroring the day sky (deep indigo, violet, a dim lantern glow at the bottom), with a soft `night-700` glow behind the globe, layered over the day sky. Gradients cannot animate, so a soft-edged mask slides it across the stage: night arrives from the east (right) like dusk and recedes the same way.
- **Accent:** `amber-text` by day and `gold` at night, for hovers. On light surfaces `gold` is decoration only, never text.
- **Cards (`cream`, `ink*`):** the same paper card in both themes. Inside a card the focus ring is always `ink`.
- **Globe (`globe-day-*`, `globe-night-*`):** both sets are always defined. The globe draws a day map and a night map and crossfades between them. The map has a faint 30° graticule and thin country borders in the coast colour; at night, stars (`on-night`) fade in behind it.
- **Festival colours:** every festival owns one pair. `festival-*` is the only one allowed behind text (badges, the pressed list item) and is also the day pin and day country highlight. `glow-*` is the night pin and night country highlight. The thirty-five pairs were chosen to stay as far apart as possible (smallest CIEDE2000 difference 9.2 by day, Melbourne Cup and Songkran, and 9.0 at night, Oktoberfest and Vivid Sydney; each batch of new festivals was searched with the earlier pairs fixed, and in 2026-10 six festivals were recoloured to lift the closest pairs, keeping white text on every `festival-*` colour at 4.5:1 or more), because the list is the pins' colour key; check a new festival's pair against the others before adding it. The selected pin's ring uses `ink` by day and white at night so it stands out against its own highlighted country.
- **Code ownership:** `style.css` `:root` is the only place these values live, and `globe.js` reads them from there.

## Themes

The page theme is the `data-theme` attribute on `<html>` (`day` by default, `night` for night festivals). Theme changes take half a second (the night sky sweeps, everything else fades; the globe's own day/night crossfade eases a little longer), or happen instantly when the device asks for reduced motion.

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

- **Display (Fraunces):** the hero heading, card titles and the card greeting. Fraunces covers only Latin, so non-Latin greetings use bundled Noto subsets at weight 600, cut to the greetings' own characters: Noto Serif Devanagari, Bengali, Thai, SC and JP, and Noto Naskh Arabic for Arabic and Persian. A new or changed non-Latin greeting needs its subset rebuilt (see the note above the rules in `style.css`). The hero heading has no accent word and is always two lines: "A world of / festivals" on home, "A night of / Diwali" or "A day of / Eid al-Fitr" while a festival is open. A name too long for the column at 1000px uses a shorter `heading` (Viña del Mar, Gnaoua Festival, Fez Sacred Music, Minstrel Carnival, Dubai Shopping, Snow Festival).
- **Body (Alegreya Sans):** all other text, a humanist sans whose calligraphic strokes echo Fraunces. Buttons and labels use the bold weight.
- **Fonts are bundled locally** in `vendor/fonts` so the site works offline, with Vietnamese subsets (loaded only for Vietnamese letters) so Tết's text keeps both typefaces.

## Layout

- **No header bar or footer:** the globe stage is the whole page, so the page doesn't scroll (except on screens shorter than the stage's 520px minimum). The site's credit line lives in the About dialog.
- **Desktop:** above 1100px wide the globe is drawn 1.95x bigger than a centred fit, with its centre about 78% across and 55% down the stage, so the right and bottom edges crop it. The left column holds the intro and the festival list. The details panel slides in on the right, and the globe slides left at the same size so the picked country sits centred between the list and the panel (the reading view does the same with its wider panel). From 721 to 1100px it is 1.25x, centred in the space right of the list. The camera's view offset does all of this, so the canvas stays the size of the stage.
- **Phones:** the intro sits at the top and the festival list becomes a horizontally scrolling row at the bottom. The panel becomes a bottom sheet, and the globe slides up above it.

## Elevation & Depth

Depth comes from light, not grey shadows. Cards cast a soft gold glow, and the globe sits in a rim glow, brightest at its edge (white by day, gold at night).

## Shapes

Cards and the details panel use `rounded.base`. Festival list items use a smaller radius, the badges, tooltip, mood tag and card buttons are full pills, and the close button is a circle.

## Components

- **Festival list:** headed "All festivals (N)", with N the number of festivals, in small uppercase `text-muted` (hidden on phones, where the list is a row). In calendar order (Eid last, as its date varies). Each item shows a colour dot (the pin's colour), the festival name and region, and the month in its own right-hand column. When pressed it fills with the festival's `festival-*` colour. The list doubles as the colour key for the pins. It scrolls with a thin scrollbar that turns `accent-text` on hover, and soft fades at both ends.
- **Pins:** one pin per festival, near the festival's own `lat`/`lon` (a real city or site inside its country's border). Clicking a pin opens its festival's card. Pins are drawn clear of their country's border and of each other. Each one sits at a stored spot (`pinLat`/`pinLon`), nudged once from its real place to about 450 km from other pins and 170 km from its border, staying inside its country and within about 330 km of the real place (the data keeps the real place in `lat`/`lon`); a new festival needs a spot picked the same way. Narrow countries and islands can't fit the full gaps, so their pins settle mid-country. Each pin has a small ring on the surface under it, half the original size. Every pin is drawn at 0.7x of the original pin size. Each design has a small idle motion: the pushpin wobbles, the lantern sways and its glow pulses, the flag's pennant waves (pole fixed, leaning 25° north), the candle flame flickers, the marker bobs, and the firework's rays burst outward and fade in a slow 3 s loop. Every pin has its own phase. The motion is doubled for a hovered or selected pin and for festivals on now; dimmed pins and pins on the far side of the globe hold still. Pins, their rings and click areas keep the same size on screen at every zoom (their size in the world shrinks as 1/zoom). Pins also scale with how directly they face the viewer, for depth: 1.15x facing straight out, down to 0.7x at the globe's edge and beyond (rings follow; click areas don't shrink, so every pin keeps at least the front pin's click area; the selected pin keeps its own size).
- **Selecting a festival:** the globe spins, tilts and zooms to centre its country, lights up the country (Eid also faintly lights the other Muslim-majority countries, and Nowruz the other countries on UNESCO's joint Nowruz listing), keeps the selected pin pulsing and dims the other pins to 30%. It then applies the festival's theme.
- **Festival bursts:** once the spin to a festival settles, a burst of about 2 s shoots out of its pin and falls back, on a see-through layer that never takes clicks: golden sparks for Diwali, gulal powder clouds for Holi, marigold petals for Día de Muertos; the same three effects in each festival's own colours for Chinese New Year, Tết, Tihar, Bastille Day, Las Fallas, Dubai Shopping Festival, Vivid Sydney (sparks), La Tomatina, Songkran (clouds), Festa de Iemanjá, Durga Puja, Nowruz and Melbourne Cup (petals); paper confetti that shoots out, then tumbles and flutters as it falls, in each festival's own colours for Rio Carnival, Mardi Gras, Venice Carnival, Cape Town Minstrel Carnival, Viña del Mar, Coachella, Oktoberfest, Guelaguetza, Adelaide Fringe, Gnaoua (Essaouira blue, white and cowrie cream) and Thimphu Tshechu (lungta papers in the five prayer-flag colours); and six of their own: red paper lanterns with gold caps that rise and sway for the Lantern Festival, small flickering candle lights that drift and fade for Loy Krathong (krathong candles, not sky lanterns) and, more amber, for the Fez Festival of World Sacred Music (brass lantern light), white snowflakes that fall slowly and sway for the Sapporo Snow Festival, river spray thrown up in an arc for Bon Om Touk, about a dozen red poppy petals that lift a little and drift slowly down for Anzac Day (kept quiet: no shooting out), and small twinkling gold stars and crescent moons that float up for Eid al-Fitr. Awa Odori reuses the lanterns in white and red, for the chōchin the dance groups carry. At night only sparks and powder clouds glow additively; everything larger is drawn plain, so it never adds up to a white blob. It doesn't replay on Back from the reading view.
- **Festival pattern strip:** under each card's photo, a row of that festival's motif in its `festival-*` colour (diya flames, a fret, eight-point stars, sequin scallops, Bavarian lozenges, colour-powder splashes, water drops, papel picado, tomatoes, bonfire flames, carnival masks, cockades, bead strands, palm trees, seagulls, a stepped greca, waves, iron castanets, horseshoe arches, umbrellas, shopping bags, sprouts, snowflakes, amigasa hats, round lanterns, krathong, racing boats, mai blossoms, prayer flags, diyo lamps, a trishul, Opera House sails, horseshoes, circus tents, poppies). The region and country pills on the photo take the festival colour (Eid says "Worldwide", Nowruz "Iran and beyond"). It replaces the gold top edge, and is the one lasting decorative flourish on the page.
- **Copy:** no middle-dot meta strings and no arrows on links; the card link reads "Read more about <festival>" and opens the festival's reading view, which ends with its sources.
- **Greeting:** under the mood tag, the festival's greeting, or its best-known phrase where it has no greeting (Viña del Mar: "¡El Monstruo!"; Cape Town: "Tweede Nuwe Jaar!"; Awa Odori: the song line "踊る阿呆に見る阿呆"), in its own script and language (marked with `lang`), in its `festival-*` colour, with a transliteration and meaning beneath. A festival with neither (Coachella, the Gnaoua and Fez festivals, Dubai Shopping Festival, Sapporo Snow Festival, Bon Om Touk, Thimphu Tshechu, Vivid Sydney, Melbourne Cup, Adelaide Fringe) has no greeting line.
- **Pins switch:** under the festival list, a "Pins" group of six pill radio buttons in two rows of three (Pushpin, Lantern, Flag; Marker, Candle, Firework) that changes the pin design. Pushpin is the default; the choice is remembered per visitor. Hidden on phones. The chosen pill fills with `text`. Flag pins carry a 3D pennant that turns around its pole to face the viewer; the pole leans 25° north, so even a flag seen from straight above (the selected one) shows its pennant. Marker (a map-style teardrop) and Candle (a candle in the festival colour with a gold flame) stand on the surface without a needle; Firework is a small ball bursting into rays of the festival colour.
- **On now:** list items for festivals in the current month carry an "On now" pill in their colour, and a pin pulses twice as wide if any of its festivals is on now.
- **Region filter:** on the "All festivals" heading line (hidden on phones), a small "Region: All" pill opens a drop-down of pill buttons: All plus the list's own region labels (Africa, Americas, East Asia, Europe, Middle East, South Asia, Southeast Asia). Picking one moves its festivals to the top of the list (both groups keep calendar order) and scrolls the list to the top, dims the other list items, and the pins none of whose festivals are in it, to 30%, and the pill names the region. The chosen pill fills with `text`. Escape closes the drop-down first; Escape on the home view, or opening a festival, clears the region.
- **Keyboard:** the globe is focusable. Arrow keys turn it, the pin facing the viewer is highlighted and announced, and Enter opens its festival. Clicking or tabbing to the globe focuses it; the globe's label names the keys for screen readers. `+` and `-` zoom in and out and `0` resets the zoom.
- **Zoom:** the mouse wheel or a trackpad pinch over the globe (not over the list or panel), a two-finger pinch on touch screens (the globe has `touch-action: none`, so the page itself never zooms), `+`, `-` and `0` while the globe is focused, and a small pill of buttons (−, the current zoom such as "1.6×" which resets it, +) just left of the About chip in the bottom-right corner (top-right on phones); while the details panel or reading view is open it slides to just left of the panel. The range is 1x to 1.6x; touch-first devices (phones and tablets) and windows up to 720px wide stop at 1.3x. Zoom eases like the other globe motion and is instant under reduced motion. Zoom is about the globe's centre (drag turns it). Selecting a festival or country list raises the zoom to at least 1.25x and never zooms out; closing returns to 1x, and the reset button and `0` return to 1x (1.25x while something is open). Windows over 1100px wide on non-touch-first devices, whose home view is already drawn at about 2x, start with the map at 4096x2048; other larger screens start at 2048x1024 and rebuild it at 4096x2048 the first time they draw the globe past 1.3x of a centred fit, so it stays sharp; phones keep 2048 and the 1.3x cap.
- **Zoom labels:** when zoomed in, each pin gets a small chip label under it (`chip-bg`, `chip-border`, `text`, `accent-text` on hover) with its festival's name. Labels fade in once the globe is drawn past 1.4x of a centred fit (1.2x on phones, so the capped zoom still shows them), so desktop shows them at the default zoom, hide on the far side of the globe, dim to 30% with their pin (region or open festival), and where two overlap the lower-priority one (open festival first, then undimmed, then nearer the centre) is hidden. Clicking a label does what clicking its pin does. Labels are visual only (hidden from screen readers and not tabbable); keyboard users use Enter on the facing pin.
- **Shareable links:** an open festival is `#<id>` in the address bar (`HCI.html#diwali`). Opening from home adds one history entry, so Back or the close button returns home; switching festivals replaces it.
- **Reading view:** `#<id>/about` widens the panel into a long read (what it celebrates, how, food, dates, where, sources). It sits one history entry above the card, so Back returns to the card, and the close button becomes a back button there, drawn as a ">" chevron (the owner's choice). Its body text is 17px (`1.06rem`, line height 1.65; about 74 characters per line in the 640px panel), larger than the card's. Each long read is at most 350 words of body text. It opens with a read time ("About 2 min read", at 200 words a minute, `ink-muted`) and a row of section-link chips, one per heading ("What it celebrates", "How", "Food", "When", "Where", "Sources"), that scroll the panel to that heading (smoothly, instant under reduced motion) and focus it; they are buttons, since the address hash holds the festival. A 4px bar in the festival's `festival-*` colour runs along the panel's top edge and fills as the long read scrolls (the owner's pick, option B, 2026-10-19).
- **Reading-view photos:** the long read may carry up to two credited figures, one after the paragraph it illustrates (for example the food photo under Food). Each is full width at a 16:10 crop and lazy-loaded, with a one-line caption below. Clicking one opens it in the photo viewer.
- **Photo viewer:** clicking a card photo (a button labelled "View full photo: <alt>") opens it uncropped in a modal dialog over a dimmed page, with the card's close button and credit pill. A click anywhere but the credit, or Escape, closes only the photo and returns focus to it.
- **Credits:** photos from Wikimedia Commons are credited by author and licence in a small dark pill at the bottom-right of each card photo and reading-view photo (linking to the file page).
- **Scrollbars:** the festival list, and the details panel use the same thin scrollbar (`chip-border`, `accent-text` on hover). The page's own scrollbar (only on very short screens) matches it without the hover colour.
- **About:** a round chip with an info icon (`chip-bg`, `chip-border`, `accent-text` border on hover) in the stage's bottom-right corner, top-right on phones; the details panel covers it when open. It opens a small cream card dialog with the site's credit line ("Global Cultural Atlas, an HCI project…"), closed by its close button, Escape or a click on the backdrop.
- **Mood tag:** each card states "Celebrated at night" or "Celebrated by day", so the theme change has a visible reason. The sun and moon icons are inline SVG in `currentColor`, hidden from screen readers.
- **Motion:** the globe spin (which eases up and down over about 1 s rather than starting and stopping dead, and holds still while zoomed in past 1.05x, while the pointer is over a pin, during a drag and while the globe has keyboard focus), pin pulses and idle pin motion, zoom (wheel, pinch and buttons) and label fades, theme fade and panel slides all switch off under `prefers-reduced-motion`. So do the page-load entrance (title, list and globe fade in, 0.45–0.8 s), the list hover slide and border highlight (0.3 s), the festival bursts, the dialog and region-popover open/close (scale and fade, 0.25 s, pills pop in one by one) and the "On now" pill pulse (2.4 s loop). The reading view eases in and out (panel width 0.35 s, long read fade 0.3 s; a bottom sheet eases its height instead), and the same applies to Back; it is instant when the page opens straight onto `/about`. In the long read, each heading, paragraph and photo below the fold when it opens fades in and rises 12px (0.4 s) the first time it scrolls into view; blocks already on screen show at once.
