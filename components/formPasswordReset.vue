<template>
  <div>
    <q-card style="width: 100%">

      <q-img src="~/assets/images/beach.png" :ratio="7 / 1">
        <div class="absolute-left column justify-center text-white text-h4" style="width: 100%">Reset Password</div>
      </q-img>
      <div class="q-pa-md">
        <p>Enter your BCEHS email that you used to register</p>
        <p class="q-pb-sm">An email will be sent with a link to reset your password.</p>
        <q-form @submit.prevent="resetpassword" @reset="onReset" class="q-gutter-md">
          <q-input filled v-model="email" type="email" label="Email" hint="Your BCEHS or PHSA Email" lazy-rules :rules="[
            val => (isValidEmail(val).valid) || (isValidEmail(val).message),
          ]" />

          <div class="flex justify-between">
            <q-btn label="back" color="primary" @click="$emit('change', 'Login')" flat class="q-ml-sm" />
            <q-btn label="Send Reset Link" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
const emit = defineEmits(["change"])

const email = ref("")
const { showToast } = useNotification()

const onReset = () => {
  email.value = ""
}

const resetpassword = async () => {

  await resetPasswordEmail(email.value)
    .then((result) => {
      if (result.code = "auth/user-not-found") {
        showToast('red-5', 'warning', 'That BCEHS email is not registered')
      }
    })
};
</script>

<style scoped></style>