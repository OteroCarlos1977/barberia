import { MessageCircle } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons.jsx';

export function WhatsAppBooking({ business }) {
  const whatsappUrl = `https://wa.me/${business.phone}?text=${encodeURIComponent(
    'Hola Emanuel, quiero coordinar una atención en EMAPE.BARBERSHOP.',
  )}`;

  return (
    <section className="whatsapp-booking" id="contacto">
      <div className="whatsapp-booking-copy">
        <p className="eyebrow">Coordinación directa</p>
        <h2>Escribinos y buscamos el momento indicado</h2>
        <p>
          No necesitás elegir una fecha ni ajustarte a una grilla de horarios. Enviá tu consulta
          por WhatsApp y Emanuel te responde personalmente con un día y horario posible según su
          disponibilidad.
        </p>
        <p className="whatsapp-booking-note">
          Podés contarle qué servicio necesitás o simplemente pedir una atención.
        </p>
        <a className="button button-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
          <WhatsAppIcon />
          Enviar mensaje por WhatsApp
        </a>
      </div>
      <div className="whatsapp-booking-mark" aria-hidden="true">
        <MessageCircle size={74} />
      </div>
    </section>
  );
}
