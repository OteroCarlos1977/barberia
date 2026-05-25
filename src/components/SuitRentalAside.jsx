import { WhatsAppIcon } from './BrandIcons.jsx';

export function SuitRentalAside({ business }) {
  const whatsappUrl = `https://wa.me/${business.phone}?text=${encodeURIComponent(
    'Hola, quiero consultar disponibilidad para alquiler de trajes en EMAPE.BARBERSHOP.',
  )}`;

  return (
    <aside className="suit-aside" id="trajes">
      <div className="suit-media">
        <img
          src="/images/05-trajes-profesional-emape.jpg"
          alt="Trajes de ocasion disponibles para consultar en EMAPE.BARBERSHOP"
          loading="lazy"
        />
      </div>
      <div>
        <p className="eyebrow">Alquiler de trajes de ocasión</p>
        <h2>Alquiler de trajes para momentos especiales</h2>
        <p>
          En EMAPE.BARBERSHOP también podés consultar por alquiler de trajes de ocasión.
          Porque hay momentos en los que la presencia importa: una fiesta, una reunión, un
          evento o una fecha especial.
        </p>
        <p>
          La idea es simple: que puedas salir del lugar no solo con un buen corte, sino también
          con una imagen completa, prolija y preparada para la ocasión.
        </p>
        <a className="button button-gold" href={whatsappUrl} target="_blank" rel="noreferrer">
          <WhatsAppIcon />
          Consultar disponibilidad
        </a>
      </div>
    </aside>
  );
}
