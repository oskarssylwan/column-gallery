const config = {
  flickrApi: 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=cats',
  galleryId: 'image-gallery',
  gallery: document.querySelector(`#${this.galleryId}`)
}

export default config;
