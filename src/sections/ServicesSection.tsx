import React from 'react';
import { services } from '../content';
import CaseTag from '../components/common/CaseTag';

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

const ServicesSection: React.FC = () => (
  <section className="section container" id="services" data-animate>
    <div className="section-heading" data-animate>
      <CaseTag text="What We Do" />
      <h2>One Partner For Every Digital Lever</h2>
      <p>
        From creative to code, paid media to AI automation, we drop in full-stack pods that own planning, execution, and
        optimization so you can focus on shipping product.
      </p>
    </div>
    <div className="card-grid">
      {services.map((service) => (
        <div key={service.title} className="card card--service card--interactive" data-animate>
          <div className="card__icon">{iconMap[service.icon]}</div>
          <div>
            <h4>{service.title}</h4>
            <p>{service.blurb}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ServicesSection;

