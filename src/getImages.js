import axios from "axios";
import {CURRENT_PAGE} from "."


export async function getImages() {
const BASE_URL = "https://pixabay.com/api/";
let perPage = 40;
try {
const response = await axios.get(`${BASE_URL}?key=29362166-5d2238b188a86f65197883688&image_type=photo&orientation=horizontal&safesearch=true&q=${nameSearch}&page=${CURRENT_PAGE}&per_page=${perPage}`);
const arrayImages = response.data.hits;

return {arrayImages,totalHits: response.data.totalHits,};
} catch(error) {
      console.log(error)
}
};