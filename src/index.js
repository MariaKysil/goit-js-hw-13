import './sass/main.scss';
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetchImages';
import imageTemplate from './templates/picture-card.hbs';

const refs = {
  searchFormRef: document.querySelector('#search-form'),
  inputRef: document.querySelector('.input'),
  galleryRef: document.querySelector('.gallery'),
  loadMoreBtnRef: document.querySelector('.load-more'),
};

refs.searchFormRef.addEventListener('submit', onSubmit);
refs.loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClick);

let page = 1;

function onSubmit(event) {
  event.preventDefault();

  page = 1;

  onRefreshPage();

  fetchImages(refs.inputRef.value, page).then(value => {
    if (value.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${value.totalHits} images.`);
    refs.loadMoreBtnRef.classList.remove('hidden');
    refs.galleryRef.innerHTML = imageTemplate(value);
  });
}

function onLoadMoreBtnClick() {
  page = +1;

  fetchImages(refs.inputRef.value, page)
    .then(value => refs.galleryRef.insertAdjacentHTML('beforeend', imageTemplate(value)))
    .catch(error => {
      refs.loadMoreBtnRef.classList.add('hidden');
      Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
    });
}

function onRefreshPage(image) {
  if (!image) {
    refs.galleryRef.innerHTML = '';
    return;
  }
}
