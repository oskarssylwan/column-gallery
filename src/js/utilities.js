import options from './gallery/options';
const gallery = document.querySelector(`#${options.galleryId}`);

export const fetchAsJSONP = (url, callback, onError) => {
  const script = document.createElement('script');
  window.jsoncallback = callback;
  script.src = url + '&jsoncallback=jsoncallback';
  script.onerror = () => onError();

  script.addEventListener('load', () => {
     gallery.removeChild(script)
   });

   gallery.appendChild(script);
}
