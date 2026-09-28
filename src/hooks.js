import { useEffect, useState } from 'react';

import { PRICES } from './config.js';

/** The visitor's region from their browser language, e.g. "en-US" -> "US", "fil" -> "PH". */
function visitorRegion() {
  for (const tag of navigator.languages?.length ? navigator.languages : [navigator.language]) {
    try {
      const region = new Intl.Locale(tag).maximize().region;
      if (region) return region;
    } catch {
      // Ignore malformed language tags.
    }
  }
  return null;
}

/**
 * Subwall Pro prices for the visitor's App Store storefront, formatted for their locale:
 * { yearly: "₱799", monthly: "₱199", lifetime: "₱1,899", yearlySave: 66 }. A plan is missing
 * when we don't have a confirmed price for their region.
 */
export function useLocalPrices() {
  const [prices, setPrices] = useState({});
  useEffect(() => {
    const region = visitorRegion();
    const result = {};
    // Yearly against 12 months of Monthly, rounded down so the claim is never overstated
    // (₱799 / ₱2,388 = 33.5% -> save 66%). Same sum as the app's paywall badge.
    const yearly = PRICES.yearly[region];
    const monthly = PRICES.monthly[region];
    if (yearly && monthly && yearly.currency === monthly.currency && monthly.amount > 0) {
      const save = Math.floor((1 - yearly.amount / (12 * monthly.amount)) * 100);
      if (save > 0) result.yearlySave = save;
    }
    for (const [plan, table] of Object.entries(PRICES)) {
      const entry = table[region];
      if (!entry) continue;
      result[plan] = new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: entry.currency,
        minimumFractionDigits: Number.isInteger(entry.amount) ? 0 : 2,
      }).format(entry.amount);
    }
    setPrices(result);
  }, []);
  return prices;
}

/** Whether an image URL loads: lets a real screenshot replace the drawn screen. */
export function useImageExists(src) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (!src) {
      setOk(false);
      return;
    }
    let alive = true;
    const img = new Image();
    img.onload = () => alive && setOk(true);
    img.onerror = () => alive && setOk(false);
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);
  return ok;
}
