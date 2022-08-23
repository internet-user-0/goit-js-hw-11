import './css/styles.css';
import { getImages } from './getImages';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
input: document.querySelector('input'),
form: document.querySelector('.search-form'),
buttonLoad: document.querySelector('.load-more'),
gallery: document.querySelector('.gallery'),
};

export let CURRENT_PAGE = 1;

refs.buttonLoad.classList.add('is-hidden');


refs.form.addEventListener('submit', onFormSubmit);


function onFormSubmit(e) {
e.preventDefault();
CURRENT_PAGE = 1;

refs.gallery.innerHTML = '';
nameSearch = refs.input.value;


getImages(CURRENT_PAGE).then(images => {
      insertMarkup(images);
      CURRENT_PAGE += 1;
   }).catch(error => (console.log(error)))


   lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
   });
}



const createMarkup = img => `
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

function generateMarkup(  { arrayImages, totalHits }) {
if (arrayImages.length > 0){
   Notiflix.Notify.success(`Hoooray! We found ${totalHits} images!`);
   refs.buttonLoad.classList.remove('is-hidden')
   console.log(arrayImages.length)
   return arrayImages.reduce((acc, img) => acc + createMarkup(img), "");
}
};


function insertMarkup(arrayImages) {
   const result = generateMarkup(arrayImages);
   if(result !== undefined){
      refs.gallery.insertAdjacentHTML('beforeend', result);
      lightbox.refresh();
   }else{
      Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
      refs.buttonLoad.classList.add('is-hidden')
      return;
   }
};


refs.buttonLoad.addEventListener('click', onLoadMoreBtn);

function onLoadMoreBtn(){
   nameSearch = refs.input.value;

   console.log(CURRENT_PAGE)
   getImages() 
   .then(images => {
      insertMarkup(images);
      CURRENT_PAGE += 1;})
   .catch(() => {
      refs.buttonLoad.classList.add('is-hidden');
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
   })
};