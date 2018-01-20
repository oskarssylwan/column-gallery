import config from '../config';
const gallery = document.querySelector(`#${config.galleryId}`);


export const fetch = (url, callback) => {
  const script = document.createElement('script');
  window.jsoncallback = callback;
  script.src = url + '&jsoncallback=jsoncallback';
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

// ==================================
// flickr specific utility functions
// =================================

export const buildDataObjects = (flickrData) => {
  return flickrData.items.map(item => {
    return {
      title: item.title,
      date_taken: formatDate(item.date_taken),
      url: item.media.m,
      dimensions: extractDimensions(item.description)
    }
  })
}

export const extractDimensions = (string) => {
  let height = string.match(/height="\d+"/i)[0].match(/\d+/g)[0];
  let width = string.match(/width="\d+"/i)[0].match(/\d+/g)[0];
  height = parseInt(height);
  width = parseInt(width);
  return { width, height };
}

export const formatDate = (string) => {
  const formatedDate = string.match(/\d{4}-\d{2}-\d{2}/i)[0]
                             .replace(/-/g, ' / ');
  return formatedDate;
}
