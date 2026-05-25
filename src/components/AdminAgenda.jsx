import { Check, Trash2, X } from 'lucide-react';

const statusLabels = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
};

export function AdminAgenda({ appointments, onChangeStatus, onRemoveAppointment }) {
  return (
    <section className="agenda-section">
      <div className="section-heading">
        <p className="eyebrow">Administracion</p>
        <h2>Agenda de turnos</h2>
      </div>

      {appointments.length === 0 ? (
        <p className="empty-state">Todavia no hay turnos cargados en este navegador.</p>
      ) : (
        <div className="agenda-list">
          {appointments.map((appointment) => (
            <article className="agenda-item" key={appointment.id}>
              <div>
                <strong>{appointment.clientName}</strong>
                <span>{appointment.service || 'Turno general de 45 minutos'}</span>
                <small>
                  {appointment.date} - {appointment.time} - {appointment.barber}
                </small>
                {appointment.notes && <p>{appointment.notes}</p>}
              </div>
              <div className="agenda-actions">
                <span className={`status status-${appointment.status}`}>
                  {statusLabels[appointment.status]}
                </span>
                <button
                  type="button"
                  aria-label="Confirmar turno"
                  onClick={() => onChangeStatus(appointment.id, 'confirmed')}
                >
                  <Check size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Cancelar turno"
                  onClick={() => onChangeStatus(appointment.id, 'cancelled')}
                >
                  <X size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Eliminar turno"
                  onClick={() => onRemoveAppointment(appointment.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
