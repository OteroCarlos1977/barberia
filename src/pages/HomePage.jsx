import { useState } from 'react';
import { AdminAccess } from '../components/AdminAccess.jsx';
import { BrandStory } from '../components/BrandStory.jsx';
import { BookingForm } from '../components/BookingForm.jsx';
import { FeaturedPhrase } from '../components/FeaturedPhrase.jsx';
import { Header } from '../components/Header.jsx';
import { Hero } from '../components/Hero.jsx';
import { ServiceList } from '../components/ServiceList.jsx';
import { SuitRentalAside } from '../components/SuitRentalAside.jsx';
import { VisualGallery } from '../components/VisualGallery.jsx';
import { getBarbershopData } from '../services/appointmentService.js';
import { useAppointments } from '../hooks/useAppointments.js';

const barbershopData = getBarbershopData();

export function HomePage() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { addAppointment } = useAppointments();
  const { business, services, availableTimes } = barbershopData;

  return (
    <>
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />
      <main>
        <Hero business={business} />
        <BrandStory />
        <VisualGallery />
        {/*<FeaturedPhrase />} */}
        <ServiceList services={services} />
        <SuitRentalAside business={business} />
        <BookingForm
          availableTimes={availableTimes}
          onCreateAppointment={addAppointment}
        />
        <AdminAccess
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          availableTimes={availableTimes}
        />
      </main>
    </>
  );
}
