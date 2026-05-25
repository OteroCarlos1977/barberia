import barbershopData from '../data/barbershop.json';
import { isFirebaseConfigured } from './firebaseClient';

const STORAGE_KEY = 'emape-barbershop-appointments';
const COLLECTION_NAME = 'appointments';

const withTimeout = (promise, message = 'La operación tardó demasiado.') => {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error(message)), 15000);
  });

  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timeoutId));
};

const requestJson = async (url, options = {}) => {
  const response = await withTimeout(fetch(url, options), 'No se pudo conectar con el servidor.');
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo completar la operación.');
  }

  return data;
};

const readAppointments = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const writeAppointments = (appointments) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

export const getBarbershopData = () => barbershopData;

export const usesFirebaseBackend = () => isFirebaseConfigured;

export const getAppointments = async () => {
  return readAppointments();
};

export const createAppointment = async (appointmentData) => {
  if (!isFirebaseConfigured) {
    const appointments = readAppointments();
    const appointment = {
      ...appointmentData,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const updatedAppointments = [appointment, ...appointments];
    writeAppointments(updatedAppointments);
    return appointment;
  }

  const data = await requestJson('/.netlify/functions/public-appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointmentData),
  });

  return data.appointment;
};

export const createLocalAppointment = (appointmentData) => {
  const appointments = readAppointments();
  const appointment = {
    ...appointmentData,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const updatedAppointments = [appointment, ...appointments];
  writeAppointments(updatedAppointments);
  return appointment;
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const appointments = readAppointments();
  const updatedAppointments = appointments.map((appointment) =>
    appointment.id === appointmentId ? { ...appointment, status } : appointment,
  );

  writeAppointments(updatedAppointments);
  return updatedAppointments;
};

export const deleteAppointment = async (appointmentId) => {
  const updatedAppointments = readAppointments().filter(
    (appointment) => appointment.id !== appointmentId,
  );
  writeAppointments(updatedAppointments);
  return updatedAppointments;
};
