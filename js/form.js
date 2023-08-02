import {controlStringLenght } from './util.js';
import{resetEffects,setEffectsSlider,destroySlider} from './effect.js';
import { initScaleElement,resetScale } from './big-picture.js';
import { showSuccessMessage,showErrorMessage } from './messages.js';
import { sendData } from './data.js';

const TAGSCOUNT = 5;
const MAX_HASHTAG_LENGTH = 19;

const imgUploadInputField = document.querySelector('.img-upload__input');
const imgUploadForm = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const closeimgButton = document.querySelector('.img-upload__cancel');
const commentsField = uploadForm.querySelector('.text__description');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const submitFormButton = document.querySelector('.img-upload__submit');

//функция по проверке длины комментариев
const validateComments = (str)=>controlStringLenght(str,140);
//функция преобразования строки ввода хэштегов в массив

//создание объекта библиотеки pristine
const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});
const convertHashtagString = (str)=> str?.toLowerCase().split(' ').filter((tag) => tag !== '');

//использование библиотеки Pristine
//проверка хэш-тегов
const validateCountHashtags = (tags) =>convertHashtagString(tags).length <= TAGSCOUNT;//проверка на количество хэштегов
const validateRegexHashtags = (tags) =>{
  if (tags === '') {
    return true;
  }
  const regex = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_LENGTH}}$`, 'i'); //рег-ное выражение
  const convertStr = convertHashtagString(tags);
  return convertStr.every((tag) =>(regex.test(tag)));
};//проверка на регулярное выражение
const validateUnickHashtags = (tags) =>{
  const toLowerCase = convertHashtagString(tags).map((tag)=>tag.toLowerCase());
  return toLowerCase.length === new Set(toLowerCase).size;
};
pristine.addValidator(
  hashtagsField,
  validateCountHashtags,
  '!!!введёно неверное количество хэштегов',
  3,
  true);
pristine.addValidator(
  hashtagsField,
  validateRegexHashtags,
  '!!!введён невалидный  хэштег',
  2,
  true);
pristine.addValidator(
  hashtagsField,
  validateUnickHashtags,
  '!!!введён не уникальный хэштег',
  1,
  true);
//проверка комментариев
pristine.addValidator(
  commentsField,
  validateComments,
  'Введите от 0 до 140 символов',true
);
const blockSubmitButton = () => {
  submitFormButton.disabled = true;
  submitFormButton.textContent = 'Отправляю данные...';
};
const unblockSubmitButton = () => {
  submitFormButton.disabled = false;
  submitFormButton.textContent = 'Опубликовать';
};

//нажатие кнопки отправыки формы
const setOnFormSubmit = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      cb(new FormData(uploadForm));
    }
  });
};
//закрытие формы для выбора фотографии
const hideNewPhoto = ()=>{
  imgUploadForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown',onDocumentKeydown);
  uploadForm.reset();
  resetScale();
  resetEffects();
  destroySlider();
  pristine.reset();
};
//отрытие формы для выбора фотографии
const openNewPhoto = ()=>{
  imgUploadForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',onDocumentKeydown);
  initScaleElement();
  setEffectsSlider();
  setOnFormSubmit(async (data) => {
    try {
      //installForm();
      await sendData(data);
      hideNewPhoto();
      showSuccessMessage();
    } catch {
      showErrorMessage();
    } finally {
      unblockSubmitButton();
    }
  });
};

function onDocumentKeydown(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideNewPhoto();
  }
}


const onOpenButton = ()=>openNewPhoto();
const onCloseButton = ()=>hideNewPhoto();
//установка параметров формы
const installForm = ()=>{
  //изменение поля  для выбора нового фото
  imgUploadInputField.addEventListener('change',onOpenButton);
  closeimgButton.addEventListener('click',onCloseButton);
  pristine.addValidator(hashtagsField,
    validateUnickHashtags,
    '!!!введён не уникальный хэштег');
};

//отмена esc в момент нахождения фокуса в поле комментариев
commentsField.addEventListener('keydown',(evt)=>{
  if(evt.key === 'Escape'){
    evt.stopPropagation();
  }
});
hashtagsField.addEventListener('keydown',(evt) => {
  if(evt.key === 'Escape'){
    evt.stopPropagation();
  }
});
export {installForm,setOnFormSubmit,unblockSubmitButton,hideNewPhoto};
