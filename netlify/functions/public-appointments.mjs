import { firestore } from './firebaseAdmin.mjs';

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const sanitize = (value) => String(value || '').trim().slice(0, 500);

const isSlotTaken = async ({ date, time }) => {
  const snapshot = await firestore
    .collection('appointments')
    .where('date', '==', date)
    .get();

  return snapshot.docs.some((appointmentDoc) => appointmentDoc.data().time === time);
};

export const handler = async (event) => {
  if (event.httpMethod === 'GET') {
    const date = sanitize(event.queryStringParameters?.date);

    if (!date) {
      return json(400, { message: 'Falta fecha.' });
    }

    try {
      const snapshot = await firestore
        .collection('appointments')
        .where('date', '==', date)
        .get();

      const bookedTimes = snapshot.docs
        .map((appointmentDoc) => appointmentDoc.data().time)
        .filter(Boolean)
        .sort();

      return json(200, { bookedTimes });
    } catch (error) {
      return json(500, { message: error.message || 'No se pudo consultar disponibilidad.' });
    }
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { message: 'Método no permitido.' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const appointment = {
      clientName: sanitize(body.clientName),
      clientPhone: sanitize(body.clientPhone),
      barber: sanitize(body.barber),
      date: sanitize(body.date),
      time: sanitize(body.time),
      notes: sanitize(body.notes),
      service: 'Turno general de 45 minutos',
      source: 'web',
      createdAt: new Date().toISOString(),
    };

    if (!appointment.clientName || !appointment.clientPhone || !appointment.date || !appointment.time) {
      return json(400, { message: 'Faltan datos obligatorios.' });
    }

    if (await isSlotTaken(appointment)) {
      return json(409, { message: 'Ese horario ya está reservado. Elegí otro turno.' });
    }

    const createdAppointment = await firestore.collection('appointments').add(appointment);
    return json(201, {
      appointment: {
        ...appointment,
        id: createdAppointment.id,
      },
    });
  } catch (error) {
    return json(500, { message: error.message || 'No se pudo guardar el turno.' });
  }
};
