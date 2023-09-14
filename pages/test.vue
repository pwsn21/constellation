<template>
  <q-form @submit.prevent="formSubmit" class="q-gutter-md flex">

    <q-select filled v-model="selectedData.country" :options="countryOptions.value" label="Country" style="width: 200px;"
      @update:model-value="getStates" />

    <q-select filled v-model="selectedData.state" :options="stateOptions.value" label="State" style="width: 200px;"
      @update:model-value="getCities" />

    <q-select filled v-model="selectedData.city" :options="cityOptions.value" label="City" style="width: 200px;" />
    <q-btn label="Save" type="submit" color="primary" />
  </q-form>
  {{ test }}
</template>
<script setup>

const selectedData = reactive({
  country: '',
  state: '',
  city: ''
});

const countryOptions = ref()
countryOptions.value = useFetch('/api/v1/selects/country').data


const stateOptions = ref("")

const getStates = () => {
  selectedData.state = ""
  selectedData.city = ""
  stateOptions.value = useFetch('/api/v1/selects/state', { query: { country: selectedData.country.value } }).data
}

const cityOptions = ref("")

const getCities = () => {
  cityOptions.value = useFetch('/api/v1/selects/city', {
    query: {
      country: selectedData.country.value,
      state: selectedData.state.value
    }
  }).data
}

const formSubmit = () => {
  console.log("country", selectedData.country.value)
  console.log("state", selectedData.state.value)
  console.log("city", selectedData.city)
}


const test = ref()

useFetch('/api/v1/selects/existing', {
  query: {
    // THESE COME FROM FIRESTORE
    country: "CA",
    state: "BC",
    city: ""
  }
}).then((r) => {
  //console.log(r.data.value.country)
  selectedData.country = r.data.value.country
})

const mytest = special()
console.log(mytest)
const mytest1 = moreSpecial()
console.log(mytest1)







</script>

