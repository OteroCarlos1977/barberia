import { MapPin } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons.jsx';

export function Hero({ business }) {
  const whatsappUrl = `https://wa.me/${business.phone}?text=${encodeURIComponent(
    'Hola Emanuel, quiero coordinar una atención en EMAPE.BARBERSHOP.',
  )}`;
  const instagramUrl =
    business.instagramUrl || `https://www.instagram.com/${business.instagram.replace('@', '')}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    business.address,
  )}`;

  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <h1 className="sr-only">
          EMAPE.BARBERSHOP, barberia de Emanuel Pérez con atención personalizada en Dolores
        </h1>

        <p className="hero-local-label">Tu barbería en Dolores</p>
        <p className="hero-barber-label">Emanuel Pérez, barbero en Dolores</p>
        <div className="hero-logo-wrap">
          <img className="hero-logo" src="/images/logo-transparent.png" alt="EMAPE.BARBERSHOP" />
        </div>
        <p className="hero-text">{business.tagline}</p>
        <p className="hero-support">
          Escribinos y Emanuel coordina personalmente el mejor día y horario para vos.
        </p>
        <a className="hero-address" href={mapsUrl} target="_blank" rel="noreferrer">
          <MapPin size={18} />
          {business.address}
        </a>
        <div className="hero-actions">
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsAppIcon />
            Coordinar por WhatsApp
          </a>
          <a className="button button-secondary" href={instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
