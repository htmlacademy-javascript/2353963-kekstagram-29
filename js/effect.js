const PHOTO_EFFECTS = [
  {
    name : 'chrome',
    style : 'grayscale',
    min : 0 ,
    max : 1,
    step : 0.1,
    unit : '',
  },
  {
    name : 'sepia',
    style : 'sepia',
    min : 0,
    max : 1,
    step : 0.1,
    unit : '',
  },
  {
    name : 'marvin',
    style : 'invert',
    min : 0,
    max : 100,
    step : 1,
    unit : '%',
  },
  {
    name : 'phobos',
    style : 'blur',
    min : 0,
    max : 3,
    step : 0.1,
    unit : 'px',
  },
  {
    name : 'heat',
    style : 'brightness',
    min : 1,
    max : 3,
    step : 0.1,
    unit : '',
  },
  {
    name : 'none',
    style : 'none',
    min : 0 ,
    max : 100 ,
    step : 1,
    unit : '',
  },
];
const BEGIN_EFFECT = PHOTO_EFFECTS[0];
let chosenEffect = BEGIN_EFFECT;
const imgPreview = document.querySelector('.img-upload__preview img');
const effectPhoto = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

const renderSlider = () => sliderContainerElement.classList.remove('hidden');
const hideSlider = () => sliderContainerElement.classList.add('hidden');
const isStartValue = () => chosenEffect === BEGIN_EFFECT;

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isStartValue()){
    hideSlider();
  } else {
    renderSlider();
  }
};
const onEffectsChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = PHOTO_EFFECTS.find((effect) => effect.name === evt.target.value);
  imgPreview.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: BEGIN_EFFECT.min,
      max: BEGIN_EFFECT.max,
    },
    start: BEGIN_EFFECT.max,
    step: BEGIN_EFFECT.step,
    connect: 'lower',
  });
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imgPreview.style.filter = isStartValue()
    ? BEGIN_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = BEGIN_EFFECT;
  updateSlider();
};

const setEffectsSlider = () => {
  initSlider();
  hideSlider();
  effectPhoto.addEventListener('change', onEffectsChange);
  sliderElement.noUiSlider.on('update', onSliderUpdate);

};

const destroySlider = ()=>{
  sliderElement.noUiSlider.destroy();
  effectPhoto.removeEventListener('change', onEffectsChange);
};

export {resetEffects, setEffectsSlider,destroySlider};
