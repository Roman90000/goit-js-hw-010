import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import axios from 'axios';

const selector = document.querySelector('.breed-select');
axios.defaults.headers.common['x-api-key'] =
  'live_vzM136oRXuJ5V9uRQMUR3QjMLKGpxlbuIV1e7lSsUS5RFEv9aGfSyshgBUm4saAO';

let breeds = [];

function fetchBreeds() {
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(({ data }) =>
      data.map(({ name, id }) => breeds.push({ text: name, value: id }))
    );
}
new SlimSelect({
  select: selector,
  data: breeds,
});
console.log(breeds);
fetchBreeds();
