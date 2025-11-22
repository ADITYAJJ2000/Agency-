import React from 'react';
import CaseTag from '../components/common/CaseTag';
import CTAButton from '../components/common/CTAButton';

const HeroSection: React.FC = () => (
  <section className="hero container" id="top" data-animate>
    <div className="hero__content" data-animate>
      <CaseTag text="Full-Service Digital & Technology Agency" />
      <h1>One Company. Every Online Service.</h1>
      <p>
        We build, market, automate, and scale digital businesses with a single integrated team of editors, developers,
        growth strategists, outbound experts, and AI engineers.
      </p>
      <div className="hero__ctas">
        <CTAButton label="Get Free Consultation" />
        <CTAButton label="Scale My Business" variant="ghost" />
        <CTAButton label="Watch Showreel" variant="ghost" size="small" />
      </div>
    </div>
    <div className="chip-grid" data-animate>
      {[
        'Video Editing & Creative Production',
        'Website, Mobile App & Software Development',
        'Social Media Management',
        'Online Ads & Lead Generation',
        'SEO & Online Ranking',
        'Cold Calling & Client Acquisition',
        'AI Automation & Chatbots',
      ].map((item) => (
        <div key={item} className="chip">
          {item}
        </div>
      ))}
    </div>
  </section>
);

export default HeroSection;

