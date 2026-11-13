// Todos los textos del cuento en un solo lugar para editarlos sin tocar la lógica de animación.
export const STORY = {
  couple: 'Armando y Sabina',
  cover: {
    kicker: 'Una Historia de Amor',
    title: 'LA BODA',
    byline: 'Escrita por',
  },
  beginning: {
    intro: 'Érase una vez',
    panels: [
      {
        id: 'cafe',
        text: 'que se conocieron en un trabajo difícil, pero al que siempre agradecerán el haberse encontrado...',
      },
      { id: 'selfie', text: 'y, aunque él tardó en captar las señales para hacer match...' },
      { id: 'perro', text: 'Hoy suman mil experiencias, risas y aventuras...' },
      { id: 'ninos', text: 'en compañía de Alex y Matias ❤️' },
    ],
  },
  decision: {
    top: 'quienes suman aún más felicidad a sus vidas.',
    lines: ['Este amor ha florecido', 'y decidieron unir', 'sus vidas...', '¡para siempre!'],
  },
  date: {
    title: '¡¡Se van a Casar!!',
    date: '2 de enero 2027',
  },
  venue: {
    name: 'Salón de fiestas L & A',
    city: 'Chiná',
    // Cada "\n" es un salto de línea.
    paragraph:
      'Queremos festejar nuestra boda\ncon algo sencillo, íntimo y\ncon la gente que de verdad amamos.\nSi te llegó esto,\nconsidérate VIP en nuestro corazón:\nEres alguien importante para nosotros.',
    dressCode: '¿Qué me pongo?\nLo que quieras, excepto traje.\nAquí venimos a disfrutar.',
    time: '2:00 pm',
  },
  gifts: {
    title: 'Obsequios',
    paragraph:
      'Tu presencia es nuestro mejor regalo. Si además deseas tener un detalle con nosotros, tendremos lluvia de sobres el día del evento.',
  },
  confirm: {
    title: 'Confirma tu Asistencia',
    cta: 'Toca aquí para confirmar',
  },
  closing: {
    ending: 'Continuará...',
    // Coloca la foto en public/foto.jpg. Si no existe, se muestra una ilustración en su lugar.
    photo: 'foto.jpg',
    photoAlt: 'Armando y Sabina',
  },
};
