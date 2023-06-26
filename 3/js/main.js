const PHOTO_DESCRIPTIONS = [
  'Пейзаж',
  'Дорогая машина',
  'Страх',
  'Рабочий стол',
  'Озеро',
  'Морской закат',
  'Дом'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];

const NAMES = [
  'Костя',
  'Олег',
  'Михаил',
  'Мурат',
  'Александр',
  'Кристина',
  'Владимир',
  'Петр'
];

const PHOTOS_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomDescriptionId = createRandomIdFromRangeGenerator(1, 25);
const createRandomPhotoId = createRandomIdFromRangeGenerator(1, 25);
const createRandomCommentId = createRandomIdFromRangeGenerator(1, 1000);

const createComment = () => ({
  id: createRandomCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: createRandomDescriptionId(),
  url: `photos/${createRandomPhotoId()}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

const photos = Array.from({length: PHOTOS_COUNT}, createPhotoDescription);
