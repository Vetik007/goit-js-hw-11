import '../css/styles.css';
import { pixabayApi } from './serviseApi';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  endOfSearchText: document.querySelector('.gallery__text'),
  searchInput: document.querySelector('.input-form'),
};

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
  refs.endOfSearchText.classList.add('is-hidden');

  if (query === '') {
    alertEmptySearch();
    return;
  }

  // pixabayApi(query, page, perPage)
  //     .then(({data}) => {
  //         if (data.totalHits === 0) {
  //             alertNoImagesFound();
  //         } else {
  //             renderGallery(data.hits);
  //             alertImagesToFound(data);
  //             simpleLightBox = new SimpleLightbox('.gallery a').refresh();
  //         }

  //         if (data.totalHits > perPage) {
  //             loadMoreBtn.classList.remove('is-hidden');
  //         }
  //     }
  // )
  //     .catch(error => console.log(error));

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

      // const simpleLightBox = new SimpleLightbox('.gallery a').refresh();
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

  // pixabayApi(query, page, perPage)
  //     .then(({ data }) => {
  //         const totalPages = Math.ceil(data.totalHits / perPage);

  //         if (page > totalPages) {
  //             loadMoreBtn.classList.add('is-hidden');
  //             alertEndOfSearch();
  //         } else {
  //             renderGallery(data.hits);
  // lightbox.refresh();

  //             simpleLightbox = new SimpleLightbox('.gallery a').refresh();
  //         }

  //     })
  //     .catch(error => console.log(error));

  try {
    const response = await pixabayApi(query, page, perPage);
    // const response = await pixabayApi.fetchPhotosByQuery();
    const dataResponse = response.data;
    // const totalPages = Math.ceil(dataResponse.totalHits / perPage);
    const totalHits = dataResponse.totalHits;
    loadImg += dataResponse.hits.length;
    // console.log('second', loadImg)

    renderGallery(dataResponse.hits);
    lightbox.refresh();

    // const simpleLightbox = new SimpleLightbox('.gallery a').refresh();

    if (loadImg === totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.endOfSearchText.classList.remove('is-hidden');
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
