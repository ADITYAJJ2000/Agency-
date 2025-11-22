import React from 'react';

const ParticleField: React.FC = () => {
  const particles = Array.from({ length: 40 }, (_, index) => ({
    delay: Math.random() * 10,
    duration: 12 + Math.random() * 8,
    left: Math.random() * 100,
    top: Math.random() * 200,
    size: 1.5 + Math.random() * 2.5,
  }));

  return (
    <div className="particle-field" aria-hidden>
      {particles.map((particle, index) => (
        <span
          key={index}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;

