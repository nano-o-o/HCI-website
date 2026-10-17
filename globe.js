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
// Pins are one per country: a festival joins the pin of its first `countries` entry (a second festival there adds a count badge,
// a colour cycle and a festival list in the panel), and a new country's pin sits at the first festival's lat/lon.
// `color` names the token pair (--festival-<color> by day, --glow-<color> at night); `mood` is the theme the festival opens in;
// `months` (0 = January) drive the "On now" label and the year ring.
const FESTIVALS = [
    { id: "diwali", label: "Diwali", lat: 20.5937, lon: 78.9629, color: "diwali", mood: "night", months: [9, 10], countries: ["India"] },
    { id: "lunar-new-year", label: "Lunar New Year", lat: 35.8617, lon: 104.1954, color: "lunar", mood: "night", months: [0, 1], countries: ["China"] },
    { id: "lantern-festival", label: "Lantern Festival", lat: 35.8617, lon: 104.1954, color: "lantern", mood: "night", months: [1, 2], countries: ["China"] },
    { id: "eid", label: "Eid al-Fitr", lat: 23.8859, lon: 45.0792, color: "eid", mood: "day", months: EID_MONTHS, countries: ["Saudi Arabia"], related: MUSLIM_MAJORITY },
    { id: "rio-carnival", label: "Rio Carnival", lat: -14.235, lon: -51.9253, color: "rio", mood: "night", months: [1, 2], countries: ["Brazil"] },
    { id: "oktoberfest", label: "Oktoberfest", lat: 48.1351, lon: 11.5820, color: "oktoberfest", mood: "day", months: [8, 9], countries: ["Germany"] },
    { id: "holi", label: "Holi", lat: 27.4924, lon: 77.6737, color: "holi", mood: "day", months: [2], countries: ["India", "Nepal"] },
    { id: "songkran", label: "Songkran", lat: 15.87, lon: 100.9925, color: "songkran", mood: "day", months: [3], countries: ["Thailand"], related: ["Laos", "Myanmar", "Cambodia"] },
    { id: "loy-krathong", label: "Loy Krathong", lat: 17.0078, lon: 99.823, color: "loy", mood: "night", months: [10], countries: ["Thailand"] },
    { id: "dia-de-muertos", label: "Día de Muertos", lat: 23.6345, lon: -102.5528, color: "muertos", mood: "night", months: [10], countries: ["Mexico"] },
    // Las Fallas comes before La Tomatina so the Spain pin sits at Valencia (Buñol is 40 km away); Mardi Gras sets the USA pin at the country's centre
    { id: "las-fallas", label: "Las Fallas", lat: 39.4699, lon: -0.3763, color: "fallas", mood: "night", months: [2], countries: ["Spain"] },
    { id: "la-tomatina", label: "La Tomatina", lat: 39.4189, lon: -0.7906, color: "tomatina", mood: "day", months: [7], countries: ["Spain"] },
    { id: "venice-carnival", label: "Venice Carnival", lat: 45.4408, lon: 12.3155, color: "venice", mood: "day", months: [1, 2], countries: ["Italy"] },
    { id: "bastille-day", label: "Bastille Day", lat: 48.8566, lon: 2.3522, color: "bastille", mood: "day", months: [6], countries: ["France"] },
    { id: "mardi-gras", label: "Mardi Gras", lat: 39.8283, lon: -98.5795, color: "mardigras", mood: "day", months: [1, 2], countries: ["United States of America"] },
    { id: "coachella", label: "Coachella", lat: 33.6803, lon: -116.2379, color: "coachella", mood: "night", months: [3], countries: ["United States of America"] },
    { id: "vina-del-mar", label: "Viña del Mar Festival", lat: -33.0245, lon: -71.5518, color: "vina", mood: "night", months: [1], countries: ["Chile"] },
    { id: "guelaguetza", label: "Guelaguetza", lat: 17.0732, lon: -96.7266, color: "guelaguetza", mood: "day", months: [6], countries: ["Mexico"] },
    { id: "iemanja", label: "Festa de Iemanjá", lat: -13.0108, lon: -38.4917, color: "iemanja", mood: "day", months: [1], countries: ["Brazil"], related: ["Uruguay"] },
    // Gnaoua comes before Fez and carries Morocco's centre, so the pin sits between Essaouira and Fez (about 500 km apart)
    { id: "gnaoua", label: "Gnaoua World Music Festival", lat: 31.7917, lon: -7.0926, color: "gnaoua", mood: "night", months: [5], countries: ["Morocco"] },
    { id: "fez-sacred-music", label: "Fez Festival of World Sacred Music", lat: 34.0331, lon: -5.0003, color: "fez", mood: "night", months: [4, 5], countries: ["Morocco"] },
    { id: "cape-town-carnival", label: "Cape Town Minstrel Carnival", lat: -33.9249, lon: 18.4241, color: "cape", mood: "day", months: [0], countries: ["South Africa"] },
    { id: "dubai-shopping-festival", label: "Dubai Shopping Festival", lat: 25.2048, lon: 55.2708, color: "dsf", mood: "night", months: [11, 0], countries: ["United Arab Emirates"] },
    // Nowruz lights the other states on UNESCO's joint inscription
    { id: "nowruz", label: "Nowruz", lat: 32.4279, lon: 53.6880, color: "nowruz", mood: "day", months: [2], countries: ["Iran"],
        related: ["Afghanistan", "Azerbaijan", "India", "Iraq", "Kazakhstan", "Kyrgyzstan", "Pakistan", "Tajikistan", "Turkey", "Turkmenistan", "Uzbekistan"] },
    // Sapporo comes before Awa Odori and carries Japan's centre, so the pin sits between Sapporo and Tokushima (about 1,300 km apart)
    { id: "sapporo-snow-festival", label: "Sapporo Snow Festival", lat: 36.2048, lon: 138.2529, color: "sapporo", mood: "day", months: [1], countries: ["Japan"] },
    { id: "awa-odori", label: "Awa Odori", lat: 34.0703, lon: 134.5548, color: "awa", mood: "night", months: [7], countries: ["Japan"] },
    { id: "bon-om-touk", label: "Bon Om Touk", lat: 11.5564, lon: 104.9282, color: "bon", mood: "day", months: [10], countries: ["Cambodia"] },
    { id: "tet", label: "Tết", lat: 14.0583, lon: 108.2772, color: "tet", mood: "day", months: [0, 1], countries: ["Vietnam"] },
    { id: "thimphu-tshechu", label: "Thimphu Tshechu", lat: 27.4728, lon: 89.639, color: "tshechu", mood: "day", months: [8, 9], countries: ["Bhutan"] },
    { id: "tihar", label: "Tihar", lat: 28.3949, lon: 84.124, color: "tihar", mood: "night", months: [9, 10], countries: ["Nepal"] },
    { id: "durga-puja", label: "Durga Puja", lat: 22.5726, lon: 88.3639, color: "durga", mood: "night", months: [8, 9], countries: ["India"], related: ["Bangladesh"] },
    // Vivid comes first and carries Australia's centre, so the pin sits between Sydney, Melbourne, Adelaide and Canberra
    { id: "vivid-sydney", label: "Vivid Sydney", lat: -25.2744, lon: 133.7751, color: "vivid", mood: "night", months: [4, 5], countries: ["Australia"] },
    { id: "melbourne-cup", label: "Melbourne Cup", lat: -37.79, lon: 144.912, color: "cup", mood: "day", months: [10], countries: ["Australia"] },
    { id: "adelaide-fringe", label: "Adelaide Fringe", lat: -34.9285, lon: 138.6007, color: "fringe", mood: "night", months: [1, 2], countries: ["Australia"] },
    { id: "anzac-day", label: "Anzac Day", lat: -35.2809, lon: 149.13, color: "anzac", mood: "day", months: [3], countries: ["Australia", "New Zealand"] }
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
    // elsewhere the maps are rebuilt at 4096 the first time the visitor zooms past that.
    const SMALL = window.matchMedia("(pointer: coarse), (max-width: 720px)").matches;
    const MAX_ZOOM = SMALL ? 1.3 : 2.5;
    const SHARP_ZOOM = 1.28;
    const LABEL_ZOOM = SMALL ? 1.2 : 1.4; // country labels fade in above this

    // 1. Scene setup
    const scene = new THREE.Scene();
    // Near plane is 10, not 0.1: nothing comes that close, and the better depth precision stops the day and night maps flickering through each other
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 10, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
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

    // 4. Globe: a day map and a night map, crossfaded by fading the night sphere in and out
    const globeRadius = 60;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    function makeMap(mood, radius) {
        const canvas = document.createElement("canvas");
        canvas.width = 2048;
        canvas.height = 1024;
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
    function traceRing(ctx, ring, toX, toY) {
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
        [-360, 0, 360].forEach((shift) => {
            pts.forEach(([lon, lat], i) => (i ? ctx.lineTo(toX(lon + shift), toY(lat)) : ctx.moveTo(toX(lon + shift), toY(lat))));
            ctx.closePath();
        });
    }

    function tracePath(map, features) {
        const { ctx, canvas } = map;
        const toX = (lon) => ((lon + 180) / 360) * canvas.width;
        const toY = (lat) => ((90 - lat) / 180) * canvas.height;
        ctx.beginPath();
        features.forEach((f) => {
            if (!f || !f.geometry) return;
            const polygons = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
            polygons.forEach((rings) => rings.forEach((ring) => traceRing(ctx, ring, toX, toY)));
        });
    }

    // Draws ocean + land, and lights up the selected festival's countries in its pin colour
    function drawMap(map, festival) {
        const { ctx, canvas } = map;
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

        tracePath(map, land);
        ctx.fillStyle = pal.land;
        ctx.fill("evenodd");

        // Thin country borders, then the coastline on top
        tracePath(map, allCountries);
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = px;
        ctx.stroke();
        ctx.globalAlpha = 1;
        tracePath(map, land);
        ctx.lineWidth = 2 * px;
        ctx.stroke();

        if (festival) {
            const night = map.mood === "night";
            // `neutral` is a country's festival list: lit in the accent, not a festival's colour
            const colour = token(festival.neutral ? (night ? "--gold" : "--accent-text") : night ? `--glow-${festival.color}` : `--festival-${festival.color}`);
            if (festival.related) {
                tracePath(map, festival.related.map((n) => countryByName[n]));
                ctx.globalAlpha = 0.35;
                ctx.fillStyle = colour;
                ctx.fill("evenodd");
            }
            tracePath(map, festival.countries.map((n) => countryByName[n]));
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = colour;
            ctx.fill("evenodd");
            ctx.globalAlpha = 1;
            ctx.strokeStyle = map.mood === "night" ? "#ffffff" : token("--ink");
            ctx.lineWidth = 3 * px;
            ctx.stroke();
        }
        map.texture.needsUpdate = true;
    }

    let drawn = null;
    function drawMaps(festival) {
        drawn = festival;
        drawMap(dayMap, festival);
        drawMap(nightMap, festival);
    }
    drawMaps(null);

    // Zooming in on a desktop: double the map's resolution (about 78 MB more of canvas and texture memory), once
    let sharp = false;
    function upgradeMaps() {
        sharp = true;
        [dayMap, nightMap].forEach((m) => {
            m.canvas.width = 4096;
            m.canvas.height = 2048;
            m.texture.dispose();
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

    // Pushpin: a glossy ball. Flag: a pennant fixed to the pole, so it turns with the globe
    // (seen straight down the pole, as on the selected pin, it narrows to a line). Lantern: a glowing paper lantern with dark caps.
    // Marker: a map-style teardrop standing on its tip, no needle. Candle: a candle in the festival colour with a gold flame,
    // no needle. Firework: a small ball bursting into rays.
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

    // One pin per country: festivals group by their first country, and the pin sits at the first festival's spot there
    const festivalsByCountry = new Map();
    FESTIVALS.forEach((f) => festivalsByCountry.set(f.countries[0], [...(festivalsByCountry.get(f.countries[0]) || []), f]));

    // Count badge for a multi-festival pin: a number on a dark disc, drawn once per count; a sprite, so it faces the viewer in every pin style
    const badgeTextures = {};
    function badgeSprite(count) {
        if (!badgeTextures[count]) {
            const c = document.createElement("canvas");
            c.width = c.height = 64;
            const g = c.getContext("2d");
            g.fillStyle = token("--ink");
            g.beginPath();
            g.arc(32, 32, 29, 0, Math.PI * 2);
            g.fill();
            g.lineWidth = 4;
            g.strokeStyle = "#fff";
            g.stroke();
            g.fillStyle = "#fff";
            g.font = "bold 36px sans-serif";
            g.textAlign = "center";
            g.textBaseline = "middle";
            g.fillText(count, 32, 34);
            badgeTextures[count] = new THREE.CanvasTexture(c);
        }
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: badgeTextures[count], transparent: true }));
        sprite.scale.set(6, 6, 1);
        sprite.position.z = -15; // beyond the tallest head, outward from the surface
        sprite.raycast = () => {}; // not a click target; the pin's hit sphere covers it
        return sprite;
    }

    // Builds one pin at `pos` (a world-space point on the surface): a country's pin, or one festival's fanned pin
    function buildPin(festivals, country, festival, pos) {
        const palette = festivals.map((f) => ({ day: new THREE.Color(token(`--festival-${f.color}`)), night: new THREE.Color(token(`--glow-${f.color}`)) }));
        const dayColor = palette[0].day.clone(); // the colours shown right now, set each frame
        const nightColor = palette[0].night.clone();

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
            new THREE.RingGeometry(3.2, 4.5, 24),
            new THREE.MeshBasicMaterial({ color: dayColor.clone(), side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
        );
        ringMesh.position.copy(pos);
        ringMesh.lookAt(new THREE.Vector3(0, 0, 0));

        pinMesh.userData = { festival, festivals, country, lat: festival.lat, palette, cycle: 0, ring: ringMesh, dayColor, nightColor, mats, extras,
            flame, rays, pennant, basePos: pos.clone(), baseQuat: pinMesh.quaternion.clone(), out: pos.clone().normalize(), rest: true };
        if (festivals.length > 1) pinMesh.add(badgeSprite(festivals.length));
        globeGroup.add(pinMesh);
        globeGroup.add(ringMesh);
        return pinMesh;
    }

    // Fan-out: zoomed past FAN_ON, a multi-festival pin splits into one smaller pin per festival, in a ring around the country's spot
    // (no real coordinates: Diwali has no single place). It collapses again below FAN_OFF. The ring radius follows the pins' world size,
    // so neighbours stay about FAN_GAP apart (3 pin widths at scale 1) at every zoom. Phones stop at 1.3x, so they never fan.
    const FAN_ON = 1.8;
    const FAN_OFF = 1.6;
    const FAN_SCALE = 0.7;
    const FAN_GAP = 15;
    const FAN_TIME = 0.3; // seconds to ease apart
    const fanPins = [];
    festivalsByCountry.forEach((festivals, country) => {
        const festival = festivals[0]; // `userData.festival` becomes the open festival while a card is open
        const pin = buildPin(festivals, country, festival, latLongToVector3(festival.lat, festival.lon, globeRadius + 0.3));
        pinObjects.push(pin);
        festivals.forEach((f) => { pinById[f.id] = pin; });
        if (festivals.length < 2) return;
        const ud = pin.userData;
        ud.east = new THREE.Vector3(0, 1, 0).cross(ud.out).normalize(); // screen-right when the pin faces the viewer
        ud.north = ud.out.clone().cross(ud.east);
        ud.fan = 0;  // 0 collapsed to 1 fanned, moves linearly over FAN_TIME
        ud.fanE = 0; // the same, eased
        const n = festivals.length;
        const start = n === 2 ? 0 : n === 4 ? Math.PI / 4 : Math.PI / 2; // side by side, a square, or a triangle pointing up
        ud.fanPins = festivals.map((f, k) => {
            const p = buildPin([f], country, f, ud.basePos);
            p.userData.fanOf = pin;
            p.userData.angle = start + (Math.PI * 2 * k) / n;
            p.visible = p.userData.ring.visible = false;
            fanPins.push(p);
            return p;
        });
    });
    const allPins = [...pinObjects, ...fanPins]; // parents first: a parent's fan value is settled before its fanned pins read it
    const isPin = (obj) => !!(obj && obj.userData.festivals);

    // Sets a fanned pin's place on the ring for eased fan value `e` and the current pin world scale
    const fanP = new THREE.Vector3();
    const fanM = new THREE.Matrix4();
    const fanZero = new THREE.Vector3();
    const fanUp = new THREE.Vector3(0, 1, 0);
    function placeFan(pin, e, pinZoom) {
        const ud = pin.userData;
        const par = ud.fanOf.userData;
        const r = (e * FAN_GAP * FAN_SCALE * pinZoom) / (2 * Math.sin(Math.PI / par.fanPins.length));
        if (r === ud.fanR) return;
        ud.fanR = r;
        fanP.copy(par.out).multiplyScalar(globeRadius + 0.3).addScaledVector(par.east, Math.cos(ud.angle) * r).addScaledVector(par.north, Math.sin(ud.angle) * r)
            .setLength(globeRadius + 0.3);
        ud.basePos.copy(fanP);
        ud.baseQuat.setFromRotationMatrix(fanM.lookAt(fanZero, fanP, fanUp)); // +z toward the globe's centre, like every pin
        ud.ring.position.copy(fanP);
        ud.ring.quaternion.copy(ud.baseQuat);
        ud.rest = false; // so animatePin re-poses it from the new base
    }

    const pinLabel = (pin) => pin.userData.festivals.length > 1 ? `${pin.userData.country}: ${pin.userData.festivals.map((f) => f.label).join(", ")}` : pin.userData.festival.label;

    // Idle pin motion. Each function poses its style's parts for strength `a` (0 = rest pose, 1 = idle, 2 = hovered, selected or on now)
    // and phase `ph`; the click target moves less than 1 unit. The pin's own rotation and position are offsets from their stored rest values.
    const tiltE = new THREE.Euler();
    const tiltQ = new THREE.Quaternion();
    const tilt = (pin, x, y) => pin.quaternion.copy(pin.userData.baseQuat).multiply(tiltQ.setFromEuler(tiltE.set(x, y, 0)));
    const PIN_MOTION = {
        push: (pin, t, a, ph) => tilt(pin, 0.05 * a * Math.sin(t * 1.7 + ph), 0.05 * a * Math.sin(t * 1.3 + ph * 1.3)),
        lantern: (pin, t, a, ph) => {
            tilt(pin, 0.08 * a * Math.sin(t * 1.2 + ph), 0.05 * a * Math.sin(t * 0.9 + ph * 1.3));
            if (pin.material.emissive) pin.material.emissive.multiplyScalar(1 + 0.2 * a * Math.sin(t * 2.1 + ph)); // after the loop sets the base glow
        },
        flag: (pin, t, a, ph) => {
            const p = pin.userData.pennant.geometry.attributes.position;
            p.setY(1, 0.4 * a * Math.sin(t * 3 + ph - 0.8)); // the pole's own vertex (0) stays put
            p.setY(2, 1.0 * a * Math.sin(t * 3 + ph));
            p.setZ(2, -NEEDLE + 1.4 + 0.4 * a * Math.sin(t * 4 + ph + 1));
            p.needsUpdate = true;
        },
        candle: (pin, t, a, ph) => {
            const { flame } = pin.userData;
            const n = 0.5 * Math.sin(t * 7 + ph) + 0.3 * Math.sin(t * 11.3 + ph * 1.7) + 0.2 * Math.sin(t * 17.9 + ph * 2.3); // three unrelated frequencies: irregular
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
        allPins.forEach((pin) => {
            const { mats, extras } = pin.userData;
            pin.userData.rest = true; // so a dimmed pin gets its rest pose
            PIN_STYLES.forEach((s) => PIN_MOTION[s](pin, 0, 0, 0)); // no stale pose from the previous style
            pin.quaternion.copy(pin.userData.baseQuat);
            pin.position.copy(pin.userData.basePos);
            pin.userData.style = style;
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

    // 5b. Year ring: a calendar around the globe; hovering a month dims the festivals outside it.
    // It always faces the camera and only shows on the home view when the stage is wide enough.
    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const RING_IN = globeRadius * 1.14;
    const RING_OUT = globeRadius * 1.34;
    const ringCanvas = document.createElement("canvas");
    ringCanvas.width = ringCanvas.height = 1024;
    const ringTexture = new THREE.CanvasTexture(ringCanvas);
    const yearRing = new THREE.Mesh(
        new THREE.PlaneGeometry(RING_OUT * 2, RING_OUT * 2),
        new THREE.MeshBasicMaterial({ map: ringTexture, transparent: true, depthWrite: false, opacity: 0 })
    );
    yearRing.visible = false;
    scene.add(yearRing);
    let ringMix = 0;
    let hoveredMonth = null;  // month under the pointer on the ring (previews it)
    let selectedMonth = null; // month clicked on the ring (stays until cleared)

    function drawRing() {
        const ctx = ringCanvas.getContext("2d");
        const k = 512 / RING_OUT; // canvas px per world unit
        const seg = (Math.PI * 2) / 12;
        ctx.clearRect(0, 0, 1024, 1024);
        ctx.save();
        ctx.translate(512, 512);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let m = 0; m < 12; m++) {
            const start = m * seg - Math.PI / 2; // January at the top, running clockwise
            const mid = start + seg / 2;
            const picked = m === selectedMonth;
            const active = m === hoveredMonth || picked;
            const now = m === THIS_MONTH;
            ctx.beginPath();
            ctx.arc(0, 0, globeRadius * 1.17 * k, start + 0.025, start + seg - 0.025);
            ctx.strokeStyle = picked ? token("--accent-text") : active ? token("--text") : token("--chip-border");
            ctx.lineWidth = active ? 7 : 4;
            ctx.stroke();
            ctx.fillStyle = active || now ? token("--accent-text") : token("--text-muted");
            ctx.font = `${active || now ? 700 : 400} 24px "Alegreya Sans", sans-serif`;
            const lr = globeRadius * 1.255 * k;
            ctx.fillText(MONTH_NAMES[m].slice(0, 3), Math.cos(mid) * lr, Math.sin(mid) * lr);
            const here = FESTIVALS.filter((f) => f.months.includes(m));
            here.forEach((f, j) => {
                const a = mid + (j - (here.length - 1) / 2) * 0.09;
                const r = globeRadius * 1.17 * k; // dots sit on the month arc
                ctx.beginPath();
                ctx.arc(Math.cos(a) * r, Math.sin(a) * r, 8, 0, Math.PI * 2);
                ctx.fillStyle = token(`--festival-${f.color}`);
                ctx.fill();
            });
        }
        ctx.restore();
        ringTexture.needsUpdate = true;
    }
    drawRing();
    document.fonts.ready.then(() => { if (!selectedPin) drawRing(); });

    // Month (0-11) under a world-space point on the ring, or null off the band
    function monthAt(point) {
        const p = yearRing.worldToLocal(point.clone());
        const r = Math.hypot(p.x, p.y);
        if (r < RING_IN || r > RING_OUT) return null;
        const angle = (Math.atan2(p.x, p.y) + Math.PI * 2) % (Math.PI * 2); // 0 at the top, clockwise
        return Math.floor(angle / (Math.PI / 6));
    }

    // 6. Interaction state
    const hero = document.getElementById("globe-section");
    const panel = document.getElementById("info-panel");
    const countryList = document.getElementById("country-list");
    const tooltip = document.getElementById("globe-tooltip");
    const regionButtons = document.querySelectorAll(".region-btn");
    const heroTitle = document.getElementById("hero-title");
    const homeTitle = [...heroTitle.childNodes]; // restored when the card closes
    const globeStatus = document.getElementById("globe-status");
    let keyboardMode = false; // arrow keys are turning the globe; the pin facing the viewer is highlighted
    let facingPin = null;
    let listMode = false;    // the panel shows a country's festival list, not a card
    let navFrom = null;      // country whose list the open card was chosen from (its back chevron returns there)
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
        pin.userData.festival = festival;
        const entry = fromHistory ? history.state : nextEntry(targetId, history.state);
        listMode = false;
        navFrom = (entry && entry.from) || null;
        countryList.hidden = true;

        setSelectedMonth(null);
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
        name.textContent = festival.label;
        heroTitle.replaceChildren(`A ${festival.mood} of `, name);

        document.querySelectorAll(".festival-card").forEach((card) => {
            card.hidden = card.id !== `card-${targetId}`; // "card-" prefix: a #festival link must not scroll to the card
        });
        regionButtons.forEach((btn) => {
            btn.setAttribute("aria-pressed", btn.dataset.target === targetId);
        });

        if (!keepReading) setReading(false);
        // Opening from home adds one history entry (so Back closes the card); switching festivals replaces it.
        // From a reading view, first go back off its /about entry (popstate then replaces the card entry beneath it),
        // so Close and Back always return home, not to the previous festival.
        if (!fromHistory) commitEntry(entry, `#${targetId}`);

        if (!panel.contains(document.activeElement)) lastTrigger = document.activeElement;
        panel.classList.add("is-open");
        hero.classList.add("panel-open");
        panel.setAttribute("aria-hidden", "false");
        // Land on the festival title so screen readers announce it, not the close button
        const title = document.querySelector(`#card-${targetId} h2`);
        if (title) title.focus({ preventScroll: true });
    }

    // History entries: { festival, depth, from? } for a card (depth = entries back to home, from = the country list
    // it was chosen from), the same plus about:true for a reading view (depth one more), { list: country } for a list
    function nextEntry(id, prev) {
        const c = festivalById[id].countries[0];
        if (!prev) return { festival: id, depth: 1 };
        if (prev.list) return { festival: id, depth: 2, from: prev.list === c ? c : undefined };
        const depth = (prev.depth || 1) - (prev.about ? 1 : 0);
        return { festival: id, depth, from: prev.from === c ? c : undefined };
    }

    // Opening from home or a list adds one entry; switching replaces it. From a reading view, first go back off its
    // /about entry (popstate then replaces the card entry beneath it), so Close and Back never land on the previous festival.
    function commitEntry(entry, url) {
        const prev = history.state;
        if (pendingSwitch) pendingSwitch = { entry, url }; // a second pick before the step back lands
        else if (prev && prev.about) {
            pendingSwitch = { entry, url };
            history.back();
        } else if (prev && (prev.festival || prev.list) && !(prev.list && entry.festival)) history.replaceState(entry, "", url);
        else history.pushState(entry, "", url);
    }

    // Close button and Escape: step back off the current history entry, which closes the panel via popstate.
    // A card chosen from a list returns home in one go (past the list).
    function closeFestival(e) {
        if (e) e.preventDefault();
        const s = history.state;
        if (s && s.festival && !s.about && s.depth > 1) {
            history.go(-s.depth);
        } else if (s && (s.festival || s.list)) {
            history.back();
        } else {
            history.replaceState(null, "", location.pathname + location.search);
            resetToHome();
        }
    }

    // Reading view (#<id>/about): the panel widens to show the open festival's long read
    const closeBtn = document.getElementById("back-home-btn");
    const homeBtn = document.getElementById("home-btn");
    const BACK_ICON = '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'; // a ">" chevron, on purpose
    let readingTimer = 0;
    // The corner buttons: a chevron steps back one screen (reading view to card, card to its list), a cross closes
    function updateNav() {
        const reading = panel.classList.contains("is-reading");
        closeBtn.innerHTML = !listMode && (reading || navFrom) ? BACK_ICON : "&times;";
        closeBtn.setAttribute("aria-label", listMode ? "Close festival list" : reading ? "Back to festival summary" : navFrom ? `Back to festivals in ${navFrom}` : "Close festival details");
        homeBtn.hidden = listMode || !navFrom; // a second cross, to leave the list's festivals for the globe
    }
    // `animate` is true for in-page changes within one open festival; opening on /about stays instant
    // Scroll reveals: long-read blocks below the fold when it opens fade and rise in the first time they scroll into view
    const revealer = reduceMotion ? null : new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.remove("reveal");
        revealer.unobserve(e.target);
    }), { root: panel, rootMargin: "0px 0px -40px 0px" });

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
        else if (history.state && history.state.list) showCountryList(pinByCountry[history.state.list], true);
        else if (selectedPin) resetToHome();
    });

    function resetToHome() {
        const wasOpen = selectedPin !== null;
        selectedPin = null;
        listMode = false;
        navFrom = null;
        drawMaps(null);
        setMood("day");
        heroTitle.replaceChildren(...homeTitle);
        drawRing(); // back in day colours
        targetRot = { x: 0, y: globeGroup.rotation.y };
        targetCamDist = homeDist;
        camFront = true;

        clearTimeout(readingTimer);
        panel.classList.remove("is-open", "is-reading", "reading-anim", "reading-out");
        hero.classList.remove("panel-open");
        panel.setAttribute("aria-hidden", "true");
        regionButtons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (wasOpen && lastTrigger && lastTrigger !== document.body && document.contains(lastTrigger)) {
            lastTrigger.focus({ preventScroll: true });
        }
        lastTrigger = null;
    }

    // 7. Picking: only count pins on the visible side (the earth blocks the rest)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Returns the nearest hit (pin, earth or year ring) under the pointer, or null over empty space
    function hitAt(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        // A fanned country's own pin is out of play, and its fanned pins in
        const targets = [dayMap.mesh, ...pinObjects.filter((p) => !(p.userData.fanE > 0.5)), ...fanPins.filter((p) => p.userData.fanOf.userData.fanE > 0.5)];
        if (yearRing.visible) targets.push(yearRing);
        const hit = raycaster.intersectObjects(targets, true)[0] || null;
        // A pin's needle, cap or pennant counts as the pin
        if (hit && isPin(hit.object.parent)) hit.object = hit.object.parent;
        return hit;
    }

    function setHoveredMonth(month) {
        if (month === hoveredMonth) return;
        hoveredMonth = month;
        drawRing();
    }

    function monthSummary(month) {
        const names = FESTIVALS.filter((f) => f.months.includes(month)).map((f) => f.label);
        return `${MONTH_NAMES[month]}: ${names.length ? names.join(", ") : "no festivals here yet"}`;
    }

    function setSelectedMonth(month) {
        if (month === selectedMonth) return;
        selectedMonth = month;
        drawRing();
    }

    // Region filter: built on the list's own region labels; dims the festivals (list items and pins) outside the chosen region
    const regionOf = {};
    regionButtons.forEach((btn) => {
        regionOf[btn.dataset.target] = btn.querySelector(".fl-meta").textContent;
    });
    const regionToggle = document.querySelector(".region-toggle");
    const regionFilter = document.getElementById("region-filter");
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

    function setRegion(region) {
        selectedRegion = region;
        regionToggle.textContent = `Region: ${region || "All"}`;
        regionFilter.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.textContent === (region || "All")));
        document.querySelectorAll(".festival-list li").forEach((li) => {
            li.classList.toggle("is-dimmed", region !== null && regionOf[li.firstElementChild.dataset.target] !== region);
        });
    }

    regionFilter.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        setRegion(b.textContent === "All" ? null : b.textContent);
        regionFilter.hidePopover();
        regionToggle.focus();
        // Dimming is visual only, so tell screen readers which festivals match
        const names = FESTIVALS.filter((f) => regionOf[f.id] === selectedRegion).map((f) => f.label);
        globeStatus.textContent = selectedRegion ? `${selectedRegion}: ${names.join(", ")}` : "Showing all festivals";
    });

    // Its position is set only when it opens, so close it on resize instead of leaving it misplaced
    window.addEventListener("resize", () => {
        if (regionFilter.matches(":popover-open")) regionFilter.hidePopover();
    });

    // The popover lives in the top layer, so line it up under the toggle's right edge
    regionFilter.addEventListener("beforetoggle", (e) => {
        if (e.newState !== "open") return;
        const r = regionToggle.getBoundingClientRect();
        regionFilter.style.top = `${r.bottom + 6}px`;
        regionFilter.style.right = `${document.documentElement.clientWidth - r.right}px`;
    });

    container.addEventListener("pointerleave", () => {
        isHovering = false;
        hoveredPin = null;
        setHoveredMonth(null);
        tooltip.hidden = true;
        container.style.cursor = "";
    });

    container.addEventListener("pointermove", (event) => {
        const hit = hitAt(event);
        const obj = hit ? hit.object : null;
        const month = obj === yearRing ? monthAt(hit.point) : null;
        keyboardMode = false;
        facingPin = null;
        isHovering = obj !== null && obj !== yearRing; // pause over the globe only; it keeps spinning while you use the ring
        hoveredPin = obj && obj !== dayMap.mesh && obj !== yearRing ? obj : null;
        setHoveredMonth(month);
        container.style.cursor = hoveredPin || month !== null ? "pointer" : isHovering ? "" : "default"; // "" is the stylesheet's grab hand
        let label = null;
        if (hoveredPin) {
            label = pinLabel(hoveredPin);
        } else if (month !== null) {
            label = monthSummary(month);
        }
        if (label) {
            const heroRect = hero.getBoundingClientRect(); // the tooltip lives in the stage, which the globe may be shifted within
            tooltip.textContent = label;
            tooltip.style.left = `${event.clientX - heroRect.left}px`;
            tooltip.style.top = `${event.clientY - heroRect.top}px`;
            tooltip.hidden = false;
        } else {
            tooltip.hidden = true;
        }
    });

    // OrbitControls cancels the browser's click-to-focus (and the canvas can't take focus), so focus the globe here.
    // focusVisible: false shows the focus ring for Tab focus only. Blur first: re-focusing a globe that was
    // already Tab-focused would keep its keyboard ring and keep the spin paused.
    // Dragging should start only on the globe or a pin. Elsewhere the press is stopped before it reaches OrbitControls
    // (on the canvas inside), so clicks on the year ring and empty space still work but don't turn the globe.
    container.addEventListener("pointerdown", (event) => {
        container.blur();
        container.focus({ preventScroll: true, focusVisible: false });
        const hit = hitAt(event);
        if (!hit || hit.object === yearRing) event.stopPropagation();
    }, true);

    container.addEventListener("click", (event) => {
        const hit = hitAt(event);
        if (hit && isPin(hit.object)) openPin(hit.object);
        else if (hit && hit.object === yearRing) {
            const month = monthAt(hit.point);
            if (month !== null) setSelectedMonth(month === selectedMonth ? null : month);
        } else if (!hit) setSelectedMonth(null); // empty space clears the month
    });

    regionButtons.forEach((btn) => {
        btn.setAttribute("aria-pressed", "false");
        btn.addEventListener("click", () => showFestivalCard(btn.dataset.target));
    });

    // A country with several festivals: the panel lists them (photo, name, month, one line) and a row opens its card
    const pinByCountry = {};
    pinObjects.forEach((p) => { pinByCountry[p.userData.country] = p; });
    function openPin(pin, fromKeyboard) {
        const { festivals, country } = pin.userData;
        if (festivals.length === 1) return showFestivalCard(festivals[0].id);
        tooltip.hidden = true;
        if (listMode && selectedPin === pin) return countryList.querySelector(fromKeyboard ? "button" : "h2").focus();
        const prev = history.state;
        if (prev && prev.festival && prev.from === country) { // its list is the entry beneath: go back to it (popstate shows it)
            history.go(prev.about ? -2 : -1);
            return;
        }
        showCountryList(pin, false, fromKeyboard);
    }

    function showCountryList(pin, fromHistory, fromKeyboard) {
        const { festivals, country } = pin.userData;
        setSelectedMonth(null);
        setRegion(null);
        selectedPin = pin;
        listMode = true;
        navFrom = null;
        focusPin(pin);
        drawMaps({ countries: [country], neutral: true });
        heroTitle.replaceChildren(...homeTitle); // the theme stays as it was until a festival is chosen
        document.querySelectorAll(".festival-card").forEach((card) => { card.hidden = true; });
        regionButtons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
        countryList.querySelector("h2").textContent = `Festivals in ${country}`;
        countryList.querySelector("ul").replaceChildren(...festivals.map((f) => {
            const card = document.getElementById(`card-${f.id}`);
            const month = document.querySelector(`.festival-list .region-btn[data-target="${f.id}"] .fl-month`);
            const row = document.createElement("li");
            const b = document.createElement("button");
            b.type = "button";
            b.dataset.target = f.id;
            b.style.setProperty("--c", token(`--festival-${f.color}`));
            b.style.setProperty("--g", token(`--glow-${f.color}`));
            const img = document.createElement("img");
            img.className = "cl-thumb";
            img.alt = "";
            img.src = card.querySelector(".card-img").src;
            const name = document.createElement("span");
            name.className = "cl-name";
            name.textContent = f.label;
            const when = document.createElement("span");
            when.className = "cl-month";
            when.textContent = month ? month.firstChild.textContent.trim() : "";
            const line = document.createElement("span");
            line.className = "cl-line";
            line.textContent = card.querySelector(".card-content > p:not([class])").textContent;
            b.append(img, name, when, line);
            row.append(b);
            return row;
        }));
        countryList.hidden = false;
        // Replay the entrance when the list replaces a card or another list
        countryList.style.animation = "none";
        void countryList.offsetWidth;
        countryList.style.animation = "";

        if (!fromHistory) commitEntry({ list: country }, location.pathname + location.search);
        if (!panel.contains(document.activeElement)) lastTrigger = document.activeElement;
        setReading(false);
        panel.classList.add("is-open");
        hero.classList.add("panel-open");
        panel.setAttribute("aria-hidden", "false");
        panel.scrollTop = 0;
        (fromKeyboard ? countryList.querySelector("button") : countryList.querySelector("h2")).focus({ preventScroll: true });
        globeStatus.textContent = `${country}: ${festivals.length} festivals, ${festivals.map((f) => f.label).join(" and ")}. Choose one.`;
    }
    countryList.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (b) showFestivalCard(b.dataset.target);
    });
    countryList.addEventListener("keydown", (e) => {
        const items = [...countryList.querySelectorAll("button")];
        const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (!step || !items.includes(document.activeElement)) return;
        e.preventDefault();
        items[(items.indexOf(document.activeElement) + step + items.length) % items.length].focus();
    });

    // The chevron steps back one screen (its list, or a reading view's card); otherwise it closes
    closeBtn.addEventListener("click", (e) => {
        if (navFrom) {
            e.preventDefault();
            history.back();
        } else closeFestival(e);
    });
    homeBtn.addEventListener("click", () => history.go(-((history.state && history.state.depth) || 1)));

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
    const about = document.getElementById("about-dialog");
    document.getElementById("about-btn").addEventListener("click", () => about.showModal());
    about.addEventListener("click", (e) => {
        if (e.target === about || e.target.closest(".close-btn")) about.close();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape" || document.querySelector("dialog[open], :popover-open")) return; // Escape closes an open dialog or the region pills first, not the card
        if (selectedPin) closeFestival();
        else {
            setSelectedMonth(null);
            setRegion(null);
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
            openPin(facingPin, true);
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

    // "Coming up" card (home view, wide screens): festivals on this month, then the next three by month.
    // Its buttons are copies of the list's, so they share its look and colours.
    const monthsAway = (f) => Math.min(...f.months.map((m) => (m - THIS_MONTH + 12) % 12));
    const dated = FESTIVALS.filter((f) => f.months.length).sort((a, b) => monthsAway(a) - monthsAway(b));
    [["coming-now", dated.filter((f) => monthsAway(f) === 0)], ["coming-next", dated.filter((f) => monthsAway(f) > 0).slice(0, 3)]].forEach(([listId, festivals]) => {
        const list = document.getElementById(listId);
        list.closest("section").hidden = festivals.length === 0;
        festivals.forEach((f) => {
            const btn = document.querySelector(`.festival-list .region-btn[data-target="${f.id}"]`).cloneNode(true);
            btn.removeAttribute("aria-pressed");
            btn.querySelectorAll(".fl-now").forEach((pill) => pill.remove()); // the section heading says it
            btn.addEventListener("click", () => showFestivalCard(f.id));
            const li = document.createElement("li");
            li.append(btn);
            list.append(li);
        });
    });

    // Start the right column level with the "All festivals" heading; the intro above it changes height with the hero heading and width
    const comingUp = document.querySelector(".coming-up");
    const listHeading = document.querySelector(".festival-list-heading");
    new ResizeObserver(() => {
        comingUp.style.top = `${listHeading.getBoundingClientRect().top - hero.getBoundingClientRect().top}px`;
    }).observe(document.querySelector(".hero-intro"));

    // Zoom: wheel (and trackpad pinch) over the globe, +/-/0 keys, the buttons by the globe; two-finger pinch is OrbitControls' own
    container.addEventListener("wheel", (e) => {
        e.preventDefault();
        e.stopPropagation(); // OrbitControls' own wheel zoom is instant; this one eases
        setZoom(zoomGoal() * Math.exp(-e.deltaY * (e.deltaMode === 1 ? 16 : 1) * (e.ctrlKey ? 0.01 : 0.0015)));
    }, { passive: false, capture: true });
    container.addEventListener("touchstart", (e) => { if (e.touches.length > 1) targetCamDist = null; }, { capture: true, passive: true });

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

    // Zoom labels: the country and its festival count (the festival names too when close), as HTML so the text stays sharp.
    // They hide on the far side, dim with their pin, and the lower-priority one of two overlapping labels is hidden.
    const labelLayer = document.createElement("div");
    labelLayer.className = "globe-labels";
    labelLayer.hidden = true;
    container.append(labelLayer);
    allPins.forEach((pin) => {
        const { country, festivals, fanOf } = pin.userData;
        const el = document.createElement("button");
        el.type = "button";
        el.tabIndex = -1; // keyboard users reach the same thing with Enter on the facing pin
        el.setAttribute("aria-hidden", "true");
        el.className = "globe-label";
        // A fanned pin's label is just its festival's name
        el.classList.toggle("gl-fan", !!fanOf);
        (fanOf ? [[festivals[0].label, "gl-name"]] : [[country, "gl-name"], [`${festivals.length} ${festivals.length > 1 ? "festivals" : "festival"}`, "gl-count"], [festivals.map((f) => f.label).join(", "), "gl-names"]]).forEach(([text, cls]) => {
            const line = document.createElement("span");
            line.className = cls;
            line.textContent = text;
            el.append(line);
        });
        el.addEventListener("click", (e) => {
            e.stopPropagation();
            openPin(pin);
        });
        pin.userData.label = { el, w: 0, h: 0, detail: false };
        labelLayer.append(el);
    });
    const labelV = new THREE.Vector3();
    function updateLabels(zoom) {
        const show = Math.min(1, Math.max(0, (zoom - LABEL_ZOOM) / 0.15));
        labelLayer.hidden = show === 0;
        if (show === 0) return;
        const W = container.clientWidth;
        const H = container.clientHeight;
        const edge = globeRadius / camera.position.length(); // a point on the globe is in view when its dot with the camera direction exceeds this
        const detail = zoom > LABEL_ZOOM + 0.5;
        const cands = [];
        allPins.forEach((pin) => {
            const lab = pin.userData.label;
            const fanOf = pin.userData.fanOf;
            const fanE = (fanOf || pin).userData.fanE || 0; // how far this pin's country has fanned
            pin.getWorldPosition(labelV);
            const facing = labelV.normalize().dot(motionCam) - edge;
            const op = show * Math.min(1, Math.max(0, facing / 0.1)) * (pin.userData.dimmed ? 0.3 : 1) * (fanOf ? fanE : 1);
            const detailed = detail && fanE < 0.5; // fanned pins carry the festival names, so the country label drops them
            if (!fanOf && detailed !== lab.detail) {
                lab.detail = detailed;
                lab.el.classList.toggle("is-detailed", detailed);
                lab.w = 0;
            }
            if (op > 0 && !lab.w) { lab.w = lab.el.offsetWidth; lab.h = lab.el.offsetHeight; }
            cands.push({ pin, lab, op, facing, rank: (pin === selectedPin ? 2 : 0) + (pin.userData.dimmed ? 0 : 1) + (fanOf ? 1.5 : 0) });
        });
        const placed = [];
        cands.sort((a, b) => b.rank - a.rank || b.facing - a.facing).forEach(({ pin, lab, op }) => {
            let o = op;
            if (o > 0) {
                pin.getWorldPosition(labelV).project(camera);
                const x = ((labelV.x + 1) / 2) * W;
                let y = ((1 - labelV.y) / 2) * H + 16 * Math.pow(Math.max(zoom, 1), 0.4); // below the pin's head
                if (pin.userData.fanE > 0.5) {
                    // A fanned country's own label sits above its ring, clear of the fanned pins and their labels
                    const top = Math.min(...pin.userData.fanPins.map((p) => ((1 - p.getWorldPosition(labelV).project(camera).y) / 2) * H));
                    y = top - lab.h - 26 * Math.pow(Math.max(zoom, 1), 0.4);
                }
                const box = [x - lab.w / 2 - 4, y - 4, x + lab.w / 2 + 4, y + lab.h + 4];
                if (placed.some((b) => box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1])) o = 0;
                else {
                    placed.push(box);
                    lab.el.style.transform = `translate(${x - lab.w / 2}px, ${y}px)`;
                }
            }
            lab.el.style.opacity = o;
            lab.el.style.pointerEvents = o > 0.5 ? "auto" : "none";
        });
    }

    // 5d. Festival bursts: a 2 s burst out of the country when its festival opens, once the spin settles.
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
    };
    const fxCanvas = document.createElement("canvas");
    fxCanvas.className = "globe-fx";
    fxCanvas.setAttribute("aria-hidden", "true");
    container.append(fxCanvas);
    const fx = fxCanvas.getContext("2d");
    let fxParts = [];
    let burstPending = null; // festival id waiting for the spin to finish
    const rand = (a, b) => a + Math.random() * (b - a);

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
                const a = rand(0, Math.PI * 2);
                const sp = rand(...speed) * s;
                fxParts.push({
                    kind: k, x, y, t: 0, col: cols[(Math.random() * cols.length) | 0],
                    vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (k === "petal" || k === "confetti" ? 60 : k === "speck" ? 0 : 30) * s,
                    g: { spark: 130, puff: 0, petal: 90, speck: 60, confetti: 110 }[k] * s,
                    drag: { spark: 0.4, puff: 1.6, petal: 0.4, speck: 1, confetti: 1.1 }[k],
                    size: { spark: rand(1.2, 2.2) * Math.sqrt(s), puff: rand(8, 14) * s, petal: rand(4, 6) * s, confetti: rand(5, 7) * s, speck: rand(1.2, 2.4) }[k],
                    grow: k === "puff" ? rand(25, 45) * s : 0,
                    life: rand(1.2, 1.8), delay: k === "speck" ? 0 : rand(0, 0.15),
                    rot: rand(0, 6.28), vr: rand(-4, 4), sway: rand(0, 6.28),
                });
            }
        };
        fxParts = [];
        if (kind === "spark") make("spark", 80, [60, 170]);
        if (kind === "puff") { make("puff", 22, [30, 110]); make("speck", 40, [60, 160]); }
        if (kind === "petal") make("petal", 45, [60, 170]);
        if (kind === "confetti") make("confetti", 70, [90, 220]);
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
            if (p.kind === "petal" || p.kind === "confetti") p.x += Math.sin(p.t * 3 + p.sway) * 20 * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.rot += p.vr * dt;
            const k = p.t / p.life;
            fx.save();
            fx.globalAlpha = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85;
            fx.globalCompositeOperation = night && p.kind !== "petal" && p.kind !== "confetti" ? "lighter" : "source-over";
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
            } else {
                fx.translate(p.x, p.y);
                fx.rotate(p.rot);
                fx.scale(1, 0.55 + 0.45 * Math.sin(p.t * 6 + p.sway)); // petal flutter
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
    let fanOn = false; // zoomed in far enough that multi-festival pins are fanned (with hysteresis)
    const inkColor = new THREE.Color(token("--ink"));
    const whiteColor = new THREE.Color(0xffffff);
    const motionPos = new THREE.Vector3();
    const motionCam = new THREE.Vector3();

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
            // Holds still for keyboard users (Tab focus or arrows) only; a mouse click focuses the globe too
            const spinOn = !isHovering && !selectedPin && !reduceMotion && !keyboardMode && zoomNow() < 1.05 && !container.matches(":focus-visible");
            spinVel += ((spinOn ? 0.09 : 0) - spinVel) * Math.min(1, dt * 4); // rad/s, eases up and down over about 1 s
            globeGroup.rotation.y += spinVel * dt;
        }

        // Zoom: ease the camera toward the front (+z) at the target distance
        if (targetCamDist !== null) {
            const goal = camFront ? new THREE.Vector3(0, 0, targetCamDist) : camera.position.clone().setLength(targetCamDist);
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
        halo.material.uniforms.color.value.copy(palettes.day.halo).lerp(palettes.night.halo, nightMix);
        halo.material.uniforms.strength.value = 0.9 - 0.3 * nightMix;
        stars.material.opacity = 0.8 * nightMix;
        stars.visible = nightMix > 0.002;
        ambientLight.intensity = 0.7 + 0.15 * nightMix;

        // Year ring fades in on the home view when there is room for it
        const zoom = zoomNow();
        if (!sharp && !SMALL && zoom > SHARP_ZOOM) upgradeMaps();
        const ringWanted = !selectedPin && container.clientWidth >= 1100 && zoom < 1.15; // too big to fit once zoomed in
        ringMix += ((ringWanted ? 1 : 0) - ringMix) * (reduceMotion ? 1 : 0.08);
        yearRing.material.opacity = ringMix;
        yearRing.visible = ringMix > 0.01;
        yearRing.quaternion.copy(camera.quaternion);

        // Keyboard: highlight and announce the pin facing the viewer (within about 25 degrees)
        if (keyboardMode && !selectedPin) {
            const toCamera = camera.position.clone().normalize();
            let best = null;
            let bestDot = 0.9;
            pinObjects.forEach((pin) => {
                const d = pin.getWorldPosition(new THREE.Vector3()).normalize().dot(toCamera);
                if (d > bestDot) {
                    bestDot = d;
                    best = pin;
                }
            });
            if (best !== facingPin) {
                facingPin = best;
                hoveredPin = best;
                const many = best && best.userData.festivals.length > 1;
                globeStatus.textContent = best ? `Facing ${pinLabel(best)}. Press Enter to ${many ? "choose one" : "open it"}.` : "No festival facing you. Keep turning.";
                if (best) tooltip.textContent = pinLabel(best);
                tooltip.hidden = !best;
            }
            if (facingPin) {
                const v = facingPin.getWorldPosition(new THREE.Vector3()).project(camera);
                const box = container.getBoundingClientRect(); // includes the globe's CSS shift
                const stage = hero.getBoundingClientRect();
                tooltip.style.left = `${box.left - stage.left + ((v.x + 1) / 2) * box.width}px`;
                tooltip.style.top = `${box.top - stage.top + ((1 - v.y) / 2) * box.height}px`;
            }
        }

        // Selected pin glows and pulses; the others dim to 30% and hold still.
        // A hovered (or else selected) month on the year ring, or a chosen region, dims the festivals outside it the same way.
        // A pin with several festivals cycles their colours (2.5 s hold, 1.5 s fade), pausing while hovered,
        // and holds the open festival's colour (or the first one's under reduced motion). While its country's list is shown it keeps cycling.
        const ringMonth = hoveredMonth ?? selectedMonth;
        const matches = (f) => (ringMonth === null || f.months.includes(ringMonth)) && (selectedRegion === null || regionOf[f.id] === selectedRegion);
        motionCam.copy(camera.position).normalize();
        const pinZoom = Math.pow(Math.max(zoom, 1), -0.6);
        if (zoom > FAN_ON) fanOn = true;
        else if (zoom < FAN_OFF) fanOn = false;
        allPins.forEach((pin, i) => {
            const { ring, dayColor, nightColor, festival, festivals, palette, fanOf } = pin.userData;
            // A fanned pin is fully shown only once its country has fanned; the country's own pin fades as it does. Only the open
            // festival's country fans while a card or list is open.
            if (!fanOf && pin.userData.fanPins) {
                const want = fanOn && (!selectedPin || pin === selectedPin) ? 1 : 0;
                const u = pin.userData;
                u.fan = reduceMotion ? want : u.fan + Math.sign(want - u.fan) * Math.min(Math.abs(want - u.fan), dt / FAN_TIME);
                u.fanE = u.fan * u.fan * (3 - 2 * u.fan);
            }
            const show = fanOf ? fanOf.userData.fanE : 1 - (pin.userData.fanE || 0);
            const sel = fanOf ? selectedPin === fanOf && !listMode && fanOf.userData.festival === festival : pin === selectedPin;
            const hov = pin === hoveredPin || (fanOf && fanOf === facingPin); // the keyboard's facing country lights all its fanned pins
            const dimmed = fanOf
                ? (selectedPin ? !(selectedPin === fanOf && (listMode || sel)) : !matches(festival))
                : selectedPin ? pin !== selectedPin : !festivals.some(matches);
            pin.userData.dimmed = dimmed; // the labels read it, even for a pin that is hidden
            pin.visible = ring.visible = show > 0.001;
            if (!pin.visible) return;
            if (fanOf) placeFan(pin, fanOf.userData.fanE, pinZoom);
            if (festivals.length > 1) {
                let a = 0;
                let b = 0;
                let mix = 0;
                if (pin === selectedPin && !listMode) a = b = festivals.indexOf(festival);
                else if (!reduceMotion) {
                    if (pin !== hoveredPin && !pin.userData.fanE) pin.userData.cycle += dt; // paused while hovered or fanned
                    const slot = pin.userData.cycle / 4;
                    a = Math.floor(slot) % festivals.length;
                    b = (a + 1) % festivals.length;
                    mix = Math.min(1, Math.max(0, ((slot % 1) * 4 - 2.5) / 1.5));
                }
                dayColor.copy(palette[a].day).lerp(palette[b].day, mix);
                nightColor.copy(palette[a].night).lerp(palette[b].night, mix);
            }
            const swing = festivals.some((f) => f.months.includes(THIS_MONTH)) ? 0.3 : 0.15; // festivals on now pulse more
            const pulse = reduceMotion || dimmed ? 1 : 1 + swing * Math.sin(t * 2.5 + i);
            pin.material.color.copy(dayColor).lerp(nightColor, nightMix);
            // The selected pin's ring contrasts with its highlighted country (ink by day, white at night)
            if (sel) ring.material.color.copy(inkColor).lerp(whiteColor, nightMix);
            else ring.material.color.copy(pin.material.color);
            pin.material.opacity = (dimmed ? 0.3 : 1) * show;
            if (pin.material.emissive) pin.material.emissive.copy(pin.material.color).multiplyScalar(0.55); // lantern glow
            pin.children.forEach((child) => {
                if (child.userData.tint) child.material.color.copy(pin.material.color);
                child.material.opacity = pin.material.opacity;
                if (child.isSprite) child.visible = pin !== selectedPin; // hide the count badge while its list or one of its cards is open
            });
            ring.material.opacity = (dimmed ? 0.2 : 0.8) * show;
            // Idle motion: still for dimmed pins, pins on the far side of the globe and reduced motion
            const live = !reduceMotion && !dimmed && pin.getWorldPosition(motionPos).normalize().dot(motionCam) > 0.2;
            animatePin(pin, pin.userData.style, t, live ? (sel || hov || swing > 0.2 ? 2 : 1) : 0, i * 2.4);
            // Selected pin shrinks so small countries (Germany) stay visible; its ring marks the spot (a fanned pin is small already)
            // Zoomed in, pins grow on screen only gently (world size shrinks as z^-0.6), and the hit area follows
            const size = (fanOf ? FAN_SCALE : 1) * pinZoom * show;
            pin.scale.setScalar((sel ? (fanOf ? 1 : 0.7) : hov ? 1.4 : 1) * size);
            ring.scale.setScalar((sel ? 1.1 * pulse : hov ? 1.5 : pulse) * Math.pow(size, 1.5));
        });
        updateLabels(zoom);
        updateZoomControls(zoom);
        if (burstPending && !targetRot) {
            const u = selectedPin && selectedPin.userData;
            if (u && u.festival.id === burstPending && !listMode) {
                const fanned = u.fanE > 0.5 && u.fanPins.find((p) => p.userData.festival === u.festival); // burst from its own pin in the ring
                startBurst(burstPending, fanned || selectedPin);
            }
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
    else if (history.state && history.state.list) history.replaceState(null, "", location.pathname + location.search); // a list has no link: a reload goes home
});
