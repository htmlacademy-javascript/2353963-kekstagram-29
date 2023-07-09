const picture = document.querySelector('#picture').content;
 const PictureContainer = document.querySelector('.pictures');

 const createPictures = function(url, description, likes, comments){
   const pictureElement = picture.cloneNode(true);
   const pictureImg = pictureElement.querySelector('.picture__img');

   pictureImg.src = url;
   pictureImg.alt = description;
   pictureElement.querySelector('.picture__likes').textContent = likes;
   pictureElement.querySelector('.picture__comments').textContent = comments.length;

   return pictureElement;
 };

 const renderPictures = function(pictures){
   const picturesFragment = document.createDocumentFragment();

   pictures.forEach((picture) => {
     picturesFragment.append(createPictures(picture));
   });

   PictureContainer.appendChild(picturesFragment);
 };
 renderPictures(createArrayOfPhotos());
 export {renderPictures};
