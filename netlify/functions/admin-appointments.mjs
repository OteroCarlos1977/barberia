import { firestore } from './firebaseAdmin.mjs';
import { verifySessionToken } from './session.mjs';

const COLLECTION_NAME = 'appointments';
const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const sortByTime = (appointments) =>
  appointments.sort((first, second) =>
    String(first.time || '').localeCompare(String(second.time || '')),
  );

export const handler = async (event) => {
  try {
    verifySessionToken(event.headers.authorization || '');
  } catch (error) {
    return json(401, { message: error.message || 'No autorizado.' });
  }

  try {
    if (event.httpMethod === 'GET') {
      const date = event.queryStringParameters?.date;
      const query = date
        ? firestore.collection(COLLECTION_NAME).where('date', '==', date)
        : firestore.collection(COLLECTION_NAME);
      const snapshot = await query.get();
      const appointments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return json(200, { appointments: sortByTime(appointments) });
    }

    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body || '{}');
      if (!data.clientName || !data.date || !data.time) {
        return json(400, { message: 'Nombre, fecha y hora son obligatorios.' });
      }
      const created = await firestore.collection(COLLECTION_NAME).add({
        ...data,
        createdAt: new Date().toISOString(),
        source: 'admin',
      });
      return json(201, { id: created.id });
    }

    if (event.httpMethod === 'DELETE') {
      const { id } = JSON.parse(event.body || '{}');
      if (!id) return json(400, { message: 'Falta el identificador.' });
      await firestore.collection(COLLECTION_NAME).doc(id).delete();
      return json(200, { ok: true });
    }

    return json(405, { message: 'Método no permitido.' });
  } catch (error) {
    console.error('admin-appointments', error);
    return json(500, { message: 'No se pudo operar sobre la agenda.' });
  }
};
