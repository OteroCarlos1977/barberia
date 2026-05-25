import { CalendarCheck, MapPin } from 'lucide-react';

function WhatsAppIcon() {
  return (
    <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#25d366"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.28-1.39a9.85 9.85 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.14h-.01a8.21 8.21 0 0 1-4.18-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.19 8.19 0 1 1 6.98 3.87Zm4.49-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.04s.88 2.37 1 2.53c.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.06-.1-.23-.16-.48-.29Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="instagram-gradient" x1="3" x2="21" y1="21" y2="3">
          <stop offset="0" stopColor="#feda75" />
          <stop offset="0.34" stopColor="#fa7e1e" />
          <stop offset="0.62" stopColor="#d62976" />
          <stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <path
        fill="url(#instagram-gradient)"
        d="M7.8 2h8.4A5.81 5.81 0 0 1 22 7.8v8.4a5.81 5.81 0 0 1-5.8 5.8H7.8A5.81 5.81 0 0 1 2 16.2V7.8A5.81 5.81 0 0 1 7.8 2Zm0 2A3.81 3.81 0 0 0 4 7.8v8.4A3.81 3.81 0 0 0 7.8 20h8.4a3.81 3.81 0 0 0 3.8-3.8V7.8A3.81 3.81 0 0 0 16.2 4H7.8Zm4.2 3.35A4.65 4.65 0 1 1 7.35 12 4.65 4.65 0 0 1 12 7.35Zm0 2A2.65 2.65 0 1 0 14.65 12 2.65 2.65 0 0 0 12 9.35Zm4.9-2.1a1.08 1.08 0 1 1-1.08 1.08 1.08 1.08 0 0 1 1.08-1.08Z"
      />
    </svg>
  );
}

export function Hero({ business }) {
  const whatsappUrl = `https://wa.me/${business.phone}?text=${encodeURIComponent(
    'Hola, quiero consultar por un turno en Emape Barbershop.',
  )}`;
  const instagramUrl = `https://www.instagram.com/${business.instagram.replace('@', '')}`;

  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        
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
