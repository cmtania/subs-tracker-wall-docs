import { CreditCard } from '@phosphor-icons/react';
import { img, BRANDS } from '../config.js';

/**
 * Screens stacked in one frame. The first image sizes the frame; the others sit on top and
 * cross-fade in when they become `active`. Every screen is a real capture from the app.
 */
function Screens({ screens, active = 0, eager, sizes }) {
  return screens.map(([name, alt], i) => (
    <img
      key={name}
      src={img(name)}
      alt={i === active ? alt : ''}
      aria-hidden={i === active ? undefined : true}
      className={`screen ${i === 0 ? 'screen-base' : ''} ${i === active ? 'on' : ''}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager && i === active ? 'high' : undefined}
      sizes={sizes}
      draggable={false}
    />
  ));
}

/** iPhone 17 Pro in a titanium frame. `screens`: [[imageName, alt], …]. */
export function IPhone({ screens, active = 0, className = '', eager = false, style }) {
  return (
    <div className={`device iphone ${className}`} style={style}>
      <div className="device-glass">
        <Screens screens={screens} active={active} eager={eager} />
      </div>
    </div>
  );
}

/** iPad Pro 13-inch, landscape. */
export function IPad({ screens, active = 0, className = '', eager = false, style }) {
  return (
    <div className={`device ipad ${className}`} style={style}>
      <div className="device-glass">
        <Screens screens={screens} active={active} eager={eager} />
      </div>
    </div>
  );
}

/** The service's logo in white, drawn as a mask so any logo takes the tile's ink colour. */
function Logo({ name, className = 'brand-logo' }) {
  // Set on the element (not through a CSS variable), so the path resolves from the page.
  const mask = `url(assets/brands/${name}.svg) center / contain no-repeat`;
  return <i className={className} style={{ WebkitMask: mask, mask }} aria-hidden="true" />;
}

/**
 * A tile as it hangs on the app's wall: the service's logo on its colour over the price, with
 * the yellow border of a payment due this week (`due`). Drawn in CSS from BRANDS, so any example
 * service can hang anywhere on the page.
 */
export function Tile({ name, className = '', style, due = true }) {
  const [label, , color, price] = BRANDS[name] ?? BRANDS.netflix;
  if (!BRANDS[name]) name = 'netflix';
  return (
    <span className={`tile3d brand-tile ${due ? 'due' : ''} ${className}`} style={{ ...style, '--brand': color }} title={label} aria-hidden="true">
      <span className="brand-face">
        <b><Logo name={name} /></b>
        <small>${price.toFixed(2)}</small>
      </span>
    </span>
  );
}

/** The wall's "Due this week" card, drawn with example services. */
export function DueCard({ names, className = '' }) {
  const total = names.reduce((sum, n) => sum + BRANDS[n][3], 0);
  return (
    <div className={`lift-card due-card drawn-due ${className}`} role="img" aria-label={`The Due this week card: $${total.toFixed(2)} for ${names.map((n) => BRANDS[n][0]).join(', ')}`}>
      <span className="dd-kicker">Due this week</span>
      <div className="dd-row">
        <b>${total.toFixed(2)}</b>
        <span className="dd-stack">
          {names.map((n) => <span key={n} style={{ '--brand': BRANDS[n][2] }}><Logo name={n} /></span>)}
        </span>
      </div>
      <p>{names.map((n) => BRANDS[n][0]).join(', ')}</p>
      <p className="dd-foot"><span>From Credit Card</span><b>USD</b></p>
    </div>
  );
}

/** A lifted tile's card: name, price, how often, next date, and what pays for it. */
export function LiftedCard({ name, next, method, className = '' }) {
  const [label, , color, price] = BRANDS[name];
  return (
    <div className={`lift-card pays-card drawn-lifted ${className}`} role="img" aria-label={`A lifted tile's card: ${label}, $${price.toFixed(2)} monthly, paid with ${method}`}>
      <div className="dl-head">
        <span className="dl-icon" style={{ '--brand': color }}><Logo name={name} /></span>
        <span>
          <b>{label}</b>
          <small>${price.toFixed(2)} · Monthly · {next}</small>
        </span>
      </div>
      <p className="dl-paid"><CreditCard size={22} weight="fill" /> Paid with {method}</p>
      <p className="dl-hint">Drag a tile onto another slot to move it</p>
      <div className="dl-buttons"><span className="dl-details">Details</span><span className="dl-back">Put back</span></div>
    </div>
  );
}

/**
 * The room's light switch, as on the app's wall: a white plate with a rocker.
 * Flipping it turns the hero's room dark or light, like the app.
 */
export function LightSwitch({ on, onToggle, label = 'Room lights' }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`light-switch ${on ? 'is-on' : ''}`}
      onClick={onToggle}
    >
      <span className="switch-plate">
        <span className="switch-rocker" />
        <span className="switch-led" />
      </span>
    </button>
  );
}
