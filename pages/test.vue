<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit.prevent="countrysubmit" class="q-gutter-md flex">
      <q-select filled v-model="profileData.country" :options="countryNames" label="Country" />

      <q-select filled v-model="profileData.state" :options="stateOptions" label="State" />

      <!-- <q-select filled v-model="profileData.city" :options="cityOptions" label="City" /> -->

      <div>
        <q-btn label="Save" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>
  
<script setup>
import { Country, State, City } from 'country-state-city';

let profileData = reactive({

  // city: "",
  province: "",
  country: "",
})

const countrysubmit = (
  console.log(profileData)

)


const countries = Country.getAllCountries()
const countryNames = countries.map(countries => countries.name);

const states = State.getStatesOfCountry('CA')
const stateOptions = states.map(states => states.name);

// const cities = City.getCitiesOfState('CA', 'BC')
// const cityOptions = cities.map(cities => cities.name);




</script>
  