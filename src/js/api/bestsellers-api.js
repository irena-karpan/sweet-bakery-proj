import axios from 'axios';
import './defaults-api.js';


export async function fetchPopularProducts() {
  const response = await axios.get('desserts', {
    params: {
      page: 1,
      limit: 8,
      type: 'popular',
    },
  });

  return response.data.desserts;
}
