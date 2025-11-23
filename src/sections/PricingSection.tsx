import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pricing } from '../content';
import CaseTag from '../components/common/CaseTag';
import CTAButton from '../components/common/CTAButton';
import { staggerFadeUp, scaleIn, magneticButton } from '../utils/gsapAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const pricingGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current.querySelectorAll('*'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Pricing cards rise up animation
    if (pricingGridRef.current) {
      const cards = Array.from(pricingGridRef.current.children);
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const isHighlighted = cardElement.classList.contains('pricing-card--highlight');

        gsap.fromTo(
          cardElement,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: isHighlighted ? 1.05 : 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardElement,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Magnetic button effect
        const button = cardElement.querySelector('button');
        if (button) {
          magneticButton(button);
        }

        // Neon border pulse on hover for highlighted card
        if (isHighlighted) {
          cardElement.addEventListener('mouseenter', () => {
            gsap.to(cardElement, {
              boxShadow: '0 0 30px rgba(154, 136, 255, 0.4), 0 0 60px rgba(154, 136, 255, 0.2)',
              duration: 0.3,
            });
          });
          cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
              boxShadow: 'none',
              duration: 0.3,
            });
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section container" id="pricing" style={{ position: 'relative', zIndex: 1 }}>
      <div ref={headingRef} className="section-heading">
        <CaseTag text="Pricing Plans" />
        <h2 style={{ opacity: 0, transform: 'translateY(30px)' }}>
          Straight-up plans that give bang for your buck.
        </h2>
        <p style={{ opacity: 0, transform: 'translateY(30px)' }}>Pick one or mix it up.</p>
      </div>
      <div ref={pricingGridRef} className="pricing-grid">
        {pricing.map((plan) => (
          <div
            key={plan.tier}
            className={`pricing-card ${plan.highlight ? 'pricing-card--highlight' : ''} card--interactive`}
            style={{
              opacity: 0,
              transform: 'translateY(100px) scale(0.9)',
              background: plan.highlight
                ? 'rgba(154, 136, 255, 0.1)'
                : 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: plan.highlight
                ? '2px solid rgba(154, 136, 255, 0.5)'
                : '1px solid rgba(154, 136, 255, 0.2)',
            }}
          >
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>{plan.tier}</p>
            <p className="pricing-card__price">{plan.price}</p>
            <ul>
              {plan.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <CTAButton label="Request Pricing" variant={plan.highlight ? 'primary' : 'ghost'} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;

