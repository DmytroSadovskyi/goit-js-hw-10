export default function createOneCountryMarkup(countriesArr) {
  return countriesArr
    .map(
      ({
        flags: { svg },
        name: { official },
        capital,
        population,
        languages,
      }) => {
        return `
  <img class = "country-img" src = '${svg}' width="100", height ="70" alt = "Flag of ${official}">
  <h1 class="country-name">${official}</h1>
  
  <p class = "country-data"><b>Capital: </b>${capital}</p>
  
 <p class = "country-data"><b>Population: </b>${population}</p> 
  
  <p class = "country-data"><b>Languages: </b>${Object.values(languages).join(
    ', '
  )}</p>`;
      }
    )
    .join('');
}
