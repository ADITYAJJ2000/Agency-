import React from 'react';
import { testimonials } from '../content';
import CaseTag from '../components/common/CaseTag';

const TestimonialsSection: React.FC = () => (
  <section className="section container" id="portfolio" data-animate>
    <div className="section-heading" data-animate>
      <CaseTag text="Portfolio & Proof" />
      <h2>Impact-Driven Workflows</h2>
      <p>Operators trust us to run the entire digital stack — not one-off deliverables.</p>
    </div>
    <div className="card-grid">
      {testimonials.map((item) => (
        <div key={item.author} className="testimonial-card card--interactive" data-animate>
          <p>{item.quote}</p>
          <cite>{item.author}</cite>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;

