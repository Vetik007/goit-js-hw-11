import axios from 'axios';
export { pixabayApi };

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35589218-e17029eed62d760fa1b6c3d84';

async function pixabayApi(query, page, perPage) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        q: query,
        page: page,
        per_page: perPage,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: ' true',
        key: API_KEY,
      },
    });

    // console.log(response.data)
    return response;
  } catch (error) {
    console.log(error);
  }
}
