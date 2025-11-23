import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseTag from '../components/common/CaseTag';
import CTAButton from '../components/common/CTAButton';
import { staggerFadeUp, rippleEffect, magneticButton } from '../utils/gsapAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const contactFields = ['Full Name', 'Company', 'Email', 'Project Focus'];

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);

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

    // Form fields sequential fade-in
    if (formRef.current) {
      const fields = formRef.current.querySelectorAll('.form-field');
      staggerFadeUp(fields, 0.1);

      // Input focus/blur animation
      const inputs = formRef.current.querySelectorAll('input, textarea');
      inputs.forEach((input) => {
        input.addEventListener('focus', (e) => {
          gsap.to(e.target, {
            scale: 1.02,
            boxShadow: '0 0 20px rgba(154, 136, 255, 0.3)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        input.addEventListener('blur', (e) => {
          gsap.to(e.target, {
            scale: 1,
            boxShadow: 'none',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });

      // Submit button ripple effect
      const submitButton = formRef.current.querySelector('button');
      if (submitButton) {
        submitButton.addEventListener('click', (e) => {
          rippleEffect(submitButton as HTMLElement, e as MouseEvent);
        });
        magneticButton(submitButton as HTMLElement);
      }
    }

    // Contact card animation
    if (contactCardRef.current) {
      gsap.fromTo(
        contactCardRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactCardRef.current,
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

  return (
    <section ref={sectionRef} className="section container" id="contact" style={{ position: 'relative', zIndex: 1 }}>
      <div ref={headingRef} className="section-heading">
        <CaseTag text="Call to Action" />
        <h2 style={{ opacity: 0, transform: 'translateY(30px)' }}>Your future customers are online.</h2>
        <p style={{ opacity: 0, transform: 'translateY(30px)' }}>
          Your competitors are upgrading. Your business shouldn't be the one left behind. Let's build something remarkable together.
        </p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', opacity: 0, transform: 'translateY(30px)' }}>
          <CTAButton label="Get a Custom Quote" />
          <CTAButton label="Book a Free Consultation" variant="ghost" />
          <CTAButton label="Share Your Project Requirements" variant="ghost" />
        </div>
        <p style={{ marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)', opacity: 0, transform: 'translateY(30px)' }}>
          We respond fast. Always.
        </p>
      </div>
      <div className="contact-grid">
        <form ref={formRef} className="form-card card--interactive" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(154, 136, 255, 0.2)' }}>
          {contactFields.map((label) => (
            <label key={label} className="form-field" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              <span>{label}</span>
              <input className="input" type="text" placeholder={label} style={{ transition: 'all 0.3s ease' }} />
            </label>
          ))}
          <label className="form-field" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <span>Message</span>
            <textarea className="textarea" placeholder="Tell us about your goals" style={{ transition: 'all 0.3s ease' }} />
          </label>
          <CTAButton label="Get a Custom Quote" />
        </form>
        <div
          ref={contactCardRef}
          className="contact-card holo"
          style={{
            opacity: 0,
            transform: 'translateX(50px)',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(154, 136, 255, 0.2)',
          }}
        >
          <p>
            Prefer instant messaging? Tap the WhatsApp button for a 2-minute response time during business hours or email
            us any time.
          </p>
          <CTAButton label="WhatsApp · 2 Min Response" variant="ghost" />
          <div>
            <p style={{ color: 'var(--neon)', fontWeight: 600, marginBottom: '8px' }}>Contact Information</p>
            <p style={{ margin: 0 }}>shreyashnashine81@gmail.com · +91-XXXXXXX</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

