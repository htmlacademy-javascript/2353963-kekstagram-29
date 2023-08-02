const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

function onDocumentKeydown(evt,cb){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    cb();
  }
}
const onSuccessDocumentClick = (evt)=>{
  evt.preventDefault();

  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
};
const onSuccesButtonClick = ()=>closeSuccessMessage();
const onCloseSuccessMessage = (evt)=>onDocumentKeydown(evt,closeSuccessMessage);
function closeSuccessMessage (){
  document.body.querySelector('.success').remove();
  document.body.removeEventListener('click',onSuccessDocumentClick);
  document.body.removeEventListener('keydown', onCloseSuccessMessage);
}
const showSuccessMessage = ()=>{
  const successBlock = successTemplate.cloneNode(true);
  document.body.append(successBlock);
  successBlock.querySelector('.success__button').addEventListener('click', onSuccesButtonClick);
  document.body.addEventListener('click',onSuccessDocumentClick);
  document.body.addEventListener('keydown',onCloseSuccessMessage);
};

const onErrorDocumentClick = (evt)=>{
  evt.preventDefault();
  if (!evt.target.closest('.error__inner')){
    closeErrorMessage();
  }
};
const onErrorButtonclick = () => closeErrorMessage();
const onCloseErrorMessage = (evt)=>onDocumentKeydown(evt,closeErrorMessage);
function closeErrorMessage (){
  document.body.querySelector('.error').remove();
  document.body.classList.remove('has-modal');
  document.body.removeEventListener('click',onErrorDocumentClick);
  document.removeEventListener('keydown', onCloseErrorMessage);
}

const showErrorMessage = ()=>{
  const errorBlock = errorTemplate.cloneNode(true);
  const errorButton = errorBlock.querySelector('.error__button');
  document.body.append(errorBlock);
  document.body.classList.add('has-modal');
  errorButton.addEventListener('click',onErrorButtonclick);
  document.body.addEventListener('keydown',onCloseErrorMessage);
  document.body.addEventListener('click',onErrorDocumentClick);

};
export{showSuccessMessage,showErrorMessage};
