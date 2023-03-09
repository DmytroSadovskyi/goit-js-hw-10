export const countriesListMarkup = countriesArr => {
  return countriesArr
    .map(({ flags, name }) => {
      return `
  <li class ="country-item"><img src = '${flags.svg}' width="50", height ="40" alt = "Flag of ${name.official}"><p>${name.official}</p>
  </li>
  `;
    })
    .join('');
};
