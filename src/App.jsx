import { useRef, useState } from 'react';
import { Mail, Heart, Gift, Gem, CheckCircle } from 'lucide-react';

const questionsData = [
  {
    id: 1,
    question: '¿Qué tanto te emociona mi boda? 💌',
    options: [
      '¡Muchísima!',
      'No puedo esperar',
      'Lo que más me emociona es la comida',
      '¿Habrá barra libre?',
      'Se me olvidó que te ibas a casar.',
    ],
  },
  {
    id: 2,
    question: '¿Vas a llorar durante la ceremonia? 🥺',
    options: [
      'Obviamente',
      'Voy a llorar a mares',
      'Intentaré contener las lágrimas',
      'Solo si los demás lloran',
      'No 💔',
    ],
  },
  {
    id: 3,
    question: '¿Qué vas a traer como regalo de boda? 🎁',
    options: [
      'Dinero, obviamente',
      'Algo de la lista de regalos',
      'Algo lindo que encontré',
      'Compraré algo a última hora de camino',
      'Mi presencia es el regalo.',
    ],
  },
  {
    id: 4,
    question: '¿De qué color será el vestido que usarás en mi boda? 👗',
    options: ['Blanco', 'Rojo', 'Negro', 'Rosa intenso', 'Del color que tú me digas.'],
  },
];

const TOTAL_QUESTIONS = questionsData.length;
const FINAL_STEP = TOTAL_QUESTIONS + 1;

// Desplazamiento máximo del botón "No" respecto a su posición original.
const MAX_OFFSET = 150;
// Margen que el botón respeta respecto al borde de la tarjeta.
const CARD_MARGIN = 12;
// Distancia mínima que debe recorrer en cada escape para que se note.
const MIN_JUMP = 70;

const topTextClass = 'text-xs tracking-widest text-gray-500 uppercase mb-4';

const randomBetween = (min, max) => Math.random() * (max - min) + min;

export default function WeddingInvitation() {
  const [step, setStep] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const cardRef = useRef(null);
  const noAnchorRef = useRef(null);
  const noButtonRef = useRef(null);

  const moveButton = () => {
    const card = cardRef.current;
    const anchor = noAnchorRef.current;
    const button = noButtonRef.current;
    if (!card || !anchor || !button) return;

    // El ancla no se transforma, así que su rect es la posición original del botón.
    const cardRect = card.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const { offsetWidth: width, offsetHeight: height } = button;

    // Rango permitido: dentro de ±MAX_OFFSET y sin salirse de la tarjeta.
    const minX = Math.max(-MAX_OFFSET, cardRect.left + CARD_MARGIN - anchorRect.left);
    const maxX = Math.min(MAX_OFFSET, cardRect.right - CARD_MARGIN - width - anchorRect.left);
    const minY = Math.max(-MAX_OFFSET, cardRect.top + CARD_MARGIN - anchorRect.top);
    const maxY = Math.min(MAX_OFFSET, cardRect.bottom - CARD_MARGIN - height - anchorRect.top);

    setNoButtonPosition((current) => {
      let next = current;
      for (let attempt = 0; attempt < 12; attempt += 1) {
        next = { x: randomBetween(minX, maxX), y: randomBetween(minY, maxY) };
        if (Math.hypot(next.x - current.x, next.y - current.y) >= MIN_JUMP) break;
      }
      return next;
    });
  };

  const goToStep = (nextStep) => {
    setNoButtonPosition({ x: 0, y: 0 });
    setStep(nextStep);
  };

  const renderStart = () => (
    <>
      <div className="flex flex-col items-center">
        <Mail className="text-rose-900 w-8 h-8 mb-4" aria-hidden="true" />
        <p className={topTextClass}>Reserva la fecha</p>
        <h1 className="text-3xl font-serif text-center mb-8 text-stone-800">
          ¿Quieres venir a mi boda? 💍
        </h1>
      </div>

      <div className="relative flex justify-center gap-4 w-full mt-8">
        <button
          type="button"
          className="bg-rose-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-rose-800 transition-colors cursor-pointer flex items-center gap-2"
          onClick={() => goToStep(1)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Sí
          <Heart
            className={`w-4 h-4 transition-transform duration-300 ${
              isHovering ? 'scale-125 fill-current' : 'scale-100'
            }`}
            aria-hidden="true"
          />
        </button>

        {/* Ancla invisible: reserva el espacio del botón "No" junto al "Sí" y sirve de origen. */}
        <span ref={noAnchorRef} className="relative">
          <span
            className="invisible block px-8 py-3 rounded-xl font-medium border"
            aria-hidden="true"
          >
            No
          </span>
          <button
            ref={noButtonRef}
            type="button"
            className="bg-white text-stone-700 border border-stone-300 px-8 py-3 rounded-xl font-medium absolute top-0 left-0 z-10"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: 'transform 0.2s ease-out',
            }}
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            onClick={moveButton}
          >
            No
          </button>
        </span>
      </div>
    </>
  );

  const renderQuestion = () => {
    const { question, options } = questionsData[step - 1];
    return (
      <>
        <div className="flex flex-col items-center w-full">
          <p className={topTextClass}>
            Pregunta {step} de {TOTAL_QUESTIONS}
          </p>
          <h2 className="text-2xl font-serif text-center mb-6 text-stone-800">{question}</h2>
        </div>

        <div className="flex flex-col w-full gap-3">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className="w-full text-left p-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-all text-stone-700 text-sm cursor-pointer"
              onClick={() => goToStep(step + 1)}
            >
              {option}
            </button>
          ))}
        </div>
      </>
    );
  };

  const renderVerdict = () => (
    <div className="flex flex-col items-center w-full">
      <p className={`${topTextClass} text-center`}>El veredicto | Respuesta final</p>
      <Heart className="text-rose-500 w-16 h-16 mb-4 mx-auto fill-rose-100" aria-hidden="true" />
      <h2 className="text-4xl font-serif text-center mb-2 text-stone-800">¡APROBASTE!</h2>
      <p className="text-center text-stone-600 mb-6">
        ¡Tienes una invitación! Sabía que podía confiar en ti.
      </p>
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2 w-max mx-auto">
        <CheckCircle className="w-4 h-4" aria-hidden="true" />
        ESTADO DE INVITACIÓN: CONFIRMADA
      </div>
      <p className="mt-8 text-center text-stone-500 italic">Nos vemos en la boda ♡</p>
      <div className="mt-6 flex gap-3 text-rose-300" aria-hidden="true">
        <Gem className="w-5 h-5" />
        <Gift className="w-5 h-5" />
        <Mail className="w-5 h-5" />
      </div>
    </div>
  );

  let content;
  if (step === 0) content = renderStart();
  else if (step <= TOTAL_QUESTIONS) content = renderQuestion();
  else if (step === FINAL_STEP) content = renderVerdict();

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-stone-100 p-4 font-sans">
      <div className="flex flex-col items-center w-full max-w-md">
        <div
          ref={cardRef}
          className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 min-h-[450px] flex flex-col"
        >
          <div
            key={step}
            className="animate-fade-in flex flex-col items-center justify-between flex-1 w-full"
          >
            {content}
          </div>
        </div>
        <p className="text-xs text-stone-400 mt-8 text-center">
          CON AMOR Y EXPECTATIVAS SOSPECHOSAMENTE ALTAS
        </p>
      </div>
    </main>
  );
}
