// модуль по работе с  фотографией
const SHOWNCOMMENT = 5; //Количество коментариев видные пользователю

const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const closePhoto = document.querySelector('.big-picture__cancel');
const commentStorage = document.querySelector('.social__comments');
const commentsShownCountElement = document.querySelector('.social__comment-count');
const commentsPartCountElement = commentsShownCountElement.querySelector('.comments-part');
const commentsCountElement = commentsShownCountElement.querySelector('.comments-count');
const commentsLoad = document.querySelector('.comments-loader');
//рендерим коментарий
const createComment = (comment)=>{
  const commentObject = commentTemplate.cloneNode(true);
  commentObject.querySelector('.social__picture').src = comment.avatar;
  commentObject.querySelector('.social__picture').alt = comment.name;
  commentObject.querySelector('.social__text').textContent = comment.message;
  return commentObject;
};
//функция по отображению комментария
const renderComments = (comments) => {
  let commentShown = 0;
  return ()=> {
    commentShown += SHOWNCOMMENT;
    if(commentShown >= comments.length){
      commentsLoad .classList.add('hidden');
      commentShown = comments.length;
    } else {
      commentsLoad .classList.remove('hidden');
    }
    const listFragment = document.createDocumentFragment();
    for(let i = 0; i < commentShown;i++){
      const comment = createComment(comments[i]);
      listFragment.appendChild(comment);
    }
    commentStorage.innerHTML = '';
    commentStorage.appendChild(listFragment);
    commentsPartCountElement.textContent = commentShown;
    commentsCountElement.textContent = comments.length;
  };
};

const renderBigPicture = (item) => {
  bigPicture.querySelector('.big-picture__img img').src = item.url;
  bigPicture.querySelector('.big-picture__img img').alt = item.description;
  bigPicture.querySelector('.likes-count').textContent = item.likes;
  bigPicture.querySelector('.comments-count').textContent = item.comments.length;
  bigPicture.querySelector('.social__caption').textContent = item.description;
  const onCommentsLoaderClick = renderComments(item.comments);
  //Заполняем коментарий
  commentStorage.comments = onCommentsLoaderClick(item.comments);
  commentsLoad .addEventListener('click',onCommentsLoaderClick);
};
const hideBigPicture = () =>{
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown',onDocumentKeydown);
};
function onDocumentKeydown(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const openBigPicture = ()=>{
  bigPicture.classList.remove('hidden');
  commentsShownCountElement.classList.remove('hidden');
  commentsCountElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',onDocumentKeydown);
};
closePhoto.addEventListener('click',() => {
  hideBigPicture();
});

export{renderBigPicture,bigPicture,openBigPicture,renderComments};

//модуль по изменению масштаба изображения
const STEP = 25;
const MIN = 25;
const MAX = 100;
const START = 100;

const loadElement = document.querySelector('.img-upload');
const lessenBtnElement = loadElement.querySelector('.scale__control--smaller');
const raisingBtnElement = loadElement.querySelector('.scale__control--bigger');
const scaleElement = loadElement.querySelector('.scale__control--value');
const imgElement = loadElement.querySelector('.img-upload__preview img');

const scaleImg = (value)=>{
  scaleElement.value = `${value}%`;
  imgElement.style.transform = `scale(${value / 100})`;
};
const onlessenBtnClick = ()=>{
  const parseValue = parseInt(scaleElement.value, 10);
  let newValue = parseValue - STEP;
  if (newValue < MIN) {
    newValue = MIN;
  } else {
    scaleImg(newValue);
  }

};

const onraisingBtnClick = ()=>{
  const parseValue = parseInt(scaleElement.value, 10);
  let newValue = parseValue + STEP;
  if (newValue > MAX) {
    newValue = MAX;
  } else {
    scaleImg(newValue);
  }
};
const resetScale = () =>scaleImg(START);

const initScaleElement = ()=>{
  resetScale();
  lessenBtnElement.addEventListener('click',onlessenBtnClick);
  raisingBtnElement.addEventListener('click',onraisingBtnClick);
};
export{resetScale,initScaleElement};

