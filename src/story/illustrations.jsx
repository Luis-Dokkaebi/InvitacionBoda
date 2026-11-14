/*
 * Ilustraciones del cuento en pixel art. Cada escena se compone con los sprites de `pixel.js`
 * y se dibuja como <svg class="pixel-svg"> con una fila de píxeles por <g class="px-row">,
 * que es lo que anima `revealPixels` (aparecen fila por fila, como una pantalla que carga).
 *
 * Para cambiar un dibujo, edita los sprites en `pixel.js` o las coordenadas de su escena aquí.
 */
import { SPRITES as SP, scene } from './pixel.js';

function PixelArt({ art, label, className = '' }) {
  return (
    <svg
      className={`pixel-svg ${className}`}
      viewBox={`0 0 ${art.w} ${art.h}`}
      shapeRendering="crispEdges"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      {art.layers.map((layer) => {
        const rows = layer.rows.map(({ y, runs }) => (
          <g key={y} className="px-row" data-y={y}>
            {runs.map((run) => (
              <rect key={run.x} x={run.x} y={y} width={run.w} height={1} fill={run.fill} />
            ))}
          </g>
        ));
        return layer.name ? (
          <g key={layer.name} className={layer.name}>
            {rows}
          </g>
        ) : (
          <g key="base">{rows}</g>
        );
      })}
    </svg>
  );
}

/* ---------- Página 1: portada (también es el respaldo de la foto final) ---------- */

const COVER = scene(40, 34, (p) => {
  p.sprite(SP.heart, 17, 1);
  p.sprite(SP.heartSmall, 8, 5);
  p.sprite(SP.heartSmall, 28, 4);
  p.sprite(SP.groom, 8, 12);
  p.sprite(SP.bride, 19, 13);
  p.sprite(SP.bouquet, 24, 21);
  p.rect('G', 0, 31, 40, 1);
  p.rect('D', 0, 32, 40, 2);
  p.dot('G', [2, 30], [5, 30], [33, 30], [36, 30]);
  p.dot('d', [6, 33], [17, 32], [29, 33], [38, 32]);
});

export function CoverCouple({ className }) {
  return <PixelArt art={COVER} label="Los novios abrazados con un ramo" className={className} />;
}

/* ---------- Página 2: viñetas ---------- */

const COFFEE = scene(40, 26, (p) => {
  p.sprite(SP.heart, 16, 1);
  p.sprite(SP.groom, 2, 8, { to: 13 });
  p.sprite(SP.bride, 24, 9, { to: 12 });
  p.sprite(SP.mug, 14, 17);
  p.sprite(SP.mug, 22, 17, { flip: true });
  p.dot('A', [15, 15], [16, 14], [15, 13], [24, 15], [23, 14], [24, 13]);
  p.rect('D', 0, 21, 40, 2);
  p.rect('d', 3, 23, 2, 3);
  p.rect('d', 35, 23, 2, 3);
});

export function CoffeeScene() {
  return <PixelArt art={COFFEE} label="Se conocen tomando café en el trabajo" />;
}

const SELFIE = scene(40, 26, (p) => {
  p.sprite(SP.heartSmall, 21, 2);
  p.sprite(SP.groom, 6, 8, { to: 18 });
  p.sprite(SP.bride, 16, 9, { to: 17 });
  p.line('S', 27, 18, 31, 10);
  p.line('S', 28, 18, 32, 10);
  p.sprite(SP.phone, 30, 3);
  p.dot('S', [31, 9], [32, 9]);
  p.dot('Y', [35, 2], [36, 1], [36, 6], [37, 6], [35, 9], [36, 10]);
});

export function SelfieScene() {
  return <PixelArt art={SELFIE} label="Se toman una selfie" />;
}

const DOG = scene(42, 27, (p) => {
  p.sprite(SP.heartSmall, 12, 1);
  p.sprite(SP.groom, 1, 7);
  p.sprite(SP.bride, 12, 8);
  p.sprite(SP.dog, 26, 17);
  p.rect('d', 23, 17, 3, 1);
  p.dot('A', [23, 18], [25, 18]);
  p.rect('G', 0, 26, 42, 1);
  p.layer('wag');
  p.sprite(SP.tail, 38, 18);
});

export function DogScene() {
  return <PixelArt art={DOG} label="Ella peina al perrito mientras él los mira" />;
}

const KIDS = scene(46, 27, (p) => {
  p.sprite(SP.heart, 19, 0);
  p.sprite(SP.groom, 1, 7);
  p.sprite(SP.alex, 14, 14);
  p.sprite(SP.matias, 24, 14);
  p.sprite(SP.bride, 32, 8);
  // Manos tomadas
  p.line('S', 11, 19, 13, 21);
  p.dot('k', [23, 21]);
  p.line('S', 33, 20, 35, 18);
  p.dot('k', [32, 21]);
  p.rect('G', 0, 26, 46, 1);
});

export function KidsScene() {
  return <PixelArt art={KIDS} label="La familia con Alex y Matias" />;
}

/* ---------- Página 3 ---------- */

const RUN = scene(56, 30, (p) => {
  p.rect('A', 2, 10, 6, 1);
  p.rect('A', 0, 14, 8, 1);
  p.rect('A', 3, 18, 5, 1);
  p.rect('G', 0, 25, 56, 1);
  p.rect('D', 0, 26, 56, 4);
  p.dot('d', [7, 27], [19, 28], [33, 27], [46, 28], [52, 26]);
  p.layer('runners');
  p.sprite(SP.heartSmall, 24, 2);
  p.sprite(SP.groomSide, 14, 9);
  p.sprite(SP.brideSide, 28, 9);
  p.line('S', 23, 18, 28, 18);
});

export function RunningCouple() {
  return <PixelArt art={RUN} label="La pareja corre de la mano" />;
}

const LIFT = scene(48, 40, (p) => {
  p.sprite(SP.heartSmall, 8, 6);
  p.sprite(SP.heart, 36, 4);
  p.sprite(SP.bride, 17, 1, { to: 14 });
  p.line('S', 19, 10, 16, 5);
  p.line('S', 28, 10, 31, 5);
  p.sprite(SP.groom, 18, 19);
  p.rect('N', 18, 16, 1, 13);
  p.rect('N', 29, 16, 1, 13);
  p.dot('S', [18, 15], [29, 15]);
  p.rect('G', 0, 38, 48, 1);
  p.rect('D', 0, 39, 48, 1);
});

export function LiftCouple() {
  return <PixelArt art={LIFT} label="Él la levanta en un abrazo eufórico" />;
}

/* ---------- Página 4 ---------- */

const DANCE = scene(40, 34, (p) => {
  p.sprite(SP.heart, 16, 4);
  p.sprite(SP.heartSmall, 4, 10);
  p.sprite(SP.heartSmall, 32, 9);
  p.sprite(SP.note, 6, 2);
  p.sprite(SP.note, 30, 1);
  // De perfil, frente a frente y tomados de la mano
  p.sprite(SP.groomSide, 8, 14);
  p.sprite(SP.brideSide, 21, 14, { flip: true });
  p.line('S', 17, 23, 22, 23);
  // Cinturón de campeón con un corazón en la hebilla
  p.rect('Y', 9, 24, 7, 1);
  p.rect('y', 11, 23, 3, 3);
  p.dot('R', [12, 24]);
  for (let x = 0; x < 40; x += 2) {
    for (let y = 30; y < 34; y += 1) p.rect((x / 2 + y) % 2 ? 'Q' : 'q', x, y, 2, 1);
  }
});

export function WeddingDance() {
  return <PixelArt art={DANCE} label="Los novios bailando; él con su cinturón de campeón" />;
}

/* ---------- Página 5 ---------- */

const STAIRS = scene(38, 38, (p) => {
  p.sprite(SP.heartSmall, 17, 0);
  p.rect('D', 0, 33, 13, 5);
  p.rect('D', 13, 27, 12, 11);
  p.rect('D', 25, 21, 13, 17);
  p.rect('F', 0, 33, 13, 1);
  p.rect('F', 13, 27, 12, 1);
  p.rect('F', 25, 21, 13, 1);
  p.sprite(SP.groom, 13, 8);
  p.sprite(SP.bride, 24, 3);
  p.line('S', 23, 20, 27, 14);
});

export function StairsCouple() {
  return <PixelArt art={STAIRS} label="La pareja en unas escaleras" />;
}

const TOAST = scene(48, 26, (p) => {
  p.sprite(SP.groom, 3, 12, { to: 14 });
  p.sprite(SP.bride, 31, 12, { to: 14 });
  p.line('S', 14, 23, 21, 11);
  p.line('S', 33, 21, 26, 11);
  p.sprite(SP.glass, 20, 6);
  p.sprite(SP.glass, 25, 6);
  p.dot('Y', [23, 1], [22, 2], [24, 2], [23, 3]);
  p.dot('W', [19, 3], [27, 3], [23, 5]);
});

export function ToastCouple() {
  return <PixelArt art={TOAST} label="La pareja brindando" />;
}

/* ---------- Página 6 ---------- */

const SWINGS = scene(44, 40, (p) => {
  p.rect('A', 3, 2, 38, 1);
  p.line('A', 4, 3, 0, 39);
  p.line('A', 4, 3, 8, 39);
  p.line('A', 39, 3, 35, 39);
  p.line('A', 39, 3, 43, 39);
  p.sprite(SP.heartSmall, 20, 10);
  p.rect('G', 0, 39, 44, 1);
  p.dot('G', [12, 38], [22, 38], [31, 38]);
  // Columpio de él (de espaldas)
  p.layer('swing swing-a');
  p.rect('A', 10, 3, 1, 24);
  p.rect('A', 19, 3, 1, 24);
  p.sprite(SP.groomBack, 10, 15);
  p.rect('d', 9, 27, 12, 1);
  p.rect('N', 12, 28, 2, 3);
  p.rect('N', 16, 28, 2, 3);
  p.rect('K', 12, 31, 2, 1);
  p.rect('K', 16, 31, 2, 1);
  // Columpio de ella
  p.layer('swing swing-b');
  p.rect('A', 25, 3, 1, 24);
  p.rect('A', 34, 3, 1, 24);
  p.sprite(SP.brideBack, 24, 15);
  p.rect('d', 23, 27, 14, 1);
  p.rect('S', 27, 28, 2, 3);
  p.rect('S', 31, 28, 2, 3);
  p.rect('W', 27, 31, 2, 1);
  p.rect('W', 31, 31, 2, 1);
});

export function SwingsCouple() {
  return <PixelArt art={SWINGS} label="La pareja de espaldas en los columpios" />;
}

/* ---------- Página 7 ---------- */

const CANS = scene(56, 26, (p) => {
  p.sprite(SP.heartSmall, 20, 3);
  p.sprite(SP.heartSmall, 26, 0);
  p.sprite(SP.heartSmall, 32, 3);
  p.sprite(SP.groom, 2, 12, { to: 14 });
  p.sprite(SP.bride, 40, 12, { to: 14 });
  p.line('S', 13, 23, 15, 15);
  p.line('S', 43, 22, 40, 15);
  p.sprite(SP.can, 14, 11);
  p.sprite(SP.can, 39, 11);
  p.line('W', 17, 12, 28, 18);
  p.line('W', 28, 18, 38, 12);
  p.dot('Y', [18, 8], [19, 7], [20, 8]);
});

export function CanPhones() {
  return <PixelArt art={CANS} label="La pareja hablando con teléfonos de lata" />;
}

/* ---------- Decorativos ---------- */

const DIVIDER = scene(40, 7, (p) => {
  for (let x = 0; x < 15; x += 2) p.dot('Y', [x, 3], [39 - x, 3]);
  p.sprite(SP.heart, 16, 0);
});

export function HeartDivider() {
  return <PixelArt art={DIVIDER} className="heart-divider" />;
}
