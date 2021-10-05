const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '6c2f4e818547b954af48e18d8c29be92';

function fetchApi(searchAPI) {
  return fetch(`${BASE_URL}/${searchAPI}api_key=${API_KEY}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Не найдено такой страницы`));
  });
}

const movieApi = { fetchApi };

export default movieApi;
