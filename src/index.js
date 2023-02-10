import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');

const listOfCountries = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');
let countries = null;

searchInput.addEventListener(
  'input',
  debounce(() => {
    const countryName = searchInput.value.trim();
    fetchCountries(countryName)
      .then(countrydata => {
        countries = countrydata;
        console.log(countries);
      })
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);

function renderCountryInfo({ name, capital, population, flags, languages }) {
  const countryInfo = `
  <li>${flags}</li>
  <li>${name}</li>
  <li>Capital: ${capital}</li>
  <li>Population: ${population}</li>
  <li>Languages: ${languages}</li>
  `;
  countryInfoContainer.insertAdjacentHTML('beforeend', countryInfo);
}
