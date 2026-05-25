import { useEffect, useMemo, useState } from 'react';
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointmentStatus,
  usesFirebaseBackend,
} from '../services/appointmentService';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);

  const refreshAppointments = async () => {
    setIsLoadingAppointments(true);
    const storedAppointments = await getAppointments();
    setAppointments(storedAppointments);
    setIsLoadingAppointments(false);
  };

  useEffect(() => {
    if (usesFirebaseBackend()) {
      setIsLoadingAppointments(false);
      return;
    }

    refreshAppointments();
  }, []);

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((first, second) => {
      const firstDate = `${first.date}T${first.time}`;
      const secondDate = `${second.date}T${second.time}`;
      return firstDate.localeCompare(secondDate);
    });
  }, [appointments]);

  const addAppointment = async (appointmentData) => {
    const appointment = await createAppointment(appointmentData);
    setAppointments((currentAppointments) => [appointment, ...currentAppointments]);
    return appointment;
  };

  const changeStatus = async (appointmentId, status) => {
    setAppointments(await updateAppointmentStatus(appointmentId, status));
  };

  const removeAppointment = async (appointmentId) => {
    setAppointments(await deleteAppointment(appointmentId));
  };

  return {
    appointments: sortedAppointments,
    isLoadingAppointments,
    addAppointment,
    changeStatus,
    removeAppointment,
    refreshAppointments,
  };
};
