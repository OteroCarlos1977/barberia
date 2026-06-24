export function BrandStory() {
  return (
    <section className="story-section" id="experiencia">
      <div className="section-heading">
        <p className="eyebrow">La experiencia</p>
        <h2>Un espacio de confianza, con tiempo y atención personal</h2>
      </div>

      <div className="story-layout">
        <div className="story-copy">
          <p>
            En EMAPE.BARBERSHOP, Emanuel Pérez trabaja cada atención de forma personal.
            Acá cada persona tiene su momento, su espacio y la dedicación que merece.
          </p>
          <p>
            La barbería está pensada como un entorno de exclusividad. No hay sala de espera 
            ni movimiento constante alrededor. Cada atención se coordina directamente por WhatsApp
            para encontrar un momento posible y atender a cada cliente con tranquilidad.
          </p>
          <p>
            Cortar el pelo no es solamente pasar una máquina o acomodar una forma. Es mirar el
            rostro, escuchar lo que el cliente quiere, entender su estilo y trabajar con
            prolijidad para que el resultado quede limpio, equilibrado y natural.
          </p>
          <p>
            Además del corte de cabello, realizo rasurado, perfilado y corte de cejas,
            limpieza de pelos de oreja y nariz, y terminaciones personalizadas. Una buena imagen
            también depende de esos detalles que ordenan el rostro y refuerzan la presencia.
          </p>
        </div>

        <div className="story-side">
          <img
            src="/images/02-sillon-profesional-emape.jpg"
            alt="Sillon de barberia de EMAPE.BARBERSHOP"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
