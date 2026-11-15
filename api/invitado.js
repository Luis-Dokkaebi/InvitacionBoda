// Devuelve el nombre y los lugares reservados de un link personal (?i=CODIGO).
import { PASES_SIN_CODIGO, findGuest } from './_invitados.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Método no permitido' });
  }
  const guest = findGuest(req.query?.c);
  res.setHeader('Cache-Control', 'no-store');
  if (!guest) return res.status(200).json({ ok: true, found: false, pases: PASES_SIN_CODIGO });
  return res.status(200).json({ ok: true, found: true, nombre: guest.nombre, pases: guest.pases });
}
