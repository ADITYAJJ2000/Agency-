import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
          {children}
        </main>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => (
  <Layout>
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
  </Layout>
);

const ServicesPage: React.FC = () => (
  <Layout>
    <ServicesSection />
    <Divider />
    <FooterSection />
  </Layout>
);

const WhyUsPage: React.FC = () => (
  <Layout>
    <DifferentiatorsSection />
    <Divider />
    <FooterSection />
  </Layout>
);

const TeamPage: React.FC = () => (
  <Layout>
    <TeamSection />
    <Divider />
    <FooterSection />
  </Layout>
);

const PricingPage: React.FC = () => (
  <Layout>
    <PricingSection />
    <Divider />
    <FooterSection />
  </Layout>
);

const ContactPage: React.FC = () => (
  <Layout>
    <ContactSection />
    <Divider />
    <FooterSection />
  </Layout>
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/why-us" element={<WhyUsPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default App;

