import {
  BellRinging,
  CalendarCheck,
  CreditCard,
  CurrencyCircleDollar,
  DeviceMobile,
  EyeSlash,
  LockKey,
  Sparkle,
  SquaresFour,
  WifiSlash,
} from '@phosphor-icons/react';

// TODO at launch: the real App Store URL.
export const APP_STORE_URL = 'https://apps.apple.com/app/subwall/id0000000000';
// Support contact (also written into public/support.html, privacy.html and terms.html).
export const SUPPORT_NAME = 'Christian Tania';
export const SUPPORT_EMAIL = 'tania.dev.ph@gmail.com';

/** Web images made by tools/make-images.mjs from the app's real captures. */
export const img = (name) => `assets/web/${name}.webp`;

export const NAV = [
  ['How it works', 'how'],
  ['Features', 'features'],
  ['Widgets', 'widgets'],
  ['iPad', 'ipad'],
  ['Pricing', 'pricing'],
  ['FAQ', 'faq'],
];

/** The scroll story: one pinned iPhone, one screen per step (real captures). */
export const STORY = [
  {
    screen: 'phone-room',
    kicker: 'Your room',
    title: 'Every subscription hangs on the wall',
    body: 'Each thing you pay for is a tile, with this month’s total and what’s due this week right above it. Tiles due in the next seven days get a yellow border.',
  },
  {
    screen: 'phone-closeup',
    kicker: 'Walk up close',
    title: 'Arrange it your way',
    body: 'Tap the wall to walk up to it. Drag a tile onto another slot to move it, or tap an empty slot to add a subscription right there.',
  },
  {
    screen: 'phone-lifted',
    kicker: 'Pick up a tile',
    title: 'Everything about it, in one tap',
    body: 'Lift a tile to see its price, how often it renews, the next payment and the card it’s charged to.',
  },
  {
    screen: 'phone-calwall',
    kicker: 'Slide along the wall',
    title: 'A paper calendar, next to your tiles',
    body: 'Swipe along the wall to a calendar with this month’s total. Tap it to open the full Calendar.',
  },
  {
    screen: 'phone-calendar',
    kicker: 'Plan the month',
    title: 'Know what’s coming, day by day',
    body: 'Every payment day is dotted in its service’s colour. Tap a day to see exactly what renews and what it adds up to.',
  },
];

/** Big numbers band. Every figure is what the app ships with. */
export const NUMBERS = [
  { value: 270, suffix: '+', label: 'services in the catalog' },
  { value: 7, label: 'rooms to choose from' },
  { value: 7, label: 'calendar styles' },
  { value: 0, label: 'accounts, ads or trackers' },
];

export const MARQUEE = [
  [BellRinging, 'Reminders before every renewal'],
  [CalendarCheck, 'What’s due this week'],
  [CurrencyCircleDollar, 'Any currency'],
  [CreditCard, 'Know which card pays'],
  [LockKey, 'No account'],
  [EyeSlash, 'No ads or tracking'],
  [WifiSlash, 'Works offline'],
  [DeviceMobile, 'iPhone and iPad'],
  [SquaresFour, 'Home and Lock Screen widgets'],
];

export const PRIVACY_POINTS = [
  [LockKey, 'No sign-in'],
  [EyeSlash, 'No ads or tracking'],
  [WifiSlash, 'Works offline'],
  [DeviceMobile, 'Data stays on device'],
];

/** Each room theme's wall as a swatch: its colour plus a CSS hint of its pattern. */
export const THEMES = [
  ['Sky', 'repeating-linear-gradient(90deg,rgba(255,255,255,.28) 0 7px,transparent 7px 14px),#C9DAE8', 'Free'],
  ['Sage', 'repeating-linear-gradient(90deg,rgba(0,0,0,.14) 0 1px,rgba(255,255,255,.2) 1px 2px,transparent 2px 9px),#B7C6AC'],
  ['Brick', 'linear-gradient(rgba(0,0,0,.13) 1px,transparent 1px) 0 0/16px 7px,linear-gradient(90deg,rgba(0,0,0,.13) 1px,transparent 1px) 0 0/16px 14px,linear-gradient(90deg,rgba(0,0,0,.13) 1px,transparent 1px) 8px 7px/16px 14px,#F1F1EE'],
  ['Dune', 'radial-gradient(60% 50% at 30% 30%,rgba(255,255,255,.35),transparent),radial-gradient(50% 60% at 75% 70%,rgba(0,0,0,.08),transparent),#E0CFB5'],
  ['Midnight', 'linear-gradient(60deg,transparent 46%,rgba(212,176,106,.8) 48% 52%,transparent 54%) 0 0/12px 20px,linear-gradient(-60deg,transparent 46%,rgba(212,176,106,.8) 48% 52%,transparent 54%) 0 0/12px 20px,#2B3A55'],
  ['Lilac', 'radial-gradient(circle,rgba(255,255,255,.65) 2px,transparent 2.5px) 0 0/12px 12px,radial-gradient(circle,rgba(255,255,255,.65) 2px,transparent 2.5px) 6px 6px/12px 12px,#D4CBE5'],
  ['Blocks', 'linear-gradient(rgba(0,0,0,.18) 1px,transparent 1px) 0 0/12px 12px,linear-gradient(90deg,rgba(0,0,0,.18) 1px,transparent 1px) 0 0/12px 12px,conic-gradient(#8a8a8a 25%,#9a9a9a 0 50%,#848484 0 75%,#949494 0) 0 0/6px 6px'],
];

/** iPad showcase tabs: the same app, on the big screen. */
export const IPAD_TABS = [
  ['The wall', 'pad-room'],
  ['Up close', 'pad-lifted'],
  ['Calendar', 'pad-calendar'],
  ['Room themes', 'pad-themes'],
  ['Lights off', 'pad-closeup-dark'],
];

/** The widgets (images cut from Home Screen captures; the Lock Screen set is drawn). */
export const WIDGETS = [
  { name: 'Due this week', blurb: 'The week’s total, and the tiles behind it.', pro: false, image: 'widget-due', shape: 'small', alt: 'The Due this week widget: $45.96, 4 payments' },
  { name: 'Next payment', blurb: 'Two on the same day? You see both, and the total.', pro: true, image: 'widget-next-wide', shape: 'wide', alt: 'The Next payment widget: 2 renewals today, $25.98, Tunebox and Pixo AI' },
  { name: 'This month', blurb: 'Paid so far, still to go, and your yearly total.', pro: true, image: 'widget-month-wide', shape: 'wide', alt: 'The This month widget: $45.96, 2 of 4 paid, $25.98 to go' },
  { name: 'Mini wall', blurb: 'Your tiles on the Home Screen. Due ones glow yellow.', pro: true, image: 'widget-wall-large', shape: 'large', alt: 'The Mini wall widget: seven tiles with prices on the Sky wall' },
  { name: 'Lock Screen', blurb: 'A count, your next payment, and a line by the clock.', pro: true, lock: true, shape: 'lock', alt: 'Lock Screen widgets: 4 due this week, and the next payment' },
];

/** The App Store screenshots (made in the app repo, design/appstore), for the gallery. */
export const SLIDES = {
  iphone: ['01-wall', '02-lights', '03-up-close', '04-reminders', '05-calendar', '06-totals', '07-rooms', '08-widgets', '09-share', '10-pro'],
  ipad: ['01-wall', '02-lights', '03-up-close', '04-reminders', '05-calendar', '06-rooms', '07-widgets', '08-share', '09-pro', '10-iphone-and-ipad'],
};

// Exact Subwall Pro prices per App Store storefront (ISO region code -> ISO currency and amount).
// Copy these from App Store Connect: each subscription / in-app purchase -> Price Schedule lists
// every storefront. A listed region shows its exact price. Every other visitor sees an
// approximate price in their currency, converted from the Philippine price below (see APPROX).
export const PRICES = {
  yearly: {
    PH: { currency: 'PHP', amount: 799 },
    US: { currency: 'USD', amount: 12.99 },
  },
  monthly: {
    PH: { currency: 'PHP', amount: 99 },
    US: { currency: 'USD', amount: 1.99 },
  },
  lifetime: {
    PH: { currency: 'PHP', amount: 1490 },
    US: { currency: 'USD', amount: 22.99 },
  },
};

/**
 * Approximate prices for regions without an exact entry in PRICES: the Philippine (base) price
 * converted with rough exchange rates, rounded, and always labelled "approx.". Apple sets the
 * real local price (with taxes and its own price points), and the App Store shows it before
 * anyone buys, so these are only a guide. Rates are units of each currency per 1 US dollar;
 * update them now and then, or replace a region with its exact App Store price in PRICES.
 */
export const APPROX = {
  base: 'PH',
  phpPerUsd: 57,
  usdRates: {
    USD: 1, EUR: 0.92, GBP: 0.78, JPY: 150, INR: 84, AUD: 1.52, CAD: 1.37, SGD: 1.34,
    MYR: 4.45, IDR: 16000, THB: 34, VND: 25500, KRW: 1380, BRL: 5.6, MXN: 18.5, AED: 3.67,
    SAR: 3.75, CHF: 0.88, SEK: 10.5, NOK: 10.8, DKK: 6.9, PLN: 4, NZD: 1.68, HKD: 7.8,
    TWD: 32, ZAR: 18,
  },
  // Storefront currency by region (the App Store uses USD in many other countries).
  currencyByRegion: {
    US: 'USD', GB: 'GBP', JP: 'JPY', IN: 'INR', AU: 'AUD', CA: 'CAD', SG: 'SGD', MY: 'MYR',
    ID: 'IDR', TH: 'THB', VN: 'VND', KR: 'KRW', BR: 'BRL', MX: 'MXN', AE: 'AED', SA: 'SAR',
    CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN', NZ: 'NZD', HK: 'HKD', TW: 'TWD',
    ZA: 'ZAR', DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR',
    IE: 'EUR', PT: 'EUR', FI: 'EUR', GR: 'EUR', SK: 'EUR', SI: 'EUR', LT: 'EUR', LV: 'EUR',
    EE: 'EUR', LU: 'EUR', CY: 'EUR', MT: 'EUR', HR: 'EUR',
  },
  fallbackCurrency: 'USD',
};

// Where a visitor is, from their time zone: a better guess of their App Store country than the
// browser language (a phone in Manila set to English (US) is still a Philippine App Store).
export const REGION_BY_TIMEZONE = {
  'Asia/Manila': 'PH', 'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
  'America/Phoenix': 'US', 'America/Los_Angeles': 'US', 'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US', 'America/Detroit': 'US', 'Europe/London': 'GB', 'Europe/Dublin': 'IE',
  'Europe/Berlin': 'DE', 'Europe/Paris': 'FR', 'Europe/Madrid': 'ES', 'Europe/Rome': 'IT',
  'Europe/Amsterdam': 'NL', 'Europe/Brussels': 'BE', 'Europe/Vienna': 'AT', 'Europe/Lisbon': 'PT',
  'Europe/Helsinki': 'FI', 'Europe/Athens': 'GR', 'Europe/Zurich': 'CH', 'Europe/Stockholm': 'SE',
  'Europe/Oslo': 'NO', 'Europe/Copenhagen': 'DK', 'Europe/Warsaw': 'PL', 'Asia/Tokyo': 'JP',
  'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU', 'Australia/Perth': 'AU', 'Australia/Adelaide': 'AU',
  'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Edmonton': 'CA',
  'Asia/Singapore': 'SG', 'Asia/Kuala_Lumpur': 'MY', 'Asia/Jakarta': 'ID', 'Asia/Bangkok': 'TH',
  'Asia/Ho_Chi_Minh': 'VN', 'Asia/Saigon': 'VN', 'Asia/Seoul': 'KR', 'America/Sao_Paulo': 'BR',
  'America/Mexico_City': 'MX', 'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA', 'Pacific/Auckland': 'NZ',
  'Asia/Hong_Kong': 'HK', 'Asia/Taipei': 'TW', 'Africa/Johannesburg': 'ZA',
};

export const PLANS = [
  {
    name: 'Free',
    price: 'Free',
    note: 'forever',
    body: 'Everything you need to keep track of what you pay for.',
    features: [
      'The 3D wall, calendar and reminders',
      'Up to 7 subscriptions',
      'Every currency, per subscription',
      '3 months of history',
      'Share your wall',
      'Due this week widget',
    ],
    cta: 'Download free',
  },
  {
    name: 'Pro Yearly',
    // Price filled in per visitor from PRICES.yearly (see useLocalPrices in hooks.js).
    priceKey: 'yearly',
    note: 'per year',
    fallback: ['Yearly', 'in your currency'],
    body: 'Try every Pro feature free for 7 days, then pay once a year.',
    features: [
      'Everything in Free',
      'Unlimited subscriptions, a new wall every 20',
      'Full history and charts',
      '6 room themes and 6 calendar styles',
      'Home and Lock Screen widgets',
      'Face ID lock and app icons',
    ],
    cta: 'Start free trial',
    featured: true,
    Icon: Sparkle,
  },
  {
    name: 'Pro Monthly',
    priceKey: 'monthly',
    note: 'per month',
    fallback: ['Monthly', 'in your currency'],
    body: 'All of Pro, month to month. Paid from the first day, cancel anytime.',
    features: [
      'Everything in Pro Yearly',
      'No yearly commitment',
      'Cancel anytime in Settings',
    ],
    cta: 'Subscribe',
  },
  {
    name: 'Lifetime',
    priceKey: 'lifetime',
    note: 'once, no subscription',
    fallback: ['One-time price', 'in your currency, on the App Store'],
    body: 'Pay once and keep every Pro feature forever.',
    features: [
      'Everything in Pro',
      'Pay once, never again',
      'Future Pro updates included',
    ],
    cta: 'Get Lifetime',
  },
];

// Short list for the landing page; the full set is on support.html.
export const FAQS = [
  {
    q: 'Is Subwall free?',
    a: 'Yes. The free plan includes the 3D wall, the calendar, reminders and 3 months of history for up to 7 subscriptions. Subwall Pro removes the limit and adds full history, more widgets, six room themes, Face ID lock and app icons.',
  },
  {
    q: 'Does Subwall connect to my bank or cancel subscriptions for me?',
    a: 'No. You add your subscriptions yourself, and Subwall keeps track and reminds you. It never connects to your bank, cards or accounts. When you want to cancel, many services in the catalog have a Manage or cancel link to their own page, where you cancel it yourself.',
  },
  {
    q: 'How does the free trial work?',
    a: 'Pro Yearly starts with 7 days free, once per Apple ID. Subwall adds your trial to the wall and reminds you 2 days before it ends. If you don’t cancel at least 24 hours before the end, the yearly plan starts. Pro Monthly and Lifetime have no trial.',
  },
  {
    q: 'I pay in different currencies. Does that work?',
    a: 'Yes. Each subscription keeps its own price and currency, and reminders say exactly what will be charged. Totals on the wall, the calendar and History add everything up in your main currency, marked ≈, using daily exchange rates from the European Central Bank. Your bank’s own rate and fees may differ a little.',
  },
  {
    q: 'Are there widgets?',
    a: 'Yes. The Due this week widget is free: it shows what renews in the next seven days and what it adds up to. Subwall Pro adds Next payment, This month, a Mini wall of your tiles, and three Lock Screen widgets. Add them from the Home Screen: touch and hold, tap Edit, then Add Widget, and search for Subwall.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. Subwall has no accounts and no servers. Everything you add stays on your iPhone or iPad.',
  },
  {
    q: 'What happens when my wall is full?',
    a: 'A wall holds 20 tiles. With Subwall Pro, once every slot is used a second wall appears where the calendar was, and the calendar moves along. Swipe from wall to wall, then on to the calendar.',
  },
  {
    q: 'Which devices are supported?',
    a: 'Any iPhone with iOS 26 or later, and any iPad with iPadOS 26 or later, with a layout made for iPad in portrait, landscape and Split View. Each device keeps its own subscriptions (there’s no syncing yet), and Subwall Pro works on every device with the same Apple ID.',
  },
];

/** Apple-style spring: critically damped (no bounce). */
export const SPRING = { type: 'spring', bounce: 0, duration: 0.6 };
