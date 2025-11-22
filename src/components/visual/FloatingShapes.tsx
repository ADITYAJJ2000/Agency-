import React, { useEffect, useRef } from 'react';

type ShapeConfig = {
  id: number;
  size: number;
  top: number;
  left: number;
  speed: number;
  variant: 'sphere' | 'cube' | 'wire';
  opacity: number;
};

const FloatingShapes: React.FC = () => {
  const shapesRef = useRef<ShapeConfig[]>([]);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize shapes with random positions and properties
  if (shapesRef.current.length === 0) {
    const variants: ('sphere' | 'cube' | 'wire')[] = ['sphere', 'cube', 'wire'];
    const count = 15; // Increased number of shapes for more dynamic effect
    
    for (let i = 0; i < count; i++) {
      shapesRef.current.push({
        id: i,
        size: Math.random() * 60 + 30, // 30-90px
        top: Math.random() * 100,
        left: Math.random() * 100,
        speed: Math.random() * 0.5 + 0.5, // 0.5-1.0 speed multiplier
        variant: variants[Math.floor(Math.random() * variants.length)],
        opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8 opacity
      });
    }
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const shapes = container.querySelectorAll<HTMLDivElement>('.shape');
    let lastTime = 0;
    const baseSpeed = 0.15; // Base speed for upward movement

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      shapes.forEach((shape, index) => {
        const config = shapesRef.current[index];
        if (!config) return;

        // Move shape upward
        config.top -= (baseSpeed * config.speed * delta) / 16; // Normalize by 16ms (60fps)
        
        // Reset position if above viewport
        if (config.top < -10) {
          config.top = 110; // Start from bottom
          config.left = Math.random() * 100; // Random horizontal position
        }

        // Apply movement with slight horizontal drift
        const drift = Math.sin(time * 0.001 * config.speed) * 0.5;
        
        shape.style.transform = `translate3d(${config.left + drift}vw, ${config.top}vh, 0)`;
        shape.style.opacity = `${config.opacity}`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="floating-shapes" ref={containerRef} aria-hidden>
      {shapesRef.current.map((shape) => (
        <div
          key={shape.id}
          className={`shape shape--${shape.variant}`}
          style={{
            width: shape.size,
            height: shape.size,
            top: `${shape.top}vh`,
            left: `${shape.left}vw`,
            opacity: shape.opacity,
            transition: 'transform 0.1s ease-out, opacity 0.5s ease',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;

