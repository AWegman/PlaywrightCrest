// API helper for consistent base URLs
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://backend:5000/api';

export const fetchAPI = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API Error: ${response.status}`);
  }

  return response.json();
};

export const getWedstrijden = () => fetchAPI('/wedstrijden');
export const createWedstrijd = (data) => fetchAPI('/wedstrijden', { method: 'POST', body: JSON.stringify(data) });
export const updateWedstrijd = (id, data) => fetchAPI(`/wedstrijden/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteWedstrijd = (id) => fetchAPI(`/wedstrijden/${id}`, { method: 'DELETE' });
