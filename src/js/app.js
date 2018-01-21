// Imports
import config from '../config';
import Gallery from './gallery';
import { fetch, buildDataObjects } from './utilities';


const url = config.flickrApi + `&id=${config.userId}`;
const gallery = new Gallery(config);

fetch(url, (flickrData) => {
  const imgData = buildDataObjects(flickrData);
  gallery.populate(imgData);
}, onError);


// Functions

function onError() {
  console.log('Failed to fetch images');
  gallery.onError('Whoops, something went wrong!')
}
