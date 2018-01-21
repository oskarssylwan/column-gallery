// Imports
import galleryOptions from './gallery/options';
import flickrOptions from './flickr-options';
import Gallery from './gallery/gallery';
import { fetch } from './utilities';
import { buildDataObjects } from './flickr-utilities';

// Global Variables
const url = flickrOptions.flickrApi + `&id=${flickrOptions.userId}`;
const gallery = new Gallery(galleryOptions);

// Runtime
fetch(url, (flickrData) => {
  const imgData = buildDataObjects(flickrData);
  gallery.populate(imgData);
}, onError);

// Functions
function onError() {
  console.log('Failed to fetch images');
  gallery.onError('Whoops, something went wrong!');
}
