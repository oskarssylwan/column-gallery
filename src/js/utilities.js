import options from './gallery/options';
const gallery = document.querySelector(`#${options.galleryId}`);


export const fetchAsJSONP = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    window.jsoncallback = resolve
    script.src = url + '&jsoncallback=jsoncallback';
    script.onerror = () => reject();

    script.addEventListener('load', () => {
       gallery.removeChild(script)
     });

     gallery.appendChild(script);
  });
}
