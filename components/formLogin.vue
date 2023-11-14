<template>
  <div>
    <q-card style="width: 100%">

      <q-img src="~/assets/images/street.png" :ratio="7 / 1">
        <div class="absolute-left column justify-center text-white text-h4" style="width: 100%">Log In</div>
      </q-img>
      <div class="q-pa-md">

        <q-form @submit.prevent="loginUser" class="q-gutter-md">
          <q-input filled clearable v-model="email" type="email" label="Email" hint="Your BCEHS or PHSA Email" lazy-rules
            :rules="[
              val => (isValidEmail(val).valid) || (isValidEmail(val).message),
            ]" />

          <q-input filled clearable :type="hidePassword ? 'password' : 'text'" v-model="password" label="Password"
            lazy-rules hide-bottom-space :rules="[
              val => (isValidPassword(val).valid) || (isValidPassword(val).message),
            ]">
            <template v-slot:append>
              <q-icon :name="hidePassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="hidePassword = !hidePassword" />
            </template>
          </q-input>
          <div>
            <q-btn flat class="q-px-none" color="primary" label="Reset Password" no-caps
              @click="$emit('change', 'passwordreset')" />
          </div>

          <!-- <div class="col"> -->
          <div class="flex justify-center">
            <q-btn label="Log-In" type="submit" color="primary" />
          </div>
          <div class="column items-center">
            <div class="text-secondary">
              Don't have an account?
            </div>
            <q-btn label="Register Here" no-caps flat color="secondary" @click="$emit('change', 'Register')" />
          </div>
          <!-- </div> -->
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script setup>
const emit = defineEmits(["change"])
const { showToast } = useNotification()

const firebaseUser = useFirebaseUser()
const hidePassword = ref(true)
const email = ref("");
const password = ref("");

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