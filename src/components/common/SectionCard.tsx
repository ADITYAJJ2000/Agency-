import React, { useState } from 'react';

interface SectionCardProps {
  title: string;
  description: string;
  accent?: boolean;
  interactive?: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, accent, interactive }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(relY * 10), y: relX * 10 });
  };

  const resetTilt = () => interactive && setTilt({ x: 0, y: 0 });

  return (
    <div
      className={`card ${accent ? 'card--accent' : ''} ${interactive ? 'card--interactive' : ''}`}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={
        interactive
          ? {
              transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }
          : undefined
      }
    >
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default SectionCard;

