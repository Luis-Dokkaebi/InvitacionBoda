// Función serverless de Vercel: valida la confirmación y la reenvía a Google Sheets
// (a través de un Web App de Apps Script). La URL y el secreto viven en variables
// de entorno de Vercel, nunca en el navegador.

const MAX_NAME = 80;
const MAX_MESSAGE = 300;
const MAX_ANSWER = 100;
const MAX_COMPANIONS = 3;

const cleanText = (value, max) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método no permitido' });
  }

  const scriptUrl = process.env.RSVP_SCRIPT_URL;
  const secret = process.env.RSVP_SECRET;
  if (!scriptUrl || !secret) {
    console.error('Faltan las variables RSVP_SCRIPT_URL o RSVP_SECRET');
    return res.status(500).json({ ok: false, error: 'Servidor sin configurar' });
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {};

  // Campo trampa: si un bot lo llenó, fingimos éxito sin guardar nada.
  if (body.website) return res.status(200).json({ ok: true });

  const name = cleanText(body.name, MAX_NAME);
  if (!name) return res.status(400).json({ ok: false, error: 'Falta el nombre' });
  if (typeof body.attending !== 'boolean') {
    return res.status(400).json({ ok: false, error: 'Falta la asistencia' });
  }

  const companions = body.attending
    ? Math.min(Math.max(Number.parseInt(body.companions, 10) || 0, 0), MAX_COMPANIONS)
    : 0;
  const answers = Array.isArray(body.answers)
    ? body.answers.slice(0, 4).map((answer) => cleanText(answer, MAX_ANSWER))
    : [];

  const payload = {
    secret,
    name,
    attending: body.attending,
    companions,
    message: cleanText(body.message, MAX_MESSAGE),
    answers,
  };

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.ok) {
      console.error('Apps Script rechazó la confirmación', response.status, result);
      return res.status(502).json({ ok: false, error: 'No se pudo guardar' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error al contactar Apps Script', error);
    return res.status(502).json({ ok: false, error: 'No se pudo guardar' });
  }
}
