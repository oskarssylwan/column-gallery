import ImageCard from './image-card';
import { classlist } from '../utilities';
import { buildImgCard,
        buildColumn,
        buildCardGroup,
        buildInfoMessage,
        buildLoadingIcon } from './elements';

class Gallery {

  constructor(options) {
    this.options = options;

    // Save element references
    this.gallery = document.querySelector(`#${options.galleryId}`);
    this.cardGroup = buildCardGroup();
    this.infoMessage = buildInfoMessage();

    // Render elements to dom
    this.infoMessage.appendChild(buildLoadingIcon());
    this.gallery.appendChild(this.infoMessage);
    this.gallery.appendChild(this.cardGroup);

    // instansiate class members
    this.updateDimensions()
    this.columns = [];
    this.images = [];
    this.prevNumberOfColumns =  0;
    this.firstImageLoaded = false;

  }

  populate(imageData) {
    this.reset();
    this.loadImages(imageData);
    this.renderColumns();
    window.onresize = () => this.onDimensionChange();

    const wait = window.setTimeout(() => {
      if (imageData.length < 1 ) {
        this.onError("We couldn't find any images!");
      } else if (!this.firstImageLoaded) {
        this.onError('This is takig longer than we expected....');
      }
      window.clearTimeout(wait);
    }, 1500)

  }

  reset() {
    this.removeChildren(this.cardGroup);
    this.firstImageLoaded = false;
    this.prevNumberOfColumns =  0;
    this.infoMessage.appendChild(buildLoadingIcon());
  }

  loadImages(imageData) {
    const onLoad = () => {
      if (!this.firstImageLoaded) this.removeChildren(this.infoMessage);
      this.firstImageLoaded = true;
    };

    this.images = imageData.map(data =>
      new ImageCard(data.title, data.date_taken, data.url, data.link, data.dimensions, onLoad));
  }

  onDimensionChange () {
    this.updateDimensions();
    this.renderColumns();
  }

  updateDimensions() {
    this.height = this.gallery.offsetHeight;
    this.width = this.gallery.offsetWidth;
  }

  renderColumns() {
    const {minNumberOfColumns, columnMinWidth } = this.options;
    let numberOfColumns = Math.floor((this.width / columnMinWidth));
    numberOfColumns = numberOfColumns < minNumberOfColumns ? minNumberOfColumns : numberOfColumns;
    const columnCountDifference = Math.abs(numberOfColumns - this.prevNumberOfColumns);

    if ( columnCountDifference > 0) {
      this.removeChildren(this.cardGroup);
      const columns = this.spreadEven(this.images, numberOfColumns)
                      .map(columnItems => {
                        const column = buildColumn();
                        columnItems.forEach(imgObj => column.appendChild(imgObj.element));
                        this.cardGroup.appendChild(column);
                        return column;
                      });
      this.columns = columns;
      this.prevNumberOfColumns = numberOfColumns;
    }
  }

  removeChildren(parent) {
    Array.from(parent.childNodes)
         .forEach(child => parent.removeChild(child));
  }

  onError(message) {
    this.infoMessage.innerHTML = message;
  }

  // Tries to stack the columns into even heights
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

}

export default Gallery;
