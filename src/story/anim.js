import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export { gsap };

/**
 * Aparición de un dibujo pixel art: las filas de píxeles (`.px-row`) se encienden de arriba
 * hacia abajo, como una pantalla de videojuego que carga.
 */
export function revealPixels(tl, svg, position, { duration = 1.2 } = {}) {
  if (!svg) return tl;
  const rows = [...svg.querySelectorAll('.px-row')].sort((a, b) => a.dataset.y - b.dataset.y);
  tl.fromTo(svg, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, position);
  tl.fromTo(
    rows,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.01, ease: 'none', stagger: { amount: duration } },
    '<'
  );
  return tl;
}

/** Aparición de texto (SDD 4.C): sube unos píxeles a saltos, como en los juegos de 8 bits. */
export function textIn(tl, targets, position, { stagger = 0.5, duration = 0.6, y = 10 } = {}) {
  tl.fromTo(
    targets,
    { autoAlpha: 0, y },
    { autoAlpha: 1, y: 0, duration, ease: 'steps(5)', stagger },
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

/** Revela un texto de izquierda a derecha, letra a letra (a saltos). */
export function handwrite(tl, element, position, { duration = 1.4 } = {}) {
  tl.fromTo(
    element,
    { clipPath: 'inset(-20% 100% -20% 0)', autoAlpha: 1 },
    { clipPath: 'inset(-20% 0% -20% 0)', duration, ease: 'steps(16)' },
    position
  );
  return tl;
}
