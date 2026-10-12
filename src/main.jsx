import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import '@fontsource-variable/plus-jakarta-sans';

import { Features } from './components/Features.jsx';
import { Hero } from './components/Hero.jsx';
import { Contact, Steps, StoreCard } from './components/Launch.jsx';
import { Nav } from './components/Nav.jsx';
import { Cta, Faq, Footer, Pricing } from './components/Sections.jsx';
import { Gallery, IpadShowcase, Marquee, Numbers } from './components/Showcase.jsx';
import { Story } from './components/Story.jsx';
import { Widgets } from './components/Widgets.jsx';
import { startSmoothScroll } from './smooth-scroll.js';
import './landing.css';

function App() {
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
