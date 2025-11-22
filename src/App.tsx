import React, { useEffect } from 'react';
import Divider from './components/common/Divider';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import DifferentiatorsSection from './sections/DifferentiatorsSection';
import TeamSection from './sections/TeamSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';
import TopNav from './components/navigation/TopNav';
import FloatingShapes from './components/visual/FloatingShapes';
import ParticleField from './components/visual/ParticleField';
import ThunderCursor from './components/visual/ThunderCursor';
import VideoBackground from './components/visual/VideoBackground';

const App: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.2 },
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0 
      }}>
        <VideoBackground 
          videoSource="/thunderstorm-bg.mp4"
          opacity={0.7}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <ThunderCursor />
        <div className="app__visual">
          <ParticleField />
          <FloatingShapes />
        </div>
      <TopNav />
      <main>
        <HeroSection />
        <ServicesSection />
        <Divider />
        <DifferentiatorsSection />
        <Divider />
        <TeamSection />
        <Divider />
        <TestimonialsSection />
        <Divider />
        <PricingSection />
        <Divider />
        <ContactSection />
        <Divider />
        <FooterSection />
      </main>
      </div>
    </div>
  );
};

export default App;

