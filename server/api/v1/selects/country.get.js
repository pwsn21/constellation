import { Country } from 'country-state-city';

export default defineEventHandler((event) => {
  const response = []
  Country.getAllCountries().forEach(country => {
    response.push({
      value: country.isoCode,
      label: country.name,
    })
  })
  return response;
})