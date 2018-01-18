// Imports
import config from '../config';
import Gallery from './gallery';
import { chunkify } from './utilities';


const gallery = new Gallery(config);
gallery.getImages();
