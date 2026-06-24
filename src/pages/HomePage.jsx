import { BrandStory } from '../components/BrandStory.jsx';
import { FacialTreatment } from '../components/FacialTreatment.jsx';
import { Header } from '../components/Header.jsx';
import { Hero } from '../components/Hero.jsx';
import { ServiceList } from '../components/ServiceList.jsx';
import { SuitRentalAside } from '../components/SuitRentalAside.jsx';
import { VisualGallery } from '../components/VisualGallery.jsx';
import { WhatsAppBooking } from '../components/WhatsAppBooking.jsx';
import { getBarbershopData } from '../services/barbershopService.js';

const barbershopData = getBarbershopData();

export function HomePage() {
  const { business, services } = barbershopData;

  return (
    <>
      <Header />
      <main>
        <Hero business={business} />
        <BrandStory />
        <VisualGallery />
        <ServiceList services={services} />
        <FacialTreatment business={business} />
        <SuitRentalAside business={business} />
        <WhatsAppBooking business={business} />
      </main>
      <footer className="developer-footer" aria-label="Marca de desarrollo">
        <span className="developer-footer-mark">CO</span>
        <span>Desarrollado por Carlos Otero</span>
      </footer>
    </>
  );
}
