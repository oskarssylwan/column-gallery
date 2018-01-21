// Imports
import galleryOptions from './gallery/options';
import flickrOptions from './flickr-options';
import Gallery from './gallery/gallery';
import { fetch, buildDataObjects } from './utilities';

const url = flickrOptions.flickrApi + `&tags=${flickrOptions.userId}`;
const gallery = new Gallery(galleryOptions);

fetch(url, (flickrData) => {
  console.log(flickrData);
  const imgData = buildDataObjects(flickrData);
  gallery.populate(imgData);
}, onError);



// Functions

function onError() {
  console.log('Failed to fetch images');
  gallery.onError('Whoops, something went wrong!')
}
