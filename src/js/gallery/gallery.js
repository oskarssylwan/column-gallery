import ImageCard from './image-card';
// import { toggleClass } from '../utilities';
import { buildImgCard,
        buildColumn,
        buildCardGroup,
        buildInfoMessage,
        buildLoadingIcon } from './elements';

class Gallery {
  constructor(options) {
    this.options = options;
    this.gallery = document.querySelector(`#${options.galleryId}`);
    this.cardGroup = buildCardGroup();
    this.updateDimensions()
    this.columns = [];
    this.images = [];
    this.prevNumberOfColumns =  0;
    this.gallery.appendChild(this.cardGroup);
    this.cardGroup.appendChild(buildLoadingIcon());

  }

  populate(imageData) {
    if (imageData.length < 1 )  {
      this.onError("We couldn't find any images!");

    } else {
      this.loadImages(imageData);
      this.renderColumns();
      window.onresize = () => this.onDimensionChange();
    }
  }

  loadImages(imageData) {
    const onLoad = () => this.toggleImageVisibility();

    this.images = imageData.map(data =>
      new ImageCard(data.title, data.date_taken, data.url, data.link, data.dimensions, onLoad));
  }



  onDimensionChange () {
    this.updateDimensions();
    this.renderColumns();
    this.toggleImageVisibility();
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
      this.clearCardGroup();

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

    this.setFlex();
  }

  toggleImageVisibility() {
    let galleryContainerHeight = window.getComputedStyle(this.gallery.parentNode, null).height;
    galleryContainerHeight = parseInt(galleryContainerHeight);

    this.columns.forEach(column => {
      const children = Array.from(column.childNodes);
      let imageStackHeight = 0;

      children.forEach(child => {
        imageStackHeight += child.offsetHeight;

        if (imageStackHeight <  galleryContainerHeight ) {

          // all this just to remove a class IE......
          let classes = child.getAttribute('class').split(' ');
          const index = classes.indexOf('oskw-hidden');

          if (index !== -1 ) {
            classes.splice(index, 1);
            child.setAttribute('class', classes.join(' '));
          }

        } else if (imageStackHeight ){
          // child.className += ' oskw-hidden';
          // child.classList.add('oskw-hidden');

          // all this just to add a class IE......
          let avc = child.getAttribute('class').split(' ');
          avc = classes.concat(['dd']);
          child.setAttribute('class', avc.join(' '));
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

  onError(message) {
    this.clearCardGroup();
    const error = buildInfoMessage(message);
    this.cardGroup.appendChild(error);
  }


  // Flexible layout for IE
  setFlex() {
    const display = window.getComputedStyle(this.cardGroup, null).display;
    if (display != "dsads") {
      const numberOfColumns = this.columns.length;
      const columns = Array.from(this.cardGroup.childNodes);
      this.columns.forEach(column => column.setAttribute('style', `width: ${100 / numberOfColumns}%; display: inline-block; vertical-align: top;`));
    }
  }
}

export default Gallery;
