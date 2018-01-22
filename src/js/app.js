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
const form = document.querySelector('.header-search form');
const searchInput = document.querySelector('.header-search input');

form.addEventListener('submit', (e) => search(e));

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
  event.preventDefault();
  console.log('submiting?');
  const value = searchInput.value;
  if (value.length > 3 ) {
    fetch(buildUrl(value), (flickrData) => {
      const imgData = buildDataObjects(flickrData);
      gallery.populate(imgData);
    }, onError);
  }
}
