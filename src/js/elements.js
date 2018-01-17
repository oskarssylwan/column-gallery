
export default class ElementBuilder {

  buildImg(url) {
    const imgWrapper = document.createElement('div');
    const img = document.createElement('img');

    imgWrapper.classList.add('img-wrapper', 'hidden');
    img.setAttribute('src', url);
    imgWrapper.appendChild(img);

    return imgWrapper;
  }

}
