import axios from 'axios';
import './defaults-api.js';

export async function fetchDessertCategories() {
  const { data } = await axios.get('categories');

  return data;
}
