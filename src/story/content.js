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
      { id: 'cafe', text: 'que se conocieron en un trabajo, entre cafés y pendientes...' },
      { id: 'selfie', text: 'y, aunque él tardó en dar el primer paso, ella supo esperarlo.' },
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
    paragraph:
      'Queremos festejar este día tan especial con las personas que más queremos, y tú eres una de ellas.',
    dressCode: '¿Qué me pongo? Lo que quieras... ¡mientras puedas bailar!',
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
