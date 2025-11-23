import React, { useRef, useEffect } from 'react';
import { teamStructure } from '../content';
import CaseTag from '../components/common/CaseTag';
import Divider from '../components/common/Divider';
import TeamMemberCard from '../components/team/TeamMemberCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    // Animate section headings
    const elements = headingRef.current.querySelectorAll('h2, p');
    if (elements.length > 0) {
      gsap.fromTo(
        Array.from(elements),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  if (!teamStructure) {
    return (
      <section className="section container" id="team" data-animate>
        <div className="section-heading" data-animate>
          <CaseTag text="Our Team" />
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="section container team-section" 
      id="team" 
      style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}
    >
      <div className="section-heading" ref={headingRef}>
        <CaseTag text="Our Team" />
        <h2 className="section-title">The Minds Behind The Impact</h2>
        <div className="section-description">
          <p>
            At the heart of our company is a group of people who genuinely love what they do. We're not just developers, designers, editors, or strategists — we're builders.
          </p>
          <p>
            Creators. Problem-solvers. The kind of people who stay up nights not because we have to, but because we're obsessed with making things better.
          </p>
          <p className="highlight">
            Every project we deliver is powered by a team that believes in excellence, innovation, and ownership.
          </p>
        </div>
      </div>


      <div className="team-category" data-category="development">
        <h3 className="team-category__title">🧑‍💻 Development & Engineering Team</h3>
        <div className="team-grid">
          {teamStructure.development.map((role, index) => (
            <TeamMemberCard 
              key={role.title} 
              title={role.title} 
              description={role.description} 
              index={index} 
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className="team-category" data-category="creative">
        <h3 className="team-category__title">🎨 Creative & Media Team</h3>
        <div className="team-grid">
          {teamStructure.creative.map((role, index) => {
            const prevLength = teamStructure.development.length;
            return (
              <TeamMemberCard 
                key={role.title} 
                title={role.title} 
                description={role.description} 
                index={index + prevLength} 
              />
            );
          })}
        </div>
      </div>

      <Divider />

      <div className="team-category" data-category="marketing">
        <h3 className="team-category__title">📈 Marketing & Growth Team</h3>
        <div className="team-grid">
          {teamStructure.marketing.map((role, index) => {
            const prevLength = teamStructure.development.length + 
                             teamStructure.creative.length;
            return (
              <TeamMemberCard 
                key={role.title} 
                title={role.title} 
                description={role.description} 
                index={index + prevLength} 
              />
            );
          })}
        </div>
      </div>

      <Divider />

      <div className="team-category" data-category="client-success">
        <h3 className="team-category__title">📞 Client Success & Support Team</h3>
        <div className="team-grid">
          {teamStructure.clientSuccess.map((role, index) => {
            const prevLength = teamStructure.development.length + 
                             teamStructure.creative.length +
                             teamStructure.marketing.length;
            return (
              <TeamMemberCard 
                key={role.title} 
                title={role.title} 
                description={role.description} 
                index={index + prevLength} 
              />
            );
          })}
        </div>
      </div>

      <Divider />

      <div className="team-different" data-animate>
        <div className="team-different__content">
          <h3>❤️ Why Our Team Is Different</h3>
          <div className="team-different__points">
            <div className="team-different__point">
              <span className="team-different__bullet">•</span>
              <p>We treat every client's project like our own startup</p>
            </div>
            <div className="team-different__point">
              <span className="team-different__bullet">•</span>
              <p>We think in systems, not shortcuts</p>
            </div>
            <div className="team-different__point">
              <span className="team-different__bullet">•</span>
              <p>We don't just deliver — we partner</p>
            </div>
            <div className="team-different__point">
              <span className="team-different__bullet">•</span>
              <p>We're young, hungry, obsessed with quality</p>
            </div>
            <div className="team-different__point">
              <span className="team-different__bullet">•</span>
              <p>We're always learning, iterating, improving</p>
            </div>
          </div>
          <p className="team-different__highlight" style={{ opacity: 0.8, fontSize: '1.1em' }}>
            We're not the kind of team that just "works." We're the kind of team that delivers exceptional results with speed and precision.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

