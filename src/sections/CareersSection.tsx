import React from 'react';
import { careers, whyWorkWithUs, candidateValues } from '../content';
import CaseTag from '../components/common/CaseTag';
import CTAButton from '../components/common/CTAButton';
import Divider from '../components/common/Divider';

const CareersSection: React.FC = () => {
  if (!careers || careers.length === 0) {
    return (
      <section className="section container" id="careers" data-animate>
        <div className="section-heading" data-animate>
          <CaseTag text="Careers" />
          <h2>Loading careers...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="section container" id="careers" data-animate style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="section-heading" data-animate>
        <CaseTag text="Join a Team That Builds the Future" />
        <h2>We are not just building websites, software, and SaaS products — we are building a powerhouse of digital innovators who shape the next generation of businesses.</h2>
        <p>
          If you're driven, talented, disciplined, and hungry to grow… you belong with us.
        </p>
        <p style={{ marginTop: '16px', fontWeight: 600, fontSize: '1.1rem' }}>
          We don't hire employees. We build teams. We grow leaders. We create impact.
        </p>
        <p style={{ marginTop: '16px' }}>
          At our core, we are a high-performance culture where creativity meets engineering, and ambition meets opportunity.
        </p>
      </div>

      <Divider />

      <div style={{ marginTop: '64px' }} data-animate>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '24px', textAlign: 'center' }}>🌟 Why Work With Us?</h3>
        <p style={{ textAlign: 'center', marginBottom: '32px' }}>
          Because here, you will:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {whyWorkWithUs.map((benefit, index) => (
            <div key={index} style={{ 
              padding: '20px', 
              background: 'rgba(255, 255, 255, 0.02)', 
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span style={{ color: 'var(--neon)', marginRight: '8px' }}>✔</span>
              {benefit}
            </div>
          ))}
        </div>
        <p style={{ marginTop: '32px', textAlign: 'center', fontWeight: 600 }}>
          We challenge you. We support you. We help you become world-class.
        </p>
      </div>

      <Divider />

      <div style={{ marginTop: '64px' }} data-animate>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '24px', textAlign: 'center' }}>📌 Open Positions — Apply Now</h3>
        <p style={{ textAlign: 'center', marginBottom: '48px' }}>
          We're always looking for passionate people who want to build something great.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {careers.map((role, index) => (
            <div key={role.title} style={{ 
              padding: '32px', 
              background: 'rgba(255, 255, 255, 0.02)', 
              borderRadius: '12px', 
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '24px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--neon)', minWidth: '40px' }}>
                  {index + 1}.
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--neon)' }}>{role.title}</h4>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <h5 style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>What you'll do:</h5>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {role.whatYouDo.map((item, idx) => (
                        <li key={idx} style={{ paddingLeft: '24px', position: 'relative', marginBottom: '8px', lineHeight: '1.6' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--neon)' }}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <h5 style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>What we look for:</h5>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {role.whatWeLookFor.map((item, idx) => (
                        <li key={idx} style={{ paddingLeft: '24px', position: 'relative', marginBottom: '8px', lineHeight: '1.6' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--neon)' }}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {role.tagline && (
                    <p style={{ fontWeight: 600, color: 'var(--neon)', fontStyle: 'italic', marginTop: '16px' }}>
                      {role.tagline}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div style={{ marginTop: '64px' }} data-animate>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '24px', textAlign: 'center' }}>🏆 What We Want in Every Candidate</h3>
        <p style={{ textAlign: 'center', marginBottom: '24px' }}>
          We don't look for "perfect resumes." We look for mindset.
        </p>
        <p style={{ textAlign: 'center', fontWeight: 600, marginBottom: '32px' }}>
          We expect:
        </p>
        <div className="chip-grid" style={{ marginTop: '24px' }}>
          {candidateValues.map((value, index) => (
            <div key={index} className="chip">
              {value}
            </div>
          ))}
        </div>
        <p style={{ marginTop: '32px', textAlign: 'center', fontWeight: 600 }}>
          If these values match yours — you'll thrive here.
        </p>
      </div>

      <Divider />

      <div style={{ marginTop: '64px', padding: '32px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }} data-animate>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '24px' }}>📨 How to Apply</h3>
        <p style={{ marginBottom: '24px', lineHeight: '1.7' }}>
          Send us:
        </p>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px', textAlign: 'left', maxWidth: '500px', margin: '0 auto 32px' }}>
          <li style={{ paddingLeft: '24px', position: 'relative', marginBottom: '12px' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--neon)' }}>→</span>
            Your name
          </li>
          <li style={{ paddingLeft: '24px', position: 'relative', marginBottom: '12px' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--neon)' }}>→</span>
            Skills / role you're applying for
          </li>
          <li style={{ paddingLeft: '24px', position: 'relative', marginBottom: '12px' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--neon)' }}>→</span>
            Portfolio / sample work
          </li>
          <li style={{ paddingLeft: '24px', position: 'relative', marginBottom: '12px' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--neon)' }}>→</span>
            Resume (optional, not required if your work speaks)
          </li>
          <li style={{ paddingLeft: '24px', position: 'relative', marginBottom: '12px' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--neon)' }}>→</span>
            Few lines on why you want to join
          </li>
        </ul>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>📧 Email: shreyashnashine81@gmail.com</p>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>📞 Call/WhatsApp: +91-XXXXXXX</p>
        </div>
        <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>
          We reply fast. If you are skilled — we don't let talent go unnoticed.
        </p>
      </div>

      <Divider />

      <div style={{ marginTop: '64px', padding: '32px', textAlign: 'center' }} data-animate>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '16px' }}>✨ Join Us. Build With Us. Grow With Us.</h3>
        <p style={{ marginBottom: '24px', lineHeight: '1.7', fontSize: '1.1rem' }}>
          This is more than a job — it's a chance to be part of something big.
        </p>
        <p style={{ fontWeight: 600, fontSize: '1.2rem' }}>
          Here, you build not just products… but a career, a legacy, and a future.
        </p>
      </div>
    </section>
  );
};

export default CareersSection;

