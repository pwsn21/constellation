<template>
  <div class="flex justify-center">
    <div class="tw-p-10  tw-w-11/12">

      <div class="q-pa-md">
        <div>
          <h2 class="tw-text-4xl tw-pb-10">Register</h2>
        </div>
        <q-form @submit.prevent="registerUser" @reset="onReset" class="q-gutter-md">
          <q-input filled v-model="email" type="email" label="Email" hint="Your BCEHS Email" lazy-rules :rules="[
            val => (isValidEmail(val).valid) || (isValidEmail(val).message),
          ]" />

          <q-input filled type="password" v-model="password" label="Password" lazy-rules :rules="[
            val => (isValidPassword(val).valid) || (isValidPassword(val).message),
          ]" />

          <q-input filled type="password" v-model="passwordConfirm" label="Confirm Password" lazy-rules :rules="[
            val => (isValidPasswordConfirm(val, password).valid) || (isValidPasswordConfirm(val, password).message),
          ]" />

          <div class="flex justify-between">
            <div>
              <q-btn label="Register" type="submit" color="primary" />
              <q-btn label="Clear" type="reset" color="primary" flat class="q-ml-sm" />
              <q-btn label="Back" color="primary" @click="$emit('change', 'Login')" flat class="q-ml-sm" />
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
const emit = defineEmits(["change"])
const { showToast } = useNotification()


const email = ref("")
const password = ref("")
const passwordConfirm = ref("")
const error = ref("")


const onReset = () => {
  email.value = ""
  password.value = ""
  passwordConfirm.value = ""

}

const registerUser = async () => {

  await createUser(email.value, password.value)
    .then((result) => {
      if (result.code = "auth/email-already-in-use") {
        showToast('red-5', 'warning', 'This BCEHS email is already registered')
      }
    })
}


</script>

<style scoped></style>