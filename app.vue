<template>
  <div>
    <div v-if="isAuthStateUpdated">
      <div v-if="!firebaseUser">
        <AuthForms />
      </div>
      <div v-else>
        <!-- <div v-if="firebaseUser.emailVerified"> -->
        <div v-if="firebaseUser">
          <ClientOnly>
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
          </ClientOnly>
        </div>
        <div v-else>
          <formVerification />
        </div>
      </div>
    </div>
    <div v-else>
      <SplashScreen />
    </div>
  </div>
</template>
<script setup>
const firebaseUser = useFirebaseUser()
const isAuthStateUpdated = useIsAuthStateUpdated();
</script>

