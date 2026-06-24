import { BadgeCheck, Brush, Droplets, ScanFace, Scissors, Shirt, Sparkles } from 'lucide-react';

const serviceIcons = {
  'classic-cut': { Icon: Scissors, className: 'service-icon-gold' },
  shave: { Icon: Brush, className: 'service-icon-blue' },
  eyebrows: { Icon: ScanFace, className: 'service-icon-green' },
  details: { Icon: Sparkles, className: 'service-icon-cyan' },
  personalized: { Icon: BadgeCheck, className: 'service-icon-gold' },
  'facial-cleaning': { Icon: Droplets, className: 'service-icon-cyan' },
  'suit-rental': { Icon: Shirt, className: 'service-icon-blue' },
};

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
        {services.map((service) => {
          const { Icon, className } = serviceIcons[service.id] || serviceIcons.personalized;

          return (
            <article className="service-card" key={service.id}>
              <span className={`service-icon ${className}`}>
                <Icon size={24} />
              </span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
