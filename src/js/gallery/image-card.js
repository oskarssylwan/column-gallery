import { buildImgCard } from './elements';

class ImageCard {
  constructor(title, date_taken, url, link, dimensions, onLoad) {
    this.title = title;
    this.date_taken = date_taken;
    this.url = url;
    this.link = link;
    this.height = dimensions.height;
    this.width = dimensions.width;
    this.loaded = false;
    this.overfowing = true;
    this.element = buildImgCard(title, date_taken, url, link, this.onLoad.bind(this));
    this.onLoadProp = onLoad;
  }

  onLoad(event) {
    this.loaded = true;
    this.element.classList.remove('oskw-hidden');
    if (this.onLoadProp) this.onLoadProp();
  }

}

export default ImageCard;
