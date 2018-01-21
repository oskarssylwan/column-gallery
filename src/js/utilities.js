import options from './gallery/options';
const gallery = document.querySelector(`#${options.galleryId}`);


export const fetch = (url, callback, onError) => {
  const script = document.createElement('script');
  window.jsoncallback = callback;
  script.src = url + '&jsoncallback=jsoncallback';
  script.onerror = () => onError();
  gallery.appendChild(script);
}


// Divides an array into the specefied number of chunks
export const chunkify = (array, nChunks) => {
  const length = Math.floor(array.length / nChunks);
  let arrayCopy = array.slice(0);
  let output = [];

  if (nChunks === 1) return [arrayCopy];
  else {
    while ( nChunks > 0 ) {
      output.push(arrayCopy.splice(0, length));
      nChunks -= 1;
    }

    // Handle trailing items
    if (arrayCopy.length) {
      let index = 0;
      while (arrayCopy.length) {
        output[index].push(arrayCopy.shift(0, 1));
        index += 1;
      }
    }

    return output;
  }
}
