<template>
  <div>
    <div class="flex justify-center">
      <div class="tw-p-10  tw-w-11/12">

        <div class="q-pa-md">
          <div>
            <h2 class="tw-text-4xl tw-pb-10">Log In</h2>
          </div>
          <q-form @submit.prevent="loginUser" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="email" type="email" label="Email" hint="Your BCEHS Email" lazy-rules :rules="[
              val => (isValidEmail(val).valid) || (isValidEmail(val).message),
            ]" />

            <q-input filled type="password" v-model="password" label="Password" lazy-rules :rules="[
              val => (isValidPassword(val).valid) || (isValidPassword(val).message),
            ]" />
            <div>
              <q-btn flat padding="none" label="Forgot Password?" no-caps @click="$emit('change', 'passwordreset')" />
            </div>

            <div class="flex justify-between">
              <div>
                <q-btn label="Log-In" type="submit" color="primary" />
                <q-btn label="Clear" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
              <div>
                <q-btn label="Register" color="secondary" @click="$emit('change', 'Register')" />
              </div>
            </div>
          </q-form>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
const emit = defineEmits(["change"])
const { showToast } = useNotification();

const firebaseUser = useFirebaseUser()
const email = ref("");
const password = ref("");



const onReset = () => {
  email.value = ""
  password.value = ""

}

const loginUser = async () => {

  await signInUser(email.value, password.value)
    .then((result) => {
      if (result.code) {
        showToast('red-5', 'warning', 'Invalid User or Password')
      }
    })
};
</script>

<style scoped></style>