import config from '../config';
const gallery = document.querySelector(`#${config.galleryId}`);


export const fetch = (url, callback) => {
  const script = document.createElement('script');
  window.jsoncallback = callback;
  script.src = url + '&jsoncallback=jsoncallback';
  gallery.appendChild(script);
}
