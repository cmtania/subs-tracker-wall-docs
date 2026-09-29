import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, DeviceMobile, DeviceTablet } from '@phosphor-icons/react';

import { img, IPAD_TABS, MARQUEE, NUMBERS, SLIDES, SPRING } from '../config.js';
import { CountUp, Reveal, SectionHead } from './common.jsx';
import { IPad, IPhone } from './Devices.jsx';

/** A slow ticker of what Subwall does, doubled so it loops seamlessly. */
export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-label="Highlights">
      <div className="marquee-track">
        {items.map(([Icon, text], i) => (
          <span key={i} className="marquee-item" aria-hidden={i >= MARQUEE.length ? true : undefined}>
            <Icon size={22} weight="duotone" /> {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Numbers() {
  return (
    <section className="numbers">
      <div className="wrap numbers-grid">
        {NUMBERS.map(({ value, suffix, label }, i) => (
          <Reveal key={label} className="number" delay={i * 0.08}>
            <b><CountUp value={value} suffix={suffix} /></b>
            <span>{label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** "Made for iPad": the big screen, with tabs that switch the iPad's screen. */
export function IpadShowcase() {
  const [tab, setTab] = useState(0);
  const section = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 80, reduce ? 0 : -80]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 160, reduce ? 0 : -120]);

  return (
    <section className="section ipad-showcase" id="ipad" ref={section}>
      <div className="ipad-glow" aria-hidden="true" />
      <div className="wrap">
        <SectionHead
          className="on-dark"
          eyebrow="iPad"
          title={<>A wall that fills <span className="grad">the big screen.</span></>}
          body="Subwall is made for iPad too: a full-size room in landscape or portrait, and in Split View. Your subscriptions stay on each device, and Pro works on all of them with the same Apple ID."
        />
        <div className="ipad-tabs" role="tablist" aria-label="iPad screens">
          {IPAD_TABS.map(([label], i) => (
            <button key={label} role="tab" aria-selected={i === tab} className={i === tab ? 'on' : ''} onClick={() => setTab(i)}>
              {i === tab && <motion.span layoutId="ipad-tab" className="ipad-tab-bg" transition={SPRING} />}
              <span className="tab-label">{label}</span>
            </button>
          ))}
        </div>
        <div className="ipad-stage">
          <motion.div style={{ y }}>
            <IPad
              className="showcase-ipad"
              active={tab}
              screens={IPAD_TABS.map(([label, name]) => [name, `Subwall on iPad: ${label}`])}
            />
          </motion.div>
          <motion.div className="showcase-phone-wrap" style={{ y: phoneY }}>
            <IPhone className="showcase-phone" screens={[['phone-room-dark', 'Subwall on iPhone, lights off']]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** The App Store screenshots in a snapping, draggable strip. */
export function Gallery() {
  const [device, setDevice] = useState('iphone');
  const strip = useRef(null);
  const slides = SLIDES[device];
  const step = (dir) => {
    const el = strip.current;
    if (!el) return;
    const card = el.querySelector('.slide');
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 24 : 400), behavior: 'smooth' });
  };

  // Drag to scroll with a mouse (touch already scrolls natively).
  const drag = useRef(null);
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: strip.current.scrollLeft, moved: false };
    strip.current.classList.add('dragging');
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    strip.current.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => {
    drag.current = null;
    strip.current?.classList.remove('dragging');
  };

  return (
    <section className="section gallery" id="gallery">
      <div className="wrap gallery-head">
        <SectionHead
          center={false}
          eyebrow="On the App Store"
          title={<>Take the <span className="grad-warm">full tour.</span></>}
          body="Every screen here is Subwall as it runs on iPhone and iPad, with made-up services."
        />
        <div className="gallery-controls">
          <div className="seg" role="tablist" aria-label="Device">
            <button role="tab" aria-selected={device === 'iphone'} className={device === 'iphone' ? 'on' : ''} onClick={() => setDevice('iphone')}>
              <DeviceMobile size={18} weight="bold" /> iPhone
            </button>
            <button role="tab" aria-selected={device === 'ipad'} className={device === 'ipad' ? 'on' : ''} onClick={() => setDevice('ipad')}>
              <DeviceTablet size={18} weight="bold" /> iPad
            </button>
          </div>
          <div className="gallery-arrows">
            <button aria-label="Previous screenshots" onClick={() => step(-1)}><ArrowLeft size={20} weight="bold" /></button>
            <button aria-label="Next screenshots" onClick={() => step(1)}><ArrowRight size={20} weight="bold" /></button>
          </div>
        </div>
      </div>
      <div
        className={`gallery-strip strip-${device}`}
        ref={strip}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        {slides.map((name, i) => (
          <motion.figure
            key={`${device}-${name}`}
            className="slide"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ ...SPRING, delay: Math.min(i, 4) * 0.05 }}
          >
            <img
              src={img(`slide-${device}-${name}`)}
              alt={`App Store screenshot ${i + 1} of ${slides.length} (${device === 'ipad' ? 'iPad' : 'iPhone'})`}
              loading="lazy"
              draggable={false}
            />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
