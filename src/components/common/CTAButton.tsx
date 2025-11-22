import React, { useRef } from 'react';

interface CTAButtonProps {
  label: string;
  variant?: 'primary' | 'ghost';
  size?: 'default' | 'small';
}

const CTAButton: React.FC<CTAButtonProps> = ({ label, variant = 'primary', size = 'default' }) => {
  const audioRef = useRef<AudioContext | null>(null);

  const triggerTone = () => {
    if (typeof window === 'undefined') return;
    const ctx = audioRef.current ?? new AudioContext();
    audioRef.current = ctx;
    ctx.resume();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'square';
    oscillator.frequency.value = variant === 'ghost' ? 420 : 360;
    gain.gain.value = 0.03;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
    oscillator.stop(ctx.currentTime + 0.18);
  };

  return (
    <button
      className={`cta ${variant === 'ghost' ? 'cta--ghost' : ''} ${size === 'small' ? 'cta--sm' : ''}`}
      onMouseEnter={triggerTone}
      onFocus={triggerTone}
    >
      {label}
    </button>
  );
};

export default CTAButton;

