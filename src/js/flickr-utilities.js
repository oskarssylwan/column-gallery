
// flickr specific utility functions

export const buildDataObjects = (flickrData) => {
  return flickrData.items.map(item => {
    return {
      title: item.title,
      date_taken: formatDate(item.date_taken),
      url: item.media.m,
      link: item.link,
      dimensions: extractDimensions(item.description)
    }
  })
}

export const extractDimensions = (string) => {
  let height = string.match(/height="\d+"/i)[0].match(/\d+/g)[0];
  let width = string.match(/width="\d+"/i)[0].match(/\d+/g)[0];
  height = parseInt(height);
  width = parseInt(width);
  return { width, height };
}

export const formatDate = (string) => {
  const formatedDate = string.match(/\d{4}-\d{2}-\d{2}/i)[0]
                             .replace(/-/g, ' / ');
  return formatedDate;
}

// Not working correctly: YET
export const extractUsername = (string) => {
  let username = string.match(/">.+<\/a>/u)[0].match(/[^">]{2}.+[^<\/a>]{4}/g)[0];
  return username;
}
