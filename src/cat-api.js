import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_9u5QpC4NxpomidpSAlS0IFoGq1b3u4qwFmbV3vpLSfx5DqvaONCUjNRuVhwZgJYT';

function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then(({ data }) => data);
}
function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(({ data }) => data);
}
export { fetchBreeds, fetchCatByBreed };
