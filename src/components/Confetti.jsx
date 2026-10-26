import { useEffect, useRef } from 'react';

const COLORS = ['#C84B2F', '#C9A84C', '#F4F1EB'];

/**
 * Fires a short confetti burst across the full viewport. Mounted only
 * while the success modal is open, and unmounts itself once the
 * animation finishes.
 */
export function Confetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: 2 + Math.random() * 3,
      drift: -1 + Math.random() * 2,
      rot: Math.random() * 360,
      rotSpeed: -6 + Math.random() * 12,
    }));

    let frame = 0;
    let animId;

    function draw() {
      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.rot += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (frame < 130) {
        animId = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true" />;
}
