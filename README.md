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

The drawings use made-up services (Streamly, Tunebox, CloudNest…) and no real logos, like the App Store screenshots should.

## Real app screenshots

Drop iPhone captures into `public/assets/screens/` as `wall.png`, `closeup.png`, `calendar.png` and `history.png`. That's the mapping in `SCREENSHOTS` in `src/config.js`. Each phone shows the real screenshot when the file exists, and otherwise a drawn version of the screen. Use demo brands in them, not real service logos.

## Deploy (one-time setup)

1. Push this folder to `github.com/cmtania/subs-tracker-wall-docs` on the `main` branch.
2. In the repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. Every push to `main` then builds and publishes to `https://cmtania.github.io/subs-tracker-wall-docs/`.

Use these URLs in App Store Connect (the app's Settings → About Subwall links to the same pages):
- Support: `https://cmtania.github.io/subs-tracker-wall-docs/support.html`
- Privacy Policy: `https://cmtania.github.io/subs-tracker-wall-docs/privacy.html`

## Still a placeholder

- **App Store link:** `APP_STORE_URL` in `src/config.js`. Replace it once the app is live.
- **Support contact:** Christian Tania, tania.dev.ph@gmail.com. It's set in `SUPPORT_NAME` and `SUPPORT_EMAIL` in `src/config.js` (the footer), and written into `public/support.html`, `privacy.html` and `terms.html`.
- **Pro prices per country** (`src/config.js`):
  - **The visitor's country** comes from their time zone first (`Asia/Manila` → PH, see `REGION_BY_TIMEZONE`), then from their browser language (`en-US` → US). A phone in Manila set to English (US) still sees Philippine prices.
  - **Exact prices:** `PRICES` has three tables, `yearly`, `monthly` and `lifetime`, and a listed country shows its exact App Store price. Right now only PH is listed (₱799/year, ₱199/month, ₱1,899 lifetime).
  - **Everyone else** sees the PH price converted to their currency with rough exchange rates (`APPROX`), rounded (about $14/year, $3.50/month, $33 lifetime in the US) and marked **approx.** A note under the plans says the App Store shows the exact price, taxes included, before they buy.
  - Once the products are set up, copy the prices for your main markets from App Store Connect (each product's **Price Schedule**) into `PRICES`. Those countries then show the exact price instead of an approximation. Update the rates in `APPROX` now and then.
  - "Save N% vs Monthly" is worked out from the yearly and monthly prices, rounded down, like the app's paywall.
- **Legal pages:** they're a solid starting point, but they aren't legal advice. Have them reviewed if you can.
