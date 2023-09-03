<template>
  <div class="flex justify-center">
      <div class="tw-p-10  tw-w-11/12">
          
<div class="q-pa-md">
  <div><h2 class="tw-text-4xl tw-pb-10">Register</h2></div>
  <q-form
    @submit.prevent="registerUser"
    @reset="onReset"
    class="q-gutter-md"
  >
    <q-input
      filled
      v-model="email"
      type="email"
      label="Email"
      hint="Your BCEHS Email"
      lazy-rules
      :rules="[
        val => !!val || 'BCEHS Email Required',
        
      ]" 
    />

    <q-input
      filled
      type="password"
      v-model="password"
      label="Password"
      lazy-rules
      :rules="[
        val => !!val || 'Password Required',
        val => val !== null && val !== '' || 'Please type your password',
        val => val.length > 6 || 'Password is minimum 6 characters',
      ]"
    />

    <div class="flex justify-between">
      <div>
          <q-btn label="Register" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
      <div>
          
      </div>  
    </div>
  </q-form>

</div>

      </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const email = ref(null);
const password = ref(null);


const $q = useQuasar()

const onReset = () => {
email.value = null
password.value = null

}

const registerUser = () =>{

createUser(email.value, password.value);

}


</script>

<style scoped>

</style>