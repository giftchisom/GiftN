import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
  depth: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color palette for cosmic stars
    const starColors = [
      '#ffffff',
      '#f3e8ff', // soft lavender
      '#e0e7ff', // soft blue
      '#c084fc', // purple
      '#818cf8', // indigo
      '#fef08a', // faint golden
    ];

    // Generate stars
    const starCount = Math.floor(Math.min(width, 1920) * 0.14);
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() < 0.8 ? Math.random() * 0.9 + 0.3 : Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.008,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      depth: Math.random() * 0.8 + 0.2,
    }));

    // Active meteors / shooting stars
    const meteors: Meteor[] = [];
    let lastMeteorTime = Date.now();
    let meteorInterval = 5000 + Math.random() * 4000;

    const createMeteor = () => {
      const startX = Math.random() * (width * 0.8) + width * 0.1;
      const startY = Math.random() * (height * 0.4);
      meteors.push({
        x: startX,
        y: startY,
        length: Math.random() * 80 + 70,
        speed: Math.random() * 6 + 9,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // ~45 degrees diagonal
        alpha: 1,
        trail: [],
      });
    };

    // Resize listener
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-position any stars that fell out of bounds
      stars.forEach((star) => {
        if (star.x > width) star.x = Math.random() * width;
        if (star.y > height) star.y = Math.random() * height;
      });
    };

    // Parallax mouse tracker
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = width / 2;
      const centerY = height / 2;
      mouseRef.current.targetX = (e.clientX - centerX) * 0.015;
      mouseRef.current.targetY = (e.clientY - centerY) * 0.015;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render cosmic background nebula gradient overlay
      const nebula1 = ctx.createRadialGradient(
        width * 0.25 + mouseRef.current.x * 20,
        height * 0.2 + mouseRef.current.y * 20,
        10,
        width * 0.25,
        height * 0.2,
        width * 0.6
      );
      nebula1.addColorStop(0, 'rgba(88, 28, 135, 0.12)'); // violet-900
      nebula1.addColorStop(0.5, 'rgba(49, 10, 101, 0.05)');
      nebula1.addColorStop(1, 'rgba(3, 0, 10, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.75 - mouseRef.current.x * 15,
        height * 0.65 - mouseRef.current.y * 15,
        10,
        width * 0.75,
        height * 0.65,
        width * 0.55
      );
      nebula2.addColorStop(0, 'rgba(67, 24, 255, 0.08)'); // indigo
      nebula2.addColorStop(0.4, 'rgba(126, 34, 206, 0.04)');
      nebula2.addColorStop(1, 'rgba(3, 0, 10, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Render Stars with twinkle and parallax
      stars.forEach((star) => {
        // Calculate twinkle
        const alpha = Math.max(
          0.1,
          Math.min(1, star.baseAlpha + Math.sin(time * star.twinkleSpeed * 50 + star.twinkleOffset) * 0.35)
        );

        // Apply depth-based parallax
        const px = star.x + mouseRef.current.x * star.depth * 25;
        const py = star.y + mouseRef.current.y * star.depth * 25;

        // Wrap around boundaries smoothly
        const wrappedX = ((px % width) + width) % width;
        const wrappedY = ((py % height) + height) % height;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;

        ctx.beginPath();
        ctx.arc(wrappedX, wrappedY, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Spawn meteors periodically
      const now = Date.now();
      if (now - lastMeteorTime > meteorInterval) {
        createMeteor();
        lastMeteorTime = now;
        meteorInterval = 6000 + Math.random() * 8000;
      }

      // Render & update meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.trail.push({ x: m.x, y: m.y, alpha: m.alpha });
        if (m.trail.length > 18) m.trail.shift();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.015;

        if (m.trail.length > 1) {
          const tail = m.trail[0];
          const grad = ctx.createLinearGradient(tail.x, tail.y, m.x, m.y);
          grad.addColorStop(0, 'rgba(168, 85, 247, 0)');
          grad.addColorStop(0.6, `rgba(216, 180, 254, ${Math.max(0, m.alpha * 0.4)})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${Math.max(0, m.alpha)})`);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(tail.x, tail.y);
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#c084fc';
          ctx.stroke();
          ctx.restore();
        }

        // Remove dead meteors or out-of-screen
        if (m.alpha <= 0 || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      id="galaxy-space-background"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Deep celestial base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, #0e042a 0%, #050112 50%, #020008 100%)',
        }}
      />
      
      {/* Subtle cosmic grid dust */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(192, 132, 252, 0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Dynamic Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
