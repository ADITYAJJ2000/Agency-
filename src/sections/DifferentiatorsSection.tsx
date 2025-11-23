import React from 'react';
import Divider from '../components/common/Divider';

const DifferentiatorsSection: React.FC = () => {
  const features = [
    {
      number: '1.',
      title: 'Clear Strategy. Real Execution.',
      description: 'No fluff. No over-promising. We understand your goals and build solutions that work in the real world.'
    },
    {
      number: '2.',
      title: 'Quality Without Compromise.',
      description: 'Every product we deliver — websites, software, apps, branding, or content — is crafted with precision and world-class standards.'
    },
    {
      number: '3.',
      title: 'Fast, Reliable, Consistent.',
      description: 'We operate with startup speed and enterprise discipline. Deadlines are sacred. Quality is non-negotiable.'
    },
    {
      number: '4.',
      title: 'Full-Stack Team, Single Partner.',
      description: 'Developers, editors, designers, marketers, strategists — everything you need under one roof.'
    },
    {
      number: '5.',
      title: 'Scalable Like Your Ambition.',
      description: 'Whether you\'re a startup or an established business, our solutions grow with you, not against you.'
    },
    {
      number: '6.',
      title: 'Transparent Communication.',
      description: 'No hidden fees. No confusion. You get real updates, real timelines, and real results.'
    }
  ];

  return (
    <section className="section differentiators" id="why-us">
      <div className="container">
        <div className="section-heading" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2>Why Choose Us</h2>
          <p className="subtitle" style={{ 
            fontSize: '1.5rem',
            fontWeight: 600,
            marginTop: '1rem',
            color: 'var(--neon)',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Built for Impact. Designed for Growth.
          </p>
          <p style={{ 
            marginTop: '0rem',
            fontSize: '1.1rem',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6',
            opacity: 0.9
          }}>
            We focus on one thing — delivering results that actually move your business forward.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--neon), #00f7ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem',
                lineHeight: 1
              }}>
                {feature.number}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#fff'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.7,
                margin: 0
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <Divider />
    </section>
  );
};

export default DifferentiatorsSection;
