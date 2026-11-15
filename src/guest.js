import { createContext, useContext, useEffect, useState } from 'react';

// Pases si no hay código o no se pudo consultar (igual que PASES_SIN_CODIGO en api/_invitados.js).
const DEFAULT_SEATS = 1;

const GuestContext = createContext({ code: '', found: false, name: '', seats: DEFAULT_SEATS });

export const GuestProvider = GuestContext.Provider;
export const useGuest = () => useContext(GuestContext);

/** Lee el código del link personal (?i=CODIGO) y consulta sus lugares reservados. */
export function useGuestLoader() {
  const [guest, setGuest] = useState(() => ({
    code: new URLSearchParams(window.location.search).get('i')?.trim() ?? '',
    found: false,
    name: '',
    seats: DEFAULT_SEATS,
  }));

  useEffect(() => {
    if (!guest.code) return;
    let cancelled = false;
    fetch(`/api/invitado?c=${encodeURIComponent(guest.code)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (cancelled || !data?.ok) return;
        setGuest((current) => ({
          ...current,
          found: Boolean(data.found),
          name: data.nombre ?? '',
          seats: Math.max(1, Number(data.pases) || DEFAULT_SEATS),
        }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return guest;
}
