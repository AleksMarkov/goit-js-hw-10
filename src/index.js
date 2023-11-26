import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  text: document.querySelector('.cat-info'),
};
let selectArray = [];

refs.loader.classList.replace('loader', 'hidden');
refs.error.classList.add('hidden');
refs.text.classList.add('hidden');
refs.select.addEventListener('change', selectBreed);

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      selectArray.push({ value: element.id, text: element.name });
    });
    new SlimSelect({
      select: refs.select,
      data: selectArray,
    });
  })
  .catch(onError);

function selectBreed(evt) {
  const selectedId = evt.target.value;
  refs.loader.classList.replace('hidden', 'loader');
  refs.select.classList.add('hidden');
  refs.text.classList.add('hidden');

  fetchCatByBreed(selectedId)
    .then(data => {
      refs.loader.classList.replace('loader', 'hidden');
      refs.select.classList.remove('hidden');

      const { url, breeds } = data[0];

      refs.text.innerHTML = `<div class="box-img">
      <img src="${url}" alt="${breeds[0].name}" width="600"/>
      </div>
      <div class="box">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p>Temperament: ${breeds[0].temperament}</p>
      </div>`;
      refs.text.classList.remove('hidden');
    })
    .catch(onError);
}
function onError() {
  refs.select.classList.remove('hidden');
  refs.loader.classList.replace('loader', 'hidden');

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    {
      position: 'center-center',
      fontSize: '30px',
    }
  );
}
