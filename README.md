# InvitacionBoda

Invitación de boda interactiva (React + Tailwind CSS + Lucide) con confirmación de asistencia guardada en Google Sheets.

## Flujo

0. **Libro de cuentos animado** (`src/story/`): 8 páginas con paso de página 3D, estilo pixel art de videojuego de 8 bits: los dibujos aparecen fila por fila (GSAP) y flotan corazones pixelados. Se avanza con swipe, flechas o teclado; "Saltar historia" va directo a la confirmación. La página 7 ("Confirma tu Asistencia") y el botón "Confirmar" de la última página abren el flujo de abajo.
1. Pantalla inicial con el botón "No" que escapa.
2. Cuestionario de 4 preguntas.
3. Formulario: nombre, ¿asistirá?, acompañantes y mensaje opcional.
4. Veredicto final (confirmada / no asistirá).

Cada confirmación llega a `api/rsvp.js` (función serverless de Vercel), que la valida y la reenvía a un Web App de Google Apps Script (`apps-script/Code.gs`), el cual agrega una fila a la hoja **Confirmaciones**.

## Configuración de Google Sheets

1. Crea una hoja nueva en Google Sheets (por ejemplo, "Invitados boda").
2. Menú **Extensiones > Apps Script**. Borra el contenido y pega `apps-script/Code.gs`.
3. Cambia `SECRET` por una frase larga y aleatoria. Guarda.
4. **Implementar > Nueva implementación > Tipo: Aplicación web**.
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
5. Autoriza los permisos y copia la URL que termina en `/exec`.

Si después cambias el script, usa **Implementar > Gestionar implementaciones > Editar > Versión: nueva** para conservar la misma URL.

## Despliegue en Vercel

1. En vercel.com: **Add New > Project** e importa este repositorio de GitHub.
2. Vercel detecta Vite automáticamente (build `npm run build`, salida `dist`).
3. En **Environment Variables** agrega:
   - `RSVP_SCRIPT_URL` = la URL `/exec` de Apps Script
   - `RSVP_SECRET` = la misma frase que pusiste en `SECRET`
4. **Deploy**. Si agregas las variables después del primer despliegue, haz **Redeploy**.

## Desarrollo local

```bash
npm install
npm run dev      # solo interfaz; /api/rsvp no existe con Vite
```

Para probar también la función:

```bash
npx vercel dev
```

### Personalizar el cuento

- Textos (fecha, salón, hora, obsequios, etc.): `src/story/content.js`.
- Música de fondo: `public/musica.m4a`. Empieza al tocar "Abrir invitación" (los navegadores no permiten sonido sin un toque), sigue durante la confirmación y se puede silenciar con el botón de bocina.
- Foto de la contraportada: copia la imagen a `public/foto.jpg`. Si no existe, aparece una ilustración en su lugar.
- Ilustraciones: los personajes y objetos son sprites de texto en `src/story/pixel.js` (cada letra es un color de la paleta y `.` es transparente; ahí también se cambian los tonos de piel). Cada escena se arma en `src/story/illustrations.jsx` colocando sprites, rectángulos y líneas por coordenadas.
- Tiempos de animación de cada página: funciones `build*` en `src/story/pages.jsx`.

El máximo de acompañantes se ajusta en `MAX_COMPANIONS` (`src/App.jsx` y `api/rsvp.js`).
