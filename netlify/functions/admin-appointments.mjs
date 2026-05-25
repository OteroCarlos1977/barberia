import { firestore } from './firebaseAdmin.mjs';
import { verifySessionToken } from './session.mjs';

const COLLECTION_NAME = 'appointments';

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const requireSession = (event) => verifySessionToken(event.headers.authorization || '');

const normalizeAppointment = (doc) => ({
  id: doc.id,
  ...doc.data(),
});

const sortByTime = (appointments) =>
  appointments.sort((first, second) => String(first.time || '').localeCompare(String(second.time || '')));

const isSlotTaken = async ({ date, time }) => {
  const snapshot = await firestore
    .collection(COLLECTION_NAME)
    .where('date', '==', date)
    .get();

  return snapshot.docs.some((appointmentDoc) => appointmentDoc.data().time === time);
};

export const handler = async (event) => {
  try {
    requireSession(event);
  } catch (error) {
    return json(401, { message: error.message || 'No autorizado.' });
  }

  try {
    if (event.httpMethod === 'GET') {
      const date = event.queryStringParameters?.date;
      let appointmentsQuery = firestore.collection(COLLECTION_NAME).orderBy('time', 'asc');

      if (date) {
        appointmentsQuery = firestore.collection(COLLECTION_NAME).where('date', '==', date);
      }

      const snapshot = await appointmentsQuery.get();
      return json(200, { appointments: sortByTime(snapshot.docs.map(normalizeAppointment)) });
    }

    if (event.httpMethod === 'POST') {
      const appointmentData = JSON.parse(event.body || '{}');
      if (await isSlotTaken(appointmentData)) {
        return json(409, { message: 'Ese horario ya está reservado.' });
      }

      const createdAppointment = await firestore.collection(COLLECTION_NAME).add({
        ...appointmentData,
        createdAt: new Date().toISOString(),
        source: 'admin',
      });
      return json(201, { id: createdAppointment.id });
    }

    if (event.httpMethod === 'DELETE') {
      const { id } = JSON.parse(event.body || '{}');
      if (!id) {
        return json(400, { message: 'Falta id.' });
      }
      await firestore.collection(COLLECTION_NAME).doc(id).delete();
      return json(200, { ok: true });
    }

  } catch (error) {
    return json(500, { message: error.message || 'No se pudo operar sobre la agenda.' });
  }

  return json(405, { message: 'Método no permitido.' });
};
