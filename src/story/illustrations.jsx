/*
 * Ilustraciones line-art del cuento. Cada una es un <svg class="draw-svg"> inline para que GSAP
 * anime el trazo de sus elementos (SDD 4.A).
 *
 * Para reemplazar un dibujo por el tuyo: conserva la clase "draw-svg" en el <svg> y usa
 * trazos sin relleno. Los rellenos que deben aparecer al final (mejillas, moños, flores)
 * llevan la clase "fill-reveal" más un color: fill-red, fill-pink, fill-dark o fill-gold.
 */

const DrawSvg = ({ viewBox, label, className = '', children }) => (
  <svg
    className={`draw-svg ${className}`}
    viewBox={viewBox}
    {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
  >
    {children}
  </svg>
);

/* ---------- Piezas reutilizables ---------- */

function Face({ cx, cy, s = 1 }) {
  return (
    <>
      <circle className="fill-reveal fill-pink" cx={cx - 8 * s} cy={cy + 4 * s} r={2.6 * s} />
      <circle className="fill-reveal fill-pink" cx={cx + 8 * s} cy={cy + 4 * s} r={2.6 * s} />
      <path d={`M${cx - 6 * s} ${cy} q${2 * s} ${-2.6 * s} ${4 * s} 0`} />
      <path d={`M${cx + 2 * s} ${cy} q${2 * s} ${-2.6 * s} ${4 * s} 0`} />
      <path d={`M${cx - 3 * s} ${cy + 5 * s} q${3 * s} ${3 * s} ${6 * s} 0`} />
    </>
  );
}

/** Cara de perfil mirando a la derecha (dir=1) o a la izquierda (dir=-1). */
function ProfileFace({ cx, cy, dir = 1 }) {
  return (
    <>
      <circle className="fill-reveal fill-pink" cx={cx + 5 * dir} cy={cy + 5} r="2.6" />
      <path d={`M${cx + 4 * dir} ${cy - 1} q${2 * dir} -2.6 ${4 * dir} 0`} />
      <path d={`M${cx + 7 * dir} ${cy + 6} q${2 * dir} 1.5 ${4 * dir} -1`} />
    </>
  );
}

function hisHair(cx, cy, r) {
  return `M${cx - r + 1} ${cy - 4} C${cx - r} ${cy - r - 7} ${cx + r} ${cy - r - 7} ${cx + r - 1} ${cy - 4} C${cx + r - 5} ${cy - r + 2} ${cx - 3} ${cy - r + 6} ${cx - r + 1} ${cy - 4} Z`;
}

function HimHead({ cx, cy, r = 13, profile = 0, s = 1 }) {
  return (
    <g>
      <path className="fill-reveal fill-dark" d={hisHair(cx, cy, r)} />
      <circle cx={cx} cy={cy} r={r} />
      <path d={hisHair(cx, cy, r)} />
      {profile ? <ProfileFace cx={cx} cy={cy} dir={profile} /> : <Face cx={cx} cy={cy} s={s} />}
    </g>
  );
}

function HerHead({ cx, cy, r = 13, profile = 0, s = 1, bow = false }) {
  return (
    <g>
      <path
        d={`M${cx - 1} ${cy - r - 4} C${cx - r - 12} ${cy - r - 4} ${cx - r - 7} ${cy + r + 2} ${cx - r - 6} ${cy + r + 10}`}
      />
      <path
        d={`M${cx - 1} ${cy - r - 4} C${cx + r + 12} ${cy - r - 4} ${cx + r + 7} ${cy + r + 2} ${cx + r + 6} ${cy + r + 10}`}
      />
      <circle cx={cx} cy={cy} r={r} />
      <path
        d={`M${cx - r + 1} ${cy - 3} C${cx - r + 3} ${cy - r} ${cx - 4} ${cy - r - 1} ${cx + 2} ${cy - r + 1} C${cx + 6} ${cy - r + 5} ${cx + r - 1} ${cy - r + 4} ${cx + r - 1} ${cy - 3}`}
      />
      {profile ? <ProfileFace cx={cx} cy={cy} dir={profile} /> : <Face cx={cx} cy={cy} s={s} />}
      {bow && <Bow x={cx + r * 0.7} y={cy - r * 0.9} />}
    </g>
  );
}

function Bow({ x, y, s = 1 }) {
  const left = `M${x} ${y} l${-7 * s} ${-5 * s} l0 ${10 * s} Z`;
  const right = `M${x} ${y} l${7 * s} ${-5 * s} l0 ${10 * s} Z`;
  return (
    <g>
      <path className="fill-reveal fill-red" d={left} />
      <path className="fill-reveal fill-red" d={right} />
      <path className="accent" d={left} />
      <path className="accent" d={right} />
    </g>
  );
}

const HEART_PATH = 'M0 -2 C0 -6 -7 -6 -7 -1 C-7 3 -2 6 0 9 C2 6 7 3 7 -1 C7 -6 0 -6 0 -2 Z';

function Heart({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} style={{ strokeWidth: 2 / s }}>
      <path className="fill-reveal fill-red" d={HEART_PATH} />
      <path className="accent" d={HEART_PATH} />
    </g>
  );
}

/* ---------- Página 1: portada ---------- */

export function CoverCouple({ className }) {
  return (
    <DrawSvg viewBox="0 0 200 170" label="Pareja abrazada con un ramo" className={className}>
      <Heart x={98} y={14} s={1} />
      <Heart x={128} y={24} s={0.7} />
      <Heart x={70} y={22} s={0.6} />
      {/* Él */}
      <HimHead cx={80} cy={46} />
      <path d="M77 59 v8 M83 59 v8" />
      <path d="M60 152 C58 118 60 86 70 72 Q80 64 92 70 C96 90 98 120 100 152" />
      <path d="M74 70 L80 84 L86 72" />
      {/* Ella */}
      <HerHead cx={116} cy={54} />
      <path d="M113 67 v6 M119 67 v6" />
      <path d="M104 78 Q116 71 130 77" />
      <path d="M106 78 C106 100 106 124 103 152 M130 77 C134 100 140 124 150 152" />
      <path d="M103 152 Q126 158 150 152" />
      {/* Brazos: él la rodea, ella lo rodea */}
      <path d="M90 74 C104 82 122 84 134 79" />
      <path d="M108 90 C96 98 84 98 70 92" />
      {/* Ramo */}
      <path d="M118 132 L112 114 M122 132 L121 110 M126 132 L130 114" />
      <path className="accent" d="M113 126 q9 5 18 0" />
      <path d="M106 116 q-7 -2 -9 5 M136 116 q7 -2 9 5" />
      {[
        [110, 108],
        [121, 104],
        [132, 108],
        [116, 97],
        [127, 97],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle className="fill-reveal fill-red" cx={cx} cy={cy} r="5" />
          <circle cx={cx} cy={cy} r="5" />
        </g>
      ))}
      <path d="M28 160 Q100 155 176 160" />
    </DrawSvg>
  );
}

/* ---------- Página 2: viñetas ---------- */

export function CoffeeScene() {
  return (
    <DrawSvg viewBox="0 0 160 110" label="Se conocen tomando café en el trabajo">
      <Heart x={80} y={22} s={0.8} />
      <HimHead cx={40} cy={34} />
      <path d="M18 90 C18 68 28 56 40 56 C54 56 64 68 64 82" />
      <HerHead cx={120} cy={34} />
      <path d="M142 90 C142 68 132 56 120 56 C106 56 96 68 96 82" />
      <path d="M62 78 L64 90 L76 90 L78 78 Z M78 81 q5 1 0 6" />
      <path d="M84 78 L86 90 L98 90 L100 78 Z M84 81 q-5 1 0 6" />
      <path className="accent" d="M70 72 q-3 -5 0 -10 q3 -5 0 -10 M92 72 q3 -5 0 -10 q-3 -5 0 -10" />
      <path d="M6 90 L154 90 M14 90 L14 106 M146 90 L146 106" />
    </DrawSvg>
  );
}

export function SelfieScene() {
  return (
    <DrawSvg viewBox="0 0 160 110" label="Se toman una selfie">
      <HimHead cx={62} cy={46} />
      <HerHead cx={92} cy={52} />
      <path d="M36 108 C36 84 46 70 62 68 C70 68 76 70 80 74" />
      <path d="M76 108 C78 88 82 78 92 76 C108 76 118 88 120 108" />
      <path d="M78 76 C98 68 112 54 120 40" />
      <path d="M114 18 L130 22 L125 42 L109 38 Z" />
      <circle cx="125" cy="26" r="1.5" />
      <path className="accent" d="M138 14 l6 -4 M140 26 l8 0 M136 37 l6 4" />
      <Heart x={100} y={22} s={0.6} />
    </DrawSvg>
  );
}

export function DogScene() {
  return (
    <DrawSvg viewBox="0 0 160 110" label="Ella peina al perrito mientras él los mira">
      <Heart x={56} y={16} s={0.6} />
      <HimHead cx={30} cy={32} />
      <path d="M10 108 C10 76 18 52 30 52 C42 52 50 76 50 108" />
      <HerHead cx={74} cy={50} s={0.9} />
      <path d="M56 108 C56 86 62 70 74 70 C86 70 92 80 96 92" />
      <path d="M90 82 C98 80 104 76 110 70" />
      <path d="M108 64 L120 60 L122 66 L110 70 Z" />
      <path d="M112 72 l-1 3 M116 71 l-1 3 M120 69 l-1 3" />
      {/* Perro */}
      <ellipse cx="126" cy="90" rx="18" ry="11" />
      <circle cx="146" cy="74" r="9" />
      <path d="M140 67 C133 70 133 80 138 82" />
      <circle cx="148" cy="71" r="0.9" />
      <circle className="fill-reveal fill-dark" cx="154" cy="76" r="1.8" />
      <path className="fill-reveal fill-pink" d="M148 80 q2 5 4 0 Z" />
      <path d="M114 99 v9 M120 100 v8 M132 100 v8 M138 98 v10" />
      <g className="wag">
        <path d="M108 86 q-8 -6 -6 -14" />
      </g>
    </DrawSvg>
  );
}

export function KidsScene() {
  return (
    <DrawSvg viewBox="0 0 160 110" label="La familia con Alex y Matias">
      <Heart x={80} y={20} s={0.7} />
      <HimHead cx={26} cy={30} r={12} />
      <path d="M12 108 C12 76 16 52 26 50 C36 52 40 76 40 108" />
      <HerHead cx={134} cy={30} r={12} />
      <path d="M122 54 Q134 48 146 54 C150 72 154 92 158 108 L110 108 C114 92 118 72 122 54 Z" />
      {/* Alex */}
      <circle cx="62" cy="62" r="9" />
      <path d="M54 58 l3 -6 l3 4 l3 -6 l3 4 l3 -5 l2 6" />
      <Face cx={62} cy={62} s={0.65} />
      <path d="M52 108 C52 88 56 74 62 74 C68 74 72 88 72 108" />
      {/* Matias */}
      <circle cx="98" cy="64" r="9" />
      <path className="fill-reveal fill-dark" d={hisHair(98, 64, 9)} />
      <path d={hisHair(98, 64, 9)} />
      <Face cx={98} cy={64} s={0.65} />
      <path d="M88 108 C88 90 92 76 98 76 C104 76 108 90 108 108" />
      {/* Manos tomadas */}
      <path d="M38 76 Q46 84 54 82 M70 84 Q80 92 90 84 M106 84 Q114 86 120 78" />
    </DrawSvg>
  );
}

/* ---------- Página 3 ---------- */

export function RunningCouple() {
  return (
    <DrawSvg viewBox="0 0 220 120" label="La pareja corre de la mano">
      <path className="speed" d="M14 42 h24 M8 60 h30 M18 78 h20" />
      <g className="runners">
        <Heart x={106} y={16} s={0.6} />
        {/* Él */}
        <HimHead cx={78} cy={28} profile={1} />
        <path d="M70 42 C80 42 82 58 76 72 L62 72 C58 58 62 44 70 42 Z" />
        <path d="M66 48 L54 58 L48 50" />
        <path d="M78 50 L104 58" />
        <path d="M72 72 L84 90 L80 108 L86 108 M66 72 L54 88 L42 92" />
        {/* Ella */}
        <HerHead cx={140} cy={32} profile={1} bow />
        <path d="M134 46 L144 46 L154 80 L122 80 Z" />
        <path d="M134 52 L104 58" />
        <path d="M143 52 L156 60 L164 52" />
        <path d="M132 80 L124 96 L112 98 M146 80 L154 96 L152 110 L158 110" />
      </g>
      <path d="M6 112 H214" />
    </DrawSvg>
  );
}

export function LiftCouple() {
  return (
    <DrawSvg viewBox="0 0 220 140" label="Él la levanta en un abrazo eufórico">
      <Heart x={168} y={36} s={0.7} />
      <Heart x={62} y={28} s={0.6} />
      {/* Ella, en lo alto */}
      <HerHead cx={127} cy={18} r={11} s={0.85} />
      <path d="M116 32 L132 33 L136 58 L104 56 Z" />
      <path d="M118 36 L102 22 M130 36 L148 22" />
      <path d="M106 54 L90 48 L82 38 M112 57 L96 60 L86 55" />
      {/* Él */}
      <HimHead cx={100} cy={74} />
      <path d="M88 88 Q100 84 112 88 M88 88 C84 106 86 122 88 136 M112 88 C116 106 114 122 112 136" />
      <path d="M90 90 C80 74 90 62 106 58 M112 90 C126 80 132 68 134 60" />
      <path d="M40 136 H180" />
    </DrawSvg>
  );
}

/* ---------- Página 4 ---------- */

export function WeddingDance() {
  return (
    <DrawSvg viewBox="0 0 200 180" label="Los novios bailando">
      <Heart x={34} y={36} s={0.6} />
      <Heart x={172} y={30} s={0.7} />
      {/* Él con traje y corbata roja */}
      <HimHead cx={72} cy={40} />
      <path d="M54 66 Q72 58 90 66 M56 66 C52 100 54 130 58 142 M88 66 C92 100 92 130 88 142 M58 142 L88 142" />
      <path d="M66 62 L73 84 L80 62" />
      <path className="fill-reveal fill-red" d="M73 64 L70 68 L73 86 L76 68 Z" />
      <path className="accent" d="M73 64 L70 68 L73 86 L76 68 Z" />
      <circle cx="73" cy="104" r="1.2" />
      <circle cx="73" cy="116" r="1.2" />
      <path d="M64 142 L62 172 M82 142 L84 172 M54 172 h9 M83 172 h9" />
      <path d="M56 70 C46 92 48 108 54 118" />
      {/* Manos unidas arriba */}
      <path d="M88 70 C98 56 100 40 103 26 M118 74 C112 56 108 40 107 26" />
      <circle cx="105" cy="23" r="3.5" />
      {/* Ella con vestido y moño rojo */}
      <path d="M118 36 C104 50 104 80 112 96" />
      <HerHead cx={128} cy={46} bow />
      <path d="M118 72 L140 72 L136 96 L122 96 Z" />
      <path d="M122 96 C112 120 100 150 92 172 Q132 180 172 172 C162 150 146 120 136 96" />
      <path d="M104 150 q6 4 12 0 M124 156 q6 4 12 0 M144 150 q6 4 12 0" />
      <path d="M140 74 C150 86 152 98 146 106" />
    </DrawSvg>
  );
}

/* ---------- Página 5 ---------- */

export function StairsCouple() {
  return (
    <DrawSvg viewBox="0 0 150 140" label="La pareja en unas escaleras">
      <Heart x={84} y={14} s={0.6} />
      <path d="M2 134 H44 V110 H84 V86 H124 V62 H148" />
      {/* Él, un escalón abajo */}
      <HimHead cx={62} cy={50} r={11} s={0.85} />
      <path d="M54 64 C50 80 52 96 54 100 L70 100 C72 96 74 80 70 64 Z" />
      <path d="M57 100 L56 110 M67 100 L68 110" />
      <path d="M70 70 C78 66 84 60 92 56" />
      {/* Ella, un escalón arriba */}
      <HerHead cx={104} cy={30} r={11} s={0.85} />
      <path d="M98 44 L110 44 L118 78 L90 78 Z" />
      <path d="M99 78 L99 86 M109 78 L109 86" />
      <path d="M98 50 C96 54 94 56 92 56" />
    </DrawSvg>
  );
}

export function ToastCouple() {
  return (
    <DrawSvg viewBox="0 0 200 110" label="La pareja brindando">
      <HimHead cx={40} cy={44} />
      <path d="M14 108 C14 82 26 66 40 66 C54 66 62 74 66 82" />
      <path d="M62 78 C76 70 86 60 92 50" />
      <HerHead cx={160} cy={44} />
      <path d="M186 108 C186 82 174 66 160 66 C146 66 138 74 134 82" />
      <path d="M138 78 C124 70 114 60 108 50" />
      <path className="fill-reveal fill-gold" d="M90.6 30 L97.4 30 L96 42 L92 42 Z" />
      <path className="fill-reveal fill-gold" d="M102.6 30 L109.4 30 L108 42 L104 42 Z" />
      <path d="M90 26 L98 26 L96 42 L92 42 Z M94 42 V52 M90 52 H98" />
      <path d="M102 26 L110 26 L108 42 L104 42 Z M106 42 V52 M102 52 H110" />
      <path className="accent" d="M93 17 l-5 -7 M100 14 V4 M107 17 l5 -7" />
    </DrawSvg>
  );
}

/* ---------- Página 6 ---------- */

export function SwingsCouple() {
  return (
    <DrawSvg viewBox="0 0 200 170" label="La pareja de espaldas en los columpios">
      <path d="M14 16 H186 M24 16 L8 166 M24 16 L40 166 M176 16 L160 166 M176 16 L192 166" />
      <Heart x={100} y={52} s={0.7} />
      {/* Columpio de él */}
      <g className="swing swing-a">
        <path d="M58 16 V112 M82 16 V112 M52 112 H88" />
        <circle cx="70" cy="72" r="12" />
        <path className="fill-reveal fill-dark" d="M58 72 C58 56 82 56 82 72 C76 66 64 66 58 72 Z" />
        <path d="M58 72 C58 56 82 56 82 72 C76 66 64 66 58 72 Z" />
        <path d="M58 86 Q70 82 82 86 L84 112 L56 112 Z" />
        <path d="M60 90 L58 98 M80 90 L82 98" />
        <path d="M63 112 L63 134 M77 112 L77 134" />
      </g>
      {/* Columpio de ella */}
      <g className="swing swing-b">
        <path d="M118 16 V112 M142 16 V112 M112 112 H148" />
        <path d="M118 66 C118 54 142 54 142 66 L145 94 L115 94 Z" />
        <Bow x={130} y={58} />
        <path d="M118 90 L142 90 L148 112 L112 112 Z" />
        <path d="M120 94 L118 100 M140 94 L142 100" />
        <path d="M124 112 L124 134 M136 112 L136 134" />
      </g>
      <path d="M46 162 q4 -6 8 0 M96 164 q4 -6 8 0 M146 162 q4 -6 8 0" />
    </DrawSvg>
  );
}

/* ---------- Página 7 ---------- */

export function CanPhones() {
  return (
    <DrawSvg viewBox="0 0 220 120" label="La pareja hablando con teléfonos de lata">
      <HimHead cx={40} cy={44} />
      <path d="M14 116 C14 88 26 72 40 72 C54 72 62 82 64 94" />
      <path d="M60 84 C66 72 64 60 58 54" />
      <path d="M52 38 L60 36 L64 52 L56 54 Z" />
      <HerHead cx={180} cy={44} bow />
      <path d="M206 116 C206 88 194 72 180 72 C166 72 158 82 156 94" />
      <path d="M160 84 C154 72 156 60 162 54" />
      <path d="M168 38 L160 36 L156 52 L164 54 Z" />
      <path d="M63 44 C100 84 120 84 157 44" />
      <path className="accent" d="M72 28 q5 4 0 9 M78 24 q8 7 0 15" />
      <Heart x={92} y={54} s={0.5} />
      <Heart x={110} y={62} s={0.65} />
      <Heart x={128} y={54} s={0.5} />
    </DrawSvg>
  );
}

/* ---------- Decorativos ---------- */

export function HeartDivider() {
  return (
    <DrawSvg viewBox="0 0 160 30" label="" className="heart-divider">
      <path d="M8 15 H62 M98 15 H152" />
      <Heart x={80} y={14} s={1.1} />
    </DrawSvg>
  );
}
