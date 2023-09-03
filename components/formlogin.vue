<template>
    <div class="flex justify-center">
        <div class="tw-p-10  tw-w-11/12">
            
  <div class="q-pa-md">
    <div><h2 class="tw-text-4xl tw-pb-10">Log In</h2></div>
    <q-form
      @submit.prevent="loginUser"
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
            <q-btn label="Log-In" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
        <div>
            <NuxtLink to="/register"><q-btn label="Register" color="secondary"/></NuxtLink>
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

const firebaseUser = useFirebaseUser()
const email = ref(null);
const password = ref(null);


const $q = useQuasar()

const onReset = () => {
  email.value = null
  password.value = null
  
}

const loginUser = async () => {
    const result = await signInUser(email.value, password.value);
    
    if (!result){
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Invalid User or Password',
            position: 'top'
          })

    } else {
        firebaseUser.value = result;
        navigateTo("/")
    }
};
</script>

<style scoped>

</style>