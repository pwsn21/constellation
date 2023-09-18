<template>
  <div class="flex justify-center">
    <div class="tw-p-10  tw-w-11/12">

      <div class="q-pa-md">
        <div>
          <h2 class="tw-text-4xl tw-pb-10">Password Reset</h2>
        </div>
        <p>Enter your BCEHS email that you used to register. An email will be sent with a link to reset your password.</p>
        <q-form @submit.prevent="resetpassword" @reset="onReset" class="q-gutter-md">
          <q-input filled v-model="email" type="email" label="Email" hint="Your BCEHS or PHSA Email" lazy-rules :rules="[
            val => (isValidEmail(val).valid) || (isValidEmail(val).message),
          ]" />

          <div class="flex justify-between">
            <div>
              <q-btn label="Send Reset Link" type="submit" color="primary" />
              <q-btn label="Clear" type="reset" color="primary" flat class="q-ml-sm" />
              <q-btn label="back" color="primary" @click="$emit('change', 'Login')" flat class="q-ml-sm" />
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