import axios from 'axios';
import './defaults-api.js'; 


export async function fetchDessertById(id) {
  const response = await axios.get(`desserts/${id}`);
  return response.data;
}