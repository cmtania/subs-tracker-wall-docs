import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, CurrencyCircleDollar, LockKey, PaintBrush, CalendarBlank, ChartBar, Export, BellRinging, CalendarCheck } from '@phosphor-icons/react';

import { img, PRIVACY_POINTS, SPRING, THEMES } from '../config.js';
import { Reveal, SectionHead } from './common.jsx';
import { IPhone, Tile } from './Devices.jsx';

/** Reminder banners, in the app's own wording (see ReminderScheduler in the app). */
const BANNERS = [
  ['now', 'Streamly renews today', '$17.99 will be charged to Credit Card on Tue, Sep 29.'],
  ['1h ago', 'Tunebox renews tomorrow', '$11.99 will be charged to Apple Pay on Wed, Sep 30.'],
  ['2h ago', 'FitLoop free trial ends soon', 'Your trial ends Friday, October 2. Cancel before then if you don’t want to pay.'],
];

const CURRENCIES = [['$', 'USD'], ['€', 'EUR'], ['₱', 'PHP'], ['£', 'GBP'], ['¥', 'JPY'], ['₹', 'INR'], ['A$', 'AUD'], ['R$', 'BRL']];

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="wrap">
        <SectionHead
          eyebrow="Features"
          title={<>Built around the money that <span className="grad-warm">leaves every month.</span></>}
          body="Reminders, a calendar, any currency and a history of every price change, all on one wall."
        />

        <div className="bento">
          <Reveal className="card card-dark bento-reminders">
            <CardText Icon={BellRinging} kicker="Reminders" title="No more surprise charges.">
              A heads-up before every renewal and before a free trial ends, at the time you choose, with the amount and the card.
            </CardText>
            <div className="banners">
              {BANNERS.map(([when, title, body], i) => (
                <motion.div
                  key={title}
                  className="banner"
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ ...SPRING, delay: 0.15 + i * 0.12 }}
                >
                  <img src="assets/icon.png" alt="" />
                  <div>
                    <p className="banner-head"><b>Subwall</b><span>{when}</span></p>
                    <p className="banner-title">{title}</p>
                    <p className="banner-body">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <IPhone screens={[['phone-notifications', 'The Notifications screen: upcoming renewals for the week']]} className="peek peek-right" />
          </Reveal>

          <Reveal className="card card-yellow bento-due" delay={0.06}>
            <CardText Icon={CalendarCheck} kicker="This week" title="See what’s due before it’s due.">
              Tiles due in the next seven days get a yellow border, and this week’s total sits right on the wall.
            </CardText>
            <div className="due-art">
              <img className="lift-card due-card" src={img('card-due')} alt="The Due this week card: $65.94 from Streamly, Subwall and Tunebox" loading="lazy" />
              <Tile name="st" className="due-tile due-tile-1" />
              <Tile name="tu" className="due-tile due-tile-2" />
            </div>
          </Reveal>

          <Reveal className="card bento-currency">
            <CardText Icon={CurrencyCircleDollar} kicker="Any currency" title="Pay in pesos, dollars and euros?">
              Each subscription keeps its own price and currency. Totals add up in your main currency at daily exchange rates.
            </CardText>
            <div className="currency-art" aria-hidden="true">
              {CURRENCIES.map(([symbol, code], i) => (
                <span key={code} className="chip" style={{ '--i': i }}>
                  <b>{symbol}</b> {code}
                </span>
              ))}
              <div className="currency-total">
                <small>This month</small>
                <b>≈ $45.96</b>
                <span>USD</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="card bento-card-pays" delay={0.06}>
            <CardText Icon={CreditCard} kicker="Paid with" title="Know which card pays.">
              Note the card or wallet behind each subscription, so you can top up the right account before the charge.
            </CardText>
            <Tile name="st" className="pays-tile" />
            <img className="lift-card pays-card" src={img('card-lifted')} alt="A lifted tile's card: Streamly, $17.99 monthly, paid with Credit Card" loading="lazy" />
          </Reveal>

          <Reveal className="card card-dark bento-private" delay={0.12}>
            <CardText Icon={LockKey} kicker="Private by design" title="Your money, your phone.">
              No account, no bank connection and no server. Your subscriptions stay on your iPhone or iPad.
            </CardText>
            <ul className="private-points">
              {PRIVACY_POINTS.map(([Icon, text]) => (
                <li key={text}><Icon size={20} weight="bold" /> {text}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="card card-lilac bento-rooms">
            <Rooms />
          </Reveal>

          <Reveal className="card card-kraft bento-styles" delay={0.06}>
            <CardText Icon={CalendarBlank} kicker="Calendar styles" title="Hang a calendar you love." pro>
              Kraft paper, Blueprint, Botanical, Midnight, Blush and more for the paper calendar on your wall.
            </CardText>
            <div className="styles-art" aria-hidden="true">
              <img src={img('style-kraft')} alt="" className="style-thumb style-a" loading="lazy" />
              <img src={img('style-blueprint')} alt="" className="style-thumb style-b" loading="lazy" />
            </div>
          </Reveal>

          <Reveal className="card bento-history">
            <CardText Icon={ChartBar} kicker="History" title="See where the money goes.">
              Spending month by month and by category, every price change, and how much you’ve saved since cancelling.
            </CardText>
            <IPhone screens={[['phone-history', 'History: spending over the last three months and by category']]} className="peek peek-bottom" />
            <img className="lift-card history-card" src={img('card-month')} alt="" loading="lazy" />
          </Reveal>

          <Reveal className="card card-cream bento-share" delay={0.06}>
            <CardText Icon={Export} kicker="Share" title="Show off your wall.">
              Turn your wall into a clean picture for Instagram or Messages. Prices stay hidden unless you show them.
            </CardText>
            <IPhone screens={[['phone-share', 'Share your wall: a picture of your tiles, made with Subwall']]} className="peek peek-bottom" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CardText({ Icon, kicker, title, children, pro }) {
  return (
    <div className="card-text">
      <span className="card-kicker">
        <Icon size={18} weight="bold" /> {kicker}
        {pro && <em className="pro">PRO</em>}
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

/** The seven rooms as swatches; tapping one shows its name. */
function Rooms() {
  const [pick, setPick] = useState(4);
  const [name, pattern, note] = THEMES[pick];
  return (
    <>
      <CardText Icon={PaintBrush} kicker="Room themes" title="Seven rooms. Make it yours." pro>
        Calm Sky comes free. Pro adds Sage boards, Blush polka dots, Dune limewash, a gold Midnight lattice, Lilac
        flowers and a wall built from 3D pixel Blocks.
      </CardText>
      <div className="rooms-art">
        <div className="room-preview" style={{ background: pattern }}>
          <span className="room-name">{name}{note ? ` · ${note}` : ''}</span>
          <div className="room-tiles" aria-hidden="true">
            <Tile name="st" /><Tile name="tu" /><Tile name="cl" /><Tile name="fi" />
          </div>
        </div>
        <div className="swatches" role="radiogroup" aria-label="Room themes">
          {THEMES.map(([n, bg], i) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={i === pick}
              aria-label={n}
              className={`swatch ${i === pick ? 'on' : ''}`}
              style={{ background: bg }}
              onClick={() => setPick(i)}
              onMouseEnter={() => setPick(i)}
            />
          ))}
        </div>
      </div>
      <IPhone screens={[['phone-themes', 'The Room theme picker with all seven rooms']]} className="peek peek-rooms" />
    </>
  );
}
