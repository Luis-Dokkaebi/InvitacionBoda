import { useState } from 'react';
import { STORY } from './content.js';
import { SPRITES } from './pixel.js';
import { gsap, handwrite, revealPixels, textIn, typewrite } from './anim.js';
import {
  CanPhones,
  CoffeeScene,
  CoverCouple,
  DogScene,
  Envelope,
  HeartDivider,
  KidsScene,
  LiftCouple,
  ProposalScene,
  RunningCouple,
  SelfieScene,
  StairsCouple,
  SwingsCouple,
  ToastCouple,
  WeddingDance,
} from './illustrations.jsx';

/**
 * Texto que se escribe letra por letra sin mover el layout (el "fantasma" reserva el espacio).
 * Cada "\n" del texto es una línea que se escribe después de la anterior.
 */
function Typed({ text }) {
  return (
    <span className="tw">
      {text.split('\n').map((line, index) => (
        <span key={index} className="tw-line">
          <span className="tw-ghost" aria-hidden="true">
            {line}
          </span>
          <span className="tw-live" data-text={line} aria-hidden="true">
            {line}
          </span>
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}

/* ---------- Página 1: La Portada ---------- */

function Cover() {
  return (
    <div className="pg pg-cover">
      <p className="cover-kicker">{STORY.cover.kicker}</p>
      <h1 className="cover-title">{STORY.cover.title}</h1>
      <CoverCouple className="cover-art" />
      <p className="cover-byline">
        {STORY.cover.byline} <span className="px-title gold">{STORY.couple}</span>
      </p>
    </div>
  );
}

function buildCover(tl, root, api) {
  const q = gsap.utils.selector(root);
  textIn(tl, q('.cover-kicker'), 0.3, { duration: 0.8 });
  tl.fromTo(
    q('.cover-title'),
    { autoAlpha: 0, scale: 1.2 },
    { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'back.out(2)' },
    1.1
  );
  revealPixels(tl, root.querySelector('.cover-art'), '>');
  tl.call(api.startHearts);
  textIn(tl, q('.cover-byline'), '+=0.2', { duration: 0.9 });
}

/* ---------- Página 2: El Inicio ---------- */

const PANEL_ART = { cafe: CoffeeScene, selfie: SelfieScene, perro: DogScene, ninos: KidsScene };

function Beginning() {
  return (
    <div className="pg pg-begin">
      <header className="begin-head">
        <p className="begin-intro">
          <Typed text={STORY.beginning.intro} />
        </p>
        <h2 className="px-title gold begin-names">{STORY.couple}</h2>
      </header>
      <div className="panels">
        {STORY.beginning.panels.map((panel, index) => {
          const Art = PANEL_ART[panel.id];
          return (
            <figure key={panel.id} className={`panel panel-${index}`}>
              <Art />
              <figcaption>{panel.text}</figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

function buildBeginning(tl, root) {
  const q = gsap.utils.selector(root);
  typewrite(tl, root.querySelector('.begin-intro'), 0.3, { speed: 0.08 });
  handwrite(tl, root.querySelector('.begin-names'), '>');
  q('.panel').forEach((panel) => {
    tl.fromTo(
      panel,
      { autoAlpha: 0, scale: 0.94 },
      { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
      '+=0.15'
    );
    revealPixels(tl, panel.querySelector('.pixel-svg'), '<0.1', { duration: 1.3 });
    textIn(tl, panel.querySelector('figcaption'), '>-0.25', { duration: 0.5 });
  });
}

/* ---------- Página 3: La Decisión ---------- */

function Decision() {
  const { lines } = STORY.decision;
  return (
    <div className="pg pg-decision">
      <p className="decision-top">{STORY.decision.top}</p>
      <div className="decision-art decision-run">
        <RunningCouple />
      </div>
      <div className="decision-lines">
        {lines.map((line, index) => (
          <p key={line} className={index === lines.length - 1 ? 'decision-final pink' : undefined}>
            {line}
          </p>
        ))}
      </div>
      <div className="decision-art decision-lift">
        <LiftCouple />
      </div>
    </div>
  );
}

function buildDecision(tl, root, api) {
  const q = gsap.utils.selector(root);
  textIn(tl, q('.decision-top'), 0.3, { duration: 0.8 });
  revealPixels(tl, root.querySelector('.decision-run .pixel-svg'), '>-0.1', { duration: 1.4 });
  // Movimiento sutil de la pareja hacia el centro mientras se dibuja.
  tl.fromTo(q('.runners'), { x: -9 }, { x: 0, duration: 2.4, ease: 'steps(9)' }, '<');
  textIn(tl, q('.decision-lines p'), '>-0.6', { stagger: 0.5 });
  const lift = root.querySelector('.decision-lift');
  revealPixels(tl, lift.querySelector('.pixel-svg'), '>-0.1', { duration: 1.3 });
  // Lluvia de corazones rojos desde la ilustración del abrazo.
  tl.call(() => api.burst(lift), [], '>-0.3');
  tl.call(() => api.burst(lift, 14), [], '+=0.9');
}

/* ---------- Página 4: La Propuesta ---------- */

function Proposal() {
  const { proposal } = STORY;
  return (
    <div className="pg pg-propose">
      <div className="propose-art">
        <ProposalScene />
      </div>
      {[proposal.question, proposal.answer].map((line, index) => (
        <div key={line.name} className={`dialog dialog-${index}`}>
          <span className="dialog-name">{line.name}</span>
          <p className={`dialog-text ${index ? 'pink' : ''}`}>
            <Typed text={line.text} />
          </p>
        </div>
      ))}
    </div>
  );
}

function buildProposal(tl, root, api) {
  const q = gsap.utils.selector(root);
  revealPixels(tl, root.querySelector('.propose-art .pixel-svg'), 0.3, { duration: 1.4 });
  q('.dialog').forEach((dialog) => {
    textIn(tl, dialog, '+=0.3', { duration: 0.4 });
    typewrite(tl, dialog, '>', { speed: 0.07 });
  });
  // Lluvia de corazones cuando ella dice que sí.
  tl.call(() => api.burst(root.querySelector('.propose-art')), [], '>');
}

/* ---------- Página 5: La Fecha ---------- */

function DatePage() {
  return (
    <div className="pg pg-date">
      <h2 className="px-title gold date-title">{STORY.date.title}</h2>
      <div className="date-art">
        <WeddingDance />
      </div>
      <p className="date-text">{STORY.date.date}</p>
      <HeartDivider />
    </div>
  );
}

function buildDate(tl, root) {
  const q = gsap.utils.selector(root);
  tl.fromTo(
    q('.date-title'),
    { autoAlpha: 0, y: -90 },
    { autoAlpha: 1, y: 0, duration: 1.1, ease: 'bounce.out' },
    0.3
  );
  revealPixels(tl, root.querySelector('.date-art .pixel-svg'), '>-0.2');
  tl.fromTo(
    q('.date-text'),
    { autoAlpha: 0, scale: 0.6 },
    { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'back.out(1.6)' },
    '>'
  );
  revealPixels(tl, root.querySelector('.heart-divider'), '<0.3', { duration: 0.9 });
}

/* ---------- Página 6: El Escenario ---------- */

function Venue() {
  const { venue } = STORY;
  return (
    <div className="pg pg-venue">
      <header className="venue-head">
        <h2 className="venue-name">{venue.name}</h2>
        <p className="px-title gold venue-city">{venue.city}</p>
      </header>
      <p className="venue-paragraph">{venue.paragraph}</p>
      <div className="venue-row">
        <div className="venue-stairs">
          <StairsCouple />
        </div>
        <p className="venue-dress pink">
          <Typed text={venue.dressCode} />
        </p>
      </div>
      <p className="venue-time">
        <span className="venue-time-label">a las</span> {venue.time}
      </p>
      <div className="venue-toast">
        <ToastCouple />
      </div>
    </div>
  );
}

function buildVenue(tl, root) {
  const q = gsap.utils.selector(root);
  textIn(tl, [...q('.venue-name'), ...q('.venue-city')], 0.3, { stagger: 0.4 });
  textIn(tl, q('.venue-paragraph'), '>', { duration: 0.9 });
  revealPixels(tl, root.querySelector('.venue-stairs .pixel-svg'), '>', { duration: 1.3 });
  typewrite(tl, root.querySelector('.venue-dress'), '>-0.1');
  textIn(tl, q('.venue-time'), '>', { duration: 0.6 });
  revealPixels(tl, root.querySelector('.venue-toast .pixel-svg'), '>-0.1', { duration: 1.3 });
}

/* ---------- Página 7: Los Obsequios ---------- */

// Un sobre por cada píxel del corazón de 7×6: así la lluvia de sobres termina formando un corazón.
const HEART_CELLS = SPRITES.heart.flatMap((row, r) =>
  [...row].flatMap((cell, c) => (cell === '.' ? [] : [{ r, c }]))
);

function Gifts() {
  return (
    <div className="pg pg-gifts">
      <div className="gifts-art">
        <SwingsCouple />
      </div>
      <h2 className="px-title gold gifts-title">{STORY.gifts.title}</h2>
      <p className="gifts-text">{STORY.gifts.paragraph}</p>
      <div className="gifts-heart" aria-hidden="true">
        {HEART_CELLS.map(({ r, c }) => (
          <span key={`${r}-${c}`} className="envelope" style={{ '--r': r, '--c': c }}>
            <Envelope variant={(r + c) % 3} />
          </span>
        ))}
      </div>
    </div>
  );
}

function buildGifts(tl, root, api) {
  const q = gsap.utils.selector(root);
  revealPixels(tl, root.querySelector('.gifts-art .pixel-svg'), 0.3);
  textIn(tl, q('.gifts-title'), '>-0.2', { duration: 0.8 });
  textIn(tl, q('.gifts-text'), '>-0.2', { duration: 0.9 });
  // Lluvia de sobres: caen desde arriba de la página, ladeados, y aterrizan en su lugar del corazón.
  tl.fromTo(
    q('.envelope'),
    {
      autoAlpha: 1,
      yPercent: (i) => -3000 - (i % 5) * 180,
      xPercent: () => gsap.utils.random(-250, 250),
      rotation: () => gsap.utils.random(-35, 35),
    },
    {
      yPercent: 0,
      xPercent: 0,
      rotation: 0,
      duration: 1.3,
      ease: 'bounce.out',
      stagger: { each: 0.09, from: 'random' },
    },
    '>-0.4'
  );
  // El corazón late dos veces y suelta corazones.
  tl.to(q('.gifts-heart'), { scale: 1.08, duration: 0.18, ease: 'steps(2)', yoyo: true, repeat: 3 }, '>');
  tl.call(() => api.burst(root.querySelector('.gifts-heart'), 16), [], '<');
}

/* ---------- Página 8: La Confirmación ---------- */

function Confirm({ onConfirm }) {
  return (
    // Toda la página es el CTA: al tocarla se abre el formulario de confirmación.
    <button type="button" className="pg pg-confirm" onClick={onConfirm}>
      <span className="confirm-title">{STORY.confirm.title}</span>
      <span className="confirm-art">
        <CanPhones />
      </span>
      <span className="confirm-cta">
        <span className="confirm-cta-inner">{STORY.confirm.cta}</span>
      </span>
    </button>
  );
}

function buildConfirm(tl, root) {
  const q = gsap.utils.selector(root);
  textIn(tl, q('.confirm-title'), 0.3, { duration: 0.8 });
  revealPixels(tl, root.querySelector('.confirm-art .pixel-svg'), '>-0.1', { duration: 1.3 });
  textIn(tl, q('.confirm-cta'), '>', { duration: 0.6 });
}

/* ---------- Página 9: El Cierre ---------- */

function Closing() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const { closing } = STORY;
  return (
    <div className="pg pg-closing">
      <h2 className="px-title gold closing-title">{STORY.couple}</h2>
      <figure className="polaroid">
        <div className="polaroid-photo">
          {photoFailed ? (
            <CoverCouple className="polaroid-fallback" />
          ) : (
            <img
              src={`${import.meta.env.BASE_URL}${closing.photo}`}
              alt={closing.photoAlt}
              onError={() => setPhotoFailed(true)}
            />
          )}
        </div>
        <figcaption className="polaroid-caption">{STORY.date.date}</figcaption>
      </figure>
      <p className="closing-end">{closing.ending}</p>
    </div>
  );
}

function buildClosing(tl, root, api) {
  const q = gsap.utils.selector(root);
  textIn(tl, q('.closing-title'), 0.3, { duration: 0.8 });
  tl.fromTo(
    q('.polaroid'),
    { autoAlpha: 0, scale: 0.8, rotation: -2 },
    { autoAlpha: 1, scale: 1, rotation: -2, duration: 1.1, ease: 'power3.out' },
    '>-0.1'
  );
  tl.call(api.startHearts);
  textIn(tl, q('.closing-end'), '>+0.2', { duration: 1 });
}

/** Las 9 páginas del libro, en orden. `hearts` = corazones flotando en bucle en esa página. */
export const PAGES = [
  { id: 'portada', label: 'La portada', Component: Cover, build: buildCover, hearts: true },
  { id: 'inicio', label: 'El inicio', Component: Beginning, build: buildBeginning },
  { id: 'decision', label: 'La decisión', Component: Decision, build: buildDecision },
  { id: 'propuesta', label: 'La propuesta', Component: Proposal, build: buildProposal },
  { id: 'fecha', label: 'La fecha', Component: DatePage, build: buildDate },
  { id: 'escenario', label: 'El escenario', Component: Venue, build: buildVenue },
  { id: 'obsequios', label: 'Los obsequios', Component: Gifts, build: buildGifts },
  { id: 'confirmacion', label: 'La confirmación', Component: Confirm, build: buildConfirm },
  { id: 'cierre', label: 'El cierre', Component: Closing, build: buildClosing, hearts: true },
];
