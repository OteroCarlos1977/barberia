# Emape Barbershop

Landing page pequena para una barberia, lista para publicar en Netlify. Incluye servicios, contacto por WhatsApp, formulario de pedido de turno y una agenda de administracion local.

## Estructura

```txt
public/
  images/
src/
  components/
  data/
  hooks/
  pages/
  services/
  App.jsx
  main.jsx
  styles.css
```

## Flujo del turnero

1. `HomePage.jsx` arma la pagina principal.
2. `BookingForm.jsx` toma los datos del cliente.
3. `useAppointments.js` coordina el estado de turnos.
4. `appointmentService.js` guarda y lee turnos desde `localStorage`.
5. `AdminAgenda.jsx` muestra la agenda y permite confirmar, cancelar o eliminar turnos.

El proyecto soporta Firebase como backend. Si las variables `VITE_FIREBASE_*` estan configuradas, los turnos se guardan en Firestore y el barbero ingresa con Firebase Auth. Si faltan esas variables, el sitio usa `localStorage` como fallback local para desarrollo.

## Firebase

Crear un archivo `.env` desde `.env.example` y completar:

```txt
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

En Firebase:

- habilitar Firestore;
- crear la coleccion `usuarios`;
- publicar las reglas de `firestore.rules`.

Para el login por coleccion `usuarios`, cada documento debe tener:

```json
{
  "username": "barbero",
  "passwordHash": "sha256_de_la_clave",
  "active": true,
  "role": "admin"
}
```

El documento puede llamarse igual que el username en minusculas, por ejemplo `barbero`.

Para generar el hash:

```bash
node scripts/hash-password.mjs barbero "clave-segura"
```

Netlify Functions necesitan credenciales admin de Firebase. Cargar en Netlify una de estas opciones:

```txt
FIREBASE_SERVICE_ACCOUNT={...json completo de service account...}
ADMIN_SESSION_SECRET=una_clave_larga_aleatoria
```

O estas variables separadas:

```txt
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
ADMIN_SESSION_SECRET=
```

## Datos editables

Los servicios, horarios, telefono, direccion e Instagram estan en:

```txt
src/data/barbershop.json
```

Actualizar `business.phone` con el numero real en formato internacional, por ejemplo `54911XXXXXXXX`.

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Publicacion en Netlify

- Build command: `npm run build`
- Publish directory: `dist`

Cuando tengas las imagenes finales, reemplaza `public/images/emape-barbershop.png` o agrega nuevas imagenes en esa carpeta y actualiza los componentes visuales.
