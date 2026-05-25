import { useEffect, useMemo, useState } from 'react';
import { Lock, Plus, X } from 'lucide-react';
import {
  createAdminAppointment,
  deleteAdminAppointment,
  getAdminAppointments,
  getAdminToken,
  loginAdmin,
} from '../services/adminApi';

const today = new Date().toISOString().slice(0, 10);

export function AdminAccess({
  isOpen,
  onClose,
  barbers,
  availableTimes,
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getAdminToken()));
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [error, setError] = useState('');
  const [isSavingManualAppointment, setIsSavingManualAppointment] = useState(false);
  const [isLoadingAgenda, setIsLoadingAgenda] = useState(false);

  useEffect(() => {
    if (!isOpen || !isAuthenticated) {
      return;
    }

    const loadAppointments = async () => {
      setIsLoadingAgenda(true);
      setError('');
      try {
        setAppointments(await getAdminAppointments(selectedDate));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoadingAgenda(false);
      }
    };

    loadAppointments();
  }, [isOpen, isAuthenticated, selectedDate]);

  const dayAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.date === selectedDate),
    [appointments, selectedDate],
  );

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setError('');
    onClose();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '');

    try {
      await loginAdmin({ username, password });
      setIsAuthenticated(true);
      setError('');
      event.currentTarget.reset();
    } catch (loginError) {
      setError(loginError.message || 'No se pudo iniciar sesión.');
    }
  };

  const handleManualAppointment = async (event) => {
    event.preventDefault();
    setIsSavingManualAppointment(true);
    const formData = new FormData(event.currentTarget);
    const appointmentData = {
      clientName: String(formData.get('clientName') || '').trim(),
      clientPhone: String(formData.get('clientPhone') || '').trim(),
      barber: String(formData.get('barber') || barbers[0]),
      date: selectedDate,
      time: String(formData.get('time') || ''),
      notes: String(formData.get('notes') || '').trim(),
      service: 'Asignación manual de 45 minutos',
    };

    try {
      await createAdminAppointment(appointmentData);
      setAppointments(await getAdminAppointments(selectedDate));
      event.currentTarget.reset();
    } finally {
      setIsSavingManualAppointment(false);
    }
  };

  const reloadAppointments = async () => {
    setAppointments(await getAdminAppointments(selectedDate));
  };

  const runAdminAction = async (action) => {
    setError('');
    try {
      await action();
      await reloadAppointments();
    } catch (adminError) {
      setError(adminError.message || 'No se pudo completar la acción.');
    }
  };

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="admin-title">
      <div className="admin-modal">
        <button className="modal-close" type="button" aria-label="Cerrar agenda" onClick={handleClose}>
          <X size={22} />
        </button>

        {!isAuthenticated ? (
          <div className="admin-login-panel">
            <div>
              <p className="eyebrow">Administración</p>
              <h2 id="admin-title">Acceso a agenda</h2>
              <p>
                Ingresá con el usuario creado en la colección usuarios para ver la agenda diaria y
                cargar asignaciones.
              </p>
            </div>
            <form className="admin-login-form" onSubmit={handleLogin}>
              <label>
                Usuario
                <input name="username" type="text" autoComplete="username" required />
              </label>
              <label>
                Contraseña
                <input name="password" type="password" autoComplete="current-password" required />
              </label>
              {error && <p className="form-error">{error}</p>}
              <button className="button button-primary" type="submit">
                <Lock size={18} />
                Ingresar
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="admin-private-header">
              <div>
                <p className="eyebrow">Administración</p>
                <h2 id="admin-title">Agenda del día</h2>
              </div>
            </div>

            <label className="admin-date-filter">
              Fecha
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
              />
            </label>

            <div className="agenda-table-wrap">
              {error && <p className="form-error admin-panel-error">{error}</p>}
              <table className="agenda-table">
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Cliente</th>
                    <th>Teléfono</th>
                    <th>Detalle</th>
                    <th>Acción</th>
                  </tr>
                </thead>
              <tbody>
                  {isLoadingAgenda ? (
                    <tr>
                      <td colSpan="5">Cargando agenda...</td>
                    </tr>
                  ) : dayAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="5">No hay turnos cargados para esta fecha.</td>
                    </tr>
                  ) : (
                    dayAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.time}</td>
                        <td>{appointment.clientName}</td>
                        <td>{appointment.clientPhone}</td>
                        <td>{appointment.notes || appointment.service}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              onClick={() => runAdminAction(() => deleteAdminAppointment(appointment.id))}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <form className="manual-appointment-form" onSubmit={handleManualAppointment}>
              <h3>Nueva asignación</h3>
              <label>
                Nombre
                <input name="clientName" type="text" required />
              </label>
              <label>
                Teléfono
                <input name="clientPhone" type="tel" required />
              </label>
              <label>
                Hora
                <select name="time" required defaultValue="">
                  <option value="" disabled>
                    Elegir hora
                  </option>
                  {availableTimes.map((time) => (
                    <option value={time} key={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Barbero
                <select name="barber" required defaultValue={barbers[0]}>
                  {barbers.map((barber) => (
                    <option value={barber} key={barber}>
                      {barber}
                    </option>
                  ))}
                </select>
              </label>
              <label className="full-row">
                Detalle
                <textarea name="notes" rows="2" placeholder="Ej: reservado por teléfono" />
              </label>
              <button className="button button-primary full-row" type="submit" disabled={isSavingManualAppointment}>
                <Plus size={18} />
                {isSavingManualAppointment ? 'Guardando...' : 'Agregar asignación'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
