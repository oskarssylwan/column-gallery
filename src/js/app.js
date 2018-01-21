// Imports
import config from '../config';
import Gallery from './gallery';
import { fetch, buildDataObjects } from './utilities';

const url = config.flickrApi + `&tags=${config.category}`;
const gallery = new Gallery(config);

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
