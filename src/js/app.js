// Imports
import config from '../config';
import Gallery from './gallery';


const gallery = new Gallery(config);
gallery.getImages();
// gallery.gallery.addEventListener('onresize', () => console.log('hello'));
// window.onresize = () => console.log("hello");


// buildImg('https://images.unsplash.com/photo-1505356212111-7ac1beb0c506?auto=format&fit=crop&w=934&q=80');

// content.appendChild(buildImg('https://images.unsplash.com/photo-1505356212111-7ac1beb0c506?auto=format&fit=crop&w=934&q=80'))
