import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Magnetic button effect
export const magneticButton = (element: HTMLElement | null) => {
  if (!element) return;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Text reveal with clip-path
export const textReveal = (element: HTMLElement | null) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      clipPath: 'inset(100% 0 0 0)',
      opacity: 0,
    },
    {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Stagger fade-up animation
export const staggerFadeUp = (
  elements: NodeListOf<Element> | Element[],
  delay: number = 0.1
) => {
  if (!elements || elements.length === 0) return;

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements[0] as Element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Parallax effect
export const parallax = (element: HTMLElement | null, speed: number = 0.5) => {
  if (!element) return;

  gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Card hover tilt effect (3D parallax)
export const cardTilt = (element: HTMLElement | null) => {
  if (!element) return;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(element, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Icon float animation
export const iconFloat = (element: HTMLElement | null) => {
  if (!element) return;

  gsap.to(element, {
    y: -10,
    duration: 2,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true,
  });
};

// Scale in animation
export const scaleIn = (
  element: HTMLElement | null,
  delay: number = 0
) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Slide in from direction
export const slideIn = (
  element: HTMLElement | null,
  direction: 'left' | 'right' | 'up' | 'down' = 'up'
) => {
  if (!element) return;

  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };

  gsap.fromTo(
    element,
    {
      ...directions[direction],
      opacity: 0,
    },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Pinned section
export const pinSection = (element: HTMLElement | null, duration: string = '100%') => {
  if (!element) return;

  ScrollTrigger.create({
    trigger: element,
    start: 'top top',
    end: duration,
    pin: true,
    pinSpacing: true,
  });
};

// Ripple effect for buttons
export const rippleEffect = (element: HTMLElement | null, event: MouseEvent) => {
  if (!element) return;

  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
    transform: scale(0);
  `;

  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  gsap.to(ripple, {
    scale: 2,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => ripple.remove(),
  });
};

