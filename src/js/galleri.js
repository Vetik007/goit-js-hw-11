// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import Notiflix from 'notiflix';
// import createGalleryCards from '../templates/gallery-cards.hbs';

// import { PixabayAPI } from './PixabayAPI';

// // ==================================================================

// const pixabayApi = new PixabayAPI();

// const form = document.querySelector('#search-form');
// const galleryCard = document.querySelector('.gallery');
// const searchInput = document.querySelector('.input-form');
// const loadButton = document.querySelector('.load-more');

// form.addEventListener('submit', onSearchFormSubmit);
// loadButton.addEventListener('click', onNextPage);

// onRenderPage();

// // var lightbox = new SimpleLightbox('.gallery a', {
// //   /* options */
// // });

// let lightbox = new SimpleLightbox('.gallery a', {
//   overlayOpacity: 0.5,
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// // =======================================================
// // загрузка рамдомных изображений при первой загрузке страницы
// async function onRenderPage() {
//   try {
//     const respons = await pixabayApi.getRandomPhotos();
//     console.log(respons);

//     lightbox.refresh();

//     galleryCard.innerHTML = createGalleryCards(respons.data.hits);
//   } catch (error) {
//     console.log(error);
//   }
// }
// // ===========================================================

// async function onSearchFormSubmit(evt) {
//   evt.preventDefault();

//   // window.addEventListener('scroll', handleScroll);

//   // const inputValue = evt.currentTarget.elements['searchQuery'].value.trim();

//   const inputValue = searchInput.value.trim();

//   console.log(inputValue);

//   pixabayApi.query = inputValue;

//   if (inputValue === '') {
//     Notiflix.Notify.info('Invalid request. Please clarify your request');
//     onRenderPage();
//     return;
//   }

//   try {
//     const respons = await pixabayApi.fetchPhotosByQuery();
//     console.log(respons);

//     resetInput();

//     if (respons.data.totalHits === 0) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       resetInput();
//       onRenderPage();

//       return;
//     }
//     galleryCard.innerHTML = createGalleryCards(respons.data.hits);
//     console.log(galleryCard);

//     // simplelightbox = new SimpleLightbox('.gallery a', simpleOptions).refresh();

//     lightbox.refresh();
//     buttonUnHidden();

//     Notiflix.Notify.success(
//       `By request "${inputValue}" found ${respons.data.totalHits} images`
//     );

//     return;
//   } catch (error) {
//     console.log(error);
//   }

//   console.log(inputValue);
// }

// async function onNextPage() {
//   lightbox.destroy();
//   try {
//     const respons = await pixabayApi.fetchPhotosByQuery();
//     const totalPages = page * perPage;
//     if (result.totalHits <= totalPages) {
//       buttonHidden();
//       Notiflix.Report.info(
//         'Wow',
//         "We're sorry, but you've reached the end of search results.",
//         'Okay'
//       );
//     }
//     gallery.insertAdjacentHTML(
//       'beforeend',
//       createGalleryCards(respons.data.hits)
//     );
//     smoothScroll();
//     lightbox.refresh();

//     // simpleLightbox = new SimpleLightbox('.gallery a', optionsSL).refresh();
//   } catch (error) {
//     ifError();
//   }
// }

// function ifError() {
//   // clearAll();
//   buttonHidden();
//   Notiflix.Report.info('Oh', 'Something get wrong, please try again', 'Okay');
// }

// // function clearAll() {
// //   gallery.innerHTML = '';
// // }

// function buttonHidden() {
//   loadButton.classList.add('visually-hidden');
// }

// function buttonUnHidden() {
//   loadButton.classList.remove('visually-hidden');
// }

// function smoothScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.photo-card')
//     .firstElementChild.getBoundingClientRect();
//   window.scrollBy({
//     top: cardHeight * 3.9,
//     behavior: 'smooth',
//   });
// }

// // // Цей код дозволяє автоматично прокручувати сторінку на висоту 2 карток галереї, коли вона завантажується

// function resetInput() {
//   searchInput.value = '';
// }

// !=========================================================================

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import Notiflix from 'notiflix';
// import { createImage } from './js/createImage';
// import { fetchImages, page, perPage, resetPage } from './js/fetchImages';
// import { onTop, onScroll } from './js/buttonUp';

// const form = document.querySelector('#search-form');
// const input = document.querySelector('.search-input');
// const gallery = document.querySelector('.gallery');
// const loadButton = document.querySelector('.load-more');

// // const API_KEY = '30163635-d3ce08ab8a7984e551514dc56';

// form.addEventListener('submit', onSubmit);
// loadButton.addEventListener('click', onNextPage);

// let searchValue = '';

// const optionsSL = {
//   overlayOpacity: 0.5,
//   captionsData: 'alt',
//   captionDelay: 250,
// };
// let simpleLightbox;

// onScroll();
// onTop();

// async function onSubmit(event) {
//   event.preventDefault();
//   searchValue = input.value.trim();
//   if (searchValue === '') {
//     clearAll();
//     buttonHidden();
//     Notiflix.Notify.info('You cannot search by empty field, try again.');
//     return;
//   } else {
//     try {
//       resetPage();
//       const result = await fetchImages(searchValue);
//       if (result.hits < 1) {
//         form.reset();
//         clearAll();
//         buttonHidden();
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       } else {
//         form.reset();
//         gallery.innerHTML = createImage(result.hits);
//         simpleLightbox = new SimpleLightbox('.gallery a', optionsSL).refresh();
//         buttonUnHidden();

//         Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
//       }
//     } catch (error) {
//       ifError();
//     }
//   }
// }
// async function onNextPage() {
//   simpleLightbox.destroy();
//   try {
//     const result = await fetchImages(searchValue);
//     const totalPages = page * perPage;
//     if (result.totalHits <= totalPages) {
//       buttonHidden();
//       Notiflix.Report.info(
//         'Wow',
//         "We're sorry, but you've reached the end of search results.",
//         'Okay'
//       );
//     }
//     gallery.insertAdjacentHTML('beforeend', createImage(result.hits));
//     smoothScroll();
//     simpleLightbox = new SimpleLightbox('.gallery a', optionsSL).refresh();
//   } catch (error) {
//     ifError();
//   }
// }

// function ifError() {
//   clearAll();
//   buttonHidden();
//   Notiflix.Report.info('Oh', 'Something get wrong, please try again', 'Okay');
// }

// function clearAll() {
//   gallery.innerHTML = '';
// }

// function buttonHidden() {
//   loadButton.classList.add('visually-hidden');
// }

// function buttonUnHidden() {
//   loadButton.classList.remove('visually-hidden');
// }

// function smoothScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.photo-card')
//     .firstElementChild.getBoundingClientRect();
//   window.scrollBy({
//     top: cardHeight * 3.9,
//     behavior: 'smooth',
//   });
// }

// !=========================================================================

// async function onLoadMore() {
//   pixabayApi.page += 1;

//   try {
//     const response = await pixabayApi.fetchPhotosByQuery();
//     console.log(response);

//     const lastPage = Math.ceil(response.data.totalHits / pixabayApi.per_page);
//     console.log(lastPage);

//     createMarkup(response.data.hits);

//     lightbox.refresh();
//     autoScroll();

//     if (lastPage === pixabayApi.page) {
//       alertEndOfSearch();
//       window.removeEventListener('scroll', handleScroll);
//       return;
//     }
//   } catch (err) {
//     alertEndOfSearch();
//   }
// }

// function autoScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

// function autoScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

// function handleScroll() {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//   if (scrollTop + clientHeight >= scrollHeight - 5) {
//     onLoadMore();
//   }
// }

// console.log(fetchPhotosByQuery());

// const searchInput = document.querySelector('.search-form');
// console.log(searchInput);

// Notiflix.Report.info(
//   ' 🤟🏼 Hello my Friend!',
//   'This is my latest JS homework,enjoy looking at the photos 😜',
//   'Okay'
// );

// function qqq(page) {
//   return axios.get(
//     `https://pixabay.com/api/?key=35589218-e17029eed62d760fa1b6c3d84`,
//     {
//       params: {
//         q: 'cat',
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//       },
//     }
//   );
// }
// console.log(qqq());

// ===================================================
// ==---=-=-=-=-=-=--=================================
// ==================================================

// const pixabayApi = new PixabayAPI();
// console.log(pixabayApi);

// let lightbox = new SimpleLightbox('.gallery__link', {
//   captions: true,
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// refs.searchForm.addEventListener('submit', onRenderPage);

// async function onRenderPage(e) {
//   e.preventDefault();
//   window.addEventListener('scroll', handleScroll);

//   refs.gallery.innerHTML = '';

//   // значение поискового поля(импут)
//   const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
//   console.log(searchQuery);

//   pixabayApi.query = searchQuery;

//   pixabayApi.resetPage();
//   pixabayApi.page = 1;

//   if (searchQuery === '') {
//     alertNoEmptySearch();
//     return;
//   }

//   try {
//     const response = await pixabayApi.fetchPhotosByQuery();

//     //   количество найденых картинок
//     const totalPicturs = response.data.totalHits;
//     console.log(totalPicturs);

//     if (totalPicturs === 0) {
//       alertNoEmptySearch();
//       return;
//     }

//     createMarkup(response.data.hits);
//     lightbox.refresh();
//     autoScroll();

//     Notiflix.Notify.success(`Hooray! We found ${totalPicturs} images.`);
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function onLoadMore() {
//   pixabayApi.page += 1;

//   try {
//     const response = await pixabayApi.fetchPhotosByQuery();
//     console.log(response);

//     const lastPage = Math.ceil(response.data.totalHits / pixabayApi.per_page);
//     console.log(lastPage);

//     createMarkup(response.data.hits);

//     lightbox.refresh();
//     autoScroll();

//     if (lastPage === pixabayApi.page) {
//       alertEndOfSearch();
//       window.removeEventListener('scroll', handleScroll);
//       return;
//     }
//   } catch (err) {
//     alertEndOfSearch();
//   }
// }

// function createMarkup(hits) {
//   const markup = createGalleryCards(hits);
//   refs.gallery.insertAdjacentHTML('beforeend', markup);
//   //   console.log(markup);
// }

// function alertNoEmptySearch() {
//   Notiflix.Notify.failure(
//     'The search string cannot be empty. Please specify your search query.'
//   );
// }

// function alertEndOfSearch() {
//   Notiflix.Notify.warning(
//     "We're sorry, but you've reached the end of search results."
//   );
// }

// // Функція для бескінечного скролу
// function handleScroll() {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//   if (scrollTop + clientHeight >= scrollHeight - 5) {
//     onLoadMore();
//   }
// }

// // Цей код дозволяє автоматично прокручувати сторінку на висоту 2 карток галереї, коли вона завантажується
// function autoScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
