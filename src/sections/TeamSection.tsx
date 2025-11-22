import React from 'react';
import { team } from '../content';
import CaseTag from '../components/common/CaseTag';

const TeamSection: React.FC = () => (
  <section className="section container" id="team" data-animate>
    <div className="section-heading" data-animate>
      <CaseTag text="Team Expertise" />
      <h2>Embedded Specialists With Operator DNA</h2>
      <p>Pods pair creatives, engineers, growth strategists, revenue ops, and AI scientists within your workflow.</p>
    </div>
    <div className="card-grid">
      {team.map((role) => (
        <div key={role.title} className="card card--glass" data-animate>
          <p style={{ color: 'var(--neon)', fontWeight: 600, marginBottom: '8px' }}>{role.title}</p>
          <p>{role.focus}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TeamSection;

