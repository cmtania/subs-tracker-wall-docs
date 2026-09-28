import { DEMO_TILES } from '../config.js';

/**
 * A front view of Subwall's tile wall, laid out like the app: a block of 4 columns x 5 rows,
 * with "This month" and "Due this week" panels above it. Tiles due this week get the app's
 * yellow border. Everything is sized in cqw (1% of the wall's width), so it scales anywhere.
 */

// Which of the 20 slots hold the demo tiles; the rest are empty, like a real wall mid-way.
const FILLED_SLOTS = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 13];

export function Wall({ className = '', panels = true, prices = true, plus = false, lifted = -1 }) {
  const bySlot = new Map(FILLED_SLOTS.map((slot, i) => [slot, i]));
  return (
    <div className={`wall ${className}`} aria-hidden="true">
      {panels && (
        <div className="wall-panels">
          <div className="panel panel-month">
            <small>This month</small>
            <b>$86.40</b>
            <span>9 payments</span>
          </div>
          <div className="panel panel-week">
            <small>Due this week</small>
            <b>$46.48</b>
            <span>Streamly, FitLoop and Lingo</span>
          </div>
        </div>
      )}
      <div className="wall-grid">
        {Array.from({ length: 20 }, (_, slot) => {
          const index = bySlot.get(slot);
          if (index === undefined) {
            return <div key={slot} className="slot">{plus && <span>+</span>}</div>;
          }
          const [name, mark, color, price, due] = DEMO_TILES[index];
          return (
            <div
              key={slot}
              className={`tile ${due ? 'due' : ''} ${index === lifted ? 'lifted' : ''}`}
              style={{ background: color, color: inkOn(color) }}
              title={name}
            >
              <span className="tile-mark">{mark}</span>
              {prices && <span className="tile-price">{price}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** A small rounded tile, as used on list rows and cards. */
export function TileBadge({ index, size = 'md' }) {
  const [, mark, color] = DEMO_TILES[index];
  return (
    <span className={`badge badge-${size}`} style={{ background: color, color: inkOn(color) }}>
      {mark}
    </span>
  );
}

/** Dark ink on light tile colours, white on the rest (same rule as the app). */
export function inkOn(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.6 ? '#15130F' : '#FFFFFF';
}
