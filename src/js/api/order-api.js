import axios from 'axios';
import './defaults-api.js';

export async function createOrder(formData) {
  const response = await axios.post(
    'orders',
    formData
  );

  return response.data;
}