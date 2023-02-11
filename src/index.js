import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');

const listOfCountries = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');
let countries = null;
let countryFullName = null;
let countryCapital = null;
let countryPopulation = null;
let countryFlag = null;
let langList = null;

searchInput.addEventListener(
  'input',
  debounce(() => {
    const countryName = searchInput.value.trim();
    fetchCountries(countryName)
      .then(countrydata => {
        countries = countrydata;
        countryFullName = countries[0].name.official;
        countryCapital = countries[0].capital;
        countryPopulation = countries[0].population;
        countryFlag = countries[0].flags.svg;
        langList = Object.values(countries[0].languages)
          .toString()
          .split(',')
          .join(', ');

        if (countries.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (countries.length >= 2 && countries.length <= 10) {
          renderListOfCountries();
        }
        if (countries.length === 1) {
          eraseCountryInfo();
          renderOneCountry();
        }
        if (countryName === '') {
          eraseCountryInfo();
        }
      })
      .catch(showError);
  }, DEBOUNCE_DELAY)
);

function showError() {
  Notify.failure('Oops, there is no country with that name');
}

function renderListOfCountries() {
  countries.forEach(country => {
    const countriesList = `
  <li class ="country-item"><img src = '${country.flags.svg}' width="30", height ="20"><p>${country.name.official}</p>
  </li>
  `;
    listOfCountries.insertAdjacentHTML('beforeend', countriesList);
  });
}

function renderOneCountry() {
  const countryInfo = `
  <img src = '${countryFlag}' width="40", height ="30">
  <h1>${countryFullName}</h1>
  
  <p><b>Capital: </b>${countryCapital}</p>
  
 <p><b>Population: </b>${countryPopulation}</p> 
  
  <p><b>Languages: </b>${langList}</p>`;
  countryInfoContainer.insertAdjacentHTML('beforeend', countryInfo);
}

function eraseCountryInfo() {
  listOfCountries.innerHTML = '';
  countryInfoContainer.innerHTML = '';
}
