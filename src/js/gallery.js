import ElementBuilder from './elements';
import { fetch, chunkify } from './utilities';



class Gallery {
  constructor(options) {
    this.options = options;
    this.category = 'nature';
    this.userId = '66041906@N05';
    this.gallery = document.querySelector(`#${options.galleryId}`);
    this.content = document.querySelector(`#${options.galleryId} .content`);
    this.elementBuilder = new ElementBuilder();
    this.height = this.gallery.offsetHeight;
    this.width = this.gallery.offsetWidth;
    this.columns = [];
    this.images = [];
    this.prevNumberOfColumns =  0;
  }

  getImages() {
    const url = this.options.flickrApi + `&id=${this.userId}`;
    fetch(url, (data) => {
      this.images = data.items.map(item => this.elementBuilder.buildImg(item.media.m));
      this.renderColumns();
      this.toggleImageVisibility();
      window.onresize = () => {
        this.height = this.gallery.offsetHeight;
        this.width = this.gallery.offsetWidth;
        this.renderColumns();
        this.toggleImageVisibility();
      }
    });
  }

  renderColumns() {
    const numberOfColumns = Math.floor((this.width / this.options.columnMinWidth));
    const columnCountDifference = Math.abs(numberOfColumns - this.prevNumberOfColumns);
    if ( columnCountDifference > 0) {
      this.clearWrapper();
      const columns = chunkify(this.images, numberOfColumns)
                      .map(colChildren => {
                        const column = this.elementBuilder.column();
                        colChildren.forEach(child => column.appendChild(child));
                        this.content.appendChild(column);
                        return column;
                      });
      this.columns = columns;
      this.prevNumberOfColumns = numberOfColumns;
    }

  }

  toggleImageVisibility() {
    const numberOfRows = Math.floor((this.height / 200) - 1)
    this.columns.forEach(column => {
      // Array.from(column.childNodes).forEach((image, index) => image.classList.toggle('hidden',( index > numberOfRows )))
      const children = Array.from(column.childNodes);
      let imageStackHeight = 0;
      children.forEach(child => {
        imageStackHeight += child.offsetHeight;
        console.log(imageStackHeight);
        if (imageStackHeight < this.height ) {
          child.classList.remove('hidden');
        } else if (imageStackHeight ){
          child.classList.add('hidden');
        }
      });
    });
  }

  clearWrapper() {
    Array.from(this.content.childNodes).forEach(child => this.content.removeChild(child));
  }
}

export default Gallery;
