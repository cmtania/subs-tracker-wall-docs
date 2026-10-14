# Subwall marketing/docs site

A Vite + React landing page for Subwall, the iPhone subscription tracker with a 3D wall, plus static **Support**, **Privacy Policy** and **Terms of Service** pages. It's deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. It uses the same template as the Shelfie site (`bookshelf-tracker-docs`).

## Run it

```
npm install        # first time only
npm run dev        # local preview with live reload → http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the built dist/ to check it
```

## What's where

- `index.html` → `src/main.jsx`: the landing page (React). The sections, from top to bottom:
  - `Nav.jsx`: sticky nav with section links; it turns into a menu on phones.
  - `Hero.jsx`: headline, App Store button, and a phone with floating reminder and "due this week" cards.
  - `Sections.jsx`:
    - benefit cards, then feature rows that alternate with phone mockups;
    - a bento grid: room themes, share your wall, history, privacy;
    - how it works, pricing (Free, Pro Yearly, Pro Monthly, Lifetime) and the FAQ accordion;
    - the final call to action and the footer.
  - `Phone.jsx`: the iPhone frame and drawn app screens (the room, a tile up close, Calendar, History).
  - `Wall.jsx`: the tile wall drawing, laid out like the app (4 × 5 slots, the two panels, yellow borders on tiles due this week).
  - `src/config.js`: **all the copy, the App Store URL, screenshot paths, demo tiles, FAQs and prices.**
  - `src/landing.css`: the layout and look.
- `public/` is copied into the build as-is:
  - `support.html` (FAQs and contact), `privacy.html` and `terms.html`, with their shared `styles.css`;
  - `assets/`: logo, app icon, the self-hosted font, and `screens/` for app screenshots.

Packages:
- `motion`: the entrance animations and the FAQ accordion.
- `lenis`: smooth scrolling.
- `@phosphor-icons/react`: the icons ([Phosphor](https://phosphoricons.com), MIT). The static pages use inline Phosphor SVGs, and there are no emoji anywhere.
- `@fontsource-variable/plus-jakarta-sans`: the font, self-hosted, so no Google Fonts requests.

All motion respects the Reduce Motion setting.

Every screen on the page is the real app, running with made-up services (Streamly, Tunebox, CloudNest…) and no real logos, like the App Store screenshots.

## Images

The page uses web-sized WebP images in `public/assets/web/`, made from the app repo's captures (`../subs-tracker-wall/docs/raw`) and App Store slides (`../subs-tracker-wall/docs/appstore`):

```
node tools/make-images.mjs
```

The list of images (and their crops) is at the top of `tools/make-images.mjs`. It needs Google Chrome, and it also writes `og.jpg`, the link preview. After new captures or slides, run it again and commit `public/assets/web/`.

## SEO

- `npm run build` also prerenders the page (`src/entry-server.jsx` + `tools/prerender.mjs`): `dist/index.html` carries the full page as HTML, so Google, Bing, AI crawlers and link previews read the content without running JavaScript. React then hydrates it (`src/main.jsx`). Keep render code free of `window`/`navigator` (use effects), or hydration breaks.
- The prerender also adds JSON-LD structured data: MobileApplication (name, category, free, App Store link), WebSite, and FAQPage (from `FAQS` in `src/config.js`).
- Head tags: title and description written for searches like "subscription tracker", canonical URL, Open Graph and Twitter cards, and the Smart App Banner (`apple-itunes-app`, app id 6817052525) on every page.
- `public/robots.txt` and `public/sitemap.xml` (update `lastmod` when pages change).
- After the domain is live: add it to Google Search Console (and Bing Webmaster Tools), verify with a DNS TXT record, and submit `https://subwall.guruchanworks.com/sitemap.xml`.

## Deploy (one-time setup)

1. Push this folder to `github.com/cmtania/subs-tracker-wall-docs` on the `main` branch.
2. In the repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. Custom domain: in **Settings → Pages → Custom domain** enter `subwall.guruchanworks.com` and tick **Enforce HTTPS** (`public/CNAME` carries the same name). At the DNS host for guruchanworks.com, add a **CNAME** record: `subwall` → `cmtania.github.io`.
4. Every push to `main` then builds and publishes to `https://subwall.guruchanworks.com/`. The old `cmtania.github.io/subs-tracker-wall-docs/` address redirects there.

Use these URLs in App Store Connect (the app's Settings → About Subwall links to the same pages):
- Support: `https://subwall.guruchanworks.com/support.html`
- Privacy Policy: `https://subwall.guruchanworks.com/privacy.html`

## Still a placeholder

- **App Store link:** `APP_STORE_URL` in `src/config.js`. Replace it once the app is live.
- **Support contact:** Christian Tania, tania.dev.ph@gmail.com. It's set in `SUPPORT_NAME` and `SUPPORT_EMAIL` in `src/config.js` (the footer), and written into `public/support.html`, `privacy.html` and `terms.html`.
- **Pro prices per country** (`src/config.js`):
  - **The visitor's country** comes from their time zone first (`Asia/Manila` → PH, see `REGION_BY_TIMEZONE`), then from their browser language (`en-US` → US). A phone in Manila set to English (US) still sees Philippine prices.
  - **Exact prices:** `PRICES` has three tables, `yearly`, `monthly` and `lifetime`, and a listed country shows its exact App Store price. Right now PH (₱799/year, ₱99/month, ₱1,490 lifetime) and US ($12.99/year, $1.99/month, $22.99 lifetime, Apple’s prices from the PH base) are listed. In the US, Yearly saves 45%.
  - **Everyone else** sees the PH price converted to their currency with rough exchange rates (`APPROX`), rounded (about £11/year in the UK, for example) and marked **approx.** A note under the plans says the App Store shows the exact price, taxes included, before they buy.
  - Once the products are set up, copy the prices for your main markets from App Store Connect (each product's **Price Schedule**) into `PRICES`. Those countries then show the exact price instead of an approximation. Update the rates in `APPROX` now and then.
  - "Save N% vs Monthly" is worked out from the yearly and monthly prices, rounded down, like the app's paywall.
- **Legal pages:** they're a solid starting point, but they aren't legal advice. Have them reviewed if you can.
