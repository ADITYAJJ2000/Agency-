import React from 'react';
import { pricing } from '../content';
import CaseTag from '../components/common/CaseTag';
import CTAButton from '../components/common/CTAButton';

const PricingSection: React.FC = () => (
  <section className="section container" id="pricing" data-animate>
    <div className="section-heading" data-animate>
      <CaseTag text="Pricing" />
      <h2>Choose Your Growth Pod</h2>
      <p>Every tier includes strategy, execution, measurement, and automation upgrades.</p>
    </div>
    <div className="pricing-grid">
      {pricing.map((plan) => (
        <div
          key={plan.tier}
          className={`pricing-card ${plan.highlight ? 'pricing-card--highlight' : ''} card--interactive`}
          data-animate
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

export default PricingSection;

