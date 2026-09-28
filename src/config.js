import {
  BellRinging,
  CalendarCheck,
  ChartBar,
  CreditCard,
  CurrencyCircleDollar,
  DeviceMobile,
  Export,
  EyeSlash,
  LockKey,
  MagnifyingGlass,
  PaintBrush,
  Sparkle,
  SquaresFour,
  WifiSlash,
} from '@phosphor-icons/react';

// TODO at launch: the real App Store URL.
export const APP_STORE_URL = 'https://apps.apple.com/app/subwall/id0000000000';
// Support contact (also written into public/support.html, privacy.html and terms.html).
export const SUPPORT_NAME = 'Christian Tania';
export const SUPPORT_EMAIL = 'tania.dev.ph@gmail.com';

// Real app screenshots (iPhone captures) go in public/assets/screens/. Until a file exists
// (or if it fails to load), the phone shows a drawn version of that screen instead.
// Use made-up brands in screenshots: no real service logos in marketing.
export const SCREENSHOTS = {
  wall: 'assets/screens/wall.png',
  closeup: 'assets/screens/closeup.png',
  calendar: 'assets/screens/calendar.png',
  history: 'assets/screens/history.png',
};

export const NAV = [
  ['Features', 'features'],
  ['How it works', 'how'],
  ['Pricing', 'pricing'],
  ['FAQ', 'faq'],
];

/**
 * Made-up services for the drawings (no real brands or logos on the site).
 * [name, monogram, colour, price, due this week]
 */
export const DEMO_TILES = [
  ['Streamly', 'S', '#E4572E', '$15.49', true],
  ['Tunebox', 'Tb', '#1F8A83', '$10.99', false],
  ['CloudNest', 'CN', '#3B4CCA', '$2.99', false],
  ['FitLoop', 'FL', '#3FA34D', '$24.00', true],
  ['Pixo AI', 'PA', '#8E3B8E', '$20.00', false],
  ['NewsDay', 'ND', '#C0392B', '$4.99', false],
  ['Kidflix', 'K', '#F2A93B', '$7.99', false],
  ['Drivebox', 'D', '#2E86DE', '$9.99', false],
  ['CodeHub', 'CH', '#3A3A3A', '$4.00', false],
  ['Lingo', 'L', '#B03A5B', '$6.99', true],
  ['Readly', 'Re', '#1F3A68', '$9.99', false],
  ['Gamepass', 'G', '#6B5A4A', '$14.99', false],
];

export const BENEFITS = [
  {
    Icon: BellRinging,
    title: 'Never miss a renewal',
    body: 'A reminder before every payment, at the time you choose, with the amount and the card it comes from.',
  },
  {
    Icon: CalendarCheck,
    title: 'See what’s due this week',
    body: 'Tiles due in the next seven days get a yellow border, and the wall shows this week’s total at a glance.',
  },
  {
    Icon: CurrencyCircleDollar,
    title: 'Any currency',
    body: 'Every subscription keeps its own currency. Totals list each one separately, with no guessed exchange rates.',
  },
  {
    Icon: CreditCard,
    title: 'Know which card pays',
    body: 'Note what each subscription is paid with, so you know which account to top up before the charge.',
  },
];

export const FEATURES = [
  {
    id: 'wall',
    eyebrow: 'Your subscriptions',
    title: 'Every subscription is a tile on a real 3D wall',
    body: 'Subwall puts what you pay for on a wall in a 3D room, with this month’s total and what’s due this week right above it. It’s the first time your subscriptions feel like something you can actually see.',
    points: ['Up to 20 tiles per wall, with a new wall as you grow (Pro)', 'Search 270+ services, or add your own with a photo or color', 'A light switch on the wall for a dark room at night'],
    screen: 'wall',
  },
  {
    id: 'closeup',
    eyebrow: 'Make it yours',
    title: 'Walk up to the wall and arrange it your way',
    body: 'Tap the wall to walk up to it. Drag a tile onto another slot to move it, or onto another tile to swap them. Tap a tile to see its price, next payment and the card it’s paid with.',
    points: ['Drag and drop, with an outline showing where it lands', 'Tap an empty slot to add a subscription right there', 'Pause or cancel a tile without losing its history'],
    screen: 'closeup',
  },
  {
    id: 'calendar',
    eyebrow: 'Stay ahead',
    title: 'Slide along the wall to your calendar',
    body: 'Swipe to a paper calendar with every payment day circled in its service’s color, and a sticky note of what’s due this week. The Calendar tab lists every payment, day by day.',
    points: ['This month and this week’s totals on top', 'Tap a day to see exactly what renews', 'History shows your spending month by month'],
    screen: 'calendar',
  },
];

export const BENTO = [
  {
    id: 'themes',
    Icon: PaintBrush,
    title: 'Six rooms to choose from',
    body: 'Sage boards, Blush polka dots, Dune limewash, a gold Midnight lattice, Lilac flowers, or a wall built from 3D pixel blocks.',
    pro: true,
  },
  {
    id: 'share',
    Icon: Export,
    title: 'Share your wall',
    body: 'Turn your wall into a clean picture for Instagram or Messages. Prices stay hidden unless you choose to show them.',
  },
  {
    id: 'history',
    Icon: ChartBar,
    title: 'See where the money goes',
    body: 'Spending by month and by category, plus every price rise and how much you’ve saved since cancelling.',
  },
  {
    id: 'privacy',
    Icon: LockKey,
    title: 'Private by design',
    body: 'No account, no bank connection and no server. Your subscriptions stay on your iPhone.',
    points: [
      [LockKey, 'No sign-in'],
      [EyeSlash, 'No ads or tracking'],
      [WifiSlash, 'Works offline'],
      [DeviceMobile, 'Data stays on device'],
    ],
  },
];

export const STEPS = [
  {
    Icon: MagnifyingGlass,
    title: 'Pick your services',
    body: 'Search 270+ services, with the popular ones in your country first, or add any other subscription yourself.',
  },
  {
    Icon: SquaresFour,
    title: 'Hang them on your wall',
    body: 'Add the price, how often it renews and the next payment. The tile takes its place on the wall.',
  },
  {
    Icon: BellRinging,
    title: 'Get reminded in time',
    body: 'Subwall reminds you before each payment and before every free trial ends, so nothing renews by surprise.',
  },
];

// Subwall Pro prices per App Store storefront (ISO region code -> ISO currency and amount).
// Copy these from App Store Connect: each subscription / in-app purchase -> Price Schedule lists
// every storefront. Visitors whose region isn't listed see words instead of a number, so an
// unconfirmed guess is never shown.
export const PRICES = {
  yearly: {
    PH: { currency: 'PHP', amount: 799 },
  },
  monthly: {
    PH: { currency: 'PHP', amount: 199 },
  },
  lifetime: {
    PH: { currency: 'PHP', amount: 1899 },
  },
};

export const PLANS = [
  {
    name: 'Free',
    price: 'Free',
    note: 'forever',
    body: 'Everything you need to keep track of what you pay for.',
    features: [
      'The 3D wall, calendar and reminders',
      'Up to 12 subscriptions',
      'Every currency, per subscription',
      '3 months of history',
      'Share your wall',
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
      '6 room themes',
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
    a: 'Yes. The free plan includes the 3D wall, the calendar, reminders and 3 months of history for up to 12 subscriptions. Subwall Pro removes the limit and adds full history, six room themes, Face ID lock and app icons.',
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
    a: 'Yes. Each subscription keeps its own currency, and totals show each currency separately, like “$42.97 + €9.99”. Subwall doesn’t convert between them, so the numbers never depend on a guessed exchange rate.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. Subwall has no accounts and no servers. Everything you add stays on your iPhone.',
  },
  {
    q: 'What happens when my wall is full?',
    a: 'A wall holds 20 tiles. With Subwall Pro, once every slot is used a second wall appears where the calendar was, and the calendar moves along. Swipe from wall to wall, then on to the calendar.',
  },
  {
    q: 'Which devices are supported?',
    a: 'Subwall is made for iPhone with iOS 26 or later. It also runs on iPad as an iPhone app. Each device keeps its own subscriptions (there’s no syncing yet), and Subwall Pro works on every device with the same Apple ID.',
  },
];

/** Apple-style spring: critically damped (no bounce). */
export const SPRING = { type: 'spring', bounce: 0, duration: 0.6 };
