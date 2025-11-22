import React from 'react';
import { differentiators } from '../content';
import SectionCard from '../components/common/SectionCard';
import CaseTag from '../components/common/CaseTag';

const DifferentiatorsSection: React.FC = () => (
  <section className="section container" id="why-us" data-animate>
    <div className="section-heading" data-animate>
      <CaseTag text="Why Work With Us" />
      <h2>Results Engineered For Speed</h2>
      <p>We compress strategy, production, growth, and automation into one accountable partner.</p>
    </div>
    <div className="card-grid">
      {differentiators.map((diff) => (
        <SectionCard
          key={diff.label}
          title={diff.label}
          description={diff.blurb}
          accent={diff.label === 'Results'}
          interactive
        />
      ))}
    </div>
  </section>
);

export default DifferentiatorsSection;

