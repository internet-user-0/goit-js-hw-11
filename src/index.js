import './css/styles.css';
import { getImages } from './getImages';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
   input: document.querySelector('input'),
   form: document.querySelector('.search-form'),
   gallery: document.querySelector('.gallery'),
   buttonLoadMore: document.querySelector('.load-more'),
};


const markup = img => `
   <div class="photo-card">
   <a href="${img.largeImageURL}" class="gallery-link">
   <img class="gallery__image" src="${img.webformatURL}" alt="${img.tags}" width="370px" loading="lazy" />
   </a>
      <div class="info">
            <p class="info-item">
            <b>Likes<br>${img.likes}</b>
            </p>
            <p class="info-item">
            <b>Views<br>${img.views}</b>
            </p>
            <p class="info-item">
            <b>Comments<br>${img.comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads<br>${img.downloads}</b>
            </p>
      </div>
   </div>
`; 

const lightbox = new SimpleLightbox('.gallery a', {
   captionsData: 'alt',
   captionPosition: 'bottom',
   captionDelay: 250,
});

refs.buttonLoadMore.classList.add('is-hidden');
let nameSearch = '';
let currentPage = 1;


refs.form.addEventListener('submit', giveArray)
refs.buttonLoadMore.addEventListener('click', showMore)
// 

async function giveArray(e) {
e.preventDefault()

refs.gallery.innerHTML = '';

nameSearch = refs.input.value
currentPage = 1;

await getImages(currentPage, nameSearch).then(images => {
   console.log(images)
   insertMarkup(images);
})
};


function insertMarkup({arrayImages, totalHits}) {
   const result = arrayImages.reduce((acc, img) => acc + markup(img), "");
   console.log(result)

   mainFunctionality(result, arrayImages, totalHits)
};


function mainFunctionality(result, arrayImages, totalHits){
   if(result !== undefined && arrayImages.length !== 0){
   Notiflix.Notify.success(`Hoooray! We found ${totalHits} images!`);
   refs.buttonLoadMore.classList.remove('is-hidden')
   refs.gallery.insertAdjacentHTML('beforeend', result);
   lightbox.refresh();
}else{
   Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
   refs.buttonLoadMore.classList.add('is-hidden')
   return;
}
if (arrayImages.length < 40) {
   refs.buttonLoadMore.classList.add('is-hidden');
   Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
}
};



async function showMore() {

nameSearch;
currentPage += 1;

await getImages(currentPage, nameSearch)
.then(images => {
   insertMarkup(images);});
};