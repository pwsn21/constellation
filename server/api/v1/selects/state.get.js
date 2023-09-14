import { State } from 'country-state-city';

export default defineEventHandler((event) => {
    const query = getQuery(event)

    const response = []
    State.getStatesOfCountry(query.country).forEach(state => {
        response.push({
            label: state.name,
            value: state.isoCode
        })
    })
    return response;
})