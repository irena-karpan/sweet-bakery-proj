import axios from 'axios';

export async function createOrder(formData) {
  const response = await axios.post(
    'https://deserts-store.b.goit.study/api/orders',
    formData
  );

  return response.data;
}