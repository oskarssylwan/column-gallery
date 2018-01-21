// Gallery specific
import galleryOptions from './gallery/options';
import Gallery from './gallery/gallery';

// Needed for flickr integration
import { fetch } from './utilities';
import flickrOptions from './flickr-options';
import { buildDataObjects } from './flickr-utilities';



// Runtime
const gallery = new Gallery(galleryOptions);
const url = buildUrl();
const searchInput = document.querySelector('.header-search input');

searchInput.addEventListener('change', (e) => search(e));

// Default show
fetch(url, (flickrData) => {
  const imgData = buildDataObjects(flickrData);
  gallery.populate(imgData);
}, onError);




// Functions
function buildUrl(category) {
  const searchTerm = category ? `&tags=${category}` : `&id=${flickrOptions.userId}`;
  return flickrOptions.flickrApi + searchTerm;
}

function onError() {
  console.log('Failed to fetch images');
  gallery.onError('Whoops, something went wrong!');
}

function search(event) {
  const value = event.target.value;
  if (value.length > 3 ) {
    fetch(buildUrl(value), (flickrData) => {
      const imgData = buildDataObjects(flickrData);
      gallery.populate(imgData);
    }, onError);
  }
}
