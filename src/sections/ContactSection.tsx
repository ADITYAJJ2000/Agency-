import React from 'react';
import CaseTag from '../components/common/CaseTag';
import CTAButton from '../components/common/CTAButton';

const contactFields = ['Full Name', 'Company', 'Email', 'Project Focus'];

const ContactSection: React.FC = () => (
  <section className="section container" id="contact" data-animate>
    <div className="section-heading" data-animate>
      <CaseTag text="Contact" />
      <h2>Ready For A Free Strategy Call?</h2>
      <p>Share a few details about your roadmap and we’ll return a tailored action plan within 24 hours.</p>
    </div>
    <div className="contact-grid">
      <form className="form-card card--interactive" data-animate>
        {contactFields.map((label) => (
          <label key={label} className="form-field">
            <span>{label}</span>
            <input className="input" type="text" placeholder={label} />
          </label>
        ))}
        <label className="form-field">
          <span>Message</span>
          <textarea className="textarea" placeholder="Tell us about your goals" />
        </label>
        <CTAButton label="Get Free Strategy Call" />
      </form>
      <div className="contact-card holo" data-animate>
        <p>
          Prefer instant messaging? Tap the WhatsApp button for a 2-minute response time during business hours or email
          us any time.
        </p>
        <CTAButton label="WhatsApp · 2 Min Response" variant="ghost" />
        <div>
          <p style={{ color: 'var(--neon)', fontWeight: 600, marginBottom: '8px' }}>Other Contact Options</p>
          <p style={{ margin: 0 }}>hello@agency.com · +1 (555) 010-2233</p>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>Careers · partnerships · press</p>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;

