import './css/styles.css';
import { fetchRepository } from './fetchRepository';
import Notiflix from 'notiflix';

const refs = {
  formRef: document.querySelector('.form-search'),
  listRef: document.querySelector('.repository-list'),
  infoRef: document.querySelector('.repository-item'),
};

refs.formRef.addEventListener('submit', onFormSearchRepository);

function onFormSearchRepository(e) {
  e.preventDefault();

  const inputText = e.target.elements.text.value;
  const valueNormalized = inputText.trim().toLowerCase();

  if (valueNormalized === '') {
    refs.listRef.innerHTML = '';
    refs.infoRef.innerHTML = '';
    return;
  } else {
    fetchRepository(valueNormalized)
      .then(repositories => {
        const { items } = repositories;
        console.log(items);
        const findRepository = items.filter(({ name }) => {
          return name.toLowerCase().includes(valueNormalized);
        });
        console.log(findRepository);

        const markupList = createRepositoriesList(findRepository);
        refs.listRef.innerHTML = markupList;
        refs.infoRef.innerHTML = '';

        if (findRepository.length > 10) {
          const newListRepository = [];
          for (let i = 0; i < 10; i += 1) {
            newListRepository.push(findRepository[i]);
          }
          const markupList = createRepositoriesList(newListRepository);
          refs.listRef.innerHTML = markupList;
          refs.infoRef.innerHTML = '';
        }

        if (findRepository.length === 1) {
          refs.listRef.innerHTML = '';
          refs.infoRef.innerHTML = createRepositoryInformation(
            findRepository[0]
          );
        }

        if (findRepository.length === 0) {
          refs.listRef.innerHTML = '';
          refs.infoRef.innerHTML = '';
          Notiflix.Notify.info('Ничего не найдено');
        }
        return;
      })
      .catch(error => {
        console.log(error);
      });
  }

  refs.formRef.reset();
}

function createRepositoriesList(repositories) {
  return repositories
    .map(({ svn_url, name, description, homepage }) => {
      let homePage = `<a href='${homepage}' class="list__link-item link" target="_blank" rel='noreferrer noopener nofollow'>${homepage}</a>`;

      if (description === null || description === '') {
        description = 'Нет описания';
      }
      if (homepage === null || homepage === '') {
        homePage = 'Нет описания';
      }

      return `<li class="list__item">
		<h2 class="list__title-item">Название репозитория: <a href='${svn_url}' class="list__link-item link" target="_blank" rel='noreferrer noopener nofollow'><span class="link-text">${name}</span></a></h2>
		<p class="list__item-description"><b>Ссылка на репозиторий:</b> <a href='${svn_url}' class="list__link-item link" target="_blank" rel='noreferrer noopener nofollow'>${svn_url}</a></p>
		<p class="list__item-description"><b>Описание:</b> ${description}</p>
		<p class="list__item-item-description"><b>Домашняя страница:</b> ${homePage}</p>
		</li>`;
    })
    .join('');
}

function createRepositoryInformation({ svn_url, name, description, homepage }) {
  let homePage = `<a href='${homepage}' class="list__link-item link" target="_blank" rel='noreferrer noopener nofollow'>${homepage}</a>`;

  if (description === null || description === '') {
    description = 'Нет описания';
  }
  if (homepage === null || homepage === '') {
    homePage = 'Нет описания';
  }

  return `<div class="repository-info"><h2 class="list__title-item">Название репозитория: <a href='${svn_url}' class="list__link-item link" target="_blank" rel='noreferrer noopener nofollow'><span class="link-text">${name}</span></a></h2>
  <p class="list__item-description"><b>Ссылка на репозиторий:</b> 
  <a href='${svn_url}' class="list__link-item link" target="_blank" rel='noreferrer noopener nofollow'>${svn_url}</a></p>
		 <p class="list__item-description"><b>Описание:</b> ${description}</p>
		 <p class="list__item-description"><b>Домашняя страница:</b> ${homePage}</p></div>`;
}
