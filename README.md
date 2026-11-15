# InvitacionBoda

Invitación de boda interactiva (React + Tailwind CSS + Lucide) con confirmación de asistencia guardada en Google Sheets.

## Flujo

0. **Libro de cuentos animado** (`src/story/`): 8 páginas con paso de página 3D, ilustraciones que se dibujan solas (GSAP + DrawSVG) y corazones flotando. Se avanza con swipe, flechas o teclado; "Saltar historia" va directo a la confirmación. La página 7 ("Confirma tu Asistencia") y el botón "Confirmar" de la última página abren el flujo de abajo.
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
- Ilustraciones: `src/story/illustrations.jsx`. Para usar tus propios SVG conserva la clase `draw-svg` y usa trazos sin relleno; los rellenos que aparecen al final llevan `fill-reveal`.
- Tiempos de animación de cada página: funciones `build*` en `src/story/pages.jsx`.

- Aviso de bebidas (página 5, bajo el brindis): `venue.drinks` en `src/story/content.js`.

## Invitaciones personales con lugares reservados

Cada invitado recibe su propio link con un código, y la invitación solo le permite confirmar los lugares que le reservaron.

1. Edita la lista en `api/_invitados.js`:
   ```js
   export const INVITADOS = {
     PEREZ7K2Q: { nombre: 'Familia Pérez', pases: 4 }, // 4 lugares en total
     LAURA9XM4: { nombre: 'Laura', pases: 2 },          // Laura + 1
   };
   ```
   `pases` cuenta a la persona invitada. Usa códigos difíciles de adivinar (letras y números).
2. Haz commit y vuelve a desplegar en Vercel.
3. Manda a cada quien su link: `https://tu-dominio.vercel.app/?i=PEREZ7K2Q`.

Con el link personal, la invitación saluda por su nombre ("Esta invitación es para Familia Pérez"), la página de confirmación dice "Hemos reservado 4 lugares en tu honor · Pase personal e intransferible" y el formulario solo ofrece hasta 3 acompañantes. El servidor vuelve a revisar el límite, así que no se puede saltar editando la página.

Quien abra la invitación sin código (o con uno que no existe) solo puede confirmarse a sí mismo; cámbialo con `PASES_SIN_CODIGO` en `api/_invitados.js` (y `DEFAULT_SEATS` en `src/guest.js`).

La hoja **Confirmaciones** agrega las columnas *Invitación*, *Código* y *Lugares reservados*. Después de actualizar `apps-script/Code.gs`, publica una versión nueva (**Implementar > Gestionar implementaciones > Editar > Versión: nueva**).
