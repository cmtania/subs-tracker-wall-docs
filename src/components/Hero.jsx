import { motion } from 'motion/react';
import { ArrowRight, BellRinging, CalendarCheck, Sparkle } from '@phosphor-icons/react';

import { SPRING } from '../config.js';
import { scrollToId } from '../smooth-scroll.js';
import { AppStoreButton } from './common.jsx';
import { Phone } from './Phone.jsx';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-inner">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING}
        >
          <span className="pill">
            <Sparkle size={16} /> New for iPhone and iPad
          </span>
          <h1>
            Every subscription, on a <span className="mark">wall you can see</span>
          </h1>
          <p className="lead">
            Subwall hangs everything you pay for on a 3D wall. See what’s due this week, get reminded before every
            renewal and find out where your money really goes.
          </p>
          <div className="hero-actions">
            <AppStoreButton />
            <a
              className="btn btn-light"
              href="#features"
              onClick={(event) => {
                event.preventDefault();
                scrollToId('features');
              }}
            >
              Explore features <ArrowRight size={19} />
            </a>
          </div>
          <ul className="hero-facts">
            <li><b>Free</b> to start</li>
            <li><b>No</b> account</li>
            <li><b>Any</b> currency</li>
          </ul>
        </motion.div>

        <div className="hero-visual">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ ...SPRING, delay: 0.1 }}
          >
            <Phone screen="wall" className="phone-hero" />
          </motion.div>
          <motion.div
            className="float-card float-reminder"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING, delay: 0.35 }}
          >
            <span className="float-icon accent"><BellRinging weight="fill" size={21} /></span>
            <div>
              <b>Streamly renews tomorrow</b>
              <span>$15.49 will be charged to Visa •1234</span>
            </div>
          </motion.div>
          <motion.div
            className="float-card float-week"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING, delay: 0.5 }}
          >
            <span className="float-icon yellow"><CalendarCheck weight="fill" size={21} /></span>
            <div>
              <b>$46.48 due this week</b>
              <span>Streamly, FitLoop and Lingo</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
