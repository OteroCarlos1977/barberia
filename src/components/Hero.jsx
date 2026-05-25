import { CalendarCheck, MapPin } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons.jsx';

export function Hero({ business }) {
  const whatsappUrl = `https://wa.me/${business.phone}?text=${encodeURIComponent(
    'Hola, quiero consultar por un turno en Emape Barbershop.',
  )}`;
  const instagramUrl = `https://www.instagram.com/${business.instagram.replace('@', '')}`;

  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <h1 className="sr-only">EMAPE.BARBERSHOP, barberia con turnos en Dolores</h1>
        
        <div className="hero-logo-wrap">
          <img className="hero-logo" src="/images/logo-transparent.png" alt="EMAPE.BARBERSHOP" />
        </div>
        <p className="hero-text">{business.tagline}</p>
        <p className="hero-support">
          Cada turno es un momento único, tu momento.
        </p>
        <p className="hero-address">
          <MapPin size={18} />
          {business.address}
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#turnos">
            <CalendarCheck size={20} />
            Pedir turno
          </a>
          <a className="button button-secondary" href={whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsAppIcon />
            WhatsApp
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
