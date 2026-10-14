// Muslim-majority countries (Pew Research estimates), named as in the Natural Earth data; lit faintly for Eid
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

// Festival data: adding a festival = one entry here + its card and list item in HCI.html + its colour tokens and motif in style.css.
// `color` names the token pair (--festival-<color> solid, --glow-<color> glow); `mood` picks the day or night theme;
// `months` (0 = January) feed the "On now" label and the year ring.
const FESTIVALS = [
    { id: "diwali", label: "Diwali", lat: 20.5937, lon: 78.9629, color: "diwali", mood: "night", months: [9, 10], countries: ["India"] },
    { id: "lunar-new-year", label: "Lunar New Year", lat: 35.8617, lon: 104.1954, color: "lunar", mood: "night", months: [0, 1], countries: ["China"] },
    { id: "eid", label: "Eid al-Fitr", lat: 23.8859, lon: 45.0792, color: "eid", mood: "day", months: EID_MONTHS, countries: ["Saudi Arabia"], related: MUSLIM_MAJORITY },
    { id: "rio-carnival", label: "Rio Carnival", lat: -14.235, lon: -51.9253, color: "rio", mood: "night", months: [1, 2], countries: ["Brazil"] },
    { id: "oktoberfest", label: "Oktoberfest", lat: 48.1351, lon: 11.5820, color: "oktoberfest", mood: "day", months: [8, 9], countries: ["Germany"] },
    { id: "timkat", label: "Timkat", lat: 9.145, lon: 40.4897, color: "timkat", mood: "day", months: [0], countries: ["Ethiopia"] },
    { id: "holi", label: "Holi", lat: 27.4924, lon: 77.6737, color: "holi", mood: "day", months: [2], countries: ["India", "Nepal"] },
    { id: "songkran", label: "Songkran", lat: 15.87, lon: 100.9925, color: "songkran", mood: "day", months: [3], countries: ["Thailand"], related: ["Laos", "Myanmar", "Cambodia"] },
    { id: "dia-de-muertos", label: "Día de Muertos", lat: 23.6345, lon: -102.5528, color: "muertos", mood: "night", months: [10], countries: ["Mexico"] },
    { id: "hanukkah", label: "Hanukkah", lat: 31.0461, lon: 34.8516, color: "hanukkah", mood: "night", months: [11], countries: ["Israel"] },
    { id: "vesak", label: "Vesak", lat: 7.8731, lon: 80.7718, color: "vesak", mood: "night", months: [4], countries: ["Sri Lanka"], related: ["Nepal", "Thailand", "Myanmar", "Laos", "Cambodia"] },
    { id: "matariki", label: "Matariki", lat: -40.9006, lon: 174.886, color: "matariki", mood: "night", months: [5, 6], countries: ["New Zealand"] },
    { id: "osun-osogbo", label: "Osun-Osogbo", lat: 7.7827, lon: 4.5418, color: "osun", mood: "day", months: [7], countries: ["Nigeria"] }
];
const festivalById = Object.fromEntries(FESTIVALS.map((f) => [f.id, f]));

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("globe-container");
    if (!container) return;

    // Saved pin style, checked before anything reads layout so its pill doesn't fade in on load
    const PIN_STYLES = ["push", "lantern", "flag", "marker", "candle", "firework"];
    let savedStyle = null;
    try { savedStyle = localStorage.getItem("pinStyle"); } catch (e) { /* storage blocked: use the default */ }
    const pinStyle = PIN_STYLES.includes(savedStyle) ? savedStyle : "push";
    document.querySelector(`input[name="pin-style"][value="${pinStyle}"]`).checked = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const EASE = reduceMotion ? 1 : 0.07; // fraction of the remaining distance covered per frame
    const ZOOM = 0.8;                      // zoomed camera distance as a fraction of the home distance
    const DEG = Math.PI / 180;

    // 1. Scene setup
    const scene = new THREE.Scene();
    // Near plane at 10, not 0.1: nothing comes closer, and the extra depth precision stops the day and night maps flickering through each other
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 10, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
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
        ctx.globalAlpha = 1;
        ctx.fillStyle = pal.ocean;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Faint graticule every 30°, under the land
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 30) { const x = ((lon + 180) / 360) * canvas.width; ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
        for (let lat = -60; lat <= 60; lat += 30) { const y = ((90 - lat) / 180) * canvas.height; ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
        ctx.globalAlpha = 0.25;
        ctx.strokeStyle = pal.coast;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        tracePath(map, land);
        ctx.fillStyle = pal.land;
        ctx.fill("evenodd");

        // Thin country borders, then the coastline on top
        tracePath(map, allCountries);
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
        tracePath(map, land);
        ctx.lineWidth = 2;
        ctx.stroke();

        if (festival) {
            const colour = token(map.mood === "night" ? `--glow-${festival.color}` : `--festival-${festival.color}`);
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
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        map.texture.needsUpdate = true;
    }

    function drawMaps(festival) {
        drawMap(dayMap, festival);
        drawMap(nightMap, festival);
    }
    drawMaps(null);

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

    // 5. Pins: festival colour by day, glow colour at night, standing on a thin needle.
    // Each pin's origin is where the needle meets the surface and its +z points at the centre, so scaling grows it from that spot.
    // Children tagged `tint` take the pin's colour; every child follows its opacity.
    // The head mesh stays the same object whatever the style (it is the raycast target); `setPinStyle` swaps its
    // geometry and material and adds that style's extra parts (needle, pennant, lantern caps, flame or rays).
    const pinObjects = [];
    const pinById = {};
    const NEEDLE = 7;
    const needleGeo = new THREE.CylinderGeometry(0.22, 0.22, NEEDLE, 6).rotateX(Math.PI / 2).translate(0, 0, -NEEDLE / 2);
    const needleMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(token("--ink-muted")), shininess: 80, transparent: true });

    // Pushpin: a glossy ball. Flag: a small finial with a pennant fixed to the pole, turning with the globe like a real flag
    // (seen straight down the pole, as for the selected pin, it narrows to a line). Lantern: a glowing paper lantern with dark caps.
    // Marker: a map-style teardrop standing on its tip, no needle. Candle: a candle in the festival colour with a gold flame,
    // no needle. Firework: a small ball bursting into rays.
    // Marker profile: a circle (radius 2.4, centre 6.5 up) and the two lines from the tip that touch it, turned round the pole
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
    // Invisible hit area round every head (about twice the pushpin's), so the small heads and thin needle are easy to click;
    // it relies on the r128 raycaster hitting invisible meshes, and hitAt counts it as its pin
    const hitGeo = new THREE.SphereGeometry(4.5, 8, 8).translate(0, 0, -NEEDLE - 0.5);
    const hitMat = new THREE.MeshBasicMaterial();

    FESTIVALS.forEach((festival) => {
        const pos = latLongToVector3(festival.lat, festival.lon, globeRadius + 0.3);
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
        const pennant = new THREE.Mesh(pennantGeo, new THREE.MeshBasicMaterial({ color: dayColor.clone(), side: THREE.DoubleSide, transparent: true }));
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

        pinMesh.userData = { festival, ring: ringMesh, dayColor, nightColor, mats, extras };
        globeGroup.add(pinMesh);
        globeGroup.add(ringMesh);
        pinObjects.push(pinMesh);
        pinById[festival.id] = pinMesh;
    });

    function setPinStyle(style) {
        pinObjects.forEach((pin) => {
            const { mats, extras } = pin.userData;
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
    const tooltip = document.getElementById("globe-tooltip");
    const regionButtons = document.querySelectorAll(".region-btn");
    const heroTitle = document.getElementById("hero-title");
    const homeTitle = [...heroTitle.childNodes]; // put back as-is on close, keeping the two-line span
    const globeStatus = document.getElementById("globe-status");
    let keyboardMode = false; // arrow keys are turning the globe; the pin facing the viewer is highlighted
    let facingPin = null;
    let isHovering = false;
    let selectedPin = null;
    let hoveredPin = null;
    let lastTrigger = null;  // control that opened the panel, refocused on close
    let pendingSwitch = null; // festival picked from a reading view, waiting for history.back() to land
    let nightMix = 0;        // 0 = day, 1 = night (eased toward targetMix)
    let targetMix = 0;
    let targetRot = null;    // { x, y } globe rotation we are easing toward
    let targetCamDist = null;
    let homeDist = 220;

    function setMood(mood) {
        document.documentElement.dataset.theme = mood;
        targetMix = mood === "night" ? 1 : 0;
    }

    // Spin and tilt the globe so the pin sits in the centre, facing the camera
    function focusPin(pin) {
        const { lat } = pin.userData.festival;
        const current = globeGroup.rotation.y;
        let delta = (-Math.atan2(pin.position.x, pin.position.z) - current) % (Math.PI * 2);
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;
        targetRot = { x: lat * DEG, y: current + delta };
        targetCamDist = homeDist * ZOOM;
    }

    // `fromHistory` is true when the address bar drove the change, so no history entry is added
    function showFestivalCard(targetId, fromHistory) {
        const pin = pinById[targetId];
        if (!pin) return;
        const festival = pin.userData.festival;

        setSelectedMonth(null);
        setRegion(null);
        selectedPin = pin;
        focusPin(pin);
        drawMaps(festival);
        setMood(festival.mood);
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

        setReading(false);
        // Opening from home adds one history entry (so Back closes the card); switching festivals replaces it.
        // From a reading view, first step back off its /about entry (popstate then replaces the card entry underneath),
        // so closing or Back always returns home rather than to the earlier festival.
        if (!fromHistory) {
            if (pendingSwitch) pendingSwitch = targetId; // a second pick before the step back lands
            else if (history.state && history.state.about) {
                pendingSwitch = targetId;
                history.back();
            } else if (history.state && history.state.festival) history.replaceState({ festival: targetId }, "", `#${targetId}`);
            else history.pushState({ festival: targetId }, "", `#${targetId}`);
        }

        if (!panel.contains(document.activeElement)) lastTrigger = document.activeElement;
        panel.classList.add("is-open");
        hero.classList.add("panel-open");
        panel.setAttribute("aria-hidden", "false");
        // Land on the festival title so screen readers announce it, not the close button
        const title = document.querySelector(`#card-${targetId} h2`);
        if (title) title.focus({ preventScroll: true });
    }

    // Close button and Escape: step back off the festival's history entry, which closes the card via popstate
    function closeFestival(e) {
        if (e) e.preventDefault();
        if (history.state && history.state.festival) {
            history.back();
        } else {
            history.replaceState(null, "", location.pathname + location.search);
            resetToHome();
        }
    }

    // Reading view (#<id>/about): the panel widens to show the open festival's long read
    const closeBtn = document.getElementById("back-home-btn");
    const BACK_ICON = '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'; // ">" by the owner's choice
    function setReading(on) {
        panel.classList.toggle("is-reading", on);
        // In the reading view the button steps back to the card (it already does via history), so it looks like a back button
        closeBtn.innerHTML = on ? BACK_ICON : "&times;";
        closeBtn.setAttribute("aria-label", on ? "Back to festival summary" : "Close festival details");
        if (!on) return;
        panel.scrollTop = 0;
        const heading = panel.querySelector(".festival-card:not([hidden]) .festival-about h3");
        if (heading) heading.focus({ preventScroll: true });
    }

    // "Read more" adds a history entry on top of the card's, so Back and the close button return to the card
    panel.addEventListener("click", (e) => {
        const link = e.target.closest('a[href$="/about"]');
        if (!link || !selectedPin) return;
        e.preventDefault();
        history.pushState({ festival: selectedPin.userData.festival.id, about: true }, "", link.getAttribute("href"));
        setReading(true);
    });

    // Returns { id, about } for "#diwali" or "#diwali/about"; about only counts when that festival has a long read
    function parseAddress() {
        const [id, sub] = decodeURIComponent(location.hash.slice(1)).split("/");
        return { id, about: sub === "about" && !!document.querySelector(`#card-${id} .festival-about`) };
    }

    // A festival opened from the address bar (a shared link or a typed #id) gets a home entry underneath
    // (and a card entry under an /about page), so Back and the close button always step back to the home view
    function openFromAddress(id, about) {
        if (!(history.state && history.state.festival)) {
            history.replaceState(null, "", location.pathname + location.search);
            history.pushState({ festival: id }, "", `#${id}`);
            if (about) history.pushState({ festival: id, about: true }, "", `#${id}/about`);
        }
        showFestivalCard(id, true);
        setReading(about);
    }

    window.addEventListener("popstate", () => {
        if (pendingSwitch) {
            // Landed on the old card's entry after leaving a reading view: it becomes the new festival's (already shown)
            history.replaceState({ festival: pendingSwitch }, "", `#${pendingSwitch}`);
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
        drawRing(); // back in day colours
        targetRot = { x: 0, y: globeGroup.rotation.y };
        targetCamDist = homeDist;

        panel.classList.remove("is-open", "is-reading");
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
        const targets = [dayMap.mesh, ...pinObjects];
        if (yearRing.visible) targets.push(yearRing);
        const hit = raycaster.intersectObjects(targets, true)[0] || null;
        // A pin's needle, cap or pennant counts as the pin
        if (hit && hit.object.parent && pinObjects.includes(hit.object.parent)) hit.object = hit.object.parent;
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

    // Its position is only set on opening, so close it rather than leave it floating
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
            label = hoveredPin.userData.festival.label;
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

    // OrbitControls cancels the browser's click-to-focus (and the canvas can't take focus), so focus the globe here
    // focusVisible: false keeps the ring for Tab focus only
    // (blur first: re-focusing an already Tab-focused globe would keep its keyboard ring and hold the spin)
    // Dragging starts only on the globe or a pin: elsewhere the press is kept from OrbitControls (on the canvas inside),
    // so clicks on the year ring and empty space still work but don't turn the globe
    container.addEventListener("pointerdown", (event) => {
        container.blur();
        container.focus({ preventScroll: true, focusVisible: false });
        const hit = hitAt(event);
        if (!hit || hit.object === yearRing) event.stopPropagation();
    }, true);

    container.addEventListener("click", (event) => {
        const hit = hitAt(event);
        if (hit && pinObjects.includes(hit.object)) showFestivalCard(hit.object.userData.festival.id);
        else if (hit && hit.object === yearRing) {
            const month = monthAt(hit.point);
            if (month !== null) setSelectedMonth(month === selectedMonth ? null : month);
        } else if (!hit) setSelectedMonth(null); // empty space clears the month
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
    const about = document.getElementById("about-dialog");
    document.getElementById("about-btn").addEventListener("click", () => about.showModal());
    about.addEventListener("click", (e) => {
        if (e.target === about || e.target.closest(".close-btn")) about.close();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape" || document.querySelector("dialog[open], :popover-open")) return; // Escape closes an open photo, About or the region pills first, not the card
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
        } else if ((e.key === "Enter" || e.key === " ") && facingPin) {
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

    // 8. Render loop
    const clock = new THREE.Clock();
    const inkColor = new THREE.Color(token("--ink"));
    const whiteColor = new THREE.Color(0xffffff);

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Spin/tilt toward the selected country, or idle-spin when nothing is selected
        if (targetRot) {
            globeGroup.rotation.x += (targetRot.x - globeGroup.rotation.x) * EASE;
            globeGroup.rotation.y += (targetRot.y - globeGroup.rotation.y) * EASE;
            if (Math.abs(targetRot.x - globeGroup.rotation.x) + Math.abs(targetRot.y - globeGroup.rotation.y) < 0.001) targetRot = null;
        } else if (!isHovering && !selectedPin && !reduceMotion && !keyboardMode && !container.matches(":focus-visible")) {
            // Holds still for keyboard users (Tab focus or arrows) only; a mouse click focuses the globe too
            globeGroup.rotation.y += 0.0015;
        }

        // Zoom: ease the camera toward the front (+z) at the target distance
        if (targetCamDist !== null) {
            const goal = new THREE.Vector3(0, 0, targetCamDist);
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
        const ringWanted = !selectedPin && container.clientWidth >= 1100;
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
                globeStatus.textContent = best ? `Facing ${best.userData.festival.label}. Press Enter to open it.` : "No festival facing you. Keep turning.";
                if (best) tooltip.textContent = best.userData.festival.label;
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
        const ringMonth = hoveredMonth ?? selectedMonth;
        pinObjects.forEach((pin, i) => {
            const { ring, dayColor, nightColor, festival } = pin.userData;
            const dimmed = selectedPin
                ? pin !== selectedPin
                : (ringMonth !== null && !festival.months.includes(ringMonth)) || (selectedRegion !== null && regionOf[festival.id] !== selectedRegion);
            const swing = festival.months.includes(THIS_MONTH) ? 0.3 : 0.15; // festivals on now pulse more
            const pulse = reduceMotion || dimmed ? 1 : 1 + swing * Math.sin(t * 2.5 + i);
            pin.material.color.copy(dayColor).lerp(nightColor, nightMix);
            // The selected pin's ring contrasts with its highlighted country (ink by day, white at night)
            if (pin === selectedPin) ring.material.color.copy(inkColor).lerp(whiteColor, nightMix);
            else ring.material.color.copy(pin.material.color);
            pin.material.opacity = dimmed ? 0.3 : 1;
            if (pin.material.emissive) pin.material.emissive.copy(pin.material.color).multiplyScalar(0.55); // lantern glow
            pin.children.forEach((child) => {
                if (child.userData.tint) child.material.color.copy(pin.material.color);
                child.material.opacity = pin.material.opacity;
            });
            ring.material.opacity = dimmed ? 0.2 : 0.8;
            // Selected pin shrinks so small countries (Germany) stay visible; its ring marks the spot
            pin.scale.setScalar(pin === selectedPin ? 0.7 : pin === hoveredPin ? 1.4 : 1);
            ring.scale.setScalar(pin === selectedPin ? 1.1 * pulse : pin === hoveredPin ? 1.5 : pulse);
        });

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Keep the whole globe in view on narrow (portrait) screens
    function fitCamera() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        homeDist = Math.max(220, 181 / camera.aspect);
        camera.position.setLength(selectedPin ? homeDist * ZOOM : homeDist);
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    fitCamera();
    window.addEventListener("resize", fitCamera);

    // Shared link such as HCI.html#diwali
    const start = parseAddress();
    if (festivalById[start.id]) openFromAddress(start.id, start.about);
});
