
export const buildImgCard = (title, date_taken, url, link, onLoad)  => {
  const card = document.createElement('div');
  const innerContent = document.createElement('a');
  const body = document.createElement('div');
  const info = buildCardInfo(title, date_taken);
  const imgWrapper = document.createElement('div');
  const img = document.createElement('img');

  card.classList.add('oskw-card', 'oskw-not-loaded', 'oskw-hidden');
  innerContent.classList.add('oskw-inner-content');
  innerContent.href = link;
  innerContent.target = '_blank';
  body.classList.add('oskw-body');
  imgWrapper.classList.add('oskw-img-wrapper');
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
  column.classList.add('oskw-column');
  return column;
}

export const buildCardInfo = (titleData, dateData) => {
  const info = document.createElement('header');
  const title = document.createElement('h5');
  const date = document.createElement('span');

  info.classList.add('oskw-info');
  title.classList.add('oskw-title');
  date.classList.add('oskw-date');

  title.innerHTML = titleData;
  date.innerHTML = dateData;

  info.appendChild(title);
  info.appendChild(date);

  return info;
}

export const buildCardGroup = () => {
  const cardGroup = document.createElement('div');
  cardGroup.classList.add('oskw-card-group');
  return cardGroup;
}

export const buildInfoMessage = () => {
  const InfoMessage = document.createElement('div');
  InfoMessage.classList.add('oskw-info-message');
  return InfoMessage;
}

export const buildLoadingIcon = () => {
  const img = document.createElement('div');
  img.classList.add('oskw-loading-icon', 'oskw-rotating');
  return img;
}
