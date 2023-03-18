export default function createCountriesListMarkup(countriesArr) {
  return countriesArr
    .map(({ flags: { svg }, name: { official } }) => {
      return `
  <li class ="country-item"><img src = '${svg}' width="50", height ="40" alt = "Flag of ${official}"><p>${official}</p>
  </li>
  `;
    })
    .join('');
}
