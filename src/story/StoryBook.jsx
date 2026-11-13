import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from './anim.js';
import { PAGES } from './pages.jsx';
import HeartsCanvas from './HeartsCanvas.jsx';
import './story.css';

const FLIP_DURATION = 0.9;
const SWIPE_THRESHOLD = 45;
const TOTAL_PAGES = PAGES.length;

/**
 * Libro de cuentos interactivo (SDD): paso de página 3D con CSS transforms + GSAP,
 * timelines por página que se reproducen al llegar a cada una y swipe/flechas/teclado.
 * Empieza con el botón "Abrir invitación" (`onOpen`, que arranca la música) y, al terminar
 * (o al saltar la historia), llama a `onFinish`. `music` es el botón para silenciar la música.
 */
export default function StoryBook({ onFinish, onOpen, music }) {
  const [index, setIndex] = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [opened, setOpened] = useState(false);

  const stageRef = useRef(null);
  const bookWrapRef = useRef(null);
  const heartsRef = useRef(null);
  const pageRefs = useRef([]);
  const timelines = useRef([]);
  const visited = useRef(new Set());
  const indexRef = useRef(0);
  const busy = useRef(false);
  const finishing = useRef(false);
  const reduceMotion = useRef(false);
  const swipeStart = useRef(null);
  const swiped = useRef(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;
  const gateRef = useRef(null);
  const openedRef = useRef(false);

  const api = useMemo(
    () => ({
      startHearts: () => {
        if (!reduceMotion.current) heartsRef.current?.start();
      },
      stopHearts: () => heartsRef.current?.stop(),
      // Lluvia de corazones desde un elemento de la página.
      burst: (element, count) => {
        const wrap = bookWrapRef.current;
        if (reduceMotion.current || !wrap || !element) return;
        const base = wrap.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        heartsRef.current?.burst(
          rect.left - base.left + rect.width / 2,
          rect.top - base.top + rect.height * 0.25,
          count
        );
      },
    }),
    []
  );

  // Reproduce la animación de la página al llegar. Si ya se había visto, se muestra completa.
  const arrive = (i) => {
    const tl = timelines.current[i];
    if (!tl) return;
    if (!visited.current.has(i) && !reduceMotion.current) {
      visited.current.add(i);
      tl.restart();
      return;
    }
    visited.current.add(i);
    tl.progress(1);
    if (PAGES[i].hearts) api.startHearts();
  };

  const leave = (i) => {
    timelines.current[i]?.pause();
    api.stopHearts();
  };

  const flipDuration = () => (reduceMotion.current ? 0.01 : FLIP_DURATION);

  const finish = () => {
    if (finishing.current) return;
    finishing.current = true;
    api.stopHearts();
    gsap.to(stageRef.current, {
      autoAlpha: 0,
      duration: reduceMotion.current ? 0 : 0.6,
      ease: 'power1.in',
      onComplete: () => onFinishRef.current?.(),
    });
  };

  // Abre el libro: arranca la música (requiere el toque del usuario) y la animación de la portada.
  const open = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    onOpen?.();
    gsap.to(gateRef.current, {
      autoAlpha: 0,
      duration: reduceMotion.current ? 0 : 0.5,
      ease: 'power1.out',
      onComplete: () => setOpened(true),
    });
    gsap.delayedCall(reduceMotion.current ? 0 : 0.3, () => arrive(0));
  };

  const goNext = () => {
    if (!openedRef.current || busy.current || finishing.current) return;
    const i = indexRef.current;
    if (i >= TOTAL_PAGES - 1) {
      finish();
      return;
    }
    const current = pageRefs.current[i];
    const next = pageRefs.current[i + 1];
    const duration = flipDuration();

    busy.current = true;
    setHasNavigated(true);
    leave(i);
    if (visited.current.has(i + 1)) timelines.current[i + 1].progress(1);
    gsap.set(next, { visibility: 'visible' });
    indexRef.current = i + 1;
    setIndex(i + 1);

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(current, { visibility: 'hidden' });
          busy.current = false;
        },
      })
      .to(current, { rotationY: -180, duration, ease: 'power2.inOut' })
      .fromTo(
        current.querySelector('.page-light'),
        { opacity: 0 },
        { opacity: 1, duration: duration / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' },
        0
      )
      .fromTo(
        next.querySelector('.page-shadow'),
        { opacity: 1 },
        { opacity: 0, duration, ease: 'power1.in' },
        0
      )
      // La página nueva empieza a "dibujarse" cuando el giro va a la mitad.
      .call(() => arrive(i + 1), [], duration * 0.55);
  };

  const goPrev = () => {
    if (!openedRef.current || busy.current || finishing.current) return;
    const i = indexRef.current;
    if (i === 0) return;
    const current = pageRefs.current[i];
    const previous = pageRefs.current[i - 1];
    const duration = flipDuration();

    busy.current = true;
    setHasNavigated(true);
    leave(i);
    timelines.current[i - 1].progress(1);
    gsap.set(previous, { visibility: 'visible' });
    indexRef.current = i - 1;
    setIndex(i - 1);

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(current, { visibility: 'hidden' });
          busy.current = false;
          arrive(i - 1);
        },
      })
      .to(previous, { rotationY: 0, duration, ease: 'power2.inOut' })
      .fromTo(
        previous.querySelector('.page-light'),
        { opacity: 0 },
        { opacity: 1, duration: duration / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' },
        0
      )
      .fromTo(
        current.querySelector('.page-shadow'),
        { opacity: 0 },
        { opacity: 1, duration, ease: 'power1.out' },
        0
      );
  };

  // Las funciones de navegación solo leen refs, así que basta con guardar la última versión.
  const navRef = useRef({});
  navRef.current = { goNext, goPrev };

  useLayoutEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      pageRefs.current.forEach((element, i) => {
        gsap.set(element, {
          rotationY: 0,
          zIndex: TOTAL_PAGES - i,
          visibility: i === 0 ? 'visible' : 'hidden',
        });
        const tl = gsap.timeline({ paused: true });
        PAGES[i].build(tl, element.querySelector('.page-content'), api);
        timelines.current[i] = tl;
      });
    }, stageRef);
    // Si el libro ya estaba abierto (remontaje en desarrollo), vuelve a reproducir la portada.
    const start = openedRef.current ? gsap.delayedCall(0.4, () => arrive(0)) : null;

    return () => {
      start?.kill();
      ctx.revert();
      timelines.current = [];
      visited.current = new Set();
      indexRef.current = 0;
      busy.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') navRef.current.goNext();
      if (event.key === 'ArrowLeft') navRef.current.goPrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const onPointerDown = (event) => {
    swipeStart.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
  };

  const onPointerUp = (event) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2) {
      swiped.current = true;
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  // CTA de la página 7: abre la confirmación (ignora el "click" que llega al final de un swipe).
  const confirm = () => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    finish();
  };

  const isLast = index === TOTAL_PAGES - 1;

  return (
    <div className="story-stage" ref={stageRef}>
      <div
        className="book-wrap"
        ref={bookWrapRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        <div className="book" role="region" aria-roledescription="libro" aria-label="El cuento de Armando y Sabina">
          <div className="book-base" aria-hidden="true" />
          {PAGES.map((page, i) => {
            const Page = page.Component;
            const isCurrent = i === index;
            return (
              <section
                key={page.id}
                ref={(element) => {
                  pageRefs.current[i] = element;
                }}
                className="page"
                aria-label={`Página ${i + 1} de ${TOTAL_PAGES}: ${page.label}`}
                aria-hidden={!isCurrent}
                inert={!isCurrent}
              >
                <div className="page-face page-front">
                  <div className="page-content">
                    <Page onConfirm={confirm} />
                    <span className="page-number" aria-hidden="true">
                      {i + 1}
                    </span>
                  </div>
                  <div className="page-shadow" aria-hidden="true" />
                  <div className="page-light" aria-hidden="true" />
                </div>
                <div className="page-face page-back" aria-hidden="true" />
              </section>
            );
          })}
        </div>
        <HeartsCanvas ref={heartsRef} />
      </div>

      <nav className="story-nav" aria-label="Navegación del cuento">
        <button
          type="button"
          className="nav-btn"
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Página anterior"
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        <div className="nav-dots">
          {PAGES.map((page, i) => (
            <span key={page.id} className={`nav-dot ${i === index ? 'is-active' : ''}`} />
          ))}
          <span className="sr-only" aria-live="polite">
            Página {index + 1} de {TOTAL_PAGES}
          </span>
        </div>

        {isLast ? (
          <button type="button" className="nav-finish" onClick={finish}>
            Confirmar
            <ChevronRight aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            className={`nav-btn ${hasNavigated ? '' : 'nudge'}`}
            onClick={goNext}
            aria-label="Página siguiente"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        )}
      </nav>

      <div className="story-footer">
        {music}
        <span className="story-hint">{hasNavigated ? '' : 'Desliza para avanzar'}</span>
        <button type="button" className="story-skip" onClick={finish}>
          Saltar historia
        </button>
      </div>

      {!opened && (
        <div className="story-gate" ref={gateRef}>
          <button type="button" className="gate-button" onClick={open}>
            <BookOpen aria-hidden="true" />
            Abrir invitación
          </button>
          <p className="gate-note">Sube el volumen: la historia tiene música 🎶</p>
        </div>
      )}
    </div>
  );
}
