import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');

const listOfCountries = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');
let countries = [];
searchInput.addEventListener(
  'input',
  debounce(() => {
    const countryName = searchInput.value.trim();

    if (!countryName) {
      return;
    }
    fetchCountries(countryName)
      .then(countrydata => {
        countries = countrydata;

        if (countries.length > 10) {
          listOfCountries.innerHTML = '';
          countryInfoContainer.innerHTML = '';
          return Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length >= 2 && countries.length <= 10) {
          countryInfoContainer.innerHTML = '';
          return renderListOfCountries(countries);
        } else if (countries.length === 1) {
          listOfCountries.innerHTML = '';
          return renderOneCountry(countries);
        } else if (countryName === '') {
          listOfCountries.innerHTML = '';
          countryInfoContainer.innerHTML = '';
        }
      })
      .catch(showError);
  }, DEBOUNCE_DELAY)
);

function showError() {
  listOfCountries.innerHTML = '';
  countryInfoContainer.innerHTML = '';
  return Notify.failure('Oops, there is no country with that name');
}

function renderListOfCountries(countries) {
  const countriesListMarkup = countries
    .map(country => {
      return `
  <li class ="country-item"><img src = '${country.flags.svg}' width="30", height ="20"><p>${country.name.official}</p>
  </li>
  `;
    })
    .join('');

  listOfCountries.insertAdjacentHTML('beforeend', countriesListMarkup);
}

function renderOneCountry(countries) {
  const oneCountryMarkup = countries
    .map(country => {
      return `
  <img src = '${country.flags.svg}' width="40", height ="30">
  <h1 class="country-name">${country.name.official}</h1>
  
  <p class = "country-data"><b>Capital: </b>${country.capital}</p>
  
 <p class = "country-data"><b>Population: </b>${country.population}</p> 
  
  <p class = "country-data"><b>Languages: </b>${Object.values(
    country.languages
  )}</p>`;
    })
    .join('');
  countryInfoContainer.innerHTML = oneCountryMarkup;
}
