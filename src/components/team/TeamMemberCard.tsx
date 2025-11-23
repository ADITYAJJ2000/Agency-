import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TeamMemberCardProps {
  title: string;
  description: string;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ title, description, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial animation on scroll into view
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Hover animations
    const hoverTl = gsap.timeline({ paused: true });
    
    hoverTl
      .to(cardRef.current, {
        scale: 1.04,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(avatarRef.current, {
        scale: 1.1,
        duration: 0.3,
      }, 0)
      .to(borderRef.current, {
        opacity: 0.8,
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
        duration: 0.4,
      }, 0)
      .to(contentRef.current, {
        y: -10,
        opacity: 1,
        duration: 0.3,
      }, 0.1);

    // 3D tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / 20) * -1;
      const rotateY = (x - centerX) / 20;
      
      gsap.to(cardRef.current, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformOrigin: 'center center',
        duration: 1,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    const card = cardRef.current;
    card?.addEventListener('mousemove', handleMouseMove);
    card?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card?.removeEventListener('mousemove', handleMouseMove);
      card?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="team-card"
      style={{
        position: 'relative',
        borderRadius: '24px',
        padding: '24px',
        background: 'rgba(20, 20, 20, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
    >
      {/* Neon border effect */}
      <div 
        ref={borderRef}
        className="team-card__border"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          padding: '2px',
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.5), rgba(0, 200, 255, 0.3))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          opacity: 0.3,
          transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
        }}
      />
      
      <div 
        ref={avatarRef}
        className="team-card__avatar"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          margin: '0 auto 20px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          border: '2px solid rgba(255, 255, 255, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          transition: 'transform 0.3s ease',
        }}
      >
        <div 
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          {title.charAt(0)}
        </div>
      </div>
      
      <div 
        ref={contentRef}
        className="team-card__content"
        style={{
          textAlign: 'center',
          opacity: 0.8,
          transform: 'translateY(10px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <h3 
          style={{
            color: 'var(--neon)',
            marginBottom: '12px',
            fontSize: '1.2rem',
            fontWeight: 600,
            textShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
          }}
        >
          {title}
        </h3>
        <p 
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {description}
        </p>
        
        <div 
          className="team-card__social"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          {['linkedin', 'twitter', 'github'].map((social) => (
            <a
              key={social}
              href="#"
              className="social-icon"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <i className={`fab fa-${social}`}></i>
            </a>
          ))}
        </div>
      </div>
      
      {/* Floating particles background */}
      <div 
        className="team-card__particles"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default TeamMemberCard;
