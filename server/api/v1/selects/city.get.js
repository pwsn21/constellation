import { City } from 'country-state-city';

export default defineEventHandler((event) => {
    const query = getQuery(event)
    const response = []

    City.getCitiesOfState(query.country, query.state).forEach(city => {
            response.push(city.name)
    })
    return response
})