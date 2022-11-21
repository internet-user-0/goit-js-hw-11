import axios from "axios";


export async function getImages(currentPage, nameSearch) {
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 40;

try {
const response = await axios.get(`${BASE_URL}?key=29362166-5d2238b188a86f65197883688&image_type=photo&orientation=horizontal&safesearch=true&q=${nameSearch}&page=${currentPage}&per_page=${PER_PAGE}`);
const arrayImages = response.data.hits;

return {arrayImages,totalHits: response.data.totalHits};
} catch(error) {
      console.log(error)
}
};
