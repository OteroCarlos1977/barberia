import { Scissors } from 'lucide-react';

export function ServiceList({ services }) {
  return (
    <section className="section" id="servicios">
      <div className="section-heading">
        <p className="eyebrow">Servicios</p>
        <h2>Lo esencial está en los detalles.</h2>
        <p className="section-intro">
          Cada visita se trabaja con una mirada completa: corte, rostro, terminaciones y presencia.
          Lo importante se define en el sillón, con criterio profesional y atención personal.
        </p>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <Scissors size={22} />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
