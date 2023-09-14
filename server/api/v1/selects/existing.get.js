import { Country, State } from 'country-state-city';

export default defineEventHandler((event) => {
    const query = getQuery(event)

    
    // const country = ref({
    //     label: "",
    //     value:""
    // })

    // // const response = []

    const c = Country.getCountryByCode(query.country)
    
    
    
    // country.value.label = c.name
    // country.value.value = c.isoCode

    console.log(c)

    const response = {
        country : {label:c.name,value:c.isoCode},
        state: {label: "ALL YOUR P DADDY", value: "ALL YOUR P DADDY"},
        city: "fill that in"
    }


    // State.getStatesOfCountry(query.country).forEach(state => {
    //     response.push({
    //         label: state.name,
    //         value: state.isoCode
    //     })
    // })
    return response;
})