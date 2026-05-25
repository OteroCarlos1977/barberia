export const getBookedTimesByDate = async (date) => {
  if (!date) {
    return [];
  }

  const response = await fetch(
    `/.netlify/functions/public-appointments?date=${encodeURIComponent(date)}`,
    { cache: 'no-store' },
  );
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo consultar disponibilidad.');
  }

  return data.bookedTimes || [];
};
