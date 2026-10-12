import { ArrowSquareOut, Envelope, Lifebuoy, Star } from '@phosphor-icons/react';

import { APP_STORE_URL, STEPS, STORE_FACTS, SUPPORT_EMAIL } from '../config.js';
import { AppStoreButton, Reveal, SectionHead } from './common.jsx';
import { Tile } from './Devices.jsx';

/** "Three steps": the whole app in three moves, each hung on its own tile. */
export function Steps() {
  return (
    <section className="section steps" id="steps">
      <div className="wrap">
        <SectionHead
          eyebrow="Three steps"
          title={<>Set it up once. <span className="grad-warm">Never get surprised.</span></>}
          body="It takes a couple of minutes to put up what you pay for. After that, Subwall does the remembering."
        />
        <ol className="steps-list">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} className="step-card" delay={i * 0.08}>
              <div className="step-tile" aria-hidden="true"><Tile name={step.tile} /></div>
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** The App Store listing, as a card: icon, name, the facts, and the download button. */
export function StoreCard() {
  return (
    <section className="section store-section" id="download">
      <div className="wrap">
        <Reveal className="store-card">
          <div className="store-card-main">
            <img className="store-icon" src="assets/icon.png" alt="The Subwall app icon" width="128" height="128" />
            <div>
              <span className="store-new"><Star size={16} weight="fill" /> Now on the App Store</span>
              <h2>Subwall: Subscription Tracker</h2>
              <p>Every subscription, on one wall. Free to download, for iPhone and iPad.</p>
              <div className="store-actions">
                <AppStoreButton variant="dark" />
                <a className="store-link" href={APP_STORE_URL} target="_blank" rel="noopener">
                  See it on the App Store <ArrowSquareOut size={18} weight="bold" />
                </a>
              </div>
            </div>
          </div>
          <dl className="store-facts">
            {STORE_FACTS.map(([label, value, note]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
                {note && <small>{note}</small>}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/** After the FAQ: where to get more help. */
export function Contact() {
  return (
    <section className="contact-section">
      <div className="wrap">
        <Reveal className="contact-note">
          <div>
            <h2>Still have a question?</h2>
            <p>
              The <a href="support.html">Support page</a> answers the rest, from reminders to restoring Pro. Or write to
              us: we read every message.
            </p>
          </div>
          <div className="contact-actions">
            <a className="btn btn-dark btn-small" href={`mailto:${SUPPORT_EMAIL}?subject=Subwall`}>
              <Envelope size={20} weight="bold" /> Email us
            </a>
            <a className="btn btn-outline btn-small" href="support.html">
              <Lifebuoy size={20} weight="bold" /> Support
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
