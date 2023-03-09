import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './components/fetchCountries';
import { oneCountryMarkup } from './components/oneCountryMarkup';
import { countriesListMarkup } from './components/listOfCountriesMarkup';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const listOfCountries = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');

let countries = [];

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const countryName = searchInput.value.trim();

  if (!countryName) {
    listOfCountries.innerHTML = '';
    countryInfoContainer.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(countryData => {
      countries = countryData;

      if (countries.length > 10) {
        listOfCountries.innerHTML = '';
        countryInfoContainer.innerHTML = '';

        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        countryInfoContainer.innerHTML = '';
        renderListOfCountries(countries);
      } else if (countries.length === 1) {
        listOfCountries.innerHTML = '';
        renderOneCountry(countries);
      }
    })
    .catch(showError);
}

function showError() {
  listOfCountries.innerHTML = '';
  countryInfoContainer.innerHTML = '';
  return Notify.failure('Oops, there is no country with that name');
}

function renderListOfCountries(countries) {
  listOfCountries.innerHTML = countriesListMarkup(countries);
}

function renderOneCountry(countries) {
  countryInfoContainer.innerHTML = oneCountryMarkup(countries);
}
