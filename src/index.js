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

const lightbox = new SimpleLightbox('.gallery a', { // подключаем использование SimpleLightbox
   captionsData: 'alt',
   captionPosition: 'bottom',
   captionDelay: 250,
});

refs.buttonLoadMore.classList.add('is-hidden');


refs.form.addEventListener('submit', giveArray) // работает по кнопке поиска button type="submit" в форме
// 

async function giveArray(e) { // этa функция которая получает масив по имени nameSearch и сбасывает текущую страницу (currentPage) до 1 и передает масив обьектов
e.preventDefault()

const nameSearch = refs.input.value
const currentPage = 1;

await getImages(currentPage, nameSearch).then(images => {
   console.log(images) // это масив картинок который мы получили и назвали с помощю .then
   insertMarkup(images);
})
};


function insertMarkup({arrayImages, totalHits}) {
   const result = arrayImages.reduce((acc, img) => acc + markup(img), "");
   console.log(result) // это уже сшитая разметка 

   mainFunctionality(result, arrayImages, totalHits)
};

// вставлять разметку, и, или выводить сообщения о успехе, или ошибке
function mainFunctionality(result, arrayImages, totalHits){
   if(result !== undefined && arrayImages.length !== 0){ // если мы получили коректный масив 
   Notiflix.Notify.success(`Hoooray! We found ${totalHits} images!`);
   refs.buttonLoadMore.classList.remove('is-hidden')
   refs.gallery.insertAdjacentHTML('beforeend', result);
   lightbox.refresh();
}else{ // если мы получили не коректный масив 
   Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
   refs.buttonLoadMore.classList.add('is-hidden')
   return;
}
if (arrayImages.length < 40) { // если масив закончился
   refs.buttonLoadMore.classList.add('is-hidden');
   Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
}
};


// кнопка загрузить больше
// найти следующую страницу в бекенде
// создать разметку этой страницы