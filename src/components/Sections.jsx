import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, CaretDown } from '@phosphor-icons/react';

import { BENEFITS, BENTO, FAQS, FEATURES, PLANS, SPRING, STEPS, SUPPORT_EMAIL, SUPPORT_NAME } from '../config.js';
import { useLocalPrices } from '../hooks.js';
import { AppStoreButton, Reveal, SectionHead } from './common.jsx';
import { Phone } from './Phone.jsx';
import { Wall } from './Wall.jsx';

export function Benefits() {
  return (
    <section className="section" id="benefits">
      <div className="wrap">
        <SectionHead
          eyebrow="Why Subwall"
          title="A subscription tracker you’ll actually open"
          body="Everything you need to stay on top of what you pay for, without spreadsheets or bank logins."
        />
        <div className="benefit-grid">
          {BENEFITS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} className="card benefit" delay={i * 0.06}>
              <span className="icon-tile"><Icon size={26} /></span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className="section section-tint" id="features">
      <div className="wrap">
        <SectionHead eyebrow="Features" title="Built around the money that leaves every month" />
        {FEATURES.map((feature, i) => (
          <div key={feature.id} className={`feature feature-${i} ${i % 2 ? 'flip' : ''}`}>
            <Reveal className="feature-copy">
              <span className="eyebrow">{feature.eyebrow}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <ul className="checks">
                {feature.points.map((point) => (
                  <li key={point}><Check size={19} weight="bold" />{point}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="feature-visual" delay={0.08}>
              <div className="feature-backdrop" />
              <Phone screen={feature.screen} />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Bento() {
  return (
    <section className="section" id="more">
      <div className="wrap">
        <SectionHead eyebrow="And more" title="The details that make it yours" />
        <div className="bento">
          {BENTO.map((item, i) => (
            <Reveal key={item.id} className={`card bento-card bento-${item.id}`} delay={i * 0.06}>
              <div className="bento-text">
                <span className="icon-tile small"><item.Icon size={21} /></span>
                <h3>
                  {item.title}
                  {item.pro && <span className="pro">PRO</span>}
                </h3>
                <p>{item.body}</p>
              </div>
              <BentoArt item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Each room theme's wall as a small swatch: its colour plus a CSS hint of its pattern.
const THEMES = [
  ['Sky', 'repeating-linear-gradient(90deg,rgba(255,255,255,.28) 0 7px,transparent 7px 14px),#C9DAE8', 'Free'],
  ['Sage', 'repeating-linear-gradient(90deg,rgba(0,0,0,.14) 0 1px,rgba(255,255,255,.2) 1px 2px,transparent 2px 9px),#B7C6AC'],
  ['Blush', 'radial-gradient(circle,rgba(255,255,255,.7) 1.6px,transparent 2px) 0 0/9px 9px,#EACDC6'],
  ['Dune', 'radial-gradient(60% 50% at 30% 30%,rgba(255,255,255,.35),transparent),radial-gradient(50% 60% at 75% 70%,rgba(0,0,0,.08),transparent),#E0CFB5'],
  ['Midnight', 'linear-gradient(60deg,transparent 46%,rgba(212,176,106,.8) 48% 52%,transparent 54%) 0 0/12px 20px,linear-gradient(-60deg,transparent 46%,rgba(212,176,106,.8) 48% 52%,transparent 54%) 0 0/12px 20px,#2B3A55'],
  ['Lilac', 'radial-gradient(circle,rgba(255,255,255,.65) 2px,transparent 2.5px) 0 0/12px 12px,radial-gradient(circle,rgba(255,255,255,.65) 2px,transparent 2.5px) 6px 6px/12px 12px,#D4CBE5'],
  ['Blocks', 'linear-gradient(rgba(0,0,0,.18) 1px,transparent 1px) 0 0/12px 12px,linear-gradient(90deg,rgba(0,0,0,.18) 1px,transparent 1px) 0 0/12px 12px,conic-gradient(#8a8a8a 25%,#9a9a9a 0 50%,#848484 0 75%,#949494 0) 0 0/6px 6px'],
];

function BentoArt({ item }) {
  if (item.id === 'themes') {
    return (
      <div className="theme-swatches">
        {THEMES.map(([name, background, note]) => (
          <div key={name} className="theme-swatch">
            <i style={{ background }} />
            <small>{name}{note && <em>{note}</em>}</small>
          </div>
        ))}
      </div>
    );
  }
  if (item.id === 'share') {
    return (
      <div className="share-art">
        <div className="share-post">
          <b>My Subwall</b>
          <small>12 subscriptions</small>
          <Wall className="share-wall" panels={false} prices={false} />
          <span className="share-credit"><img src="assets/logo.svg" alt="" /> Made with Subwall</span>
        </div>
      </div>
    );
  }
  if (item.id === 'history') {
    const bars = [52, 58, 55, 66, 63, 72, 80];
    const cats = [['#E4572E', 'Video', '$38.47', 0.9], ['#3FA34D', 'Fitness', '$24.00', 0.56], ['#1F8A83', 'Music', '$10.99', 0.26]];
    return (
      <div className="history-art">
        <div className="mini-bars">
          {bars.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
        </div>
        {cats.map(([c, n, amount, share]) => (
          <div key={n} className="cat-row">
            <small>{n}</small>
            <div className="bar"><span style={{ width: `${share * 100}%`, background: c }} /></div>
            <b>{amount}</b>
          </div>
        ))}
      </div>
    );
  }
  return (
    <ul className="privacy-points">
      {item.points.map(([Icon, text]) => (
        <li key={text}><Icon size={19} /> {text}</li>
      ))}
    </ul>
  );
}

export function Steps() {
  return (
    <section className="section section-tint" id="how">
      <div className="wrap">
        <SectionHead eyebrow="How it works" title="From scattered charges to one clear wall in three steps" />
        <ol className="steps">
          {STEPS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} as="li" className="card step" delay={i * 0.08}>
              <span className="step-number">{i + 1}</span>
              <span className="icon-tile"><Icon size={26} /></span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Pricing() {
  const prices = useLocalPrices();
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <SectionHead
          eyebrow="Pricing"
          title="Free to start. Go Pro yearly, monthly or once."
          body="The App Store charges in your local currency. Subscriptions can be cancelled anytime."
        />
        <div className="plans">
          {PLANS.map((plan, i) => {
            const local = plan.priceKey ? prices[plan.priceKey] : plan.price;
            return (
              <Reveal key={plan.name} className={`card plan ${plan.featured ? 'plan-featured' : ''}`} delay={i * 0.08}>
                <div className="plan-head">
                  <h3>{plan.name}</h3>
                  {plan.featured && <span className="pill pill-on-dark"><plan.Icon size={15} /> 7 days free</span>}
                </div>
                <div className="plan-price">
                  {local ? (
                    <b>{local}</b>
                  ) : (
                    // No confirmed price for this visitor's country: don't guess a number.
                    <b className="plan-price-text">{plan.fallback[0]}</b>
                  )}
                  <span>{local ? plan.note : plan.fallback[1]}</span>
                </div>
                {plan.featured && (
                  <span className="plan-save">
                    {prices.yearlySave ? `Best value · save ${prices.yearlySave}% vs Monthly` : 'Best value'}
                  </span>
                )}
                <p>{plan.body}</p>
                <ul className="checks">
                  {plan.features.map((feature) => (
                    <li key={feature}><Check size={19} weight="bold" />{feature}</li>
                  ))}
                </ul>
                <AppStoreButton variant={plan.featured ? 'accent' : 'dark'} label={plan.cta} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section-tint" id="faq">
      <div className="wrap faq-wrap">
        <SectionHead
          eyebrow="FAQ"
          title="Questions, answered"
          body={<>More on the <a href="support.html">Support page</a>.</>}
          center={false}
        />
        <div className="faq-list">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} className={`card faq-item ${isOpen ? 'open' : ''}`} delay={i * 0.04}>
                <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{q}</span>
                  <CaretDown size={23} className="faq-chevron" />
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
    <section className="section">
      <div className="wrap">
        <Reveal className="cta">
          <div className="cta-copy">
            <h2>Hang your first tile tonight</h2>
            <p>Add the three subscriptions you pay for most, and see this week’s payments before they happen.</p>
            <AppStoreButton />
          </div>
          <div className="cta-visual" aria-hidden="true">
            <Wall className="cta-wall" prices={false} />
          </div>
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
            <img src="assets/logo.svg" alt="" width="32" height="32" />
            <span>Subwall</span>
          </a>
          <p>Every subscription, on a wall you can see. For iPhone.</p>
        </div>
        <div className="footer-cols">
          <div>
            <b>Product</b>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <div>
            <b>Help</b>
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
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} Subwall. All rights reserved.</span>
        <span>Apple, iPhone, iPad and App Store are trademarks of Apple Inc.</span>
      </div>
    </footer>
  );
}
