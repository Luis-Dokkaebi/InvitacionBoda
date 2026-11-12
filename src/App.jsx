import { useLayoutEffect, useRef, useState } from 'react';
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
    // Pestañas para que cada invitado elija si responde por vestido o por ropa.
    variants: [
      {
        id: 'vestido',
        label: 'Vestido 👗',
        answerLabel: 'Vestido',
        question: '¿De qué color será el vestido que usarás en mi boda? 👗',
        // Opción que se escapa y no se puede elegir (como el botón "No").
        blockedOption: 'Rojo',
      },
      {
        id: 'ropa',
        label: 'Ropa 👔',
        answerLabel: 'Ropa',
        question: '¿De qué color será la ropa que usarás en mi boda? 👔',
      },
    ],
  },
];

const TOTAL_QUESTIONS = questionsData.length;
const RSVP_STEP = TOTAL_QUESTIONS + 1;
const FINAL_STEP = TOTAL_QUESTIONS + 2;

// Máximo de acompañantes que un invitado puede registrar.
const MAX_COMPANIONS = 3;

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
  const [answers, setAnswers] = useState([]);
  const [rsvp, setRsvp] = useState({ name: '', attending: null, companions: 0, message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [variantId, setVariantId] = useState(null);
  const [optionOrder, setOptionOrder] = useState(null);

  const optionRefs = useRef(new Map());
  const optionRectsBeforeSwap = useRef(null);

  // Animación FLIP: cuando la opción bloqueada cambia de lugar, cada botón se desliza
  // desde su posición anterior hasta la nueva en vez de saltar.
  useLayoutEffect(() => {
    const previousRects = optionRectsBeforeSwap.current;
    if (!previousRects) return;
    optionRectsBeforeSwap.current = null;

    optionRefs.current.forEach((element, key) => {
      const before = previousRects.get(key);
      if (!element || !before) return;
      const deltaY = before.top - element.getBoundingClientRect().top;
      if (!deltaY) return;
      element.style.transition = 'none';
      element.style.transform = `translateY(${deltaY}px)`;
      requestAnimationFrame(() => {
        element.style.transition = 'transform 0.25s ease-out';
        element.style.transform = '';
      });
    });
  }, [optionOrder]);

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
    setVariantId(null);
    setOptionOrder(null);
    setStep(nextStep);
  };

  const selectVariant = (id) => {
    setVariantId(id);
    setOptionOrder(null);
  };

  // Intercambia la opción bloqueada con otra al azar para que nunca quede bajo el cursor/dedo.
  const dodgeOption = (blockedOption, options) => {
    const order = optionOrder ?? options;
    const from = order.indexOf(blockedOption);
    const candidates = order.map((_, index) => index).filter((index) => index !== from);
    const to = candidates[Math.floor(Math.random() * candidates.length)];

    const rects = new Map();
    optionRefs.current.forEach((element, key) => {
      if (element) rects.set(key, element.getBoundingClientRect());
    });
    optionRectsBeforeSwap.current = rects;

    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    setOptionOrder(next);
  };

  const answerQuestion = (option) => {
    setAnswers((current) => {
      const next = [...current];
      next[step - 1] = option;
      return next;
    });
    goToStep(step + 1);
  };

  const updateRsvp = (field, value) => setRsvp((current) => ({ ...current, [field]: value }));

  const submitRsvp = async (event) => {
    event.preventDefault();
    if (!rsvp.name.trim()) {
      setSendError('Escribe tu nombre para confirmar.');
      return;
    }
    if (rsvp.attending === null) {
      setSendError('Dinos si podrás asistir.');
      return;
    }

    setIsSending(true);
    setSendError('');
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rsvp.name.trim(),
          attending: rsvp.attending,
          companions: rsvp.attending ? rsvp.companions : 0,
          message: rsvp.message.trim(),
          answers,
          website: honeypot,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      goToStep(FINAL_STEP);
    } catch {
      setSendError('No pudimos guardar tu respuesta. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setIsSending(false);
    }
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

  const optionClass =
    'w-full text-left p-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-all text-stone-700 text-sm cursor-pointer';

  const renderQuestion = () => {
    const { question, options, variants } = questionsData[step - 1];
    const variant = variants?.find((item) => item.id === variantId) ?? variants?.[0];
    const title = variant?.question ?? question;
    const blockedOption = variant?.blockedOption;
    const orderedOptions = optionOrder ?? options;

    return (
      <>
        <div className="flex flex-col items-center w-full">
          <p className={topTextClass}>
            Pregunta {step} de {TOTAL_QUESTIONS}
          </p>
          {variants && (
            <div
              className="flex gap-1 p-1 mb-4 rounded-full bg-stone-100"
              role="tablist"
              aria-label="Tipo de atuendo"
            >
              {variants.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={item.id === variant.id}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    item.id === variant.id
                      ? 'bg-white text-rose-900 shadow-sm'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                  onClick={() => selectVariant(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
          <h2 className="text-2xl font-serif text-center mb-6 text-stone-800">{title}</h2>
        </div>

        <div className="flex flex-col w-full gap-3">
          {orderedOptions.map((option) => {
            const isBlocked = option === blockedOption;
            const dodge = () => dodgeOption(option, options);
            return (
              <button
                key={option}
                ref={(element) => {
                  if (element) optionRefs.current.set(option, element);
                  else optionRefs.current.delete(option);
                }}
                type="button"
                className={optionClass}
                onClick={
                  isBlocked
                    ? dodge
                    : () => answerQuestion(variant ? `${variant.answerLabel}: ${option}` : option)
                }
                onMouseEnter={isBlocked ? dodge : undefined}
                onTouchStart={isBlocked ? dodge : undefined}
              >
                {option}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  const attendanceButtonClass = (selected) =>
    `flex-1 p-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
      selected
        ? 'bg-rose-900 border-rose-900 text-white'
        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
    }`;

  const inputClass =
    'w-full p-3 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300';

  const renderRsvp = () => (
    <form className="flex flex-col items-center w-full" onSubmit={submitRsvp} noValidate>
      <p className={`${topTextClass} text-center`}>Casi listo | Confirma tu lugar</p>
      <h2 className="text-2xl font-serif text-center mb-6 text-stone-800">
        Antes del veredicto… ¿quién eres? ✍️
      </h2>

      <div className="flex flex-col w-full gap-4">
        <label className="flex flex-col gap-1 text-sm text-stone-600">
          Tu nombre completo
          <input
            type="text"
            className={inputClass}
            value={rsvp.name}
            maxLength={80}
            autoComplete="name"
            required
            onChange={(event) => updateRsvp('name', event.target.value)}
          />
        </label>

        <fieldset className="flex flex-col gap-1 text-sm text-stone-600">
          <legend className="mb-1">¿Podrás asistir?</legend>
          <div className="flex gap-3">
            <button
              type="button"
              className={attendanceButtonClass(rsvp.attending === true)}
              aria-pressed={rsvp.attending === true}
              onClick={() => updateRsvp('attending', true)}
            >
              ¡Ahí estaré!
            </button>
            <button
              type="button"
              className={attendanceButtonClass(rsvp.attending === false)}
              aria-pressed={rsvp.attending === false}
              onClick={() => updateRsvp('attending', false)}
            >
              No podré ir 😢
            </button>
          </div>
        </fieldset>

        {rsvp.attending && (
          <label className="flex flex-col gap-1 text-sm text-stone-600">
            ¿Cuántas personas van contigo?
            <select
              className={inputClass}
              value={rsvp.companions}
              onChange={(event) => updateRsvp('companions', Number(event.target.value))}
            >
              {Array.from({ length: MAX_COMPANIONS + 1 }, (_, count) => (
                <option key={count} value={count}>
                  {count === 0 ? 'Solo yo' : `${count} acompañante${count > 1 ? 's' : ''}`}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="flex flex-col gap-1 text-sm text-stone-600">
          Mensaje para los novios (opcional)
          <textarea
            className={`${inputClass} resize-none`}
            rows={2}
            maxLength={300}
            value={rsvp.message}
            onChange={(event) => updateRsvp('message', event.target.value)}
          />
        </label>

        {/* Campo trampa para bots: invisible para personas. */}
        <input
          type="text"
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />

        {sendError && (
          <p className="text-sm text-rose-700 text-center" role="alert">
            {sendError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSending}
          className="bg-rose-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-rose-800 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
          {isSending ? 'Enviando…' : 'Enviar confirmación'}
        </button>
      </div>
    </form>
  );

  const renderVerdict = () => (
    <div className="flex flex-col items-center w-full">
      <p className={`${topTextClass} text-center`}>El veredicto | Respuesta final</p>
      <Heart className="text-rose-500 w-16 h-16 mb-4 mx-auto fill-rose-100" aria-hidden="true" />
      <h2 className="text-4xl font-serif text-center mb-2 text-stone-800">¡APROBASTE!</h2>
      {rsvp.attending ? (
        <>
          <p className="text-center text-stone-600 mb-6">
            ¡Tienes una invitación! Sabía que podía confiar en ti.
          </p>
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2 w-max mx-auto">
            <CheckCircle className="w-4 h-4" aria-hidden="true" />
            ESTADO DE INVITACIÓN: CONFIRMADA
          </div>
          <p className="mt-8 text-center text-stone-500 italic">Nos vemos en la boda ♡</p>
        </>
      ) : (
        <>
          <p className="text-center text-stone-600 mb-6">
            Gracias por avisarnos. Te vamos a extrañar muchísimo.
          </p>
          <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2 w-max mx-auto">
            <Heart className="w-4 h-4" aria-hidden="true" />
            ESTADO DE INVITACIÓN: NO ASISTIRÁ
          </div>
          <p className="mt-8 text-center text-stone-500 italic">Brindaremos por ti ♡</p>
        </>
      )}
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
  else if (step === RSVP_STEP) content = renderRsvp();
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
