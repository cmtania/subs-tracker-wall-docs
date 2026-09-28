import {
  ArrowUUpLeft,
  Bell,
  CalendarDots,
  CaretLeft,
  ChartBar,
  CreditCard,
  Export,
  GearSix,
  PencilSimple,
  SquaresFour,
} from '@phosphor-icons/react';

import { SCREENSHOTS } from '../config.js';
import { useImageExists } from '../hooks.js';
import { TileBadge, Wall } from './Wall.jsx';

/** An iPhone frame. Shows the real screenshot for `screen` when one exists, else a drawing. */
export function Phone({ screen, className = '' }) {
  const src = SCREENSHOTS[screen];
  const hasShot = useImageExists(src);
  const Drawn = SCREENS[screen];
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        {hasShot ? <img src={src} alt="" className="phone-shot" /> : <Drawn />}
        <div className="phone-island" />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="status">
      <span>9:41</span>
      <span className="status-icons">
        <i /><i /><i />
      </span>
    </div>
  );
}

function TabBar({ active = 0 }) {
  const tabs = [SquaresFour, CalendarDots, ChartBar, GearSix];
  const names = ['Wall', 'Calendar', 'History', 'Settings'];
  return (
    <div className="tabbar">
      {tabs.map((Icon, i) => (
        <span key={names[i]} className={i === active ? 'on' : ''}>
          <Icon size={13} weight="fill" />
          <small>{names[i]}</small>
        </span>
      ))}
    </div>
  );
}

/** The 3D room from the home screen: ceiling, the wall at an angle, a wooden floor. */
function WallScreen() {
  return (
    <div className="screen">
      <div className="room">
        <div className="room-ceiling" />
        <div className="room-back" />
        <div className="room-floor" />
        <div className="room-wall-3d">
          <Wall className="room-tiles" prices={false} />
        </div>
      </div>
      <StatusBar />
      <div className="app-top">
        <div>
          <b>Subwall</b>
          <span>12 subscriptions · swipe for your calendar</span>
        </div>
        <div className="glass-buttons">
          <span className="glass-circle"><Export size={11} /></span>
          <span className="glass-circle has-dot"><Bell size={11} /></span>
        </div>
      </div>
      <div className="section-switch">
        <span className="on">Subscriptions</span>
        <span>Calendar</span>
      </div>
      <TabBar active={0} />
    </div>
  );
}

/** Walked up to the wall: a tile lifted, with its details card. */
function CloseupScreen() {
  return (
    <div className="screen closeup">
      <StatusBar />
      <div className="app-top app-top-left">
        <span className="glass-circle"><CaretLeft size={11} /></span>
        <div>
          <b>Subwall</b>
          <span>Your wall up close</span>
        </div>
      </div>
      <Wall className="closeup-tiles" panels={false} plus lifted={0} />
      <div className="lifted-card">
        <div className="lifted-row">
          <TileBadge index={0} />
          <div className="grow">
            <b>Streamly</b>
            <span>$15.49 · Monthly · Oct 3</span>
          </div>
        </div>
        <div className="paid-with"><CreditCard size={10} weight="fill" /> Paid with Visa •1234</div>
        <div className="lifted-actions">
          <span className="btn-prom"><PencilSimple size={9} /> Details</span>
          <span className="btn-glass"><ArrowUUpLeft size={9} /> Put back</span>
        </div>
      </div>
      <TabBar active={0} />
    </div>
  );
}

/** The Calendar tab: totals, the month with brand-colored dots, and the selected day. */
function CalendarScreen() {
  const dots = { 3: ['#E4572E'], 5: ['#3FA34D'], 7: ['#B03A5B'], 11: ['#1F8A83', '#3B4CCA'], 15: ['#8E3B8E'], 18: ['#C0392B'], 22: ['#2E86DE'], 26: ['#F2A93B', '#3A3A3A'], 29: ['#1F3A68'] };
  // October 2026 starts on a Thursday.
  const cells = [...Array(4).fill(0), ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (
    <div className="screen screen-list">
      <StatusBar />
      <div className="sheet-top big"><b>Calendar</b></div>
      <div className="cards-row">
        <div className="list-card total-card">
          <small>This month</small>
          <b>$86.40</b>
          <span>9 payments</span>
        </div>
        <div className="list-card total-card week">
          <small>Due this week</small>
          <b>$46.48</b>
          <span className="with-icon"><CreditCard size={8} /> Visa •1234, PayPal</span>
        </div>
      </div>
      <div className="list-card cal">
        <div className="cal-head">October 2026</div>
        <div className="cal-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <small key={i}>{d}</small>)}
          {cells.map((day, i) => (
            <div key={i} className={`cal-day ${day === 3 ? 'sel' : ''}`}>
              {day > 0 && <b>{day}</b>}
              <span>{(dots[day] || []).map((c) => <i key={c} style={{ background: c }} />)}</span>
            </div>
          ))}
        </div>
      </div>
      <b className="day-title">Saturday, October 3</b>
      <div className="list-card row">
        <TileBadge index={0} size="sm" />
        <div className="grow"><b>Streamly</b><span>Monthly · Visa •1234</span></div>
        <b>$15.49</b>
      </div>
      <TabBar active={1} />
    </div>
  );
}

/** The History tab: a year of spending, categories and recent activity. */
function HistoryScreen() {
  const bars = [62, 64, 60, 71, 70, 74, 72, 80, 78, 82, 86, 84];
  const months = ['N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O'];
  return (
    <div className="screen screen-list">
      <StatusBar />
      <div className="sheet-top big"><b>History</b></div>
      <div className="segmented"><span>3M</span><span className="on">1Y</span><span>All</span></div>
      <div className="list-card">
        <span>Last 12 months</span>
        <b className="big-number">$903.60</b>
        <span>About $75 a month</span>
        <div className="bars">
          {bars.map((h, i) => (
            <div key={i}>
              <i style={{ height: `${h}%` }} />
              <small>{months[i]}</small>
            </div>
          ))}
        </div>
      </div>
      <small className="list-head">RECENT ACTIVITY</small>
      <div className="list-card row">
        <TileBadge index={0} size="sm" />
        <div className="grow"><b>Streamly price went up</b><span>$13.99 → $15.49</span></div>
      </div>
      <div className="list-card row">
        <TileBadge index={6} size="sm" />
        <div className="grow"><b>Cancelled Kidflix</b><span className="green">Saved $23.97 since July</span></div>
      </div>
      <TabBar active={2} />
    </div>
  );
}

const SCREENS = { wall: WallScreen, closeup: CloseupScreen, calendar: CalendarScreen, history: HistoryScreen };
