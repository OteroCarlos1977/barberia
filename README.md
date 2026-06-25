# Emape Barbershop

Landing page de la barbería de Emanuel Pérez en Dolores, lista para publicar en Netlify.

## Flujo actual

- Los servicios se presentan en la landing.
- El visitante coordina directamente por WhatsApp.
- No existe una grilla pública de horarios ni una reserva automática.
- Emanuel responde con un día y horario posible según su disponibilidad.
- Emanuel conserva una agenda privada para cargar asignaciones manualmente.
- La web también promociona alquiler de trajes y limpieza facial profunda.

## Estructura principal

```txt
public/images/
src/components/
src/data/barbershop.json
src/pages/HomePage.jsx
```

- `WhatsAppBooking.jsx`: contacto para coordinar una atención.
- `FacialTreatment.jsx`: presentación del servicio de limpieza facial.
- `AdminAccess.jsx`: login y agenda privada de carga manual.
- `ServiceList.jsx`: listado general de servicios.
- `barbershop.json`: datos comerciales y contenido editable.

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Publicación en Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

La agenda privada requiere estas variables de entorno:

```txt
FIREBASE_SERVICE_ACCOUNT
ADMIN_SESSION_SECRET
```

Los cambios enviados a la rama `main` se publican mediante el deploy automático de Netlify.
