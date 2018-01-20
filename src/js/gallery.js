import { buildImgCard, buildColumn, buildCardGroup} from './elements';
import { fetch, chunkify } from './utilities';
import ImageCard from './image-card';



class Gallery {
  constructor(options) {
    this.options = options;
    this.gallery = document.querySelector(`#${options.galleryId}`);
    this.cardGroup = buildCardGroup();
    this.updateDiensions()
    this.columns = [];
    this.images = [];
    this.prevNumberOfColumns =  0;
    this.gallery.appendChild(this.cardGroup);

  }

  populate(imageData) {
    this.loadImages(imageData);
    this.onDimensionChange()
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

    console.log(this.spreadEven(this.images, 4));

    if ( columnCountDifference > 0) {
      this.clearCardGroup();

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

  spreadEven(imgDataObjects, numberOfColumns) {
    const reducer = (totalHeight, curImgObj) => totalHeight + curImgObj.height;
    const totalStackHeight = imgDataObjects.reduce(reducer, 0);
    const desiredColumnHeight = Math.floor(totalStackHeight / numberOfColumns);
    const arrayCopy = imgDataObjects.slice(0);
    const output = [];

    if (numberOfColumns === 1) {
      return [arrayCopy];
    }
    else {
      while ( numberOfColumns > 0 ) {
        let columnHeight = 0;
        let cutListAt = 1;

        arrayCopy.forEach((item, index) => {
          if (columnHeight < desiredColumnHeight ) {
            columnHeight += item.height;
            cutListAt = index;
          }
        });

        output.push({
          columnHeight,
          columnItems: arrayCopy.splice(0, cutListAt)
        });

        numberOfColumns -= 1;
      }

      // Handle Leftovers
      arrayCopy.forEach(item => {
        output.sort((a, b) => a.columnHeight - b.columnHeight);
        output[0].columnHeight += item.height;
        output[0].columnItems.push(item);
      });

    }
     return  output.map(item => item.columnItems);
  }

  clearCardGroup() {
    Array.from(this.cardGroup.childNodes)
         .forEach(child => this.cardGroup.removeChild(child));
  }
}

export default Gallery;
