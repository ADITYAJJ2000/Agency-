import React from 'react';
import CaseTag from '../components/common/CaseTag';
import CTAButton from '../components/common/CTAButton';

const FooterSection: React.FC = () => (
  <footer className="footer container" data-animate>
    <p>We Build. Market. Automate. Scale.</p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
      <CaseTag text="All Digital Services Under One Roof" />
      <CaseTag text="Business Support Powered by Technology" />
    </div>
    <div className="footer__ctas">
      <CTAButton label="Request Pricing" variant="ghost" />
      <CTAButton label="Scale My Business" />
    </div>
  </footer>
);

export default FooterSection;

