# Global Cultural Atlas

An interactive 3D globe for discovering festivals around the world, made as a class HCI project.

**Live site:** https://nano-o-o.github.io/HCI-website/

Pick a festival from the list, or spin the globe and click a pin. The globe turns to the festival's country and opens a card about it. Festivals celebrated at night (such as Diwali and Lunar New Year) switch the page to a night theme. Each card links to a longer reading view covering what the festival celebrates and how it's celebrated. Clicking a card's photo shows the whole picture.

## Festivals

Timkat · Lunar New Year · Rio Carnival · Holi · Songkran · Vesak · Matariki · Osun-Osogbo · Oktoberfest · Diwali · Día de Muertos · Hanukkah · Eid al-Fitr

## Features

- A 3D globe with a pin for each festival; you can choose pushpin, lantern, flag, map marker, candle or firework pins
- A year ring around the globe showing when each festival falls (desktop only)
- A region filter that dims the festivals and pins outside the chosen region (desktop and tablet)
- "Happening now" and "Coming up" lists based on today's date
- Day and night themes that follow the festival
- Back and forward buttons work, and each festival has its own link (for example `HCI.html#diwali`)
- Keyboard support: the arrow keys turn the globe and Enter opens the festival facing you
- Layouts for desktop, tablet and phone

## Running it

It's a static site with no build step. Download or clone the repo, then double-click `HCI.html` to open it in your browser.

You can also serve it locally:

    python -m http.server 8765

and open http://localhost:8765/HCI.html.

## Project structure

| Path | What it is |
|---|---|
| `HCI.html` | Page structure, festival cards and reading views |
| `index.html` | Redirects to `HCI.html`, so the short site address works |
| `style.css` | Styles, day and night themes, festival colours |
| `globe.js` | Globe, pins, year ring, festival data and navigation |
| `DESIGN.md` | Design system: colours, type and layout rules |
| `images/` | Festival photos |
| `vendor/` | Bundled libraries, map data and fonts |

## How the code works

The site is three hand-written files that depend on each other: `HCI.html` holds the content, `style.css` makes it look right, and `globe.js` makes it move.

### `HCI.html`: structure and content

| Block | What it does |
|---|---|
| `<head>` | Loads `style.css`, then the bundled libraries from `vendor/` (three.js, OrbitControls, topojson-client, the world map data) |
| `#globe-section` (`<main>`) | The full-screen stage. Everything below sits inside it |
| `#globe-container` | Empty box where `globe.js` draws the 3D globe. It is focusable, so the keyboard can turn the globe |
| `#globe-status` | Hidden text that screen readers announce (for example "Facing Diwali") |
| `.hero-side` | Left column: the title, the festival list (one button per festival), the region filter button and the pin style switch |
| `.coming-up` | Right column on wide screens: "Happening now" and "Coming up". Starts empty and `globe.js` fills it in |
| `#globe-tooltip` | The small label that follows the pointer over a pin or a month |
| `.about-btn` | The round ⓘ button that opens the About dialog |
| `#info-panel` | The panel that slides in. It holds the close button and one `<article class="festival-card">` per festival: photo, badges, photo credit, greeting, short text, and a `.festival-about` section (the long read, shown in the reading view) |
| `#about-dialog`, `#photo-viewer` | Two `<dialog>` elements: the About text, and the full-size photo viewer that `globe.js` fills in |

### `style.css`: look and layout

| Block | What it does |
|---|---|
| `:root` tokens | Every colour, font and radius lives here as a CSS variable: night and day surfaces, globe colours, and a `--festival-*` and `--glow-*` pair for each festival |
| `:root[data-theme="day" / "night"]` | Maps the tokens to roles such as `--text` and `--chip-bg`, so the whole page changes with one attribute |
| `.globe-hero` and `::before` | The stage and its sky. A second night sky sits on top and slides in with a mask to make the sunset |
| `.hero-side`, `.festival-list`, `.region-btn` | The left column. Each festival button gets its own colour from a `data-target` rule |
| `.region-toggle`, `.region-filter`, `.pin-style` | The region pills and the pin switch |
| `.coming-up` | The right column, shown only on wide screens |
| `.info-panel`, `.festival-card` | The sliding panel and the cream cards. Each card has a pattern strip made from an SVG motif in its festival colour |
| `.is-reading` | Widens the panel and swaps the short text for the long read |
| `.photo-viewer`, `.about-dialog` | The two dialogs |
| `@media` rules | Tablet (under 1100px) and phone (under 720px) layouts. On phones the panel becomes a bottom sheet. A reduced-motion rule turns animations off |

### `globe.js`: behaviour

| Block | What it does |
|---|---|
| `FESTIVALS` and `MUSLIM_MAJORITY` | The festival data: name, position, colour token, day or night mood, months, and the countries to light up |
| 1. Scene setup, 2. Lighting | Creates the three.js scene, camera, renderer and mouse controls |
| 3. Map data | Reads the country shapes from `vendor/world-data.js` |
| 4. Globe | Draws the map onto two canvases, one for day and one for night, and fades the night one in and out |
| 5. Pins | Builds a pin for each festival in the chosen style (`setPinStyle`) and remembers the style in `localStorage` |
| 5b. Year ring | A calendar ring drawn on a canvas. Hovering a month dims the festivals outside it |
| 6. Interaction state | `showFestivalCard`, `closeFestival` and `resetToHome` open and close the panel. `setMood` switches the theme. The history code keeps Back, Forward and `#festival` links working |
| 7. Picking | `hitAt` turns a pointer position into the pin, globe or ring under it. The pointer and keyboard handlers use it |
| Region filter, photo viewer, About dialog | Build the region pills and wire up the two dialogs |
| "On now" and "Coming up" | Mark this month's festivals and fill the right column from `FESTIVALS` |
| 8. Render loop (`animate`) | Runs every frame: spins and zooms the globe, fades day to night, pulses and dims pins, and shows the keyboard focus label |

### How the three files connect

1. **HTML to CSS and JS.** `HCI.html` links `style.css` in the head and loads `globe.js` last, so the page elements exist when the script looks them up by `id` and class (for example `#info-panel` and `.region-btn`).
2. **Festival IDs tie everything together.** One festival id, such as `diwali`, appears in four places: the `FESTIVALS` entry in `globe.js`, the list button's `data-target="diwali"`, the card `id="card-diwali"`, and the `#card-diwali` and `.region-btn[data-target="diwali"]` rules in `style.css`. The URL `#diwali` uses the same id. To add a festival, add all four.
3. **Theme.** `globe.js` sets `data-theme="day"` or `"night"` on `<html>` (`setMood`). `style.css` reacts to that attribute and fades the colours, so the script never sets a colour on page elements itself.
4. **Colours flow from CSS to JS.** `globe.js` reads the `--globe-*`, `--festival-*` and `--glow-*` tokens from `style.css` with `getComputedStyle`, and uses them for the map, pins and year ring. Changing a token changes the page and the globe together.
5. **State flows from JS to CSS.** `globe.js` toggles classes (`is-open`, `is-reading`, `panel-open`, `is-dimmed`) and the `hidden` and `aria-pressed` attributes. `style.css` turns those into the sliding panel, the wide reading view and the dimmed list items.
6. **Content stays in the HTML.** The cards and long reads are plain HTML, not built by the script. `globe.js` only shows or hides them, and builds the pieces that depend on the festival data: the region pills, the "On now" tags and the "Coming up" lists.

## Credits

- **Photos:** from Wikimedia Commons, under Creative Commons licences. Each photo's author and licence are credited on its card, with a link to the original file.
- **three.js** r128 (MIT) for the globe
- **topojson-client** 3.1.0 (ISC) and **Natural Earth** 1:110m country data (public domain, via world-atlas 2.0.2)
- **Fonts:** Fraunces and Alegreya Sans (SIL Open Font License)
