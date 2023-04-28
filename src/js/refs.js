export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    endOfSearchText: document.querySelector('.gallery__text'),
    searchInput: document.querySelector('.input-form'),
  };
}
