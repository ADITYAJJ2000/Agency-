import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../content';
import CaseTag from '../components/common/CaseTag';
import { staggerFadeUp, cardTilt, iconFloat } from '../utils/gsapAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const svgProps = {
  viewBox: '0 0 24 24',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const iconMap: Record<string, React.ReactElement> = {
  play: (
    <svg {...svgProps}>
      <path d="M8 6v12l10-6Z" />
    </svg>
  ),
  code: (
    <svg {...svgProps}>
      <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
    </svg>
  ),
  share: (
    <svg {...svgProps}>
      <path d="M18 8a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 0-6h12" />
    </svg>
  ),
  target: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  signal: (
    <svg {...svgProps}>
      <path d="M4 20v-6M9 20V8m5 12V4m5 16V6" />
    </svg>
  ),
  phone: (
    <svg {...svgProps}>
      <path d="M6 2h4l1 5-2 1a11 11 0 0 0 6 6l1-2 5 1v4a2 2 0 0 1-2 2A16 16 0 0 1 2 8a2 2 0 0 1 2-2h2z" />
    </svg>
  ),
  spark: (
    <svg {...svgProps}>
      <path d="M12 2v6m0 8v6m-7-7h6m8 0h6M5 5l4 4m6 6 4 4m0-14-4 4m-6 6-4 4" />
    </svg>
  ),
};

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    // Stagger service cards
    if (servicesRef.current) {
      const serviceCards = Array.from(servicesRef.current.children);
      staggerFadeUp(serviceCards as Element[], 0.15);

      // Add card tilt and icon float to each service card
      serviceCards.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardTilt(cardElement);

        // Icon float animation
        const iconElement = cardElement.querySelector('.service-icon');
        if (iconElement) {
          iconFloat(iconElement as HTMLElement);
        }
      });
    }

    // CTA section animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (!services || services.length === 0) {
    return (
      <section className="section container" id="services">
        <div className="section-heading">
          <CaseTag text="What We Deliver" />
          <h2>Loading services...</h2>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="section container" id="services" style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div ref={headingRef} className="section-heading">
        <CaseTag text="What We Deliver" />
        <h2 style={{ opacity: 0, transform: 'translateY(30px)' }}>
          Your business deserves more than basic digital services.
        </h2>
        <p style={{ opacity: 0, transform: 'translateY(30px)' }}>
          We provide end-to-end solutions that help you build, scale, automate, and dominate your industry. Every service is engineered with precision. Every project is built for performance, scalability, and long-term success.
        </p>
        <p style={{ marginTop: '16px', fontWeight: 600, opacity: 0, transform: 'translateY(30px)' }}>
          We don't just help you grow — we build the systems that make growth inevitable.
        </p>
      </div>
      <div ref={servicesRef} style={{ display: 'flex', flexDirection: 'column', gap: '64px', marginTop: '48px' }}>
        {services.map((service, index) => (
          <div
            key={service.title}
            className="service-card-glass"
            style={{
              opacity: 0,
              transform: 'translateY(50px)',
              padding: '40px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              border: '1px solid rgba(154, 136, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: 'rgba(154, 136, 255, 0.5)',
                boxShadow: '0 8px 32px rgba(154, 136, 255, 0.2)',
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: 'rgba(154, 136, 255, 0.2)',
                boxShadow: 'none',
                duration: 0.3,
              });
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--neon)', minWidth: '40px' }}>
                {index + 1}.
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '16px' }}>{service.title}</h3>
                <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>{service.description}</p>
                {service.tagline && (
                  <p style={{ fontWeight: 600, color: 'var(--neon)', marginBottom: '24px' }}>{service.tagline}</p>
                )}
                {service.features && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>What you get:</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                      {service.features.map((feature, idx) => (
                        <li key={idx} style={{ paddingLeft: '24px', position: 'relative', lineHeight: '1.6' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--neon)' }}>→</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        ref={ctaRef}
        style={{
          marginTop: '64px',
          padding: '32px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          opacity: 0,
          transform: 'translateY(50px)',
        }}
      >
        <h3 style={{ fontSize: '1.75rem', marginBottom: '16px' }}>Ready to Build Something Powerful?</h3>
        <p style={{ marginBottom: '24px', lineHeight: '1.7' }}>
          Every service we offer is designed to take your business to the next level — not someday, not eventually, but right now.
        </p>
        <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>
          When you work with us, you don't get a vendor. You get a team that cares about your business as much as you do.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;

