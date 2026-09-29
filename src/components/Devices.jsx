import { img } from '../config.js';

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

/** A 3D tile from the app's wall (cut from a real capture). */
export function Tile({ name, className = '', style }) {
  return <img className={`tile3d ${className}`} src={img(`tile-${name}`)} alt="" style={style} loading="lazy" draggable={false} />;
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
