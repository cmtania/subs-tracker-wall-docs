import { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown } from '@phosphor-icons/react';

import { SPRING } from '../config.js';
import { scrollToId } from '../smooth-scroll.js';
import { AppStoreButton } from './common.jsx';
import { IPad, IPhone, LightSwitch, Tile } from './Devices.jsx';

// Tiles floating around the devices: [tile, left %, top %, size (px), rotation, depth].
const FLOATERS = [
  ['st', -2, 10, 132, -14, 1.4],
  ['cl', 90, 4, 118, 12, 1.1],
  ['fi', 94, 58, 104, -9, 1.6],
  ['te', -4, 64, 112, 10, 1.2],
  ['pa', 12, -8, 86, 8, 0.7],
];

export function Hero() {
  const [lightsOn, setLightsOn] = useState(false);
  const section = useRef(null);
  const reduce = useReducedMotion();

  // Scroll: the devices start tilted back and rise upright as the page scrolls.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const tilt = useTransform(scrollYProgress, [0, 0.45], [reduce ? 0 : 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [reduce ? 1 : 0.9, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  // Pointer: tiles drift a little with the mouse, deeper ones more.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section ref={section} className={`hero ${lightsOn ? 'lights-on' : ''}`} id="top" onPointerMove={onPointerMove}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-dark" />
        <div className="hero-bg-light" />
        <div className="hero-spot" />
        <div className="hero-slots" />
      </div>

      <div className="wrap hero-copy">
        <motion.span className="pill hero-pill" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}>
          <i /> For iPhone and iPad
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.06 }}>
          Every subscription,
          <br />
          <span className="grad">on one wall.</span>
        </motion.h1>
        <motion.p className="lead" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.12 }}>
          Subwall hangs everything you pay for on a 3D wall. See what’s due this week, get a heads-up before every
          renewal and find out where your money really goes.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.18 }}>
          <AppStoreButton variant={lightsOn ? 'dark' : 'light'} />
          <a
            className="btn btn-ghost"
            href="#how"
            onClick={(event) => {
              event.preventDefault();
              scrollToId('how');
            }}
          >
            See how it works <ArrowDown size={18} weight="bold" />
          </a>
          <div className="hero-switch">
            <LightSwitch on={lightsOn} onToggle={() => setLightsOn((v) => !v)} label="Room lights: try the switch" />
            <p>
              <b>Go on, flip the switch.</b>
              <span>Just like in the app, the room follows.</span>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="hero-stage-wrap">
        <motion.div className="hero-stage" style={{ rotateX: tilt, scale, y: lift }}>
          <IPad
            eager
            className="hero-ipad"
            active={lightsOn ? 1 : 0}
            screens={[
              ['pad-room-dark', 'Subwall on iPad with the lights off: the tile wall, this month’s total and a paper calendar'],
              ['pad-room', 'Subwall on iPad with the lights on'],
            ]}
          />
          <IPhone
            eager
            className="hero-iphone"
            active={lightsOn ? 1 : 0}
            screens={[
              ['phone-room-dark', 'Subwall on iPhone with the lights off'],
              ['phone-room', 'Subwall on iPhone with the lights on'],
            ]}
          />
          {FLOATERS.map(([name, left, top, size, rotate, depth], i) => (
            <Floater key={name} name={name} left={left} top={top} size={size} rotate={rotate} depth={depth} sx={sx} sy={sy} delay={0.5 + i * 0.08} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Floater({ name, left, top, size, rotate, depth, sx, sy, delay }) {
  const x = useTransform(sx, (v) => v * 60 * depth);
  const y = useTransform(sy, (v) => v * 40 * depth);
  return (
    <motion.div
      className="floater"
      style={{ left: `${left}%`, top: `${top}%`, '--size': `${size}px`, x, y }}
      initial={{ opacity: 0, scale: 0.6, rotate: rotate * 2 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ ...SPRING, duration: 0.9, delay }}
    >
      <div className="floater-bob" style={{ animationDelay: `${-depth * 2}s`, animationDuration: `${5 + depth * 2}s` }}>
        <Tile name={name} />
      </div>
    </motion.div>
  );
}
