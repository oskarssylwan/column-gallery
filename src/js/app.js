// Imports
import config from '../config';
import { fetch } from './utilities';

// Elements
// const gallery = document.querySelector(`#${config.galleryId}`);

const hello = function(data) {
  console.log(data);
}

fetch(config.flickrApi, hello)
