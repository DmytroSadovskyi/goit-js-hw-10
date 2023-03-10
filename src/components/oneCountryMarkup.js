export default function oneCountryMarkup(countriesArr) {
  return countriesArr
    .map(({ flags, name, capital, population, languages }) => {
      return `
  <img class = "country-img" src = '${
    flags.svg
  }' width="100", height ="70" alt = "Flag of ${name.official}">
  <h1 class="country-name">${name.official}</h1>
  
  <p class = "country-data"><b>Capital: </b>${capital}</p>
  
 <p class = "country-data"><b>Population: </b>${population}</p> 
  
  <p class = "country-data"><b>Languages: </b>${Object.values(languages).join(
    ', '
  )}</p>`;
    })
    .join('');
}
