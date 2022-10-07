import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '29721559-3dadec01545c732fd693d7684';

export const getApi = async (page, name) => {
  const res = await axios.get(
    `?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return res.data.hits;
};
