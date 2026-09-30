import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, Check, EnvelopeSimple, Lifebuoy } from '@phosphor-icons/react';

import { FAQS, PLANS, SPRING, SUPPORT_EMAIL, SUPPORT_NAME } from '../config.js';
import { useLocalPrices } from '../hooks.js';
import { AppStoreButton, Reveal, SectionHead } from './common.jsx';
import { Tile } from './Devices.jsx';

export function Pricing() {
  const prices = useLocalPrices();
  return (
    <section className="section pricing" id="pricing">
      <div className="wrap">
        <SectionHead
          eyebrow="Pricing"
          title={<>Free to start. <span className="grad-warm">Pro when you’re ready.</span></>}
          body="The free plan covers up to 7 subscriptions. Pro unlocks everything, yearly, monthly or once. The App Store charges in your local currency."
        />
        <div className="plans">
          {PLANS.map((plan, i) => {
            const local = plan.priceKey ? prices[plan.priceKey] : plan.price;
            return (
              <Reveal key={plan.name} className={`plan ${plan.featured ? 'plan-featured' : ''}`} delay={i * 0.07}>
                {plan.featured && <div className="plan-glow" aria-hidden="true" />}
                <div className="plan-head">
                  <h3>{plan.name}</h3>
                  {plan.featured && <span className="plan-badge"><plan.Icon size={14} weight="fill" /> 7 days free</span>}
                </div>
                <div className="plan-price">
                  {local ? (
                    <b>{local}</b>
                  ) : (
                    // No price at all (e.g. an unknown currency): words, never a guessed number.
                    <b className="plan-price-text">{plan.fallback[0]}</b>
                  )}
                  <span>
                    {local ? plan.note : plan.fallback[1]}
                    {local && plan.priceKey && prices.approx && <em className="approx"> · approx.</em>}
                  </span>
                </div>
                {plan.featured && (
                  <span className="plan-save">
                    {prices.yearlySave ? `Best value · save ${prices.yearlySave}% vs Monthly` : 'Best value'}
                  </span>
                )}
                <p className="plan-body">{plan.body}</p>
                <ul className="checks">
                  {plan.features.map((feature) => (
                    <li key={feature}><Check size={17} weight="bold" />{feature}</li>
                  ))}
                </ul>
                <AppStoreButton variant={plan.featured ? 'accent' : 'outline'} label={plan.cta} small />
              </Reveal>
            );
          })}
        </div>
        {prices.approx && (
          <p className="price-note">
            Prices marked approx. are converted to your currency as a guide. The App Store sets the exact price for
            your country, including any taxes, and shows it before you buy.
          </p>
        )}
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-side">
          <SectionHead
            center={false}
            eyebrow="FAQ"
            title={<>Questions, <span className="grad-warm">answered.</span></>}
            body={<>Everything else is on the <a href="support.html">Support page</a>.</>}
          />
          <Reveal className="help-card" delay={0.1}>
            <Lifebuoy size={28} weight="duotone" />
            <b>Still stuck?</b>
            <p>Write to {SUPPORT_NAME}. Most emails get an answer within a day or two.</p>
            <a className="btn btn-outline btn-small" href={`mailto:${SUPPORT_EMAIL}?subject=Subwall%20support`}>
              <EnvelopeSimple size={18} weight="bold" /> Email support
            </a>
          </Reveal>
        </div>
        <div className="faq-list">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} className={`faq-item ${isOpen ? 'open' : ''}`} delay={i * 0.04}>
                <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{q}</span>
                  <CaretDown size={22} weight="bold" className="faq-chevron" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={SPRING}
                    >
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="cta">
      <div className="cta-room" aria-hidden="true">
        <div className="cta-spot" />
        <div className="cta-wall">
          {['st', 'tu', 'pa', 'cl', 'ki', 'fi', 'te'].map((name, i) => (
            <motion.div
              key={name}
              className="cta-tile"
              initial={{ opacity: 0, y: -40, rotate: (i % 2 ? 1 : -1) * 12 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', bounce: 0.35, duration: 0.9, delay: 0.1 + i * 0.07 }}
            >
              <Tile name={name} />
            </motion.div>
          ))}
          {[0, 1, 2, 3, 4].map((i) => <span key={i} className="cta-slot" />)}
        </div>
      </div>
      <div className="wrap cta-copy">
        <Reveal>
          <h2>Hang your first tile <span className="grad">tonight.</span></h2>
          <p>Add the three subscriptions you pay for most, and see this week’s payments before they happen.</p>
          <div className="cta-actions">
            <AppStoreButton variant="light" />
          </div>
          <ul className="cta-facts">
            <li>Free to start</li>
            <li>No account</li>
            <li>iPhone and iPad</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <img src="assets/logo.svg" alt="" width="36" height="36" />
            <span>Subwall</span>
          </a>
          <p>Every subscription, on one wall. For iPhone and iPad.</p>
          <AppStoreButton variant="light" small />
        </div>
        <div className="footer-cols">
          <div>
            <b>Product</b>
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#widgets">Widgets</a>
            <a href="#ipad">iPad</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div>
            <b>Help</b>
            <a href="#faq">FAQ</a>
            <a href="support.html">Support</a>
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms of Service</a>
          </div>
          <div>
            <b>Contact</b>
            <span className="footer-name">{SUPPORT_NAME}</span>
            <a href={`mailto:${SUPPORT_EMAIL}?subject=Subwall%20support`}>{SUPPORT_EMAIL}</a>
          </div>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">Subwall</div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} Subwall. All rights reserved.</span>
        <span>Apple, iPhone, iPad and App Store are trademarks of Apple Inc.</span>
      </div>
    </footer>
  );
}
