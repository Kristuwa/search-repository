import Notiflix from 'notiflix';

const BASE_URL = 'https://api.github.com/search';

export function fetchRepository(name) {
  return fetch(
    `${BASE_URL}/repositories?q=${name}&sort=stars&order=desc&per_page=100` //выставила 100, чтоб при фильтрации по имени нашло больше совпадений
  )
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Не найден репозиторий с таким названием');
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch(console.error);
}
