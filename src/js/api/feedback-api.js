import axios from 'axios';

export async function fetchFeedbacks() {
  try {
    const response = await axios.get(
      'https://deserts-store.b.goit.study/api/feedbacks?limit=10&page=1'
    );
    return response.data.feedbacks;
  } catch (error) {
    console.error('Помилка в API відгуків:', error);
    throw error;
  }
}
