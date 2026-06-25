import { useEffect, useMemo, useRef, useState } from 'react';
import { LogOut, Lock, Plus, Trash2, X } from 'lucide-react';
import {
  clearAdminToken,
  createAdminAppointment,
  deleteAdminAppointment,
  getAdminAppointments,
  getAdminToken,
  loginAdmin,
} from '../services/adminApi.js';

const getLocalDateInputValue = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function AdminAccess({ isOpen, onClose }) {
  const closeButtonRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getAdminToken()));
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getLocalDateInputValue);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dayAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.date === selectedDate),
    [appointments, selectedDate],
  );

  const loadAppointments = async () => {
    setIsLoading(true);
    setError('');
    try {
      setAppointments(await getAdminAppointments(selectedDate));
    } catch (loadError) {
      if (/sesión|autorizado/i.test(loadError.message)) {
        clearAdminToken();
        setIsAuthenticated(false);
      }
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAppointments();
    }
  }, [isOpen, isAuthenticated, selectedDate]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);
    try {
      await loginAdmin({
        username: String(formData.get('username') || '').trim(),
        password: String(formData.get('password') || ''),
      });
      setIsAuthenticated(true);
      event.currentTarget.reset();
    } catch (loginError) {
      setError(loginError.message || 'No se pudo iniciar sesión.');
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      await createAdminAppointment({
        clientName: String(formData.get('clientName') || '').trim(),
        clientPhone: String(formData.get('clientPhone') || '').trim(),
        date: selectedDate,
        time: String(formData.get('time') || ''),
        notes: String(formData.get('notes') || '').trim(),
        service: 'Asignación manual',
        barber: 'Emanuel',
      });
      form.reset();
      await loadAppointments();
    } catch (saveError) {
      setError(saveError.message || 'No se pudo guardar la asignación.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      await deleteAdminAppointment(id);
      await loadAppointments();
    } catch (deleteError) {
      setError(deleteError.message || 'No se pudo eliminar la asignación.');
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setAppointments([]);
    setError('');
    setIsAuthenticated(false);
  };

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          type="button"
          aria-label="Cerrar agenda"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {!isAuthenticated ? (
          <div className="admin-login-panel">
            <div>
              <p className="eyebrow">Administración</p>
              <h2 id="admin-title">Acceso a agenda</h2>
              <p>Ingresá para consultar y organizar las asignaciones de Emanuel.</p>
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
              {error && <p className="form-error" role="alert">{error}</p>}
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
                <h2 id="admin-title">Agenda de Emanuel</h2>
              </div>
              <button className="button button-secondary" type="button" onClick={handleLogout}>
                <LogOut size={18} />
                Salir
              </button>
            </div>

            <label className="admin-date-filter">
              Fecha
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
              />
            </label>

            {error && <p className="form-error admin-panel-error" role="alert">{error}</p>}
            <div className="agenda-table-wrap">
              <table className="agenda-table">
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Cliente</th>
                    <th>Teléfono</th>
                    <th>Detalle</th>
                    <th><span className="sr-only">Acciones</span></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr className="agenda-status-row"><td colSpan="5">Cargando agenda...</td></tr>
                  ) : dayAppointments.length === 0 ? (
                    <tr className="agenda-status-row">
                      <td colSpan="5">No hay asignaciones cargadas para esta fecha.</td>
                    </tr>
                  ) : dayAppointments.map((appointment) => (
                    <tr className="agenda-entry" key={appointment.id}>
                      <td data-label="Hora">{appointment.time}</td>
                      <td data-label="Cliente">{appointment.clientName}</td>
                      <td data-label="Teléfono">{appointment.clientPhone || '—'}</td>
                      <td data-label="Detalle">{appointment.notes || appointment.service}</td>
                      <td className="agenda-entry-action">
                        <button
                          className="table-delete"
                          type="button"
                          aria-label={`Eliminar asignación de ${appointment.clientName}`}
                          onClick={() => handleDelete(appointment.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <form className="manual-appointment-form" onSubmit={handleCreate}>
              <h3>Nueva asignación</h3>
              <label>
                Nombre
                <input name="clientName" type="text" required />
              </label>
              <label>
                Teléfono
                <input name="clientPhone" type="tel" />
              </label>
              <label>
                Hora
                <input name="time" type="time" required />
              </label>
              <label className="full-row">
                Detalle
                <textarea name="notes" rows="2" placeholder="Ej: coordinado por WhatsApp" />
              </label>
              <button className="button button-primary full-row" type="submit" disabled={isSaving}>
                <Plus size={18} />
                {isSaving ? 'Guardando...' : 'Agregar a la agenda'}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
