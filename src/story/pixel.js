/*
 * Motor de pixel art del cuento: paleta, sprites (cuadrículas de texto) y composición de escenas.
 *
 * Cada sprite es una lista de filas; cada carácter es un píxel de la PALETA y "." es transparente.
 * Una escena es un lienzo de W×H píxeles donde se pintan sprites, rectángulos y líneas en orden.
 * Las capas con nombre (por ejemplo "runners" o "swing swing-a") se dibujan en su propio <g>
 * para poder animarlas por separado.
 */

export const PALETTE = {
  K: '#222034', // contorno, ojos, zapatos
  H: '#3b2a24', // cabello de él
  h: '#5a3220', // cabello de ella
  S: '#c88a5e', // piel de los novios
  k: '#f0b48a', // piel de los niños
  P: '#ef8a9a', // mejillas y detalles rosas
  M: '#a8323e', // boca
  N: '#35488a', // traje
  W: '#ffffff',
  w: '#c9d3e6', // sombra del vestido
  V: '#dfe7f4', // velo
  R: '#ff4d6d', // corazones
  G: '#3fa34d', // pasto
  g: '#2c7a37',
  Y: '#ffd23f', // dorado
  y: '#e09a1a',
  D: '#8d5a2b', // madera / tierra
  d: '#6b4220',
  F: '#e0a96d', // perrito / borde de escalón
  A: '#8f95b2', // gris: vapor, cuerdas, latas
  T: '#2bb3b1', // playera de Alex
  O: '#f28c28', // playera de Matias
  J: '#3d6fb6', // jeans
  L: '#7fd3ff', // pantalla del teléfono
  Q: '#5a3f8f', // pista de baile
  q: '#43306e',
};

/* ---------- Sprites ---------- */

export const SPRITES = {
  groom: [
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HSSSSSSH..',
    '..SKSSSSKS..',
    '..SPSSSSPS..',
    '...SSMMSS...',
    '....SSSS....',
    '..NNNWWNNN..',
    '.NNNNRRNNNN.',
    '.NNNNWWNNNN.',
    '.NNNNWWNNNN.',
    '.NNNNNNNNNN.',
    '.SNNNNNNNNS.',
    '..NNNNNNNN..',
    '..NNNNNNNN..',
    '..NNN..NNN..',
    '..NNN..NNN..',
    '..NNN..NNN..',
    '..KKK..KKK..',
  ],
  bride: [
    '....VVVVVV....',
    '...VhhhhhhV...',
    '...VhSSSShV...',
    '...VSKSSKSV...',
    '...VPSSSSPV...',
    '...VVSMMSVV...',
    '..VVV.SS.VVV..',
    '..VV.WWWW.VV..',
    '..V.WWWWWW.V..',
    '....WWPPWW....',
    '...SWWWWWWS...',
    '...WWWWWWWW...',
    '..WWWWWPWWWW..',
    '..WWWWWWWWWW..',
    '.WWWWWWWWWWWW.',
    '.WWPWWWWWWPWW.',
    'WWWWWWWWWWWWWW',
    'wwwwwwwwwwwwww',
  ],
  groomSide: [
    '..HHHH.....',
    '.HHHHHH....',
    '.HHHSSSS...',
    '.HHSSSKS...',
    '..SSSSSSS..',
    '..SSSSMS...',
    '...SSS.....',
    '..NNWWN....',
    '.NNNNRNN...',
    'SNNNNNNNS..',
    '.NNNNNNN...',
    '..NNNNN....',
    '..NN.NN....',
    '.NN...NN...',
    'NN.....NN..',
    'K.......KK.',
  ],
  brideSide: [
    '..VVhhh.....',
    '.VVhhhhh....',
    '.VhhhSSSS...',
    '.VhhSSSKS...',
    'VVhhSSSSSS..',
    'VV.hSSSMS...',
    'VV..SSS.....',
    'V..WWWWW....',
    '..WWWWWWW...',
    '.SWWWWWWWS..',
    '..WWWWWWW...',
    '..WWWWWWWW..',
    '.WWWWWWWWWW.',
    'WWWWWWWWWWWW',
    'wwwwwwwwwwww',
    '.S.......S..',
  ],
  groomBack: [
    '..HHHHHH..',
    '.HHHHHHHH.',
    '.HHHHHHHH.',
    '.HHHHHHHH.',
    '..HHHHHH..',
    '...SSSS...',
    '.NNNNNNNN.',
    'NNNNNNNNNN',
    'NNNNNNNNNN',
    'SNNNNNNNNS',
    '.NNNNNNNN.',
    '.NNNNNNNN.',
  ],
  brideBack: [
    '...VVVVVV...',
    '..VhhhhhhV..',
    '..VhhhhhhV..',
    '..VhhhhhhV..',
    '..VVhhhhVV..',
    '..VVVSSVVV..',
    '.VVWWWWWWVV.',
    '.VWWWWWWWWV.',
    '.SWWWWWWWWS.',
    '.WWWWWWWWWW.',
    'WWWWWWWWWWWW',
    'WWWWWWWWWWWW',
  ],
  alex: [
    '.H.H.H.H.',
    '.HHHHHHH.',
    '.HkkkkkH.',
    '.kKkkkKk.',
    '.kPkkkPk.',
    '..kkMkk..',
    '.TTTTTTT.',
    'kTTTTTTTk',
    '.TTTTTTT.',
    '..JJ.JJ..',
    '..JJ.JJ..',
    '..KK.KK..',
  ],
  matias: [
    '..HHHHH..',
    '.HHHHHHH.',
    '.HkkkkkH.',
    '.kKkkkKk.',
    '.kPkkkPk.',
    '..kkMkk..',
    '.OOOOOOO.',
    'kOOOOOOOk',
    '.OOOOOOO.',
    '..JJ.JJ..',
    '..JJ.JJ..',
    '..KK.KK..',
  ],
  dog: [
    '.dd...........',
    'dFFd..........',
    'FKFF..........',
    'FFFFFFFFFFFF..',
    'KFFFFFFFFFFFF.',
    '.PFFFFFFFFFFF.',
    '..FFFFFFFFFF..',
    '..F.F....F.F..',
    '..F.F....F.F..',
  ],
  tail: ['..d', '.d.', 'd..'],
  heart: ['.RR.RR.', 'RRRRRRR', 'RWRRRRR', '.RRRRR.', '..RRR..', '...R...'],
  heartSmall: ['.R.R.', 'RRRRR', '.RRR.', '..R..'],
  bouquet: ['.R.R.', 'RPRPR', '.RGR.', '..G..', '..G..'],
  glass: ['Y.Y', 'YYY', '.Y.', '.Y.', 'YYY'],
  can: ['AAA', 'AWA', 'AAA', 'AAA'],
  phone: ['KKKK', 'KLLK', 'KLLK', 'KLLK', 'KLLK', 'KKKK'],
  mug: ['WWW.', 'WWWW', 'WWWW', 'WWW.'],
  note: ['.YY', '.Y.', '.Y.', 'YY.', 'YY.'],
};

/* ---------- Composición ---------- */

const emptyGrid = (w, h) => Array.from({ length: h }, () => new Array(w).fill('.'));

/**
 * Crea una escena de `w`×`h` píxeles. `draw(paint)` recibe un pintor con:
 *   sprite(rows, x, y, { flip, from, to })  — `from`/`to` recortan filas del sprite
 *   rect(ch, x, y, w, h)                    — rectángulo sólido
 *   line(ch, x0, y0, x1, y1)                — línea de un píxel (Bresenham)
 *   dot(ch, ...[x, y])                      — píxeles sueltos
 *   layer(name)                             — lo siguiente se pinta en una capa animable aparte
 */
export function scene(w, h, draw) {
  const layers = [{ name: '', grid: emptyGrid(w, h) }];
  let grid = layers[0].grid;
  const put = (ch, x, y) => {
    if (x >= 0 && y >= 0 && x < w && y < h) grid[y][x] = ch;
  };
  const paint = {
    sprite(rows, x, y, { flip = false, from = 0, to = rows.length } = {}) {
      rows.slice(from, to).forEach((row, r) => {
        const cells = flip ? [...row].reverse() : [...row];
        cells.forEach((ch, c) => {
          if (ch !== '.') put(ch, x + c, y + r);
        });
      });
    },
    rect(ch, x, y, rw, rh) {
      for (let j = 0; j < rh; j += 1) for (let i = 0; i < rw; i += 1) put(ch, x + i, y + j);
    },
    line(ch, x0, y0, x1, y1) {
      const dx = Math.abs(x1 - x0);
      const dy = -Math.abs(y1 - y0);
      const sx = x0 < x1 ? 1 : -1;
      const sy = y0 < y1 ? 1 : -1;
      let err = dx + dy;
      let x = x0;
      let y = y0;
      for (;;) {
        put(ch, x, y);
        if (x === x1 && y === y1) break;
        const e2 = 2 * err;
        if (e2 >= dy) {
          err += dy;
          x += sx;
        }
        if (e2 <= dx) {
          err += dx;
          y += sy;
        }
      }
    },
    dot(ch, ...points) {
      points.forEach(([x, y]) => put(ch, x, y));
    },
    layer(name) {
      const found = layers.find((l) => l.name === name);
      if (found) {
        grid = found.grid;
        return;
      }
      const next = { name, grid: emptyGrid(w, h) };
      layers.push(next);
      grid = next.grid;
    },
  };
  draw(paint);
  return { w, h, layers: layers.map(({ name, grid: g }) => ({ name, rows: toRuns(g) })) };
}

/** Une los píxeles iguales consecutivos de cada fila en un solo rectángulo. */
function toRuns(grid) {
  return grid
    .map((row, y) => {
      const runs = [];
      let start = 0;
      for (let x = 1; x <= row.length; x += 1) {
        if (x === row.length || row[x] !== row[start]) {
          if (row[start] !== '.') runs.push({ x: start, w: x - start, fill: PALETTE[row[start]] });
          start = x;
        }
      }
      return { y, runs };
    })
    .filter((row) => row.runs.length);
}
