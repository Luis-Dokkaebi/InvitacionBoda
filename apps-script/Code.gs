/**
 * Recibe confirmaciones desde la función /api/rsvp de Vercel y las agrega a la hoja.
 *
 * Instalación: abre tu Google Sheet > Extensiones > Apps Script, pega este archivo,
 * cambia SECRET por una frase larga y aleatoria (la misma que pondrás en Vercel como
 * RSVP_SECRET) y publica como Web App (Ejecutar como: yo; Acceso: cualquier persona).
 */
const SECRET = 'CAMBIA-ESTO-POR-UNA-FRASE-LARGA-Y-ALEATORIA';
const SHEET_NAME = 'Confirmaciones';
const HEADERS = [
  'Fecha',
  'Nombre',
  'Asistirá',
  'Acompañantes',
  'Total personas',
  'Mensaje',
  'P1: Emoción',
  'P2: Llorar',
  'P3: Regalo',
  'P4: Vestido',
];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply_({ ok: false, error: 'JSON inválido' });
  }

  if (data.secret !== SECRET) {
    return reply_({ ok: false, error: 'No autorizado' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const attending = data.attending === true;
    const companions = attending ? Number(data.companions) || 0 : 0;
    const answers = Array.isArray(data.answers) ? data.answers : [];

    sheet.appendRow([
      new Date(),
      safe_(data.name),
      attending ? 'Sí' : 'No',
      companions,
      attending ? 1 + companions : 0,
      safe_(data.message),
      safe_(answers[0]),
      safe_(answers[1]),
      safe_(answers[2]),
      safe_(answers[3]),
    ]);
  } finally {
    lock.releaseLock();
  }

  return reply_({ ok: true });
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

// Evita que un texto que empiece con =, +, - o @ se interprete como fórmula.
function safe_(value) {
  const text = value == null ? '' : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
