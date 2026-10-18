// Muslim-majority countries (Pew Research estimates), spelled as in the Natural Earth map data; lit faintly for Eid
const MUSLIM_MAJORITY = ["Afghanistan", "Albania", "Algeria", "Azerbaijan", "Bangladesh", "Brunei", "Burkina Faso", "Chad", "Djibouti",
    "Egypt", "Gambia", "Guinea", "Indonesia", "Iran", "Iraq", "Jordan", "Kazakhstan", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Lebanon", "Libya", "Malaysia", "Mali", "Mauritania", "Morocco", "Niger", "Oman", "Pakistan", "Palestine", "Qatar",
    "Senegal", "Sierra Leone", "Somalia", "Somaliland", "Sudan", "Syria", "Tajikistan", "Tunisia", "Turkey",
    "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Yemen", "W. Sahara"];

// Eid al-Fitr follows the lunar Hijri calendar, so it moves about 11 days earlier each year (0 = January).
// shortcut: table ends in 2031, after that Eid shows no month; extend it from a Hijri calendar.
const EID_MONTH = { 2025: 2, 2026: 2, 2027: 2, 2028: 1, 2029: 1, 2030: 1, 2031: 0 };
const NOW = new Date();
const THIS_MONTH = NOW.getMonth();
const EID_MONTHS = NOW.getFullYear() in EID_MONTH ? [EID_MONTH[NOW.getFullYear()]] : [];

// To add a festival: add an entry here, a card and list item in HCI.html, and colour tokens and a motif in style.css.
// `lat`/`lon` is the real city or site; the pin sits at `pinLat`/`pinLon`. For a new festival, put that spot
// inside its first country's border, about 170 km in and 450 km from other pins.
// `color` names the token pair (--festival-<color> by day, --glow-<color> at night); `mood` is the theme the festival opens in;
// `months` (0 = January) drive the "On now" label; `heading`, when set, is a shorter name for the hero heading
// (its name line must fit the 230px column at 1000px wide).
const FESTIVALS = [
    { id: "diwali", label: "Diwali", lat: 26.7922, lon: 82.1998, pinLat: 25.2344, pinLon: 80.6018, color: "diwali", mood: "night", months: [9, 10], countries: ["India"] },
    { id: "lunar-new-year", label: "Chinese New Year", lat: 39.9042, lon: 116.4074, pinLat: 39.9619, pinLon: 116.318, color: "lunar", mood: "night", months: [0, 1], countries: ["China"] },
    { id: "lantern-festival", label: "Lantern Festival", lat: 32.0206, lon: 118.7889, pinLat: 32.0206, pinLon: 118.789, color: "lantern", mood: "night", months: [1, 2], countries: ["China"] },
    { id: "eid", label: "Eid al-Fitr", lat: 23.8859, lon: 45.0792, pinLat: 23.8859, pinLon: 45.0792, color: "eid", mood: "day", months: EID_MONTHS, countries: ["Saudi Arabia"], related: MUSLIM_MAJORITY },
    { id: "rio-carnival", label: "Rio Carnival", lat: -22.9118, lon: -43.1966, pinLat: -21.5415, pinLon: -43.5876, color: "rio", mood: "night", months: [1, 2], countries: ["Brazil"] },
    { id: "oktoberfest", label: "Oktoberfest", lat: 48.1351, lon: 11.5820, pinLat: 49.2889, pinLon: 10.3142, color: "oktoberfest", mood: "day", months: [8, 9], countries: ["Germany"] },
    { id: "holi", label: "Holi", lat: 27.4924, lon: 77.6737, pinLat: 27.7595, pinLon: 77.0928, color: "holi", mood: "day", months: [2], countries: ["India", "Nepal"] },
    { id: "songkran", label: "Songkran", lat: 13.7563, lon: 100.5018, pinLat: 14.8598, pinLon: 101.358, color: "songkran", mood: "day", months: [3], countries: ["Thailand"], related: ["Laos", "Myanmar", "Cambodia"] },
    { id: "loy-krathong", label: "Loy Krathong", lat: 17.0193, lon: 99.7036, pinLat: 18.323, pinLon: 99.344, color: "loy", mood: "night", months: [10], countries: ["Thailand"] },
    { id: "dia-de-muertos", label: "Día de Muertos", lat: 19.5164, lon: -101.6094, pinLat: 19.5164, pinLon: -101.609, color: "muertos", mood: "night", months: [10], countries: ["Mexico"] },
    { id: "las-fallas", label: "Las Fallas", lat: 39.4699, lon: -0.3763, pinLat: 41.3998, pinLon: -1.0499, color: "fallas", mood: "night", months: [2], countries: ["Spain"] },
    { id: "la-tomatina", label: "La Tomatina", lat: 39.4189, lon: -0.7906, pinLat: 38.1581, pinLon: -3.9659, color: "tomatina", mood: "day", months: [7], countries: ["Spain"] },
    { id: "venice-carnival", label: "Venice Carnival", lat: 45.4408, lon: 12.3155, pinLat: 45.1225, pinLon: 10.5963, color: "venice", mood: "day", months: [1, 2], countries: ["Italy"] },
    { id: "bastille-day", label: "Bastille Day", lat: 48.8566, lon: 2.3522, pinLat: 48.7998, pinLon: 2.3975, color: "bastille", mood: "day", months: [6], countries: ["France"] },
    { id: "mardi-gras", label: "Mardi Gras", lat: 29.9584, lon: -90.0644, pinLat: 31.0715, pinLon: -90.9834, color: "mardigras", mood: "day", months: [1, 2], countries: ["United States of America"] },
    { id: "coachella", label: "Coachella", lat: 33.6803, lon: -116.2379, pinLat: 34.1179, pinLon: -116.024, color: "coachella", mood: "night", months: [3], countries: ["United States of America"] },
    { id: "vina-del-mar", label: "Viña del Mar Festival", heading: "Viña del Mar", lat: -33.0245, lon: -71.5518, pinLat: -33.9659, pinLon: -70.9075, color: "vina", mood: "night", months: [1], countries: ["Chile"] },
    { id: "guelaguetza", label: "Guelaguetza", lat: 17.0732, lon: -96.7266, pinLat: 17.2936, pinLon: -96.6363, color: "guelaguetza", mood: "day", months: [6], countries: ["Mexico"] },
    { id: "iemanja", label: "Festa de Iemanjá", lat: -13.0108, lon: -38.4917, pinLat: -11.6684, pinLon: -39.2512, color: "iemanja", mood: "day", months: [1], countries: ["Brazil"], related: ["Uruguay"] },
    // Essaouira itself falls just offshore on the 1:110m coastline, so Gnaoua sits 20 km inland
    { id: "gnaoua", label: "Gnaoua World Music Festival", heading: "Gnaoua Festival", lat: 31.5, lon: -9.55, pinLat: 30.9751, pinLon: -7.9988, color: "gnaoua", mood: "night", months: [5], countries: ["Morocco"] },
    { id: "fez-sacred-music", label: "Fez Festival of World Sacred Music", heading: "Fez Sacred Music", lat: 34.0331, lon: -5.0003, pinLat: 33.8324, pinLon: -4.6326, color: "fez", mood: "night", months: [4, 5], countries: ["Morocco"] },
    { id: "cape-town-carnival", label: "Cape Town Minstrel Carnival", heading: "Minstrel Carnival", lat: -33.9249, lon: 18.4241, pinLat: -33.0281, pinLon: 20.0137, color: "cape", mood: "day", months: [0], countries: ["South Africa"] },
    { id: "dubai-shopping-festival", label: "Dubai Shopping Festival", heading: "Dubai Shopping", lat: 25.2048, lon: 55.2708, pinLat: 24.2457, pinLon: 55.2235, color: "dsf", mood: "night", months: [11, 0], countries: ["United Arab Emirates"] },
    // Nowruz lights the other states on UNESCO's joint inscription
    { id: "nowruz", label: "Nowruz", lat: 32.4279, lon: 53.6880, pinLat: 32.4279, pinLon: 53.688, color: "nowruz", mood: "day", months: [2], countries: ["Iran"],
        related: ["Afghanistan", "Azerbaijan", "India", "Iraq", "Kazakhstan", "Kyrgyzstan", "Pakistan", "Tajikistan", "Turkey", "Turkmenistan", "Uzbekistan"] },
    { id: "sapporo-snow-festival", label: "Sapporo Snow Festival", heading: "Snow Festival", lat: 43.0598, lon: 141.3469, pinLat: 42.4907, pinLon: 140.509, color: "sapporo", mood: "day", months: [1], countries: ["Japan"] },
    { id: "awa-odori", label: "Awa Odori", lat: 34.0703, lon: 134.5548, pinLat: 33.7068, pinLon: 134.159, color: "awa", mood: "night", months: [7], countries: ["Japan"] },
    { id: "bon-om-touk", label: "Bon Om Touk", lat: 11.5564, lon: 104.9282, pinLat: 12.1837, pinLon: 104.411, color: "bon", mood: "day", months: [10], countries: ["Cambodia"] },
    { id: "tet", label: "Tết", lat: 14.0583, lon: 108.2772, pinLat: 14.2335, pinLon: 108.178, color: "tet", mood: "day", months: [0, 1], countries: ["Vietnam"] },
    { id: "thimphu-tshechu", label: "Thimphu Tshechu", lat: 27.4728, lon: 89.639, pinLat: 27.6412, pinLon: 90.0845, color: "tshechu", mood: "day", months: [8, 9], countries: ["Bhutan"] },
    { id: "tihar", label: "Tihar", lat: 28.3949, lon: 84.124, pinLat: 28.5714, pinLon: 83.2279, color: "tihar", mood: "night", months: [9, 10], countries: ["Nepal"] },
    { id: "durga-puja", label: "Durga Puja", lat: 22.5726, lon: 88.3639, pinLat: 23.0308, pinLon: 87.0361, color: "durga", mood: "night", months: [8, 9], countries: ["India"], related: ["Bangladesh"] },
    { id: "vivid-sydney", label: "Vivid Sydney", lat: -33.8688, lon: 151.2093, pinLat: -32.2652, pinLon: 150.19, color: "vivid", mood: "night", months: [4, 5], countries: ["Australia"] },
    { id: "melbourne-cup", label: "Melbourne Cup", lat: -37.79, lon: 144.912, pinLat: -36.8698, pinLon: 143.457, color: "cup", mood: "day", months: [10], countries: ["Australia"] },
    { id: "adelaide-fringe", label: "Adelaide Fringe", lat: -34.9285, lon: 138.6007, pinLat: -34.0891, pinLon: 139.986, color: "fringe", mood: "night", months: [1, 2], countries: ["Australia"] },
    { id: "anzac-day", label: "Anzac Day", lat: -35.2809, lon: 149.1488, pinLat: -35.9641, pinLon: 148.309, color: "anzac", mood: "day", months: [3], countries: ["Australia", "New Zealand"] }
];
const festivalById = Object.fromEntries(FESTIVALS.map((f) => [f.id, f]));

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("globe-container");
    if (!container) return;

    // Saved pin style, applied first so its pill doesn't fade in on load
    const PIN_STYLES = ["push", "lantern", "flag", "marker", "candle", "firework"];
    let savedStyle = null;
    try { savedStyle = localStorage.getItem("pinStyle"); } catch (e) { /* storage blocked: use the default */ }
    const pinStyle = PIN_STYLES.includes(savedStyle) ? savedStyle : "push";
    document.querySelector(`input[name="pin-style"][value="${pinStyle}"]`).checked = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const EASE = reduceMotion ? 1 : 0.07; // fraction of the remaining distance covered per frame
    const ZOOM = 0.8;                      // zoomed camera distance as a fraction of the home distance
    const DEG = Math.PI / 180;
    // User zoom is a factor z: the camera sits at homeDist / z. Phones and narrow windows stay at 1.3x, where the 2048 map is still sharp;
    // elsewhere the maps are rebuilt at 4096 the first time the globe is drawn past that. Wide desktops draw their home view at 1.95x,
    // which needs 4096 anyway, so they start at 4096 instead of drawing the map twice.
    const SMALL = window.matchMedia("(pointer: coarse), (max-width: 720px)").matches;
    const MAX_ZOOM = SMALL ? 1.3 : 1.6;
    const SHARP_ZOOM = 1.28;
    const SHARP_HOME = !SMALL && container.clientWidth > 1100; // the wide home view in viewGoal
    const LABEL_ZOOM = SMALL ? 1.2 : 1.4; // festival labels fade in above this

    // 1. Scene setup
    const scene = new THREE.Scene();
    // Near plane is 10, not 0.1: nothing comes that close, and the better depth precision
    // stops the day and night maps flickering through each other
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 10, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 0.6; // two-finger pinch only: the wheel is handled in section 6
    controls.enablePan = false;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // Colours come from the CSS tokens in style.css
    const rootStyle = getComputedStyle(document.documentElement);
    const token = (name) => rootStyle.getPropertyValue(name).trim();
    const palettes = {};
    ["day", "night"].forEach((mood) => {
        palettes[mood] = {
            ocean: token(`--globe-${mood}-ocean`),
            land: token(`--globe-${mood}-land`),
            coast: token(`--globe-${mood}-coast`),
            halo: new THREE.Color(token(`--globe-${mood}-halo`))
        };
    });

    // 3. Map data (bundled in vendor/world-data.js)
    const topo = window.WORLD_TOPO;
    const land = topojson.feature(topo, topo.objects.land).features;
    const countryByName = {};
    const allCountries = topojson.feature(topo, topo.objects.countries).features;
    allCountries.forEach((f) => {
        countryByName[f.properties.name] = f;
    });
    // The data's Morocco shape runs south of 27.657°N, W. Sahara's northern edge in the data, along the coast beside its
    // W. Sahara shape. For the highlight only, that part moves to W. Sahara (the base map's borders stay as they are).
    // Morocco's one ring crosses the line twice, so each side is one ring.
    const CUT = 27.657;
    const cutRing = (ring, north) => ring.flatMap((p, i) => {
        const q = ring[(i + 1) % ring.length];
        const cross = (p[1] >= CUT) !== (q[1] >= CUT) ? [[p[0] + ((CUT - p[1]) / (q[1] - p[1])) * (q[0] - p[0]), CUT]] : [];
        return (p[1] >= CUT) === north ? [p, ...cross] : cross;
    });
    const moroccoRing = countryByName["Morocco"].geometry.coordinates[0];
    countryByName["Morocco"] = { geometry: { type: "Polygon", coordinates: [cutRing(moroccoRing, true)] } };
    countryByName["W. Sahara"] = { geometry: { type: "MultiPolygon", coordinates: [countryByName["W. Sahara"].geometry.coordinates, [cutRing(moroccoRing, false)]] } };

    // 4. Globe: a day map and a night map, crossfaded by fading the night sphere in and out
    const globeRadius = 60;
    const globeGroup = new THREE.Group();
    globeGroup.rotation.y = -(45 + 90) * DEG; // opens facing 45°E, so Europe and Africa fill the visible left side of the cropped globe
    scene.add(globeGroup);

    function makeMap(mood, radius) {
        const canvas = document.createElement("canvas");
        canvas.width = SHARP_HOME ? 4096 : 2048;
        canvas.height = canvas.width / 2;
        const texture = new THREE.CanvasTexture(canvas);
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 64, 64),
            new THREE.MeshPhongMaterial({ map: texture, shininess: 8, transparent: mood === "night", opacity: mood === "night" ? 0 : 1 })
        );
        globeGroup.add(mesh);
        return { mood, canvas, ctx: canvas.getContext("2d"), texture, mesh };
    }
    const dayMap = makeMap("day", globeRadius);
    const nightMap = makeMap("night", globeRadius + 0.05);

    // Shapes crossing the ±180° line (Russia, Antarctica) are unwrapped into one
    // continuous outline, then drawn three times so the part off the edge wraps around.
    function unwrapRing(ring) {
        const pts = [];
        let offset = 0;
        ring.forEach(([lon, lat]) => {
            if (pts.length) {
                const jump = lon + offset - pts[pts.length - 1][0];
                if (jump > 180) offset -= 360;
                else if (jump < -180) offset += 360;
            }
            pts.push([lon + offset, lat]);
        });
        const first = pts[0];
        const last = pts[pts.length - 1];
        if (Math.abs(last[0] - first[0]) > 180) {
            // Ring circles a pole (Antarctica): close it along the pole edge
            const pole = first[1] < 0 ? -90 : 90;
            pts.push([last[0], pole], [first[0], pole]);
        }
        return pts;
    }

    function traceRing(ctx, ring, toX, toY) {
        const pts = unwrapRing(ring);
        [-360, 0, 360].forEach((shift) => {
            pts.forEach(([lon, lat], i) => (i ? ctx.lineTo(toX(lon + shift), toY(lat)) : ctx.moveTo(toX(lon + shift), toY(lat))));
            ctx.closePath();
        });
    }

    const ringsOf = (f) => (!f || !f.geometry ? [] : (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates).flat());

    // k: pixels per degree; west and north: the canvas's top-left corner
    function tracePath(ctx, features, k, west = -180, north = 90) {
        const toX = (lon) => (lon - west) * k;
        const toY = (lat) => (north - lat) * k;
        ctx.beginPath();
        features.forEach((f) => ringsOf(f).forEach((ring) => traceRing(ctx, ring, toX, toY)));
    }

    // Draws ocean + land; only at the start and on upgradeMaps, since festival highlights have their own patches (below)
    function drawMap(map) {
        const { ctx, canvas } = map;
        const k = canvas.width / 360;
        const pal = palettes[map.mood];
        const px = canvas.width / 2048; // line widths below are for the 2048 map
        ctx.globalAlpha = 1;
        ctx.fillStyle = pal.ocean;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Faint graticule every 30°, under the land
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 30) { const x = ((lon + 180) / 360) * canvas.width; ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
        for (let lat = -60; lat <= 60; lat += 30) { const y = ((90 - lat) / 180) * canvas.height; ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
        ctx.globalAlpha = 0.25;
        ctx.strokeStyle = pal.coast;
        ctx.lineWidth = 1.5 * px;
        ctx.stroke();
        ctx.globalAlpha = 1;

        tracePath(ctx, land, k);
        ctx.fillStyle = pal.land;
        ctx.fill("evenodd");

        // Thin country borders, then the coastline on top
        tracePath(ctx, allCountries, k);
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = px;
        ctx.stroke();
        ctx.globalAlpha = 1;
        tracePath(ctx, land, k);
        ctx.lineWidth = 2 * px;
        ctx.stroke();
        map.texture.needsUpdate = true;
    }
    drawMap(dayMap);
    drawMap(nightMap);

    // The selected festival's countries, lit in its pin colour, sit on a patch of sphere just above each map that covers
    // only their bounding box, so picking a festival redraws and re-uploads that patch instead of both full maps.
    // Both patches are above the night map, so each fades itself with nightMix (in animate).
    function makeLit(mood, radius) {
        const canvas = document.createElement("canvas");
        const texture = new THREE.CanvasTexture(canvas);
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const mesh = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshPhongMaterial({ map: texture, shininess: 8, transparent: true }));
        mesh.visible = false;
        globeGroup.add(mesh);
        return { mood, radius, canvas, ctx: canvas.getContext("2d"), texture, mesh };
    }
    const dayLit = makeLit("day", globeRadius + 0.1);
    const nightLit = makeLit("night", globeRadius + 0.12);

    function drawLit(lit, festival, b) {
        const { canvas, ctx } = lit;
        const k = dayMap.canvas.width / 360;
        canvas.width = b.w; // also clears it
        canvas.height = b.h;
        const colour = token(lit.mood === "night" ? `--glow-${festival.color}` : `--festival-${festival.color}`);
        const trace = (names) => tracePath(ctx, names.map((n) => countryByName[n]), k, b.west, b.north);
        if (festival.related) {
            trace(festival.related);
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = colour;
            ctx.fill("evenodd");
        }
        trace(festival.countries);
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = colour;
        ctx.fill("evenodd");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = lit.mood === "night" ? "#ffffff" : token("--ink");
        ctx.lineWidth = 3 * (dayMap.canvas.width / 2048);
        ctx.stroke();
        lit.texture.dispose(); // its size changes with each festival
        lit.texture.needsUpdate = true;
        // 2° segments keep the patch's flat facets above the night map
        lit.mesh.geometry.dispose();
        lit.mesh.geometry = new THREE.SphereGeometry(lit.radius, Math.ceil((b.east - b.west) / 2), Math.ceil((b.north - b.south) / 2),
            (b.west + 180) * DEG, (b.east - b.west) * DEG, (90 - b.north) * DEG, (b.north - b.south) * DEG);
    }

    let drawn = null;
    // Lights up a festival's countries; null clears them (animate hides the patches)
    function drawMaps(festival) {
        drawn = festival;
        if (!festival) return;
        // Bounding box in the same unwrapped longitudes the outlines are drawn with, padded 1° for the outline's width
        // shortcut: a country with land on both sides of ±180° (USA, Russia, Fiji) gets a full-width patch; fine at this size
        let west = Infinity, east = -Infinity, south = Infinity, north = -Infinity;
        [...festival.countries, ...(festival.related || [])].forEach((n) => ringsOf(countryByName[n]).forEach((ring) => unwrapRing(ring).forEach(([lon, lat]) => {
            west = Math.min(west, lon); east = Math.max(east, lon); south = Math.min(south, lat); north = Math.max(north, lat);
        })));
        const k = dayMap.canvas.width / 360;
        west -= 1;
        north = Math.min(90, north + 1);
        const w = Math.ceil((east + 1 - west) * k);
        const h = Math.ceil((north - Math.max(-90, south - 1)) * k);
        const b = { west, north, east: west + w / k, south: north - h / k, w, h }; // whole pixels, so the patch maps 1:1 onto the maps' grid
        drawLit(dayLit, festival, b);
        drawLit(nightLit, festival, b);
    }

    // Drawn past SHARP_ZOOM on a desktop: double the map's resolution (about 78 MB more of canvas and texture memory), once
    let sharp = SHARP_HOME;
    function upgradeMaps() {
        sharp = true;
        [dayMap, nightMap].forEach((m) => {
            m.canvas.width = 4096;
            m.canvas.height = 2048;
            m.texture.dispose();
            drawMap(m);
        });
        drawMaps(drawn);
    }

    // Halo: a rim glow brightest at the globe's edge, fading outward (white by day, lantern gold at night)
    const halo = new THREE.Mesh(
        new THREE.SphereGeometry(globeRadius * 1.12, 64, 64),
        new THREE.ShaderMaterial({
            uniforms: { color: { value: palettes.day.halo.clone() }, strength: { value: 1 } },
            vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
            fragmentShader: "uniform vec3 color; uniform float strength; varying vec3 vN; void main(){ float i = pow(clamp(-vN.z / 0.45, 0.0, 1.0), 2.0); gl_FragColor = vec4(color, i * strength); }",
            side: THREE.BackSide, transparent: true, depthWrite: false
        })
    );
    scene.add(halo);

    // Starfield behind the globe, faded in at night
    const starGeo = new THREE.BufferGeometry();
    const starPos = [];
    for (let i = 0; i < 900; i++) {
        const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        v.multiplyScalar(500 + Math.random() * 300);
        starPos.push(v.x, v.y, v.z);
    }
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: new THREE.Color(token("--on-night")), size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0 }));
    scene.add(stars);

    function latLongToVector3(lat, lon, radius) {
        const phi = (90 - lat) * DEG;
        const theta = (lon + 180) * DEG;
        return new THREE.Vector3(
            -(radius * Math.sin(phi) * Math.cos(theta)),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }

    // 5. Pins: festival colour by day, glow colour at night.
    // Each pin's origin is where its needle meets the surface, with +z pointing at the globe's centre, so scaling grows it from that spot.
    // Children flagged `tint` take the pin's colour; all children follow its opacity.
    // The head mesh is the same object in every style (it is the click target). `setPinStyle` swaps its
    // geometry and material and adds that style's extra parts (needle, pennant, lantern caps, flame or rays).
    const pinObjects = [];
    const pinById = {};
    const NEEDLE = 7;
    const needleGeo = new THREE.CylinderGeometry(0.22, 0.22, NEEDLE, 6).rotateX(Math.PI / 2).translate(0, 0, -NEEDLE / 2);
    const needleMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(token("--ink-muted")), shininess: 80, transparent: true });

    // Pushpin: a glossy ball.
    // Flag: a pennant that turns around its pole to face the camera, on a pole leaning 25° so a flag seen
    //   from straight above (the selected pin) still shows it.
    // Lantern: a glowing paper lantern with dark caps.
    // Marker: a map-style teardrop standing on its tip, no needle.
    // Candle: a candle in the festival colour with a gold flame, no needle.
    // Firework: a small ball bursting into rays.
    // Marker outline, spun around the pole: a circle (radius 2.4, centre 6.5 up) plus the two lines from the tip that touch it
    const markerProfile = [new THREE.Vector2(0, 0)];
    for (let a = Math.acos(2.4 / 6.5); a <= Math.PI + 1e-6; a += Math.PI / 16) markerProfile.push(new THREE.Vector2(2.4 * Math.sin(a), 6.5 - 2.4 * Math.cos(a)));
    markerProfile.push(new THREE.Vector2(0, 6.5 + 2.4));
    const headGeo = {
        push: new THREE.SphereGeometry(2.3, 20, 20).translate(0, 0, -NEEDLE),
        flag: new THREE.SphereGeometry(0.7, 10, 10).translate(0, 0, -NEEDLE),
        lantern: new THREE.SphereGeometry(2.2, 20, 16).scale(1, 1, 1.3).translate(0, 0, -NEEDLE - 1),
        marker: new THREE.LatheGeometry(markerProfile, 24).rotateX(-Math.PI / 2),
        candle: new THREE.CylinderGeometry(1.5, 1.5, 6, 20).rotateX(Math.PI / 2).translate(0, 0, -3),
        firework: new THREE.SphereGeometry(1, 12, 12).translate(0, 0, -NEEDLE - 1)
    };
    const flameGeo = new THREE.SphereGeometry(0.8, 12, 10).scale(1, 1, 1.9).translate(0, 0, -6 - 1.6);
    const flameColor = new THREE.Color(token("--globe-night-halo"));
    // Firework rays: tapered sticks from the ball's centre towards the 12 corners of an icosahedron, thick end outward
    const rayGeo = new THREE.CylinderGeometry(0.35, 0.06, 3, 6).translate(0, 1.2 + 1.5, 0);
    const rayDirs = [];
    const icoPos = new THREE.IcosahedronGeometry(1, 0).attributes.position;
    for (let i = 0; i < icoPos.count; i++) {
        const v = new THREE.Vector3().fromBufferAttribute(icoPos, i).normalize();
        if (!rayDirs.some((d) => d.distanceTo(v) < 1e-3)) rayDirs.push(v); // the geometry repeats corners per face
    }
    // Outer cap is small so a lantern seen head-on (the selected one) still shows its glowing body
    const capGeos = [new THREE.CylinderGeometry(0.6, 0.6, 0.7, 12).rotateX(Math.PI / 2), new THREE.CylinderGeometry(1.1, 1.1, 0.7, 12).rotateX(Math.PI / 2)];
    // Pennant: a triangle in the plane of the pole and the pin's local x (east-west along the surface), hanging from the top of the pole
    const pennantGeo = new THREE.BufferGeometry();
    pennantGeo.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, -NEEDLE, 0, 0, -NEEDLE + 3.6, 6.5, 0, -NEEDLE + 1.4], 3));
    pennantGeo.computeVertexNormals();
    // Invisible click target around every head (about twice the pushpin's size), so small heads and the thin needle are easy to hit.
    // It relies on the r128 raycaster hitting invisible meshes; hitAt treats it as part of its pin
    const hitGeo = new THREE.SphereGeometry(4.5, 8, 8).translate(0, 0, -NEEDLE - 0.5);
    const hitMat = new THREE.MeshBasicMaterial();

    // Builds a festival's pin at `pos` (a world-space point on the surface)
    function buildPin(festival, pos) {
        const dayColor = new THREE.Color(token(`--festival-${festival.color}`));
        const nightColor = new THREE.Color(token(`--glow-${festival.color}`));

        const glossy = new THREE.MeshPhongMaterial({ color: dayColor.clone(), shininess: 60, transparent: true });
        const mats = {
            push: glossy,
            flag: glossy,
            lantern: new THREE.MeshLambertMaterial({ color: dayColor.clone(), emissive: dayColor.clone(), transparent: true }),
            marker: glossy,
            candle: glossy,
            firework: glossy
        };
        const pinMesh = new THREE.Mesh(headGeo.push, glossy);
        pinMesh.position.copy(pos);
        pinMesh.lookAt(new THREE.Vector3(0, 0, 0));
        const needle = new THREE.Mesh(needleGeo, needleMat.clone());
        const flame = new THREE.Mesh(flameGeo, new THREE.MeshBasicMaterial({ color: flameColor, transparent: true }));
        const rays = rayDirs.map((dir) => {
            const ray = new THREE.Mesh(rayGeo, new THREE.MeshBasicMaterial({ color: dayColor.clone(), transparent: true }));
            ray.userData.tint = true;
            ray.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
            ray.position.z = -NEEDLE - 1;
            return ray;
        });
        const hitArea = new THREE.Mesh(hitGeo, hitMat);
        hitArea.visible = false;
        pinMesh.add(hitArea);
        const pennant = new THREE.Mesh(pennantGeo.clone(), new THREE.MeshBasicMaterial({ color: dayColor.clone(), side: THREE.DoubleSide, transparent: true }));
        pennant.userData.tint = true;
        const caps = [-NEEDLE - 1 - 2.9, -NEEDLE - 1 + 2.9].map((z, i) => {
            const cap = new THREE.Mesh(capGeos[i], needleMat.clone());
            cap.position.z = z;
            return cap;
        });
        // Extras are added and removed rather than hidden: the r128 raycaster also hits invisible objects
        const extras = { push: [needle], flag: [needle, pennant], lantern: [needle, ...caps], marker: [], candle: [flame], firework: [needle, ...rays] };

        const ringMesh = new THREE.Mesh(
            new THREE.RingGeometry(1.6, 2.25, 24),
            new THREE.MeshBasicMaterial({ color: dayColor.clone(), side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
        );
        ringMesh.position.copy(pos);
        ringMesh.lookAt(new THREE.Vector3(0, 0, 0));

        pinMesh.userData = { festival, hitArea, lat: Math.asin(pos.y / pos.length()) / DEG, ring: ringMesh, dayColor, nightColor, mats, extras,
            flame, rays, pennant, basePos: pos.clone(), baseQuat: pinMesh.quaternion.clone(), out: pos.clone().normalize(), rest: true };
        globeGroup.add(pinMesh);
        globeGroup.add(ringMesh);
        return pinMesh;
    }

    // One pin per festival, at its pin spot (see FESTIVALS)
    const PIN_SCALE = 0.7;
    FESTIVALS.forEach((f) => {
        const pin = buildPin(f, latLongToVector3(f.pinLat, f.pinLon, globeRadius + 0.3));
        pinObjects.push(pin);
        pinById[f.id] = pin;
    });
    const isPin = (obj) => !!(obj && obj.userData.festival);

    // Idle pin motion. Each function poses its style's parts for strength `a` (0 = rest pose, 1 = idle,
    // 2 = hovered, selected or on now) and phase `ph`; the click target moves less than 1 unit.
    // The pin's own rotation and position are offsets from their stored rest values.
    const tiltE = new THREE.Euler();
    const tiltQ = new THREE.Quaternion();
    const tilt = (pin, x, y) => pin.quaternion.copy(pin.userData.baseQuat).multiply(tiltQ.setFromEuler(tiltE.set(x, y, 0)));
    const FLAG_LEAN = 25 * DEG;
    const PIN_MOTION = {
        push: (pin, t, a, ph) => tilt(pin, 0.05 * a * Math.sin(t * 1.7 + ph), 0.05 * a * Math.sin(t * 1.3 + ph * 1.3)),
        lantern: (pin, t, a, ph) => {
            tilt(pin, 0.08 * a * Math.sin(t * 1.2 + ph), 0.05 * a * Math.sin(t * 0.9 + ph * 1.3));
            if (pin.material.emissive) pin.material.emissive.multiplyScalar(1 + 0.2 * a * Math.sin(t * 2.1 + ph)); // after the loop sets the base glow
        },
        flag: (pin, t, a, ph) => {
            tilt(pin, FLAG_LEAN, 0); // a fixed lean, so a flag seen from straight above still shows its pennant
            const p = pin.userData.pennant.geometry.attributes.position;
            p.setY(1, 0.4 * a * Math.sin(t * 3 + ph - 0.8)); // the pole's own vertex (0) stays put
            p.setY(2, 1.0 * a * Math.sin(t * 3 + ph));
            p.setZ(2, -NEEDLE + 1.4 + 0.4 * a * Math.sin(t * 4 + ph + 1));
            p.needsUpdate = true;
        },
        candle: (pin, t, a, ph) => {
            const { flame } = pin.userData;
            // Flicker: three unrelated frequencies added together never repeat in a visible pattern
            const n = 0.5 * Math.sin(t * 7 + ph) + 0.3 * Math.sin(t * 11.3 + ph * 1.7) + 0.2 * Math.sin(t * 17.9 + ph * 2.3);
            const s = 1 + 0.15 * a * n;
            flame.scale.set(1 - 0.08 * a * n, 1 - 0.08 * a * n, s);
            flame.position.z = 6 * (s - 1); // grows from its base on the wick
            flame.material.opacity *= 1 - 0.1 * a * (0.5 - 0.5 * n);
        },
        marker: (pin, t, a, ph) => pin.position.copy(pin.userData.basePos).addScaledVector(pin.userData.out, 0.8 * a * (0.5 + 0.5 * Math.sin(t * 2.4 + ph))),
        firework: (pin, t, a, ph) => {
            // Slow loop: the rays fly outwards while fading, then return
            const p = (t / 3 + ph) % 1;
            const d = a ? 3 * p : 0;
            const fade = a ? (p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85) : 1;
            pin.userData.rays.forEach((ray, k) => {
                const dir = rayDirs[k];
                ray.position.set(dir.x * d, dir.y * d, -NEEDLE - 1 + dir.z * d);
                ray.material.opacity *= fade;
            });
        }
    };
    function animatePin(pin, style, t, a, ph) {
        const ud = pin.userData;
        if (a === 0 && ud.rest) return;
        ud.rest = a === 0;
        pin.quaternion.copy(ud.baseQuat);
        pin.position.copy(ud.basePos);
        PIN_MOTION[style](pin, t, a, ph);
    }

    function setPinStyle(style) {
        pinObjects.forEach((pin) => {
            const { mats, extras } = pin.userData;
            pin.userData.rest = true; // so a dimmed pin gets its rest pose
            PIN_STYLES.forEach((s) => PIN_MOTION[s](pin, 0, 0, 0)); // no stale pose from the previous style
            pin.quaternion.copy(pin.userData.baseQuat);
            pin.position.copy(pin.userData.basePos);
            pin.userData.style = style;
            PIN_MOTION[style](pin, 0, 0, 0); // the rest pose (the flag's lean)
            pin.geometry = headGeo[style];
            pin.material = mats[style];
            PIN_STYLES.forEach((s) => extras[s].forEach((part) => pin.remove(part)));
            extras[style].forEach((part) => pin.add(part)); // after removing all, as styles share the needle
        });
    }

    // Pins switch (under the festival list), remembered per visitor
    setPinStyle(pinStyle);
    document.querySelectorAll('input[name="pin-style"]').forEach((radio) => {
        radio.addEventListener("change", () => {
            setPinStyle(radio.value);
            try { localStorage.setItem("pinStyle", radio.value); } catch (e) { /* not remembered, still applied */ }
        });
    });

    // 6. Interaction state
    const hero = document.getElementById("globe-section");
    const panel = document.getElementById("info-panel");
    const tooltip = document.getElementById("globe-tooltip");
    const regionButtons = document.querySelectorAll(".region-btn");
    const heroTitle = document.getElementById("hero-title");
    const homeTitle = [...heroTitle.childNodes]; // restored when the card closes
    const globeStatus = document.getElementById("globe-status");
    let keyboardMode = false; // arrow keys are turning the globe; the pin facing the viewer is highlighted
    let facingPin = null;
    let isHovering = false;
    let selectedPin = null;
    let hoveredPin = null;
    let lastTrigger = null;  // control that opened the panel, refocused on close
    let pendingSwitch = null; // { entry, url } picked from a reading view, waiting for history.back() to land
    let nightMix = 0;        // 0 = day, 1 = night (eased toward targetMix)
    let targetMix = 0;
    let targetRot = null;    // { x, y } globe rotation we are easing toward
    let targetCamDist = null;
    let camFront = true;     // the easing also swings the camera back to the front (selecting, going home); user zoom keeps the view
    let homeDist = 220;
    const zoomNow = () => homeDist / camera.position.length();
    const zoomGoal = () => homeDist / (targetCamDist ?? camera.position.length());
    const defaultZoom = () => (selectedPin ? 1 / ZOOM : 1);
    function setZoom(z) {
        z = Math.min(MAX_ZOOM, Math.max(1, z));
        if (targetCamDist === null) camFront = false;
        targetCamDist = homeDist / z;
    }

    function setMood(mood) {
        document.documentElement.dataset.theme = mood;
        targetMix = mood === "night" ? 1 : 0;
    }

    // Spin and tilt the globe so the pin sits in the centre, facing the camera
    function focusPin(pin) {
        const { lat } = pin.userData;
        const current = globeGroup.rotation.y;
        let delta = (-Math.atan2(pin.position.x, pin.position.z) - current) % (Math.PI * 2);
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;
        targetRot = { x: lat * DEG, y: current + delta };
        targetCamDist = Math.min(homeDist * ZOOM, camera.position.length()); // never zooms out from a closer view
        camFront = true;
    }

    // `fromHistory` is true when the address bar drove the change, so no history entry is added
    // `keepReading` leaves the reading state to the caller (which sets it right after, animated)
    function showFestivalCard(targetId, fromHistory, keepReading) {
        const pin = pinById[targetId];
        if (!pin) return;
        const festival = festivalById[targetId];
        const entry = fromHistory ? history.state : { festival: targetId, depth: 1 };

        setRegion(null);
        selectedPin = pin;
        focusPin(pin);
        drawMaps(festival);
        setMood(festival.mood);
        if (!keepReading) {
            // Not when the same card comes back (Back from its reading view); a new festival cuts the last burst short
            fxParts = [];
            burstPending = BURSTS[targetId] && !reduceMotion ? targetId : null;
        }
        // Name on its own line, kept whole so "Eid al-Fitr" never breaks at its hyphen
        const name = document.createElement("span");
        name.className = "hero-name";
        name.textContent = festival.heading || festival.label;
        heroTitle.replaceChildren(`A ${festival.mood} of `, name);

        document.querySelectorAll(".festival-card").forEach((card) => {
            card.hidden = card.id !== `card-${targetId}`; // "card-" prefix: a #festival link must not scroll to the card
        });
        regionButtons.forEach((btn) => {
            btn.setAttribute("aria-pressed", btn.dataset.target === targetId);
        });

        if (!keepReading) setReading(false);
        // Adds or replaces the history entry (see commitEntry)
        if (!fromHistory) commitEntry(entry, `#${targetId}`);

        if (!panel.contains(document.activeElement)) lastTrigger = document.activeElement;
        panel.classList.add("is-open");
        hero.classList.add("panel-open");
        panel.setAttribute("aria-hidden", "false");
        // Land on the festival title so screen readers announce it, not the close button
        const title = document.querySelector(`#card-${targetId} h2`);
        if (title) title.focus({ preventScroll: true });
    }

    // History entries: { festival, depth: 1 } for a card, { festival, about: true, depth: 2 } for its reading view
    // Opening from home adds one entry; switching replaces it. From a reading view, first go back off its
    // /about entry (popstate then replaces the card entry beneath it), so Close and Back never land on the previous festival.
    function commitEntry(entry, url) {
        const prev = history.state;
        if (pendingSwitch) pendingSwitch = { entry, url }; // a second pick before the step back lands
        else if (prev && prev.about) {
            pendingSwitch = { entry, url };
            history.back();
        } else if (prev && prev.festival) history.replaceState(entry, "", url);
        else history.pushState(entry, "", url);
    }

    // Close button and Escape: step back off the current history entry, which closes the panel via popstate
    function closeFestival(e) {
        if (e) e.preventDefault();
        const s = history.state;
        if (s && s.festival) {
            history.back();
        } else {
            history.replaceState(null, "", location.pathname + location.search);
            resetToHome();
        }
    }

    // Reading view (#<id>/about): the panel widens to show the open festival's long read
    const closeBtn = document.getElementById("back-home-btn");
    const BACK_ICON = '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'; // a ">" chevron, on purpose
    let readingTimer = 0;
    // The corner button: a chevron steps back from the reading view to the card, a cross closes
    function updateNav() {
        const reading = panel.classList.contains("is-reading");
        closeBtn.innerHTML = reading ? BACK_ICON : "&times;";
        closeBtn.setAttribute("aria-label", reading ? "Back to festival summary" : "Close festival details");
    }
    // Each long read gets a read time and a row of section links built from its own headings
    // (buttons, not #links, since the hash holds the festival address)
    document.querySelectorAll(".festival-about").forEach((about) => {
        const heads = [...about.querySelectorAll("h3")];
        const words = [...about.querySelectorAll("p")].filter((p) => p.previousElementSibling !== heads[heads.length - 1])
            .reduce((n, p) => n + p.textContent.trim().split(/\s+/).length, 0); // body text, not the sources
        const time = document.createElement("p");
        time.className = "read-time";
        time.textContent = `About ${Math.max(1, Math.round(words / 200))} min read`;
        const toc = document.createElement("nav");
        toc.className = "about-toc";
        toc.setAttribute("aria-label", "Sections");
        for (const h of heads) {
            const b = document.createElement("button");
            b.type = "button";
            b.textContent = h.textContent.startsWith("How") ? "How" : h.textContent;
            b.addEventListener("click", () => {
                // A jump lands on settled text: unhidden blocks skip their 12px slide, so the heading's position is final
                about.querySelectorAll(".reveal").forEach((el) => {
                    el.style.transition = "none";
                    el.classList.remove("reveal");
                    void el.offsetHeight;
                    el.style.transition = "";
                });
                h.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
                h.tabIndex = -1;
                h.focus({ preventScroll: true });
            });
            toc.append(b);
        }
        about.prepend(time, toc);
    });

    // Reading progress: a bar along the panel's top edge, scaled to how far the long read has scrolled
    const progress = document.createElement("div");
    progress.className = "read-progress";
    progress.setAttribute("aria-hidden", "true");
    panel.prepend(progress);
    function updateProgress() {
        const max = panel.scrollHeight - panel.clientHeight;
        progress.style.transform = `scaleX(${max > 0 ? panel.scrollTop / max : 0})`;
    }
    panel.addEventListener("scroll", () => { if (panel.classList.contains("is-reading")) updateProgress(); }, { passive: true });

    // Scroll reveals: long-read blocks below the fold when it opens fade and rise in the first time they scroll into view
    const revealer = reduceMotion ? null : new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.remove("reveal");
        revealer.unobserve(e.target);
    }), { root: panel, rootMargin: "0px 0px -40px 0px" });

    // `animate` is true for in-page changes within one open festival; opening on /about stays instant
    function setReading(on, animate) {
        clearTimeout(readingTimer);
        if (revealer) {
            revealer.disconnect();
            panel.querySelectorAll(".reveal").forEach((el) => el.classList.remove("reveal"));
        }
        animate = !!animate && !reduceMotion; // toggle() needs a real boolean
        panel.classList.toggle("reading-anim", animate);
        panel.classList.toggle("reading-out", animate && !on); // keeps the long read on screen while it fades out
        if (animate) readingTimer = setTimeout(() => panel.classList.remove("reading-anim", "reading-out"), 400);
        panel.classList.toggle("is-reading", on);
        // In the reading view the button goes back to the card (via history), so it looks like a back button
        updateNav();
        if (!on) return;
        panel.scrollTop = 0;
        const about = panel.querySelector(".festival-card:not([hidden]) .festival-about");
        if (about) progress.style.background = getComputedStyle(about).getPropertyValue("--c");
        updateProgress();
        if (revealer && about) {
            const bottom = panel.getBoundingClientRect().bottom;
            for (const el of about.children) {
                if (el.getBoundingClientRect().top < bottom) continue;
                el.classList.add("reveal");
                revealer.observe(el);
            }
        }
        const heading = panel.querySelector(".festival-card:not([hidden]) .festival-about h3");
        if (heading) heading.focus({ preventScroll: true });
    }

    // "Read more" adds a history entry on top of the card's, so Back and the close button return to the card
    panel.addEventListener("click", (e) => {
        const link = e.target.closest('a[href$="/about"]');
        if (!link || !selectedPin) return;
        e.preventDefault();
        const s = history.state || {};
        history.pushState({ ...s, festival: selectedPin.userData.festival.id, about: true, depth: (s.depth || 1) + 1 }, "", link.getAttribute("href"));
        setReading(true, true);
    });

    // Returns { id, about } for "#diwali" or "#diwali/about"; about only counts when that festival has a long read
    function parseAddress() {
        const [id, sub] = decodeURIComponent(location.hash.slice(1)).split("/");
        return { id, about: sub === "about" && !!document.querySelector(`#card-${id} .festival-about`) };
    }

    // A festival opened from the address bar (a shared link or a typed #id) gets a home entry beneath it
    // (and a card entry beneath an /about page), so Back and the close button always lead back to the home view
    function openFromAddress(id, about) {
        if (!(history.state && history.state.festival)) {
            history.replaceState(null, "", location.pathname + location.search);
            history.pushState({ festival: id, depth: 1 }, "", `#${id}`);
            if (about) history.pushState({ festival: id, about: true, depth: 2 }, "", `#${id}/about`);
        }
        const sameOpen = panel.classList.contains("is-open") && !!panel.querySelector(`#card-${id}:not([hidden])`);
        showFestivalCard(id, true, sameOpen);
        setReading(about, sameOpen);
    }

    window.addEventListener("popstate", () => {
        if (pendingSwitch) {
            // Landed on the old card's entry after leaving a reading view: it becomes the new festival's (already shown)
            history.replaceState(pendingSwitch.entry, "", pendingSwitch.url);
            pendingSwitch = null;
            return;
        }
        const { id, about } = parseAddress();
        if (festivalById[id]) openFromAddress(id, about);
        else if (selectedPin) resetToHome();
    });

    function resetToHome() {
        const wasOpen = selectedPin !== null;
        selectedPin = null;
        drawMaps(null);
        setMood("day");
        heroTitle.replaceChildren(...homeTitle);
        targetRot = { x: 0, y: globeGroup.rotation.y };
        targetCamDist = homeDist;
        camFront = true;

        clearTimeout(readingTimer);
        panel.classList.remove("is-open", "is-reading", "reading-anim", "reading-out");
        hero.classList.remove("panel-open");
        panel.setAttribute("aria-hidden", "true");
        regionButtons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        if (wasOpen && lastTrigger && lastTrigger !== document.body && document.contains(lastTrigger)) {
            lastTrigger.focus({ preventScroll: true });
        }
        lastTrigger = null;
    }

    // 7. Picking: only count pins on the visible side (the earth blocks the rest)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Returns the nearest hit (pin or earth) under the pointer, or null over empty space
    function hitAt(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hit = raycaster.intersectObjects([dayMap.mesh, ...pinObjects], true)[0] || null;
        // A pin's needle, cap or pennant counts as the pin
        if (hit && isPin(hit.object.parent)) hit.object = hit.object.parent;
        return hit;
    }

    // Region filter: built on the list's own region labels; dims the festivals (list items and pins) outside the chosen region
    const regionOf = {};
    regionButtons.forEach((btn) => {
        regionOf[btn.dataset.target] = btn.querySelector(".fl-meta").textContent;
    });
    const regionToggle = document.querySelector(".region-toggle");
    const regionFilter = document.getElementById("region-filter");
    // Older browsers (Chrome < 114, Safari < 17, Firefox < 125) lack popovers: the pills then always show,
    // and these calls and selectors must be skipped
    const hasPopover = "showPopover" in HTMLElement.prototype;
    let selectedRegion = null;
    // One pill per region in the list, so a new or renamed region needs no edit here
    ["All", ...[...new Set(Object.values(regionOf))].sort()].forEach((name) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = name;
        b.setAttribute("aria-pressed", name === "All");
        regionFilter.append(b);
    });
    // Stagger index for the entrance animations in style.css
    regionFilter.querySelectorAll("button").forEach((b, i) => b.style.setProperty("--i", i));
    document.querySelectorAll(".festival-list li").forEach((li, i) => li.style.setProperty("--i", i));

    const festivalUl = document.querySelector(".festival-list ul");
    const listItems = [...festivalUl.children]; // calendar order
    // The list's left margin hangs its scrollbar outside the column; widths differ by browser and overlay scrollbars have none
    const festivalList = festivalUl.parentElement;
    const measureScrollbar = () => festivalList.style.setProperty("--list-scrollbar", `${festivalList.offsetWidth - festivalList.clientWidth}px`);
    measureScrollbar();
    window.addEventListener("resize", measureScrollbar);
    function setRegion(region) {
        if (region === selectedRegion) return; // re-appending the list items would drop the focus of a pressed list button
        selectedRegion = region;
        regionToggle.textContent = `Region: ${region || "All"}`;
        regionFilter.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.textContent === (region || "All")));
        listItems.forEach((li) => {
            li.classList.toggle("is-dimmed", region !== null && regionOf[li.firstElementChild.dataset.target] !== region);
            li.style.animation = "none"; // re-appending would replay the staggered page-load entrance
        });
        // The region's festivals move to the top (in the DOM, so Tab order matches), each group keeping calendar order
        festivalUl.append(...listItems.filter((li) => !li.classList.contains("is-dimmed")), ...listItems.filter((li) => li.classList.contains("is-dimmed")));
        festivalUl.parentElement.scrollTop = 0;
    }

    regionFilter.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        setRegion(b.textContent === "All" ? null : b.textContent);
        if (hasPopover) regionFilter.hidePopover();
        regionToggle.focus();
        // Dimming is visual only, so tell screen readers which festivals match
        const names = FESTIVALS.filter((f) => regionOf[f.id] === selectedRegion).map((f) => f.label);
        globeStatus.textContent = selectedRegion ? `${selectedRegion}: ${names.join(", ")}` : "Showing all festivals";
    });

    // Its position is set only when it opens, so close it on resize instead of leaving it misplaced
    window.addEventListener("resize", () => {
        if (hasPopover && regionFilter.matches(":popover-open")) regionFilter.hidePopover();
    });

    // The popover lives in the top layer, so line it up under the toggle's right edge
    regionFilter.addEventListener("beforetoggle", (e) => {
        if (e.newState !== "open") return;
        const r = regionToggle.getBoundingClientRect();
        regionFilter.style.top = `${r.bottom + 6}px`;
        regionFilter.style.right = `${document.documentElement.clientWidth - r.right}px`;
    });

    // Pointer moves can fire several times a frame, so raycast only the latest one, once per frame
    let moveEvent = null;
    let moveFrame = 0;
    container.addEventListener("pointerleave", () => {
        cancelAnimationFrame(moveFrame);
        moveFrame = 0;
        isHovering = false;
        hoveredPin = null;
        tooltip.hidden = true;
        container.style.cursor = "";
    });

    container.addEventListener("pointermove", (event) => {
        moveEvent = event;
        if (!moveFrame) moveFrame = requestAnimationFrame(onPointerMove);
    });

    function onPointerMove() {
        moveFrame = 0;
        const event = moveEvent;
        const hit = hitAt(event);
        const obj = hit ? hit.object : null;
        keyboardMode = false;
        facingPin = null;
        isHovering = obj !== null;
        hoveredPin = obj && obj !== dayMap.mesh ? obj : null;
        container.style.cursor = hoveredPin ? "pointer" : isHovering ? "" : "default"; // "" is the stylesheet's grab hand
        const label = hoveredPin ? hoveredPin.userData.festival.label : null;
        if (label) {
            const heroRect = hero.getBoundingClientRect(); // the tooltip lives in the stage, which the globe may be shifted within
            tooltip.textContent = label;
            tooltip.style.left = `${event.clientX - heroRect.left}px`;
            tooltip.style.top = `${event.clientY - heroRect.top}px`;
            tooltip.hidden = false;
        } else {
            tooltip.hidden = true;
        }
    }

    // OrbitControls cancels the browser's click-to-focus (and the canvas can't take focus), so focus the globe here.
    // focusVisible: false shows the focus ring for Tab focus only. Blur first: re-focusing a globe that was
    // already Tab-focused would keep its keyboard ring and keep the spin paused.
    // Dragging should start only on the globe or a pin. Elsewhere the press is stopped before it reaches OrbitControls
    // (on the canvas inside), so clicks on empty space don't turn the globe.
    container.addEventListener("pointerdown", (event) => {
        container.blur();
        container.focus({ preventScroll: true, focusVisible: false });
        const hit = hitAt(event);
        if (!hit) event.stopPropagation();
    }, true);

    container.addEventListener("click", (event) => {
        const hit = hitAt(event);
        if (hit && isPin(hit.object)) showFestivalCard(hit.object.userData.festival.id);
    });

    regionButtons.forEach((btn) => {
        btn.setAttribute("aria-pressed", "false");
        btn.addEventListener("click", () => showFestivalCard(btn.dataset.target));
    });

    closeBtn.addEventListener("click", closeFestival);

    // Card photos open uncropped in a dialog, with their credit; a click anywhere but the credit closes it
    const viewer = document.getElementById("photo-viewer");
    const viewerImg = viewer.querySelector("img");
    const viewerCredit = viewer.querySelector(".photo-credit");
    document.querySelectorAll(".card-img").forEach((img) => {
        const btn = document.createElement("button");
        btn.className = "photo-open";
        btn.setAttribute("aria-label", `View full photo: ${img.alt}`);
        img.replaceWith(btn);
        btn.append(img);
        btn.addEventListener("click", () => {
            const credit = btn.parentElement.querySelector(".photo-credit");
            viewerImg.src = img.src;
            viewerImg.alt = img.alt;
            viewerCredit.href = credit.href;
            viewerCredit.textContent = credit.textContent;
            viewer.showModal();
        });
    });
    viewer.addEventListener("click", (e) => {
        if (!e.target.closest("a")) viewer.close();
    });

    // About dialog: the close button or a click on the backdrop closes it
    const aboutDialog = document.getElementById("about-dialog");
    document.getElementById("about-btn").addEventListener("click", () => aboutDialog.showModal());
    aboutDialog.addEventListener("click", (e) => {
        if (e.target === aboutDialog || e.target.closest(".close-btn")) aboutDialog.close();
    });

    document.addEventListener("keydown", (e) => {
        // An open dialog or the region pills take Escape first (the browser closes them), not the card
        if (e.key !== "Escape" || document.querySelector(hasPopover ? "dialog[open], :popover-open" : "dialog[open]")) return;
        if (selectedPin) closeFestival();
        else if (selectedRegion) {
            setRegion(null);
            globeStatus.textContent = "Showing all festivals";
        }
    });

    // Keyboard: arrows turn the globe, Enter opens the festival facing the viewer
    const KEY_TURN = { ArrowLeft: [0, -20], ArrowRight: [0, 20], ArrowUp: [15, 0], ArrowDown: [-15, 0] };
    container.addEventListener("keydown", (e) => {
        const turn = KEY_TURN[e.key];
        if (turn) {
            e.preventDefault();
            keyboardMode = true;
            const base = targetRot || globeGroup.rotation;
            targetRot = { x: Math.max(-60 * DEG, Math.min(60 * DEG, base.x + turn[0] * DEG)), y: base.y + turn[1] * DEG };
        } else if (e.key === "+" || e.key === "=") setZoom(zoomGoal() * 1.4);
        else if (e.key === "-" || e.key === "_") setZoom(zoomGoal() / 1.4);
        else if (e.key === "0") setZoom(defaultZoom());
        else if ((e.key === "Enter" || e.key === " ") && facingPin) {
            e.preventDefault();
            showFestivalCard(facingPin.userData.festival.id);
        }
    });

    container.addEventListener("blur", () => {
        keyboardMode = false;
        facingPin = null;
        hoveredPin = null;
        tooltip.hidden = true;
    });

    // "On now" for festivals happening this month
    regionButtons.forEach((btn) => {
        if (!festivalById[btn.dataset.target].months.includes(THIS_MONTH)) return;
        const now = document.createElement("span");
        now.className = "fl-now";
        now.textContent = "On now";
        btn.querySelector(".fl-month").append(now);
    });

    document.querySelector(".festival-list-heading").textContent += ` (${document.querySelectorAll(".festival-list li").length})`;

    // Zoom: wheel (and trackpad pinch) over the globe, +/-/0 keys, the buttons by the globe; two-finger pinch is OrbitControls' own
    container.addEventListener("wheel", (e) => {
        e.preventDefault();
        e.stopPropagation(); // OrbitControls' own wheel zoom is instant; this one eases
        setZoom(zoomGoal() * Math.exp(-e.deltaY * (e.deltaMode === 1 ? 16 : 1) * (e.ctrlKey ? 0.01 : 0.0015)));
    }, { passive: false, capture: true });
    container.addEventListener("touchstart", (e) => { if (e.touches.length > 1) targetCamDist = null; }, { capture: true, passive: true });
    // A drag stops the swing back to the front (it would pull the camera back every frame); the zoom still eases
    let dragging = false;
    controls.addEventListener("start", () => { camFront = false; dragging = true; });
    controls.addEventListener("end", () => { dragging = false; });

    const zoomOutBtn = document.getElementById("zoom-out");
    const zoomInBtn = document.getElementById("zoom-in");
    const zoomResetBtn = document.getElementById("zoom-reset");
    zoomOutBtn.addEventListener("click", () => setZoom(zoomGoal() / 1.4));
    zoomInBtn.addEventListener("click", () => setZoom(zoomGoal() * 1.4));
    zoomResetBtn.addEventListener("click", () => setZoom(defaultZoom()));
    let shownZoom = "";
    function updateZoomControls(zoom) {
        const text = `${zoom.toFixed(1)}×`;
        const key = `${text}${zoom < 1.02}${zoom > MAX_ZOOM - 0.02}`;
        if (key === shownZoom) return;
        shownZoom = key;
        zoomResetBtn.textContent = text;
        zoomResetBtn.setAttribute("aria-label", `Zoom ${text}. Reset zoom`);
        zoomOutBtn.setAttribute("aria-disabled", zoom < 1.02);
        zoomInBtn.setAttribute("aria-disabled", zoom > MAX_ZOOM - 0.02);
    }

    // Zoom labels: the festival's name, as HTML so the text stays sharp.
    // They hide on the far side, dim with their pin, and the lower-priority one of two overlapping labels is hidden.
    const labelLayer = document.createElement("div");
    labelLayer.className = "globe-labels";
    labelLayer.hidden = true;
    container.append(labelLayer);
    pinObjects.forEach((pin) => {
        const el = document.createElement("div"); // not focusable: keyboard users reach the same thing with Enter on the facing pin
        el.setAttribute("aria-hidden", "true");
        el.className = "globe-label";
        el.textContent = pin.userData.festival.label;
        el.addEventListener("click", (e) => {
            e.stopPropagation();
            showFestivalCard(pin.userData.festival.id);
        });
        pin.userData.label = { el, w: 0, h: 0 };
        labelLayer.append(el);
    });
    // Widths are cached on first show; measure again once the web fonts (font-display: swap) have replaced the fallback
    document.fonts.ready.then(() => pinObjects.forEach((pin) => { pin.userData.label.w = 0; }));
    const labelV = new THREE.Vector3();
    function updateLabels(zoom) {
        const show = Math.min(1, Math.max(0, (zoom * view.k - LABEL_ZOOM) / 0.15)); // the bigger home view on wider screens shows them unzoomed
        labelLayer.hidden = show === 0;
        if (show === 0) return;
        // A point on the globe faces the camera when its direction's dot product with the camera's exceeds this
        const edge = globeRadius / camera.position.length();
        const cands = [];
        pinObjects.forEach((pin) => {
            const lab = pin.userData.label;
            pin.getWorldPosition(labelV);
            const facing = labelV.normalize().dot(motionCam) - edge;
            const op = show * Math.min(1, Math.max(0, facing / 0.1)) * (pin.userData.dimmed ? 0.3 : 1);
            if (op > 0 && !lab.w) { lab.w = lab.el.offsetWidth; lab.h = lab.el.offsetHeight; }
            cands.push({ pin, lab, op, facing, rank: (pin === selectedPin ? 2 : 0) + (pin.userData.dimmed ? 0 : 1) });
        });
        const placed = [];
        cands.sort((a, b) => b.rank - a.rank || b.facing - a.facing).forEach(({ pin, lab, op }) => {
            let o = op;
            if (o > 0) {
                pin.getWorldPosition(labelV).project(camera);
                const x = ((labelV.x + 1) / 2) * W;
                const y = ((1 - labelV.y) / 2) * H + 16 * view.k; // below the pin's head
                const box = [x - lab.w / 2 - 4, y - 4, x + lab.w / 2 + 4, y + lab.h + 4];
                if (placed.some((b) => box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1])) o = 0;
                else {
                    placed.push(box);
                    const t = `translate(${x - lab.w / 2}px, ${y}px)`;
                    if (t !== lab.t) lab.el.style.transform = lab.t = t; // style writes cost even when unchanged, so skip still labels
                }
            }
            if (o === lab.o) return;
            lab.o = o;
            lab.el.style.opacity = o;
            lab.el.style.pointerEvents = o > 0.5 ? "auto" : "none";
        });
    }

    // 7b. Festival bursts: a 2 s burst out of the country when its festival opens, once the spin settles.
    // A see-through 2D canvas over the globe; nothing under reduced motion. Festivals without an entry get none.
    const BURSTS = {
        diwali: { kind: "spark", cols: ["#fde047", "#facc15", "#fb923c", "#fff7d6"] },
        holi: { kind: "puff", cols: ["#db2777", "#f472b6", "#facc15", "#22c55e", "#3b82f6", "#a855f7"] }, // gulal shades
        "dia-de-muertos": { kind: "petal", cols: ["#f59e0b", "#ea580c", "#fdba74", "#fbbf24"] }, // marigolds
        "lunar-new-year": { kind: "spark", cols: ["#dc2626", "#f87171", "#facc15", "#fde68a"] }, // firecracker red and gold
        tet: { kind: "spark", cols: ["#dc2626", "#f87171", "#facc15", "#fde68a"] },
        tihar: { kind: "spark", cols: ["#fde047", "#facc15", "#fb923c", "#fff7d6"] }, // diyo lamps, as Diwali
        "bastille-day": { kind: "spark", cols: ["#2563eb", "#60a5fa", "#ef4444", "#f8fafc"] }, // tricolour fireworks
        "dubai-shopping-festival": { kind: "spark", cols: ["#facc15", "#f472b6", "#a78bfa", "#fff7d6"] }, // fireworks
        "vivid-sydney": { kind: "spark", cols: ["#22d3ee", "#e879f9", "#a78bfa", "#67e8f9"] }, // light installations
        "la-tomatina": { kind: "puff", cols: ["#dc2626", "#ef4444", "#b91c1c", "#f87171"] }, // tomato pulp
        songkran: { kind: "puff", cols: ["#0ea5e9", "#38bdf8", "#7dd3fc", "#2563eb"] }, // splashed water
        "las-fallas": { kind: "spark", cols: ["#f97316", "#ea580c", "#facc15", "#fde68a"] }, // fireworks and embers (night puffs add up to white)
        iemanja: { kind: "petal", cols: ["#ffffff", "#f1f5f9", "#e0f2fe", "#bae6fd"] }, // white flowers for the sea
        "durga-puja": { kind: "petal", cols: ["#dc2626", "#b91c1c", "#f59e0b", "#ea580c"] }, // hibiscus and marigold
        nowruz: { kind: "petal", cols: ["#fbcfe8", "#f9a8d4", "#fdf2f8", "#bbf7d0"] }, // spring blossom
        "melbourne-cup": { kind: "petal", cols: ["#e11d48", "#fb7185", "#fda4af", "#fef3c7"] }, // Flemington roses
        "rio-carnival": { kind: "confetti", cols: ["#22c55e", "#a3e635", "#facc15", "#f472b6", "#38bdf8"] }, // samba school sequins
        "mardi-gras": { kind: "confetti", cols: ["#7e22ce", "#a855f7", "#16a34a", "#facc15"] }, // purple, green and gold
        "venice-carnival": { kind: "confetti", cols: ["#a21caf", "#f0abfc", "#facc15", "#dc2626", "#f8fafc"] }, // coriandoli, mask silk and gold
        "cape-town-carnival": { kind: "confetti", cols: ["#ea580c", "#facc15", "#dc2626", "#2563eb", "#16a34a"] }, // troupe satin colours
        "vina-del-mar": { kind: "confetti", cols: ["#e2e8f0", "#cbd5e1", "#94a3b8", "#34d399"] }, // the silver seagull
        coachella: { kind: "confetti", cols: ["#f59e0b", "#d2c387", "#f472b6", "#22d3ee"] }, // desert sun and lit installations
        oktoberfest: { kind: "confetti", cols: ["#1d4ed8", "#2563eb", "#ffffff", "#f8fafc"] }, // Bavarian blue and white
        guelaguetza: { kind: "confetti", cols: ["#be185d", "#f472b6", "#facc15", "#16a34a", "#dc2626"] }, // embroidered regional dress
        "adelaide-fringe": { kind: "confetti", cols: ["#ec4899", "#f9a8d4", "#a855f7", "#facc15"] }, // Fringe pink
        "lantern-festival": { kind: "lantern", cols: ["#dc2626", "#ef4444", "#b91c1c"] }, // red paper globes; caps drawn gold
        "loy-krathong": { kind: "glow", cols: ["#fde68a", "#facc15", "#fbbf24", "#fff7d6"] }, // krathong candles, not sky lanterns (the card notes their bans)
        "sapporo-snow-festival": { kind: "snow", cols: ["#ffffff", "#f8fafc", "#e0f2fe"] },
        "bon-om-touk": { kind: "spray", cols: ["#ffffff", "#e0f2fe", "#7dd3fc", "#96e1c3", "#0f7869"] }, // river spray off the oars
        "anzac-day": { kind: "poppy", cols: ["#b91c1c", "#dc2626", "#991b1b"] }, // a few remembrance poppy petals, kept quiet
        "fez-sacred-music": { kind: "glow", cols: ["#fde68a", "#f59e0b", "#fbbf24", "#fff1c1"] }, // pierced brass lantern light
        gnaoua: { kind: "confetti", cols: ["#1e40af", "#38bdf8", "#f8fafc", "#f5e6c8"] }, // Essaouira blue and white, cowrie cream
        "awa-odori": { kind: "lantern", cols: ["#fff7ed", "#fef3c7", "#dc2626"] }, // chōchin carried by the dance groups
        "thimphu-tshechu": { kind: "confetti", cols: ["#2563eb", "#f8fafc", "#dc2626", "#16a34a", "#facc15"] }, // lungta papers in prayer-flag colours
        eid: { kind: "star", cols: ["#facc15", "#fbbf24", "#fde68a", "#f59e0b"] }, // gold stars and new-moon crescents
    };
    const fxCanvas = document.createElement("canvas");
    fxCanvas.className = "globe-fx";
    fxCanvas.setAttribute("aria-hidden", "true");
    container.append(fxCanvas);
    const fx = fxCanvas.getContext("2d");
    let fxParts = [];
    let burstPending = null; // festival id waiting for the spin to finish
    const rand = (a, b) => a + Math.random() * (b - a);

    // Particles per kind and their speed range (px/s, before scaling to the globe's size)
    const BURST_COUNTS = { spark: [80, [60, 170]], puff: [22, [30, 110]], petal: [45, [60, 170]], confetti: [70, [90, 220]], lantern: [18, [50, 140]],
        glow: [30, [40, 130]], snow: [45, [60, 170]], spray: [70, [120, 240]], poppy: [12, [20, 60]], star: [26, [40, 120]] };
    function startBurst(id, pin) {
        const { kind, cols } = BURSTS[id];
        const W = container.clientWidth;
        const H = container.clientHeight;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        fxCanvas.width = W * dpr;
        fxCanvas.height = H * dpr;
        fx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const v = pin.getWorldPosition(new THREE.Vector3()).project(camera);
        const x = ((v.x + 1) / 2) * W;
        const y = ((1 - v.y) / 2) * H;
        const s = Math.max(1, Math.min(2, Math.min(W, H) / 300)); // sized to the globe on screen
        const make = (k, n, speed) => {
            for (let i = 0; i < n * Math.sqrt(s); i++) {
                // Direction: spray is thrown upward, poppies lifted gently, the rest in every direction
                const a = k === "spray" ? rand(-2.4, -0.75) : k === "poppy" ? rand(-2.6, -0.55) : rand(0, Math.PI * 2);
                const sp = rand(...speed) * s;
                fxParts.push({
                    kind: k, x, y, t: 0, col: cols[(Math.random() * cols.length) | 0],
                    vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - ({ petal: 60, confetti: 60, snow: 40, speck: 0, spray: 0, glow: 0, poppy: 10, star: 20 }[k] ?? 30) * s,
                    g: { spark: 130, puff: 0, petal: 90, speck: 60, confetti: 110, lantern: -45, glow: -8, snow: 40, spray: 260, poppy: 28, star: -10 }[k] * s,
                    drag: { spark: 0.4, puff: 1.6, petal: 0.4, speck: 1, confetti: 1.1, lantern: 1.4, glow: 1.2, snow: 1.5, spray: 0.3, poppy: 1.6, star: 1.4 }[k],
                    size: { spark: rand(1.2, 2.2) * Math.sqrt(s), puff: rand(8, 14) * s, petal: rand(4, 6) * s, confetti: rand(5, 7) * s, speck: rand(1.2, 2.4), lantern: rand(5, 7) * s, glow: rand(2.5, 3.8) * Math.sqrt(s), snow: rand(2.5, 4) * s, spray: rand(1.5, 2.5) * Math.sqrt(s), poppy: rand(5, 7) * s, star: rand(3.5, 5.5) * s }[k],
                    grow: k === "puff" ? rand(25, 45) * s : 0,
                    life: k === "poppy" ? rand(2.2, 2.8) : k === "lantern" || k === "glow" || k === "snow" || k === "star" ? rand(1.6, 2.2) : rand(1.2, 1.8),
                    delay: k === "speck" ? 0 : k === "glow" || k === "poppy" || k === "star" ? rand(0, 0.4) : rand(0, 0.15),
                    rot: rand(0, 6.28), vr: k === "star" ? rand(-1, 1) : rand(-4, 4), sway: rand(0, 6.28),
                    crescent: k === "star" && Math.random() < 0.25, // about one in four is a crescent moon
                });
            }
        };
        fxParts = [];
        make(kind, ...BURST_COUNTS[kind]);
        if (kind === "puff") make("speck", 40, [60, 160]); // fine powder thrown out with the clouds
    }

    function drawBurst(dt) {
        fx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
        const night = nightMix > 0.5;
        fxParts = fxParts.filter((p) => {
            if (p.delay > 0) { p.delay -= dt; return true; }
            p.t += dt;
            if (p.t >= p.life) return false;
            const d = Math.exp(-p.drag * dt);
            p.vx *= d;
            p.vy = p.vy * d + p.g * dt;
            if (p.kind !== "spark" && p.kind !== "puff" && p.kind !== "speck" && p.kind !== "spray") p.x += Math.sin(p.t * 3 + p.sway) * 20 * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.rot += p.vr * dt;
            const k = p.t / p.life;
            fx.save();
            fx.globalAlpha = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85;
            // only small sparks and soft puffs add up at night; bigger or solid shapes would turn into a white blob
            fx.globalCompositeOperation = night && (p.kind === "spark" || p.kind === "puff" || p.kind === "speck") ? "lighter" : "source-over";
            fx.fillStyle = fx.strokeStyle = p.col;
            fx.beginPath();
            if (p.kind === "spark") {
                fx.lineWidth = p.size;
                fx.lineCap = "round";
                fx.shadowColor = p.col;
                fx.shadowBlur = 6;
                fx.moveTo(p.x, p.y);
                fx.lineTo(p.x - p.vx * 0.04, p.y - p.vy * 0.04); // a short trail along its path
                fx.stroke();
            } else if (p.kind === "puff") {
                const r = p.size + p.grow * Math.min(1, k * 1.5);
                const g = fx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
                g.addColorStop(0, p.col);
                g.addColorStop(1, p.col + "00");
                fx.globalAlpha *= 0.7;
                fx.fillStyle = g;
                fx.arc(p.x, p.y, r, 0, 6.28);
                fx.fill();
            } else if (p.kind === "speck") {
                fx.arc(p.x, p.y, p.size, 0, 6.28);
                fx.fill();
            } else if (p.kind === "spray") {
                fx.lineWidth = p.size;
                fx.lineCap = "round";
                fx.moveTo(p.x, p.y);
                fx.lineTo(p.x - p.vx * 0.03, p.y - p.vy * 0.03); // a droplet stretched along its arc
                fx.stroke();
            } else if (p.kind === "glow") {
                fx.globalAlpha *= 0.8 + 0.2 * Math.sin(p.t * 18 + p.sway); // candle flicker
                fx.shadowColor = p.col;
                fx.shadowBlur = 16;
                fx.arc(p.x, p.y, p.size, 0, 6.28);
                fx.fill();
            } else if (p.kind === "snow") {
                fx.translate(p.x, p.y);
                fx.rotate(p.rot * 0.3);
                fx.lineWidth = Math.max(1, p.size / 3);
                fx.lineCap = "round";
                fx.shadowColor = "#1e78c3"; // a faint blue edge so white flakes show on the light globe
                fx.shadowBlur = 3;
                for (let i = 0; i < 3; i++) {
                    fx.moveTo(0, -p.size);
                    fx.lineTo(0, p.size);
                    fx.rotate(Math.PI / 3);
                }
                fx.stroke();
            } else if (p.kind === "star") {
                fx.globalAlpha *= 0.75 + 0.25 * Math.sin(p.t * 9 + p.sway); // twinkle
                fx.translate(p.x, p.y);
                fx.shadowColor = "#b45309"; // a warm edge so gold shows on the light globe
                fx.shadowBlur = 4;
                if (p.crescent) {
                    // the gap between two equal circles, the second shifted right by d
                    const r = p.size * 1.3, d = r * 0.7, phi = Math.atan2(Math.sqrt(r * r - (d * d) / 4), d / 2);
                    fx.rotate(-0.5);
                    fx.arc(0, 0, r, phi, 2 * Math.PI - phi);
                    fx.arc(d, 0, r, Math.PI + phi, Math.PI - phi, true);
                } else {
                    fx.rotate(p.rot);
                    for (let i = 0; i < 10; i++) {
                        const rr = i % 2 ? p.size * 0.45 : p.size, a = (i * Math.PI) / 5 - Math.PI / 2;
                        fx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
                    }
                }
                fx.closePath();
                fx.fill();
            } else if (p.kind === "lantern") {
                fx.translate(p.x, p.y);
                fx.rotate(Math.sin(p.t * 2 + p.sway) * 0.15);
                fx.shadowColor = "#facc15";
                fx.shadowBlur = 10;
                fx.ellipse(0, 0, p.size, p.size * 0.85, 0, 0, 6.28);
                fx.fill();
                fx.shadowBlur = 0;
                fx.fillStyle = "#facc15"; // gold caps
                fx.fillRect(-p.size * 0.35, -p.size * 1.05, p.size * 0.7, p.size * 0.3);
                fx.fillRect(-p.size * 0.35, p.size * 0.75, p.size * 0.7, p.size * 0.3);
            } else {
                fx.translate(p.x, p.y);
                fx.rotate(p.rot);
                fx.scale(1, 0.55 + 0.45 * Math.sin(p.t * (p.kind === "poppy" ? 3 : 6) + p.sway)); // petal flutter, slower for poppies
                if (p.kind === "confetti") fx.rect(-p.size / 2, -p.size / 4, p.size, p.size / 2); // a paper strip
                else fx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, 6.28);
                fx.fill();
            }
            fx.restore();
            return true;
        });
    }

    // 8. Render loop
    const clock = new THREE.Clock();
    let lastT = 0;
    let spinVel = 0; // idle spin speed, rad/s

    // Layout: the camera's view offset draws the globe k times bigger with its centre at (cx, cy) of the stage, without a bigger canvas.
    // Home: big and to the right. Card open: centred between the list and the card.
    // Phones keep the centred view (their CSS moves the globe).
    // Layout numbers are cached (measure) so the render loop reads no layout
    const side = document.querySelector(".hero-side");
    let W = 0, H = 0, listRight = 0, panelLeft = 0;
    function measure() {
        W = container.clientWidth;
        H = container.clientHeight;
        listRight = side.offsetLeft + side.offsetWidth;
        panelLeft = panel.offsetLeft;
    }
    measure();
    const layoutObserver = new ResizeObserver(measure); // the reading view widens the panel to the left
    [container, side, panel].forEach((el) => layoutObserver.observe(el));
    function viewGoal() {
        if (W <= 720) return { k: 1, cx: 0.5, cy: 0.5 };
        if (hero.classList.contains("panel-open")) return { k: W > 1100 ? 1.56 : 1, cx: (listRight + panelLeft) / 2 / W, cy: 0.5 };
        return W > 1100 ? { k: 1.95, cx: 0.78, cy: 0.55 } : { k: 1.25, cx: (listRight + W) / 2 / W, cy: 0.5 };
    }
    const view = viewGoal();
    const inkColor = new THREE.Color(token("--ink"));
    const whiteColor = new THREE.Color(0xffffff);
    const motionPos = new THREE.Vector3();
    const motionCam = new THREE.Vector3();
    const camGoal = new THREE.Vector3();

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const dt = Math.min(t - lastT, 0.1);
        lastT = t;

        // Spin/tilt toward the selected country, or idle-spin when nothing is selected
        if (targetRot) {
            spinVel = 0;
            globeGroup.rotation.x += (targetRot.x - globeGroup.rotation.x) * EASE;
            globeGroup.rotation.y += (targetRot.y - globeGroup.rotation.y) * EASE;
            if (Math.abs(targetRot.x - globeGroup.rotation.x) + Math.abs(targetRot.y - globeGroup.rotation.y) < 0.001) targetRot = null;
        } else {
            // Holds still over a pin, while dragging, and for keyboard users (Tab focus or arrows) only;
            // :focus-visible, since a mouse click focuses the globe too
            const spinOn = !hoveredPin && !dragging && !selectedPin && !reduceMotion && !keyboardMode && zoomNow() < 1.05 && !container.matches(":focus-visible");
            spinVel += ((spinOn ? 0.09 : 0) - spinVel) * Math.min(1, dt * 4); // rad/s, eases up and down over about 1 s
            globeGroup.rotation.y += spinVel * dt;
        }

        // Zoom: ease the camera toward the front (+z) at the target distance
        if (targetCamDist !== null) {
            const goal = camFront ? camGoal.set(0, 0, targetCamDist) : camGoal.copy(camera.position).setLength(targetCamDist);
            const len = camera.position.length() + (targetCamDist - camera.position.length()) * EASE;
            camera.position.lerp(goal, EASE).setLength(len);
            if (camera.position.distanceTo(goal) < 0.2) {
                camera.position.copy(goal);
                targetCamDist = null;
            }
        }

        // Day ⇄ night crossfade for the globe, halo, light and pins
        nightMix += (targetMix - nightMix) * (reduceMotion ? 1 : 0.05);
        nightMap.mesh.material.opacity = nightMix;
        nightMap.mesh.visible = nightMix > 0.002;
        dayLit.mesh.material.opacity = 1 - nightMix;
        dayLit.mesh.visible = drawn !== null && nightMix < 0.998;
        nightLit.mesh.material.opacity = nightMix;
        nightLit.mesh.visible = drawn !== null && nightMix > 0.002;
        halo.material.uniforms.color.value.copy(palettes.day.halo).lerp(palettes.night.halo, nightMix);
        halo.material.uniforms.strength.value = 0.9 - 0.3 * nightMix;
        stars.material.opacity = 0.8 * nightMix;
        stars.visible = nightMix > 0.002;
        ambientLight.intensity = 0.7 + 0.15 * nightMix;

        const goal = viewGoal();
        for (const key in view) view[key] += (goal[key] - view[key]) * EASE;
        camera.setViewOffset(view.k * W, view.k * H, (view.k / 2 - view.cx) * W, (view.k / 2 - view.cy) * H, W, H);

        const zoom = zoomNow();
        if (!sharp && !SMALL && zoom * view.k > SHARP_ZOOM) upgradeMaps();
        motionCam.copy(camera.position).normalize();
        // Keyboard: highlight and announce the pin facing the viewer (within about 25 degrees)
        if (keyboardMode && !selectedPin) {
            let best = null;
            let bestDot = 0.9;
            pinObjects.forEach((pin) => {
                const d = pin.getWorldPosition(motionPos).normalize().dot(motionCam);
                if (d > bestDot) {
                    bestDot = d;
                    best = pin;
                }
            });
            if (best !== facingPin) {
                facingPin = best;
                hoveredPin = best;
                globeStatus.textContent = best ? `Facing ${best.userData.festival.label}. Press Enter to open it.` : "No festival facing you. Keep turning.";
                if (best) tooltip.textContent = best.userData.festival.label;
                tooltip.hidden = !best;
            }
            if (facingPin) {
                const v = facingPin.getWorldPosition(motionPos).project(camera);
                // The globe fills the stage here: its only CSS shift is the phone's, and that needs an open card
                tooltip.style.left = `${((v.x + 1) / 2) * W}px`;
                tooltip.style.top = `${((1 - v.y) / 2) * H}px`;
            }
        }

        // Selected pin glows and pulses; the others dim to 30% and hold still.
        // A chosen region dims the festivals outside it the same way.
        const matches = (f) => selectedRegion === null || regionOf[f.id] === selectedRegion;
        const pinZoom = 1 / Math.max(zoom, 1); // pins keep their on-screen size at every zoom
        pinObjects.forEach((pin, i) => {
            const { ring, dayColor, nightColor, festival } = pin.userData;
            const sel = pin === selectedPin;
            const hov = pin === hoveredPin;
            const dimmed = selectedPin ? !sel : !matches(festival);
            pin.userData.dimmed = dimmed; // the labels read it
            const swing = festival.months.includes(THIS_MONTH) ? 0.3 : 0.15; // festivals on now pulse more
            const pulse = reduceMotion || dimmed ? 1 : 1 + swing * Math.sin(t * 2.5 + i);
            pin.material.color.copy(dayColor).lerp(nightColor, nightMix);
            // The selected pin's ring contrasts with its highlighted country (ink by day, white at night)
            if (sel) ring.material.color.copy(inkColor).lerp(whiteColor, nightMix);
            else ring.material.color.copy(pin.material.color);
            pin.material.opacity = dimmed ? 0.3 : 1;
            if (pin.material.emissive) pin.material.emissive.copy(pin.material.color).multiplyScalar(0.55); // lantern glow
            pin.children.forEach((child) => {
                if (child.userData.tint) child.material.color.copy(pin.material.color);
                child.material.opacity = pin.material.opacity;
            });
            ring.material.opacity = dimmed ? 0.2 : 0.8;
            // Idle motion: still for dimmed pins, pins on the far side of the globe and reduced motion
            const facing = pin.getWorldPosition(motionPos).normalize().dot(motionCam);
            const live = !reduceMotion && !dimmed && facing > 0.2;
            animatePin(pin, pin.userData.style, t, live ? (sel || hov || swing > 0.2 ? 2 : 1) : 0, i * 2.4);
            // Turn the pennant around its pole to face the camera. Seen straight down the pole
            // there is no better angle, so it keeps the last one.
            if (pin.userData.style === "flag" && facing > 0) {
                const c = pin.worldToLocal(motionPos.copy(camera.position));
                if (c.x * c.x + c.y * c.y > 1e-4 * c.lengthSq()) pin.userData.pennant.rotation.z = Math.atan2(-c.x, c.y);
            }
            // Zoomed in, pins shrink in the world as 1/zoom so they stay the same size on screen, and the hit area follows
            // Depth: pins facing the viewer read 1.15x, edge and far-side pins 0.7x (the selected pin keeps its own size)
            const depth = sel ? 1 : 0.7 + 0.45 * Math.max(0, facing);
            const size = PIN_SCALE * pinZoom * depth;
            pin.scale.setScalar((hov && !sel ? 1.4 : 1) * size);
            pin.userData.hitArea.scale.setScalar(1.15 / depth); // edge pins keep the front pin's click target
            ring.scale.setScalar((sel ? 1.1 * pulse : hov ? 1.5 : pulse) * Math.pow(PIN_SCALE * depth, 1.5) * pinZoom);
        });
        updateLabels(zoom);
        updateZoomControls(zoom);
        if (burstPending && !targetRot) {
            const u = selectedPin && selectedPin.userData;
            if (u && u.festival.id === burstPending) startBurst(burstPending, selectedPin);
            burstPending = null;
        }
        if (fxParts.length) drawBurst(dt);
        else if (fxCanvas.width) fxCanvas.width = 0; // done: clear and free the canvas

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Keep the whole globe in view on narrow (portrait) screens
    function fitCamera() {
        measure();
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        const z = zoomNow(); // a resize keeps the visitor's zoom
        const was = homeDist;
        homeDist = Math.max(220, 181 / camera.aspect);
        controls.minDistance = homeDist / MAX_ZOOM;
        controls.maxDistance = homeDist;
        camera.position.setLength(homeDist / z);
        if (targetCamDist !== null) targetCamDist *= homeDist / was;
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    fitCamera();
    window.addEventListener("resize", fitCamera);

    // Shared link such as HCI.html#diwali
    const start = parseAddress();
    if (festivalById[start.id]) openFromAddress(start.id, start.about);
});
