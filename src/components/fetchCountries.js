export default function fetchCountries(name) {
  const params = 'name,capital,population,languages,flags';
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=${params}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
