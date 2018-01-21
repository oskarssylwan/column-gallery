
export const buildImgCard = (title, date_taken, url, link, onLoad)  => {
  const card = document.createElement('div');
  const innerContent = document.createElement('a');
  const body = document.createElement('div');
  const info = buildCardInfo(title, date_taken);
  const imgWrapper = document.createElement('div');
  const img = document.createElement('img');

  card.setAttribute('class', 'oskw-card oskw-not-loaded oskw-hidden');
  innerContent.setAttribute('class', 'oskw-inner-content');
  innerContent.href = link;
  innerContent.target = '_blank';
  body.setAttribute('class', 'oskw-body');
  imgWrapper.setAttribute('class', 'oskw-img-wrapper');
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
  column.setAttribute('class', 'oskw-column');
  return column;
}

export const buildCardInfo = (titleData, dateData) => {
  const info = document.createElement('header');
  const title = document.createElement('h5');
  const date = document.createElement('span');

  info.setAttribute('class', 'oskw-info');
  title.setAttribute('class', 'oskw-title');
  date.setAttribute('class', 'oskw-date');

  title.innerHTML = titleData;
  date.innerHTML = dateData;

  info.appendChild(title);
  info.appendChild(date);

  return info;
}

export const buildCardGroup = () => {
  const cardGroup = document.createElement('div');
  cardGroup.setAttribute('class', 'oskw-card-group');
  return cardGroup;
}

export const buildInfoMessage = () => {
  const InfoMessage = document.createElement('div');
  InfoMessage.setAttribute('class', 'oskw-info-message');
  return InfoMessage;
}

export const buildLoadingIcon = () => {
  const img = document.createElement('div');
  img.setAttribute('class', 'oskw-loading-icon oskw-rotating');
  return img;
}
