import Notiflix from 'notiflix';

const BASE_URL = 'https://api.github.com/search';

export function fetchRepository(name) {
  return fetch(`${BASE_URL}/repositories?q=${name}`)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Не найден репозиторий с таким названием');
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch(console.error);
}
