


export const buildImgCard = (title, date_taken, url, onLoad)  => {
  const card = document.createElement('div');
  const innerContent = document.createElement('div');
  const body = document.createElement('div');
  const info = buildInfo(title, date_taken);
  const imgWrapper = document.createElement('div');
  const img = document.createElement('img');

  card.setAttribute('class', 'card not-loaded hidden');
  innerContent.setAttribute('class', 'innerContent');
  body.setAttribute('class', 'body');
  imgWrapper.setAttribute('class', 'img-wrapper');
  img.setAttribute('src', url);
  img.setAttribute('alt', title);
  img.addEventListener('load', () => onLoad());

  imgWrapper.appendChild(img);
  body.appendChild(imgWrapper);
  innerContent.appendChild(body);
  innerContent.appendChild(info);
  card.appendChild(innerContent);

  return card;
}

export const buildColumn = () => {
  const column = document.createElement('div');
  column.setAttribute('class', 'column');
  return column;
}

export const buildInfo = (titleData, dateData) => {
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

export const buildCardGroup = () => {
  const cardGroup = document.createElement('div');
  cardGroup.classList.add('card-group');
  return cardGroup;
}
