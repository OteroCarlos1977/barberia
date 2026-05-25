import { Clock, MapPin, MessageCircle } from 'lucide-react';

export function ContactPanel({ business }) {
  return (
    <section className="contact-panel" id="contacto">
      <div>
        <p className="eyebrow">Contacto</p>
        <h2>Turnos y consultas directas</h2>
      </div>
      <div className="contact-items">
        <span>
          <MapPin size={18} />
          {business.address}
        </span>
        <span>
          <Clock size={18} />
          {business.openingHours}
        </span>
        <a href={`https://wa.me/${business.phone}`} target="_blank" rel="noreferrer">
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>
    </section>
  );
}
