import React, { useEffect, useRef, useCallback } from "react";

type Point = { x: number; y: number };

// Remove the local file path and use a placeholder or your own image URL
const IMAGE_URL = "/placeholder-lightning.png"; // Replace with your image URL or remove if not needed

const ThunderCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const lastRef = useRef<Point>({ x: -9999, y: -9999 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
  }>>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const hasStruckRef = useRef(false);

  const drawLightning = useCallback((a: Point, b: Point, ctx: CanvasRenderingContext2D, branch = false) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy);
    const segments = Math.max(4, Math.floor(dist / 8));
    const displacement = Math.min(18, dist / 6);

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);

    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const nx = a.x + dx * t;
      const ny = a.y + dy * t;
      const offset = (Math.random() - 0.5) * displacement * (1 - Math.abs(2 * t - 1));
      const perpX = -dy / dist;
      const perpY = dx / dist;
      ctx.lineTo(nx + perpX * offset, ny + perpY * offset);
    }

    ctx.stroke();

    if (!branch && Math.random() < 0.25) {
      const bx = a.x + dx * (0.2 + Math.random() * 0.6);
      const by = a.y + dy * (0.2 + Math.random() * 0.6);
      const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.2;
      const len = dist * (0.2 + Math.random() * 0.4);
      const bx2 = bx + Math.cos(angle) * len;
      const by2 = by + Math.sin(angle) * len;
      drawLightning({ x: bx, y: by }, { x: bx2, y: by2 }, ctx, true);
    }
  }, []);

  const spawnParticles = useCallback((x: number, y: number) => {
    const count = 8 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 30 + Math.random() * 20,
        maxLife: 30 + Math.random() * 20,
      });
    }
  }, []);

  const skyStrike = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const start: Point = { 
      x: window.innerWidth / 2 + (Math.random() * 300 - 150), 
      y: 0 
    };
    const end: Point = { 
      x: window.innerWidth / 2 + (Math.random() * 400 - 200), 
      y: window.innerHeight - 100 
    };

    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(180,230,255,0.9)";
    ctx.globalCompositeOperation = "lighter";

    // Draw main lightning
    drawLightning(start, end, ctx);
    
    // Add impact effect
    const impactParticles = 30;
    for (let i = 0; i < impactParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 10 + 5;
      particlesRef.current.push({
        x: end.x,
        y: end.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60 + Math.random() * 40,
        maxLife: 100
      });
    }

    // Flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.background = 'rgba(255, 255, 255, 0.4)';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'opacity 0.3s ease-out';
    flash.style.zIndex = '9998';
    document.body.appendChild(flash);
    
    // Fade out flash
    requestAnimationFrame(() => {
      flash.style.opacity = '0';
      setTimeout(() => {
        flash.remove();
      }, 300);
    });

  }, [drawLightning]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    function onMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      // spawn a quick particle burst
      spawnParticles(e.clientX, e.clientY);
    }

    function onLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    // Initialize image if needed
    if (IMAGE_URL) {
      const img = new Image();
      img.src = IMAGE_URL;
      imgRef.current = img;
    }

    function render() {
      rafRef.current = requestAnimationFrame(render);

      // fade canvas slightly
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 1;
        const alpha = Math.max(0, p.life / p.maxLife);

        ctx.beginPath();
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = `rgba(138, 180, 255, ${0.18 * alpha})`;
        ctx.arc(p.x, p.y, 2 + (1 - alpha) * 3, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) particlesRef.current.splice(i, 1);
      }

      const mouse = mouseRef.current;
      const last = lastRef.current;

      // interpolate last towards mouse for smooth trailing
      last.x += (mouse.x - last.x) * 0.35;
      last.y += (mouse.y - last.y) * 0.35;

      // if mouse is offscreen, don't draw
      if (mouse.x > -100 && mouse.y > -100) {
        // Initial thunder strike on first mouse move
        if (!hasStruckRef.current) {
          hasStruckRef.current = true;
          setTimeout(() => skyStrike(), 100);
        }
        ctx.lineWidth = 2.2;
        // outer glow thick stroke
        ctx.strokeStyle = "rgba(120,200,255,0.12)";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalCompositeOperation = "lighter";
        drawLightning(last, mouse, ctx);

        // bright center
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "rgba(180,230,255,0.95)";
        drawLightning(last, mouse, ctx);

        // tiny core
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        drawLightning(last, mouse, ctx);
      }

      // subtle trailing blur using global alpha overlay
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    render();

    // Initial strike after a short delay if no mouse movement
    const strikeTimeout = setTimeout(() => {
      if (!hasStruckRef.current) {
        hasStruckRef.current = true;
        skyStrike();
      }
    }, 1000);

    return () => {
      clearTimeout(strikeTimeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.documentElement.style.cursor = ""; // restore
    };
  }, [drawLightning, spawnParticles, skyStrike]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        zIndex: 9999,
        mixBlendMode: "screen",
      }}
    />
  );
};

export default ThunderCursor;
