# InvitacionBoda

Invitación de boda interactiva (React + Tailwind CSS + Lucide) con confirmación de asistencia guardada en Google Sheets.

## Flujo

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

El máximo de acompañantes se ajusta en `MAX_COMPANIONS` (`src/App.jsx` y `api/rsvp.js`).
