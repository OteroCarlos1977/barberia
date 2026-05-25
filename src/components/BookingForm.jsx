import { Send } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getBookedTimesByDate } from '../services/availabilityService';

const today = new Date().toISOString().slice(0, 10);

export function BookingForm({ availableTimes, onCreateAppointment }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  useEffect(() => {
    if (!selectedDate) {
      setBookedTimes([]);
      return;
    }

    const loadAvailability = async () => {
      setIsLoadingAvailability(true);
      setSubmitError('');
      try {
        const reservedTimes = await getBookedTimesByDate(selectedDate);
        setBookedTimes(reservedTimes);
        if (reservedTimes.includes(selectedTime)) {
          setSelectedTime('');
        }
      } catch (error) {
        setBookedTimes([]);
        setSubmitError(error.message);
      } finally {
        setIsLoadingAvailability(false);
      }
    };

    loadAvailability();
  }, [selectedDate]);

  const freeTimes = useMemo(
    () => availableTimes.filter((time) => !bookedTimes.includes(time)),
    [availableTimes, bookedTimes],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');
    const formData = new FormData(event.currentTarget);
    const appointmentData = {
      ...Object.fromEntries(formData.entries()),
      barber: 'Emanuel',
      service: 'Turno general de 45 minutos',
    };

    if (bookedTimes.includes(appointmentData.time)) {
      setIsSubmitting(false);
      setSelectedTime('');
      setSubmitError('Ese horario ya está reservado. Elegí otro turno.');
      return;
    }

    try {
      const appointment = await onCreateAppointment(appointmentData);
      setSubmitSuccess(
        `Turno solicitado para ${appointment.date} a las ${appointment.time}. El barbero lo verá en la agenda.`,
      );
      setSelectedDate('');
      setSelectedTime('');
      setBookedTimes([]);
      event.currentTarget.reset();
    } catch (error) {
      setSubmitSuccess('');
      setSubmitError(error.message || 'No se pudo guardar el turno. Intentá más tarde.');
      if (selectedDate) {
        try {
          const reservedTimes = await getBookedTimesByDate(selectedDate);
          setBookedTimes(reservedTimes);
          if (reservedTimes.includes(selectedTime)) {
            setSelectedTime('');
          }
        } catch {
          setBookedTimes([]);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="booking-section" id="turnos">
      <div className="section-heading">
        <p className="eyebrow">Turnero</p>
        <h2>Reservá 45 minutos para vos</h2>
        <p className="section-intro">
          No hace falta elegir el servicio antes. Reservás el espacio y, al llegar, se define qué
          conviene trabajar según tu estilo, tu rostro y lo que necesitás ese día.
        </p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input name="clientName" type="text" placeholder="Tu nombre" required />
        </label>
        <label>
          Telefono
          <input name="clientPhone" type="tel" placeholder="11 2345 6789" required />
        </label>
        <label>
          Fecha
          <input
            name="date"
            type="date"
            min={today}
            value={selectedDate}
            onChange={(event) => {
              setSelectedDate(event.target.value);
              setSelectedTime('');
              setSubmitError('');
              setSubmitSuccess('');
            }}
            required
          />
        </label>
        <label>
          Hora
          <select
            name="time"
            required
            value={selectedTime}
            disabled={!selectedDate || isLoadingAvailability || freeTimes.length === 0}
            onChange={(event) => {
              setSelectedTime(event.target.value);
              setSubmitError('');
              setSubmitSuccess('');
            }}
          >
            <option value="" disabled>
              {isLoadingAvailability ? 'Consultando disponibilidad...' : 'Elegir hora'}
            </option>
            {freeTimes.map((time) => (
              <option value={time} key={time}>
                {time}
              </option>
            ))}
          </select>
          {selectedDate && !isLoadingAvailability && (
            <span className="availability-note">
              {freeTimes.length > 0
                ? `${freeTimes.length} horarios disponibles`
                : 'No quedan horarios disponibles para esa fecha'}
            </span>
          )}
        </label>
        <label className="full-row">
          Comentario opcional
          <textarea
            name="notes"
            rows="3"
            placeholder="Si querés, contá qué tenés en mente para tu turno"
          />
        </label>
        <button className="button button-primary full-row" type="submit" disabled={isSubmitting}>
          <Send size={18} />
          {isSubmitting ? 'Guardando turno...' : 'Solicitar turno'}
        </button>
        {submitSuccess && <p className="form-success full-row">{submitSuccess}</p>}
        {submitError && <p className="form-error full-row">{submitError}</p>}
      </form>
    </section>
  );
}
