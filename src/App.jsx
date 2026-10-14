import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';

import { Features } from './components/Features.jsx';
import { Hero } from './components/Hero.jsx';
import { Contact, Steps, StoreCard } from './components/Launch.jsx';
import { Nav } from './components/Nav.jsx';
import { Cta, Faq, Footer, Pricing } from './components/Sections.jsx';
import { Gallery, IpadShowcase, Marquee, Numbers } from './components/Showcase.jsx';
import { Story } from './components/Story.jsx';
import { Widgets } from './components/Widgets.jsx';
import { startSmoothScroll } from './smooth-scroll.js';

/** The whole landing page. Rendered to static HTML at build time (entry-server.jsx), then hydrated. */
export function App() {
  useEffect(() => startSmoothScroll(), []);
  return (
    // reducedMotion="user": with Reduce Motion on, motion keeps fades but drops movement.
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Steps />
        <Story />
        <Features />
        <Widgets />
        <Numbers />
        <IpadShowcase />
        <Gallery />
        <StoreCard />
        <Pricing />
        <Faq />
        <Contact />
        <Cta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
