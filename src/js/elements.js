
export default class ElementBuilder {

  buildImg(url) {
    const imgWrapper = document.createElement('div');
    const img = document.createElement('img');

    imgWrapper.setAttribute('class', 'img-wrapper hidden');
    img.setAttribute('src', url);
    imgWrapper.appendChild(img);

    return imgWrapper;
  }

  column() {
    const column = document.createElement('div');
    column.setAttribute('class', 'column');
    return column;
  }

}
