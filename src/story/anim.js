import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(DrawSVGPlugin, TextPlugin);

export { gsap };

// Elementos que se "dibujan" con trazo. Los que llevan .fill-reveal solo aparecen con fade al final.
const STROKE_SELECTOR = 'path, circle, ellipse, line, polyline, polygon, rect';

/**
 * Efecto de dibujado a mano (SDD 4.A): anima el trazo de cada elemento de un `.draw-svg`
 * y, al terminar, hace fade-in de los rellenos marcados con `.fill-reveal`.
 */
export function drawSvg(tl, svg, position, { duration = 1.5 } = {}) {
  if (!svg) return tl;
  const strokes = [...svg.querySelectorAll(STROKE_SELECTOR)].filter(
    (element) => !element.classList.contains('fill-reveal')
  );
  const fills = svg.querySelectorAll('.fill-reveal');
  const stagger = { amount: Math.min(0.9, strokes.length * 0.04) };

  tl.fromTo(svg, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, position);
  // Opacidad con el mismo stagger que el trazo: evita que los extremos redondeados
  // se vean como puntos antes de que empiece a dibujarse cada línea.
  tl.fromTo(strokes, { opacity: 0 }, { opacity: 1, duration: 0.05, stagger }, '<');
  tl.fromTo(
    strokes,
    { drawSVG: '0%' },
    { drawSVG: '100%', duration, ease: 'power2.inOut', stagger },
    '<'
  );
  if (fills.length) {
    tl.fromTo(
      fills,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power1.out', stagger: 0.04 },
      '>-0.15'
    );
  }
  return tl;
}

/** Aparición de texto (SDD 4.C): opacity 0 + translateY(10px) con stagger. */
export function textIn(tl, targets, position, { stagger = 0.5, duration = 0.6, y = 10 } = {}) {
  tl.fromTo(
    targets,
    { autoAlpha: 0, y },
    { autoAlpha: 1, y: 0, duration, ease: 'power2.out', stagger },
    position
  );
  return tl;
}

/** Efecto máquina de escribir: escribe, línea por línea, cada `.tw-live` dentro de `container`. */
export function typewrite(tl, container, position, { speed = 0.045 } = {}) {
  if (!container) return tl;
  container.querySelectorAll('.tw-live').forEach((line, index) => {
    const text = line.dataset.text ?? '';
    tl.fromTo(
      line,
      { text: '' },
      { text, duration: Math.max(0.3, text.length * speed), ease: 'none' },
      index === 0 ? position : '>0.1'
    );
  });
  return tl;
}

/** Revela texto manuscrito de izquierda a derecha, como si se escribiera con pluma. */
export function handwrite(tl, element, position, { duration = 1.4 } = {}) {
  tl.fromTo(
    element,
    { clipPath: 'inset(-20% 100% -20% 0)', autoAlpha: 1 },
    { clipPath: 'inset(-20% 0% -20% 0)', duration, ease: 'power1.inOut' },
    position
  );
  return tl;
}
