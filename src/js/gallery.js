import { buildImgCard, buildColumn, buildCardGroup} from './elements';
import { fetch, chunkify } from './utilities';
import ImageCard from './image-card';



class Gallery {
  constructor(options) {
    this.options = options;
    this.gallery = document.querySelector(`#${options.galleryId}`);
    this.cardGroup = buildCardGroup();
    this.height = this.gallery.offsetHeight;
    this.width = this.gallery.offsetWidth;
    this.columns = [];
    this.images = [];
    this.prevNumberOfColumns =  0;
    this.gallery.appendChild(this.cardGroup);

  }

  populate(imageData) {
    this.images = this.loadImages(imageData);
    onDimensionChange()
    window.onresize = this.onDimensionChange;
  }

  loadImages(imageData) {
    this.images = imageData.map(data =>
      new ImageCard(data.title, data.date_taken, data.url, data.dimensions));
  }

  updateDiensions() {
    this.height = this.gallery.offsetHeight;
    this.width = this.gallery.offsetWidth;
  }

  onDimensionChange() {
    this.updateDiensions();
    this.renderColumns();
    this.toggleImageVisibility();
  }

  renderColumns() {
    const {minNumberOfColumns, columnMinWidth } = this.options;
    let numberOfColumns = Math.floor((this.width / columnMinWidth));

    if (numberOfColumns < minNumberOfColumns ) numberOfColumns = 2;
    const columnCountDifference = Math.abs(numberOfColumns - this.prevNumberOfColumns);

    if ( columnCountDifference > 0) {
      this.clearWrapper();
      const columns = chunkify(this.images, numberOfColumns)
                      .map(colChildren => {
                        const column = buildColumn();
                        colChildren.forEach(child => column.appendChild(child));
                        this.cardGroup.appendChild(column);
                        return column;
                      });
      this.columns = columns;
      this.prevNumberOfColumns = numberOfColumns;
    }

  }

  toggleImageVisibility() {
    const numberOfRows = Math.floor((this.height / 200) - 1)

    this.columns.forEach(column => {
      const children = Array.from(column.childNodes);
      let imageStackHeight = 0;

      children.forEach(child => {
        imageStackHeight += child.offsetHeight;

        if (imageStackHeight < this.height ) {
          child.classList.remove('hidden');
        } else if (imageStackHeight ){
          child.classList.add('hidden');
        }

      });
    });
  }

  clearWrapper() {
    Array.from(this.content.childNodes)
          .forEach(child => this.content.removeChild(child));
  }
}

export default Gallery;
