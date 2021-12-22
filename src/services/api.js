const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "24006610-770c029dafc5e505b4312f4f7";

function fetchImages(searchQuery, page) {
  return fetch(
    BASE_URL +
      `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Nothing were found`));
  });
}
const Api = {
  fetchImages,
};

export default Api;
