import { Droplets } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons.jsx';

export function FacialTreatment({ business }) {
  const whatsappUrl = `https://wa.me/${business.phone}?text=${encodeURIComponent(
    'Hola Emanuel, quiero consultar por el servicio de limpieza facial.',
  )}`;

  return (
    <section className="facial-section" id="limpieza-facial">
      <div className="facial-media">
        <img
          src="/images/limpieza-facial-emape.jpeg"
          alt="Servicio de limpieza facial profunda en EMAPE.BARBERSHOP"
          loading="lazy"
        />
      </div>
      <div className="facial-copy">
        <p className="eyebrow">Nuevo servicio</p>
        <h2>Limpieza facial profunda</h2>
        <p>
          Una atención rápida y cuidada para limpiar impurezas, mejorar la textura y devolverle
          frescura al rostro. Es apta para diferentes edades y tipos de piel.
        </p>
        <ul className="facial-benefits">
          <li><Droplets size={18} /> Limpieza profunda de grasa e impurezas.</li>
          <li><Droplets size={18} /> Piel más suave, uniforme y luminosa.</li>
          <li><Droplets size={18} /> Podés sumarla a tu próxima visita.</li>
        </ul>
        <a className="button button-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
          <WhatsAppIcon />
          Consultar por limpieza facial
        </a>
      </div>
    </section>
  );
}
