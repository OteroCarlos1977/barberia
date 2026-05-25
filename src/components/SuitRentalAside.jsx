import { Shirt } from 'lucide-react';

export function SuitRentalAside() {
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
        <a className="button button-gold" href="#turnos">
          <Shirt size={18} />
          Consultar disponibilidad
        </a>
      </div>
    </aside>
  );
}
