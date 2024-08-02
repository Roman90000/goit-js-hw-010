import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import axios from 'axios';
import '../css/style.css';

const selector = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');

selector.addEventListener('change', catByBreed);

let breeds = [];

axios.defaults.headers.common['x-api-key'] =
  'live_vzM136oRXuJ5V9uRQMUR3QjMLKGpxlbuIV1e7lSsUS5RFEv9aGfSyshgBUm4saAO';

function fetchBreeds() {
  Notiflix.Loading.circle();
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(({ data }) =>
      data.map(({ name, id }) => breeds.push({ text: name, value: id }))
    )
    .then(
      () =>
        new SlimSelect({
          select: selector,
          data: breeds,
        })
    )
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      Notiflix.Loading.remove();
      div.hidden = false;
    });
}
fetchBreeds();

function catByBreed(evt) {
  const id = evt.target.value;

  axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`).then(
    ({ data }) =>
      (div.innerHTML = `<div class="container">
                              <div class="box-img"><img src="${data[0].url}" alt="${data[0].breeds[0].name}" width="400"/></div>
                              <div class="box"><h1 class="catName">${data[0].breeds[0].name}</h1>
                              <p class="catDescription">${data[0].breeds[0].description}</p>
                              <p class="catTemperament"><b>Temperament:</b><br> ${data[0].breeds[0].temperament}</p>
                              </div>
                          </div>`)
  );
}
