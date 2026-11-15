// Lista de invitados con sus lugares reservados. Vive solo en el servidor (Vercel no
// convierte en endpoint los archivos de /api que empiezan con "_"), así que los nombres
// no quedan a la vista en el código de la página.
//
// Cada clave es el código del link personal: https://tu-dominio.vercel.app/?i=CODIGO
// - nombre: cómo saludamos al invitado (aparece en la invitación).
// - pases: lugares totales, contando a la persona invitada (pases: 3 = él/ella + 2).
// Usa códigos difíciles de adivinar (letras y números, sin espacios) para que nadie
// pueda probar el de otra familia.
export const INVITADOS = {
  PEREZ7K2Q: { nombre: 'Familia Pérez', pases: 4 },
  LAURA9XM4: { nombre: 'Laura', pases: 2 },
  TIOBETO3Z: { nombre: 'Tío Beto', pases: 1 },
};

// Lugares para quien abre la invitación sin código (o con uno que no existe).
export const PASES_SIN_CODIGO = 1;

export const normalizeCode = (value) =>
  typeof value === 'string' ? value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20) : '';

export function findGuest(rawCode) {
  const code = normalizeCode(rawCode);
  const guest = code ? INVITADOS[code] : undefined;
  return guest ? { code, nombre: guest.nombre, pases: Math.max(1, guest.pases) } : null;
}
