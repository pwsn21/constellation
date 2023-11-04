<template>
  <div>
    <q-card style="width: 100%">

      <q-img src="~/assets/images/smh.jpg" :ratio="7 / 1">
        <div class="absolute-left column justify-center text-white text-h4" style="width: 100%">Register</div>
      </q-img>
      <div class="q-pa-md">
        <q-form @submit.prevent="registerUser" @reset="onReset" class="q-gutter-md">
          <q-input filled v-model="email" type="email" label="Email" hint="Your BCEHS or PHSA Email" lazy-rules :rules="[
            val => (isValidEmail(val).valid) || (isValidEmail(val).message),
          ]" />

          <q-input filled type="password" v-model="password" label="Password" lazy-rules hide-bottom-space :rules="[
            val => (isValidPassword(val).valid) || (isValidPassword(val).message),
          ]" />

          <q-input filled type="password" v-model="passwordConfirm" label="Confirm Password" hide-bottom-space lazy-rules
            :rules="[
              val => (isValidPasswordConfirm(val, password).valid) || (isValidPasswordConfirm(val, password).message),
            ]" />

          <div class="flex justify-between">
            <q-btn label="Register" type="submit" color="secondary" />
            <q-btn label="Back" color="primary" @click="$emit('change', 'Login')" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script setup>
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
      if (result.code == "auth/email-already-in-use") {
        showToast('red-5', 'warning', 'This BCEHS email is already registered')
      }
    })
}


</script>

<style scoped></style>