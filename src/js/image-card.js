import { buildImgCard } from './elements';

class ImageCard {
  constructor(title, date_taken, url, dimensions) {
    this.title = title;
    this.date = date;
    this.url = url;
    this.height = dimensions.height;
    this.width = dimensions.width;
    this.loaded = false;
    this.overfowing = true;
    this.element = buildImgCard(title, date_taken, url, this.onLoad);
  }

  onLoad(event) {
    this.loaded = true;
  }

}
