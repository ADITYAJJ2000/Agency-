import React, { useRef, forwardRef, useEffect } from 'react';
import { magneticButton } from '../../utils/gsapAnimations';

interface CTAButtonProps {
  label: string;
  variant?: 'primary' | 'ghost';
  size?: 'default' | 'small';
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ label, variant = 'primary', size = 'default' }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const audioRef = useRef<AudioContext | null>(null);
    const actualRef = (ref || buttonRef) as React.RefObject<HTMLButtonElement>;

    useEffect(() => {
      if (actualRef.current) {
        magneticButton(actualRef.current);
      }
    }, [actualRef]);

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
        ref={actualRef}
        className={`cta ${variant === 'ghost' ? 'cta--ghost' : ''} ${size === 'small' ? 'cta--sm' : ''}`}
        onMouseEnter={triggerTone}
        onFocus={triggerTone}
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {label}
      </button>
    );
  }
);

CTAButton.displayName = 'CTAButton';

export default CTAButton;

