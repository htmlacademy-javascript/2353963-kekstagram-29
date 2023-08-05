import { renderPosts } from './render-posts.js';
import { debounce } from './util.js';
const PICTURES_NOMBER = 10;
const TIMEOUT = 500;

const filterForm = document.querySelector('.img-filters__form');
const imgFilters = document.querySelector('.img-filters');

const startFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
const filterButtons = document.querySelectorAll('.img-filters__button');

const removePictures = () =>
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());


const showFilters = () => imgFilters.classList.remove('img-filters--inactive');
const sortPictures = (pictures, sortButton) => {

  if (sortButton === startFilter) {
    return pictures;
  }

  if (sortButton === randomFilter) {
    return pictures.slice().sort(() => Math.random() - 0.5).slice(0, PICTURES_NOMBER);
  }

  if (sortButton === discussedFilter) {
    return pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  }
};

const setOnFilterClick = (filterButton, pictures) => {
  removePictures();
  renderPosts(sortPictures(pictures, filterButton));
};

const removeDebounce = (pictures) => {
  filterForm.addEventListener('click', (evt) => {
    filterButtons.forEach((button) =>{
      button.classList.remove('img-filters__button--active');
    }
    );
    const filterButton = evt.target;
    filterButton.classList.add('img-filters__button--active');

    debounce(() => {
      setOnFilterClick(filterButton, pictures);
    }, TIMEOUT)();
  });
};
export { removeDebounce, showFilters };
