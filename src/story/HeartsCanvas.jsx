import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const RED = '255, 77, 109';

// Corazón de 7×6 píxeles (el mismo sprite que usan los dibujos).
const HEART = ['.RR.RR.', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...'];

function drawHeart(ctx, size) {
  const px = Math.max(2, Math.round(size / 7));
  const left = -3.5 * px;
  const top = -3 * px;
  HEART.forEach((row, y) => {
    for (let x = 0; x < row.length; x += 1) {
      if (row[x] === 'R') ctx.fillRect(left + x * px, top + y * px, px, px);
    }
  });
}

const rand = (min, max) => Math.random() * (max - min) + min;

/**
 * Sistema de partículas de corazones pixelados (SDD 4.B). Suben en el eje Y con oscilación en X.
 * - start()/stop(): bucle ambiental desde la parte baja de la página.
 * - burst(x, y): lluvia de corazones desde un punto (coordenadas relativas al canvas).
 */
const HeartsCanvas = forwardRef(function HeartsCanvas(_props, ref) {
  const canvasRef = useRef(null);
  const state = useRef({ particles: [], ambient: false, lastSpawn: 0, frame: 0, width: 0, height: 0 });

  useImperativeHandle(ref, () => ({
    start() {
      state.current.ambient = true;
      wake();
    },
    stop() {
      state.current.ambient = false;
    },
    burst(x, y, count = 22) {
      const { particles } = state.current;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: x + rand(-30, 30),
          y: y + rand(-10, 10),
          vx: rand(-1.4, 1.4),
          vy: rand(-3.2, -1.2),
          gravity: 0.035,
          size: rand(10, 20),
          phase: rand(0, Math.PI * 2),
          wobble: rand(0.4, 1.2),
          life: 0,
          maxLife: rand(110, 170),
        });
      }
      wake();
    },
  }));

  const loopRef = useRef(null);
  const wake = () => {
    if (!state.current.frame && loopRef.current) {
      state.current.frame = requestAnimationFrame(loopRef.current);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const current = state.current;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      current.width = canvas.clientWidth;
      current.height = canvas.clientHeight;
      canvas.width = current.width * ratio;
      canvas.height = current.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    loopRef.current = (time) => {
      const { particles, width, height } = current;
      if (current.ambient && time - current.lastSpawn > 380) {
        current.lastSpawn = time;
        particles.push({
          x: rand(width * 0.08, width * 0.92),
          y: height + 12,
          vx: 0,
          vy: rand(-1.1, -0.6),
          gravity: 0,
          size: rand(9, 17),
          phase: rand(0, Math.PI * 2),
          wobble: rand(0.5, 1.4),
          life: 0,
          maxLife: rand(260, 380),
        });
      }

      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.life += 1;
        p.vy += p.gravity;
        p.x += p.vx + Math.sin(p.phase + p.life * 0.05) * p.wobble * 0.6;
        p.y += p.vy;
        const progress = p.life / p.maxLife;
        if (progress >= 1 || p.y < -30 || p.y > height + 40) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = Math.min(1, p.life / 20) * (1 - progress) * 0.85;
        ctx.save();
        // Posiciones enteras y sin rotación para que los píxeles se vean nítidos.
        ctx.translate(Math.round(p.x), Math.round(p.y));
        ctx.fillStyle = `rgba(${RED}, ${alpha})`;
        drawHeart(ctx, p.size);
        ctx.restore();
      }

      if (particles.length || current.ambient) {
        current.frame = requestAnimationFrame(loopRef.current);
      } else {
        current.frame = 0;
      }
    };

    return () => {
      observer.disconnect();
      cancelAnimationFrame(current.frame);
      current.frame = 0;
      current.particles = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="hearts-canvas" aria-hidden="true" />;
});

export default HeartsCanvas;
