import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { LockSimple } from '@phosphor-icons/react';

import { img, SPRING, WIDGETS } from '../config.js';
import { Reveal, SectionHead } from './common.jsx';

/**
 * Widgets: a Home Screen with the real widgets on it (cut from Home Screen captures).
 * Picking one on the left swaps the big widget in the middle; the others stay around it.
 */
export function Widgets() {
  const [pick, setPick] = useState(0);
  const section = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, reduce ? 0 : -50]);
  const driftBack = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -30, reduce ? 0 : 30]);
  const current = WIDGETS[pick];

  return (
    <section className="section widgets" id="widgets" ref={section}>
      <div className="widgets-wallpaper" aria-hidden="true" />
      <div className="wrap widgets-grid">
        <div className="widgets-copy">
          <SectionHead
            center={false}
            className="on-dark"
            eyebrow="Widgets"
            title={<>Your week, on your <span className="grad">Home Screen.</span></>}
            body="See what’s due without opening the app. Widgets update when you change something and at midnight, and a tap takes you straight to your wall."
          />
          <Reveal className="widget-list" delay={0.1}>
            <div role="tablist" aria-label="Widgets">
              {WIDGETS.map((w, i) => (
                <button
                  key={w.name}
                  role="tab"
                  aria-selected={i === pick}
                  className={`widget-tab ${i === pick ? 'on' : ''}`}
                  onClick={() => setPick(i)}
                  onMouseEnter={() => setPick(i)}
                >
                  <span className="widget-tab-text">
                    <b>{w.name}</b>
                    <small>{w.blurb}</small>
                  </span>
                  <span className={`widget-chip ${w.pro ? 'pro' : 'free'}`}>
                    {w.pro && <LockSimple size={12} weight="fill" />}
                    {w.pro ? 'Pro' : 'Free'}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="widgets-stage">
          {/* Two small widgets drifting behind, at different speeds. */}
          <motion.img className="widget-float float-a" src={img('widget-due')} alt="" style={{ y: driftBack }} loading="lazy" />
          <motion.img className="widget-float float-b" src={img('widget-month')} alt="" style={{ y: drift }} loading="lazy" />
          <div className={`widget-main shape-${current.shape}`}>
            <AnimatePresence mode="popLayout" initial={false}>
              {current.lock ? (
                // The Lock Screen set, drawn: one line above the clock, a round count, a rectangle.
                <motion.div
                  key="lock"
                  className="lock-set"
                  role="img"
                  aria-label={current.alt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={SPRING}
                >
                  <div className="lock-inline">4 due this week · $45.96</div>
                  <div className="lock-clock">9:41</div>
                  <div className="lock-row">
                    <div className="lock-circle"><b>4</b><small>due</small></div>
                    <div className="lock-rect">
                      <b>Today</b>
                      <span>2 renewals · $25.98</span>
                      <small>Tunebox and Pixo AI</small>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.img
                  key={current.image}
                  src={img(current.image)}
                  alt={current.alt}
                  initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.94, rotate: 2 }}
                  transition={SPRING}
                  draggable={false}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
