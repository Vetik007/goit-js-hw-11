import '../css/styles.css';

import Notiflix from 'notiflix';
import { pixabayApi } from './PixabayApi';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getRefs from './refs';

const refs = getRefs();

const lightbox = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.5,
  captionsData: 'alt',
  captionDelay: 250,
});

let query = '';
let page = 1;
let loadImg = 0;
const perPage = 40;

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

async function onSearchForm(e) {
  e.preventDefault();

  page = 1;
  // query = e.currentTarget.searchQuery.value.trim();
  query = refs.searchInput.value.trim();
  console.log(query);

  refs.gallery.innerHTML = '';

  refs.loadMoreBtn.classList.add('is-hidden');

  if (query === '') {
    alertEmptySearch();
    return;
  }

  try {
    const response = await pixabayApi(query, page, perPage);
    console.log(response);

    const dataResponse = response.data;
    console.log(dataResponse);

    loadImg = dataResponse.hits.length;
    console.log('first', loadImg);

    if (dataResponse.totalHits === 0) {
      alertNoImagesFound();
    } else {
      renderGallery(dataResponse.hits);
      alertImagesToFound(dataResponse);
      lightbox.refresh();
    }

    if (dataResponse.totalHits > perPage) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }

    onScroll();
  } catch (error) {
    Notiflix.Notify.failure('Ooops...Something goes wrong');
  }
}

async function onLoadMoreBtn() {
  page += 1;
  console.log('страница:', page);

  try {
    const response = await pixabayApi(query, page, perPage);

    const dataResponse = response.data;

    // const totalPages = Math.ceil(dataResponse.totalHits / perPage);
    const totalHits = dataResponse.totalHits;
    console.log('найдено картинок:', totalHits);

    loadImg += dataResponse.hits.length;
    console.log('загружено картинок', loadImg);

    renderGallery(dataResponse.hits);
    lightbox.refresh();

    if (loadImg >= totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');

      Notiflix.Report.info(
        "We're sorry, but you've reached the end of search results.",
        {
          timeout: 6000,
        }
      );
    }

    onScrollMore();
  } catch (error) {
    Notiflix.Notify.failure('Ooops...Something goes wrong');
  }
}

function renderGallery(images) {
  const galleryMarkup = images
    .map(
      ({
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
                <a class="gallery__link" href="${largeImageURL}">
                    <div class="photo-card" id="${id}">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b> ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b> ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b> ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b> ${downloads}
                        </p>
                    </div>
                </div>
                </a>
      `;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
}

function alertImagesToFound(dataResponse) {
  Notiflix.Notify.success(`Hooray! We found ${dataResponse.totalHits} images.`);
}

function alertEmptySearch() {
  Notiflix.Notify.failure('This field cannot be empty!');
}

function alertNoImagesFound() {
  Notiflix.Notify.failure(
    'No images were found for this request, try something else.'
  );
}

function onScroll() {
  window.scrollBy({
    top: 0,
    behavior: 'smooth',
  });
}

function onScrollMore() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
