import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseTag from '../components/common/CaseTag';
import CTAButton from '../components/common/CTAButton';
import { textReveal, staggerFadeUp, parallax, magneticButton } from '../utils/gsapAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const chipGridRef = useRef<HTMLDivElement>(null);
  const cta1Ref = useRef<HTMLButtonElement>(null);
  const cta2Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Parallax effect on hero section
    if (sectionRef.current) {
      parallax(sectionRef.current, 0.3);
    }

    // Text reveal for tag
    if (tagRef.current) {
      gsap.fromTo(
        tagRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    }

    // Title text reveal with clip-path
    if (titleRef.current) {
      textReveal(titleRef.current);
    }

    // Content fade up
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('p'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.3,
          ease: 'power3.out',
        }
      );
    }

    // Stagger chips
    if (chipGridRef.current) {
      const chips = chipGridRef.current.querySelectorAll('.chip');
      staggerFadeUp(chips, 0.1);
    }

    // Magnetic buttons
    if (cta1Ref.current) {
      magneticButton(cta1Ref.current);
    }
    if (cta2Ref.current) {
      magneticButton(cta2Ref.current);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero container" id="top" style={{ position: 'relative', zIndex: 1 }}>
      <div ref={contentRef} className="hero__content">
        <div ref={tagRef}>
          <CaseTag text="Full-Stack Digital Engineering Company" />
        </div>
        <h1 ref={titleRef} style={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}>
          We Build Digital Experiences That Move Businesses Forward
        </h1>
        <p style={{ opacity: 0, transform: 'translateY(30px)' }}>
          Your business deserves more than a website — it deserves a powerful, high-performing digital ecosystem. We design and develop websites, software, SaaS platforms, and automation systems that don't just look beautiful… they deliver measurable results.
        </p>
        <div style={{ marginTop: '24px', marginBottom: '32px' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px', opacity: 0, transform: 'translateY(30px)' }}>
            Fast. Scalable. Secure. Conversion-focused.
          </p>
          <p style={{ fontSize: '1rem', opacity: 0, transform: 'translateY(30px)' }}>
            We turn your online presence into your strongest business asset.
          </p>
        </div>
        <div className="hero__ctas" style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <CTAButton ref={cta1Ref} label="Get a Custom Quote" />
          <CTAButton ref={cta2Ref} label="Book a Free Consultation" variant="ghost" />
        </div>
      </div>
      <div ref={chipGridRef} className="chip-grid">
        {[
          'Website Design & Development',
          'Software & Web Applications',
          'SaaS Product Development',
          'E-Commerce Solutions',
          'AI Integrations & Automation',
          'Performance & SEO Optimization',
          'Ongoing Support & Maintenance',
        ].map((item) => (
          <div key={item} className="chip" style={{ opacity: 0, transform: 'translateY(50px)' }}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

