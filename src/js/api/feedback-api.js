import axios from 'axios';
import './defaults-api.js';

export async function fetchFeedbacks() {
  const response = await axios.get('feedbacks', {
    params: {
      page: 1,
      limit: 10,
    },
  });

  return response.data.feedbacks;
}