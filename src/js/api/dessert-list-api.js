import axios from 'axios';
import './defaults-api.js';

export async function fetchDesserts({ page, limit, category } = {}) {
  const params = { page, limit };

  if (category) {
    params.category = category;
  }

  const { data } = await axios.get('desserts', { params });

  return data;
}
