const TOKEN_KEY = 'emape-admin-token';

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'No se pudo completar la operación.');
  }

  return data;
};

export const getAdminToken = () => window.sessionStorage.getItem(TOKEN_KEY);

export const saveAdminToken = (token) => {
  window.sessionStorage.setItem(TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  window.sessionStorage.removeItem(TOKEN_KEY);
};

export const loginAdmin = async ({ username, password }) => {
  const data = await requestJson('/.netlify/functions/admin-login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  saveAdminToken(data.token);
  return data;
};

export const getAdminAppointments = async (date) => {
  const data = await requestJson(`/.netlify/functions/admin-appointments?date=${date}`, {
    headers: {
      Authorization: `Bearer ${getAdminToken()}`,
    },
  });
  return data.appointments;
};

export const createAdminAppointment = async (appointmentData) => {
  await requestJson('/.netlify/functions/admin-appointments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAdminToken()}`,
    },
    body: JSON.stringify(appointmentData),
  });
};

export const deleteAdminAppointment = async (id) => {
  await requestJson('/.netlify/functions/admin-appointments', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAdminToken()}`,
    },
    body: JSON.stringify({ id }),
  });
};
