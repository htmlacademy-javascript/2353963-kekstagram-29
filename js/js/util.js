const MESSAGE_SHOW_TIME = 5000;

const showMessage = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.zIndex = '100';
  messageContainer.style.position = 'absolute';
  messageContainer.style.left = '0';
  messageContainer.style.top = '0';
  messageContainer.style.right = '0';
  messageContainer.style.padding = '10px 3px';
  messageContainer.style.fontSize = '10px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.backgroundColor = 'red';

  messageContainer.textContent = message;

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_SHOW_TIME);
};
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
// Функция 1  проверки длины строки
const controlStringLenght = (str,length)=>str.length <= length;

export {controlStringLenght,showMessage,debounce};
