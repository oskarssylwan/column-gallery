
export default class ElementBuilder {

  buildImg(imageData) {
    const card = document.createElement('div');
    const innerContent = document.createElement('div');
    const body = document.createElement('div');
    const info = this.buildInfo(imageData.title, imageData.date_taken);
    const imgWrapper = document.createElement('div');
    const img = document.createElement('img');

    card.setAttribute('class', 'card hidden');
    innerContent.setAttribute('class', 'innerContent');
    body.setAttribute('class', 'body');
    imgWrapper.setAttribute('class', 'img-wrapper');
    img.setAttribute('src', imageData.media.m);
    img.setAttribute('alt', imageData.title);

    imgWrapper.appendChild(img);
    body.appendChild(imgWrapper);
    innerContent.appendChild(body);
    innerContent.appendChild(info);
    card.appendChild(innerContent);

    return card;
  }

  column() {
    const column = document.createElement('div');
    column.setAttribute('class', 'column');
    return column;
  }

  buildInfo(titleData, dateData) {
    const info = document.createElement('header');
    const title = document.createElement('h5');
    const date = document.createElement('span');

    info.setAttribute('class', 'info');
    title.setAttribute('class', 'title');
    date.setAttribute('class', 'date');

    title.innerHTML = titleData;
    date.innerHTML = dateData;

    info.appendChild(title);
    info.appendChild(date);

    return info;
  }

}
