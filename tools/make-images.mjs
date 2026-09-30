// Web images for the landing page, made from the app's real captures and App Store slides
// (in the sibling repo ../subs-tracker-wall). Each one is resized, optionally cropped, and
// encoded as WebP by headless Chrome (canvas.toDataURL), so no image library is needed.
//
//   node tools/make-images.mjs
//
// Output: public/assets/web/*.webp (committed; the site only uses these).

import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const app = resolve(root, '../subs-tracker-wall');
const outDir = join(root, 'public/assets/web');
const work = join(here, '.build');
const chrome = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const phone = (t) => join(app, `docs/raw/Simulator Screenshot - iPhone 17 Pro - 2026-09-29 at ${t}.png`);
const pad = (t) => join(app, `docs/raw/Simulator Screenshot - iPad Pro 13-inch (M5) - 2026-09-29 at ${t}.png`);
const widgets = (t) => join(app, `docs/raw/widgets/Simulator Screenshot - iPhone 17 Pro - 2026-09-30 at ${t}.png`);
const slide = (dir, name) => join(app, `docs/appstore/${dir}/${name}.png`);

// [output name, source file, width, crop [x, y, w, h] in source pixels (optional), quality, format]
const IMAGES = [
  // iPhone screens (1206 × 2622), shown in CSS phone frames.
  ['phone-room', phone('16.54.53'), 660],
  ['phone-room-dark', phone('16.54.58'), 660],
  ['phone-closeup', phone('16.56.30'), 660],
  ['phone-lifted', phone('16.56.48'), 660],
  ['phone-calwall', phone('16.56.57'), 660],
  ['phone-calwall-dark', phone('16.55.06'), 660],
  ['phone-calendar', phone('16.57.07'), 660],
  ['phone-themes', phone('16.57.39'), 660],
  ['phone-calstyles', phone('16.57.47'), 660],
  ['phone-notifications', phone('16.58.08'), 660],
  ['phone-history', phone('16.58.37'), 660],
  ['phone-share', phone('16.55.19'), 660],
  ['phone-pro', phone('16.39.01'), 660],
  // iPad screens (2752 × 2064), shown in CSS iPad frames.
  ['pad-room', pad('17.09.32'), 1600],
  ['pad-room-dark', pad('17.09.13'), 1600],
  ['pad-closeup', pad('17.09.00'), 1600],
  ['pad-closeup-dark', pad('17.12.28'), 1600],
  ['pad-lifted', pad('17.12.22'), 1600],
  ['pad-calendar', pad('17.09.47'), 1600],
  ['pad-calwall-dark', pad('17.09.26'), 1600],
  ['pad-themes', pad('17.10.30'), 1600],
  ['pad-share', pad('17.12.46'), 1600],
  ['pad-pro', pad('17.02.20'), 1600],
  // 3D tiles from the iPad close-up, floated around the hero (rounded in CSS).
  // Link preview (Open Graph): the top of the first iPad slide, 1200 × 630, as JPEG.
  ['og', slide('ipad', 'ipad-01-wall'), 1200, [0, 0, 2752, 1445], 0.88, 'jpeg'],
  ['tile-st', pad('17.09.00'), 300, [680, 158, 334, 334]],
  ['tile-tu', pad('17.09.00'), 300, [1033, 158, 334, 334]],
  ['tile-pa', pad('17.09.00'), 300, [1387, 158, 334, 334]],
  ['tile-cl', pad('17.09.00'), 300, [1741, 158, 334, 334]],
  ['tile-ki', pad('17.09.00'), 300, [680, 513, 334, 334]],
  ['tile-fi', pad('17.09.00'), 300, [1033, 513, 334, 334]],
  ['tile-te', pad('17.09.00'), 300, [1387, 513, 334, 334]],
  // Cards lifted out of the iPhone screens.
  ['card-due', phone('16.57.07'), 700, [620, 501, 538, 328]],
  ['card-month', phone('16.57.07'), 700, [50, 501, 537, 273]],
  ['card-lifted', phone('16.56.48'), 1000, [50, 1780, 1109, 556]],
  // Calendar style thumbnails (exact edges, measured from the capture).
  ['style-kraft', pad('17.11.52'), 440, [1511, 533, 291, 332]],
  ['style-blueprint', pad('17.11.52'), 440, [1511, 955, 291, 332]],
  // Widgets, cut from Home Screen captures (2 px inside each widget's edge; rounded in CSS).
  ['widget-due', widgets('21.21.50'), 489, [80, 273, 489, 489], 0.9],
  ['widget-next', widgets('21.21.50'), 489, [635, 273, 489, 489], 0.9],
  ['widget-next-wide', widgets('21.21.50'), 1045, [80, 1386, 1045, 489], 0.9],
  ['widget-month', widgets('21.23.56'), 489, [80, 272, 489, 489], 0.9],
  ['widget-month-wide', widgets('21.23.56'), 1045, [80, 827, 1045, 489], 0.9],
  ['widget-wall-wide', widgets('21.25.22'), 1045, [80, 209, 1045, 489], 0.9],
  ['widget-wall-large', widgets('21.25.22'), 1045, [80, 764, 1045, 1091], 0.9],
  // The App Store slides, for the gallery.
  ...['01-wall', '02-lights', '03-up-close', '04-reminders', '05-calendar', '06-totals', '07-rooms', '08-widgets', '09-share', '10-pro']
    .map((n) => [`slide-iphone-${n}`, slide('iphone', `iphone-${n}`), 600]),
  ...['01-wall', '02-lights', '03-up-close', '04-reminders', '05-calendar', '06-rooms', '07-widgets', '08-share', '09-pro', '10-iphone-and-ipad']
    .map((n) => [`slide-ipad-${n}`, slide('ipad', `ipad-${n}`), 1200]),
];

rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });
mkdirSync(outDir, { recursive: true });

const fileUrl = (p) => relative(work, p).replaceAll('\\', '/').split('/').map(encodeURIComponent).join('/');

// A few images per Chrome run keeps memory down (the sources are large PNGs).
const BATCH = 8;
for (let start = 0; start < IMAGES.length; start += BATCH) {
  const batch = IMAGES.slice(start, start + BATCH).map(([name, src, width, crop, quality, format]) => ({
    name, url: fileUrl(src), width, crop: crop ?? null, quality: quality ?? 0.86, format: format ?? 'webp',
  }));
  const page = join(work, `batch-${start}.html`);
  writeFileSync(page, `<!doctype html><html><body><pre id="out">pending</pre><script>
const jobs = ${JSON.stringify(batch)};
const load = (url) => new Promise((ok, fail) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => fail(url); i.src = url; });
(async () => {
  const results = {};
  for (const job of jobs) {
    const img = await load(job.url);
    const [sx, sy, sw, sh] = job.crop ?? [0, 0, img.width, img.height];
    const w = Math.min(job.width, sw);
    const h = Math.round(sh * (w / sw));
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    g.imageSmoothingQuality = 'high';
    g.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    results[job.name] = { data: c.toDataURL('image/' + job.format, job.quality), w, h, ext: job.format === 'jpeg' ? 'jpg' : job.format };
  }
  document.getElementById('out').textContent = '@@' + JSON.stringify(results) + '@@';
})().catch((e) => { document.getElementById('out').textContent = '@@ERR ' + e + '@@'; });
</script></body></html>`);
  const dom = execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--allow-file-access-from-files', '--virtual-time-budget=60000',
    '--dump-dom', 'file:///' + page.replaceAll('\\', '/'),
  ], { maxBuffer: 512 * 1024 * 1024 }).toString();
  // The result is the <pre>'s text, wrapped in @@ (the script's own text also contains @@).
  const pre = dom.match(/<pre id="out">@@([\s\S]*?)@@<\/pre>/);
  if (!pre) throw new Error('No result from Chrome for batch ' + start);
  const payload = pre[1];
  if (payload.startsWith('ERR')) throw new Error(payload);
  for (const [name, { data, w, h, ext }] of Object.entries(JSON.parse(payload))) {
    const bytes = Buffer.from(data.split(',')[1], 'base64');
    writeFileSync(join(outDir, `${name}.${ext}`), bytes);
    console.log(`${name}.${ext}  ${w}×${h}  ${(bytes.length / 1024).toFixed(0)} KB`);
  }
}
rmSync(work, { recursive: true, force: true });
