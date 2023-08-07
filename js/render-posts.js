import{renderBigPicture,openBigPicture} from './big-picture.js';
const picContainer = document.querySelector('.pictures');
const picTemplate = document.querySelector('#picture').content.querySelector('.picture');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const previewBigImg = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
const previewEffects = form.querySelectorAll('.effects__preview');

const renderPosts = (pictures) =>{
  const listFragment = document.createDocumentFragment();
  pictures.forEach((item) =>{
    const picElement = picTemplate.cloneNode(true);
    picElement.querySelector('.picture__img').src = item.url;
    picElement.querySelector('.picture__img').alt = item.description;
    picElement.querySelector('.picture__likes').textContent = item.likes;
    picElement.querySelector('.picture__comments').textContent = item.comments.length;

    picElement.addEventListener('click', (evt) => {
      openBigPicture(picElement);
      evt.preventDefault();
      renderBigPicture(item);
    });
    listFragment.appendChild(picElement);
  });
  picContainer.appendChild(listFragment);
};

const setPreviewPictureLoader = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewBigImg.src = URL.createObjectURL(file);
      previewEffects.forEach((preview) =>{
        preview.style.backgroundImage = `url(${previewBigImg.src})`;
      });
    }

  });
};

export {setPreviewPictureLoader,renderPosts};
