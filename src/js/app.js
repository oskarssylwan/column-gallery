// Imports
import config from '../config';
import Gallery from './gallery';
import { fetch, buildDataObjects } from './utilities';


const url = config.flickrApi + `&id=${config.userId}`;
const gallery = new Gallery(config);

fetch(url, (data) => {
  console.log(buildDataObjects(data));
});
