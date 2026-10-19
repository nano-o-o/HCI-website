# Global Cultural Atlas

An interactive 3D globe for discovering festivals around the world, made as a class HCI project.

**Live site:** https://nano-o-o.github.io/HCI-website/

![The home view: a 3D globe with festival pins and name labels over Europe and Africa, beside the festival list and the pin style switch](images/screenshot-home.jpg)

Pick a festival from the list, or spin the globe and click a pin. The globe turns to the festival's country and opens a card about it. Festivals celebrated at night (such as Diwali and Chinese New Year) switch the page to a night theme. Each card links to a longer reading view covering what the festival celebrates and how it's celebrated and has photos of its food and, for most festivals, of people celebrating. Clicking a card's or reading view's photo shows the whole picture.

## Festivals

Cape Town Minstrel Carnival · Chinese New Year · Tết · Festa de Iemanjá · Sapporo Snow Festival · Venice Carnival · Mardi Gras · Rio Carnival · Viña del Mar Festival · Lantern Festival · Adelaide Fringe · Las Fallas · Holi · Nowruz · Coachella · Songkran · Anzac Day · Fez Festival of World Sacred Music · Vivid Sydney · Gnaoua World Music Festival · Bastille Day · Guelaguetza · Awa Odori · La Tomatina · Oktoberfest · Thimphu Tshechu · Durga Puja · Diwali · Tihar · Día de Muertos · Loy Krathong · Bon Om Touk · Melbourne Cup · Dubai Shopping Festival · Eid al-Fitr

## Features

- A 3D globe with one pin per festival, at or near its own city or site; you can choose pushpin, lantern, flag, map marker, candle or firework pins
- Zoom with the mouse wheel, a pinch or the zoom buttons; zoomed in, pins get festival name labels
- A region filter that dims the festivals and pins outside the chosen region (desktop and tablet)
- An "On now" badge on festivals happening this month
- Day and night themes that follow the festival
- A short burst when a festival opens: sparks (Diwali, Tihar, Chinese New Year, Tết, Bastille Day, Las Fallas, Dubai Shopping Festival, Vivid Sydney), coloured clouds (Holi, La Tomatina, Songkran), flower petals (Día de Muertos, Festa de Iemanjá, Durga Puja, Nowruz, Melbourne Cup), paper confetti (Rio Carnival, Mardi Gras, Venice Carnival, Cape Town Minstrel Carnival, Viña del Mar, Coachella, Oktoberfest, Guelaguetza, Adelaide Fringe, Gnaoua, Thimphu Tshechu), rising paper lanterns (Lantern Festival, Awa Odori), drifting candle lights (Loy Krathong, Fez Festival of World Sacred Music), snow (Sapporo Snow Festival), river spray (Bon Om Touk), a few falling poppy petals (Anzac Day) or gold stars and crescents (Eid al-Fitr)
- Reading views with a read time, links that jump to each section, and a progress bar along the top
- Back and forward buttons work, and every festival and reading view has its own link (see [Navigation](#navigation))
- Keyboard support: the arrow keys turn the globe, Enter opens the festival facing you, and + and - zoom
- Layouts for desktop, tablet and phone

## Navigation

The globe stays on screen, so festivals open beside it instead of on separate pages. Each view still has its own address:

| View | Address |
|---|---|
| Home | `HCI.html` (`index.html` redirects here) |
| A festival's card (35) | `HCI.html#diwali` |
| Its reading view (35) | `HCI.html#diwali/about`, opened by the card's "Read more" link |

Any of these can be bookmarked or shared and opens straight onto that view. Back steps from a reading view to its card, then home; Forward retraces the steps. Every reading view ends with its sources, and every photo links to its file on Wikimedia Commons: 180 outside links, all checked in October 2026.

## Accessibility

- **Keyboard:** Tab reaches every control; on the globe, the arrow keys turn it, Enter opens the festival facing you, + and - zoom, and Escape closes cards and dialogs
- **Screen readers:** the globe announces the festival facing you, picking a region announces its festivals, every photo has alt text, and links that open a new tab say so
- **Reduced motion:** when the device asks for it, the spin, pin motion, bursts, fades and smooth scrolling all switch off
- **Click targets:** small controls meet the WCAG 2.2 target-size rule

## Built with

Plain HTML, CSS and JavaScript: one page, one external stylesheet, no frameworks and no build step. three.js draws the globe.

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
| `globe.js` | Globe, pins, festival data and navigation |
| `DESIGN.md` | Design system: colours, type and layout rules |
| `images/` | Festival photos, and the screenshot above |
| `vendor/` | Bundled libraries, map data and fonts |

## How the code works

The site is three hand-written files that depend on each other: `HCI.html` holds the content, `style.css` makes it look right, and `globe.js` makes it move.

### `HCI.html`: structure and content

| Block | What it does |
|---|---|
| `<head>` | Loads `style.css`, then the bundled libraries from `vendor/` (three.js, OrbitControls, topojson-client, the world map data) |
| `#globe-section` (`<main>`) | The full-screen stage. Everything below sits inside it |
| `#globe-container` | Empty box where `globe.js` draws the 3D globe. It is focusable, so the keyboard can turn and zoom the globe |
| `#globe-status` | Hidden text that screen readers announce (for example "Facing Diwali") |
| `.hero-side` | Left column: the title, the "All festivals" heading with the region filter (`.region-toggle` and its `#region-filter` pop-up), the festival list (one `.region-btn` per festival), and the pin style switch |
| `#globe-tooltip` | The small label that follows the pointer over a pin |
| `.zoom-ctl`, `.about-btn` | The zoom buttons (−, the current zoom, +) and the round ⓘ button that opens the About dialog |
| `#info-panel` | The panel that slides in. It holds the close button and one `<article class="festival-card">` per festival: photo, badges, photo credit, greeting, short text, a "Read more" link, and a `.festival-about` section (the long read, shown in the reading view) |
| `#about-dialog`, `#photo-viewer` | Two `<dialog>` elements: the About text, and the full-size photo viewer that `globe.js` fills in |

### `style.css`: look and layout

| Block | What it does |
|---|---|
| `@font-face` rules | The bundled fonts: Fraunces and Alegreya Sans, plus small Noto files for greetings in other scripts |
| `:root` tokens | Every colour, font and radius lives here as a CSS variable: night and day surfaces, globe colours, and a `--festival-*` and `--glow-*` pair for each festival |
| `:root[data-theme="day" / "night"]` | Maps the tokens to roles such as `--text` and `--chip-bg`, so the whole page changes with one attribute |
| `.globe-hero` and `::before` | The stage and its sky. A second night sky sits on top and slides in with a mask to make the sunset |
| `.hero-side`, `.festival-list`, `.region-btn` | The left column. Each festival button gets its own colour from a `data-target` rule |
| `.region-toggle`, `.region-filter`, `.pin-style` | The region pop-up and the pin switch |
| `.info-panel`, `.festival-card`, `#card-<id>` | The sliding panel and the cream cards. Each card has a pattern strip made from an SVG motif in its festival colour |
| `.photo-open`, `.badges`, `.photo-credit`, `.greeting-native` | The photo button, the region and country pills, the credit pill and the greeting |
| `.is-reading`, `.about-toc`, `.read-progress` | The reading view: a wider panel, the long read, its section links and the progress bar along the top |
| `.about-btn`, `.about-dialog`, `.photo-viewer` | The About button and the two dialogs |
| `@media` rules | Medium (under 1100px) and phone (under 720px) layouts. On phones the list becomes a row and the panel becomes a bottom sheet |
| Motion and reduced motion | The entrances, hover sweep and dialog fades, all switched off when the device asks for reduced motion |
| `.zoom-ctl`, `.globe-label`, `.globe-fx` | The zoom buttons, the festival name labels shown when zoomed in, and the burst layer |

### `globe.js`: behaviour

| Block | What it does |
|---|---|
| `FESTIVALS` and `MUSLIM_MAJORITY` | The festival data: name, the real place (`lat`/`lon`) and the pin's spot (`pinLat`/`pinLon`), colour token, day or night mood, months, and the countries to light up |
| 1. Scene setup, 2. Lighting | Creates the three.js scene, camera, renderer and drag controls |
| 3. Map data | Reads the country shapes from `vendor/world-data.js` |
| 4. Globe | Draws the map onto two canvases, one for day and one for night, and fades the night one in and out. A festival's countries are lit on small patches above the map (`drawMaps`, `drawLit`), so opening one redraws only that patch. The map is redrawn sharper the first time you zoom in (`upgradeMaps`) |
| 5. Pins | Builds a pin for each festival in the chosen style (`setPinStyle`), each with an invisible, bigger click target and a small idle motion (`PIN_MOTION`). The style is remembered in `localStorage` |
| 6. Interaction state | `showFestivalCard`, `closeFestival` and `resetToHome` open and close the panel, and `setMood` switches the theme. `setReading` opens the reading view; each one's read time and section links are built just above it. The history code (`commitEntry`, `parseAddress`, `popstate`) keeps Back, Forward and `#festival` links working |
| 7. Picking | `hitAt` turns a pointer position into the pin or globe under it. The pointer and keyboard handlers use it |
| Region filter, photo viewer, About dialog | Build the region pills (`setRegion`), add a hidden "opens in a new tab" note to outside links, and wire up the two dialogs |
| Zoom and labels | The wheel, keys and buttons ease the camera (`setZoom`), and `updateLabels` places the festival names when zoomed in |
| 7b. Festival bursts | `BURSTS` gives each festival an effect and colours. `startBurst` and `drawBurst` play it on a 2D canvas over the globe once the spin settles |
| 8. Render loop (`animate`) | Runs every frame: spins and zooms the globe, slides it into place for the screen size (`viewGoal`), fades day to night, pulses and dims pins, and shows the keyboard focus label |

### How the three files connect

1. **HTML to CSS and JS.** `HCI.html` links `style.css` in the head and loads `globe.js` last, so the page elements exist when the script looks them up by `id` and class (for example `#info-panel` and `.region-btn`).
2. **Festival IDs tie everything together.** One festival id, such as `diwali`, appears in four places: the `FESTIVALS` entry in `globe.js`, the list button's `data-target="diwali"`, the card `id="card-diwali"`, and the `#card-diwali` and `.region-btn[data-target="diwali"]` rules in `style.css`. The addresses `#diwali` and `#diwali/about` use the same id. To add a festival, add all four (and a `BURSTS` entry for its burst).
3. **Theme.** `globe.js` sets `data-theme="day"` or `"night"` on `<html>` (`setMood`). `style.css` reacts to that attribute and fades the colours, so the script never sets a colour on page elements itself.
4. **Colours flow from CSS to JS.** `globe.js` reads the `--globe-*`, `--festival-*` and `--glow-*` tokens from `style.css` with `getComputedStyle`, and uses them for the map, pins and country highlights. Changing a token changes the page and the globe together.
5. **State flows from JS to CSS.** `globe.js` toggles classes (`is-open`, `is-reading`, `panel-open`, `is-dimmed`) and the `hidden` and `aria-pressed` attributes. `style.css` turns those into the sliding panel, the wide reading view and the dimmed list items.
6. **Content stays in the HTML.** The cards and long reads are plain HTML, not built by the script. `globe.js` only shows or hides them, and builds the pieces that depend on the data: the region pills, the "On now" tags, the zoom labels, and each reading view's read time and section links.

## Credits

- **Photos:** from Wikimedia Commons, under Creative Commons licences or in the public domain. Each photo's author and licence are credited on its card or reading view, with a link to the original file.
- **three.js** r128 (MIT) for the globe
- **topojson-client** 3.1.0 (ISC) and **Natural Earth** 1:110m country data (public domain, via world-atlas 2.0.2)
- **Fonts:** Fraunces and Alegreya Sans, plus Noto Serif (Devanagari, Bengali, Thai, SC, JP) and Noto Naskh Arabic subsets for the greetings (all SIL Open Font License)
