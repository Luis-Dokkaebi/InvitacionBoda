import { useState } from 'react';
import { Mail, Heart, Gift, Gem, CheckCircle } from 'lucide-react';

const topTextClass = 'text-xs tracking-widest text-gray-500 uppercase mb-4';

// Formulario de confirmación de asistencia; al enviarlo muestra la respuesta registrada.
export default function WeddingInvitation() {
  const [sent, setSent] = useState(false);
  const [rsvp, setRsvp] = useState({ name: '', attending: null, message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

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
          message: rsvp.message.trim(),
          website: honeypot,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setSent(true);
      window.scrollTo(0, 0);
    } catch {
      setSendError('No pudimos guardar tu respuesta. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setIsSending(false);
    }
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
      <p className={`${topTextClass} text-center`}>Confirma tu lugar</p>
      <h2 className="text-2xl font-serif text-center mb-6 text-stone-800">
        ¿Quién eres? ✍️
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
      <p className={`${topTextClass} text-center`}>Respuesta recibida</p>
      <Heart className="text-rose-500 w-16 h-16 mb-4 mx-auto fill-rose-100" aria-hidden="true" />
      <h2 className="text-4xl font-serif text-center mb-2 text-stone-800">¡GRACIAS!</h2>
      {rsvp.attending ? (
        <>
          <p className="text-center text-stone-600 mb-6">
            Tu lugar está apartado. ¡Nos morimos de ganas de verte!
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


  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-stone-100 p-4 font-sans">
      <div className="flex flex-col items-center w-full max-w-md">
        <div
          className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 min-h-[450px] flex flex-col"
        >
          <div
            key={sent ? 'sent' : 'form'}
            className="animate-fade-in flex flex-col items-center justify-between flex-1 w-full"
          >
            {sent ? renderVerdict() : renderRsvp()}
          </div>
        </div>
        <p className="text-xs text-stone-400 mt-8 text-center">
          CON AMOR Y EXPECTATIVAS SOSPECHOSAMENTE ALTAS
        </p>
      </div>
    </main>
  );
}
