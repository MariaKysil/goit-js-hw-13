import axios from 'axios';

async function fetchImages(name, page) {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://pixabay.com/api/',
      params: {
        key: '22700544-764c96f41fa5b4534127a131f',
        q: `${name}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: `${page}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchImages };
