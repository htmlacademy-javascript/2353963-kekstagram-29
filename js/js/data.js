const URL = 'https://29.javascript.pages.academy/kekstagram';
const Methods = {
  GET:'GET',
  POST:'POST',
};
const Direction = {
  GET_DATA:'/data',
  SEND_DATA:'/',
};
const ErrorText = {
  GET_DATA: 'К сожалению данные не загрузились! Попробуйте обновить страницу.',
  SEND_DATA: 'Ошибка, Форма не отправлена! Попробуйте еще раз.',
};
const uploadData = (route, errText, method = Methods.GET, body = null) =>
  fetch(`${URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errText);
    });

const getData = () => uploadData(Direction.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => uploadData(Direction.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };


