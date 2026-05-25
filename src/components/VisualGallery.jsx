const galleryImages = [
  {
    src: '/images/03-rincon-identidad-profesional-emape.jpg',
    alt: 'Rincon de identidad y decoracion de EMAPE.BARBERSHOP',
    label: 'Identidad',
  },
  {
    src: '/images/04-ambiente-privado-profesional-emape.jpg',
    alt: 'Ambiente privado de barberia con sillon y herramientas',
    label: 'Ambiente privado',
  },
  {
    src: '/images/06-miniatura-profesional-emape.jpg',
    alt: 'Sillon de barberia listo para un turno personalizado',
    label: 'Turnos personales',
  },
];

export function VisualGallery() {
  return (
    <section className="gallery-section" aria-labelledby="gallery-title">
      <div className="section-heading">
        <p className="eyebrow">El lugar</p>
        <h2 id="gallery-title">Un espacio pensado para tu mejor experiencia</h2>
      </div>
      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <figure className="gallery-item" key={image.src}>
            <img src={image.src} alt={image.alt} loading="lazy" />
            <figcaption>{image.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
