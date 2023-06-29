import {PHOTO_DESCRIPTIONS,MESSAGES,NAMES,PHOTOS_COUNT,getRandomInteger,createRandomIdFromRangeGenerator,createComment,createPhotoDescription} from './util.js';

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomDescriptionId = createRandomIdFromRangeGenerator(1, 25);
const createRandomPhotoId = createRandomIdFromRangeGenerator(1, 25);
const createRandomCommentId = createRandomIdFromRangeGenerator(1, 1000);
const photos = Array.from({length: PHOTOS_COUNT}, createPhotoDescription);
