<template>
  <div>
    <div v-if="isAuthStateUpdated">
      <div v-if="!firebaseUser">
        <AuthForms />
      </div>
      <div v-else>
        <ClientOnly>
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
        </ClientOnly>
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

