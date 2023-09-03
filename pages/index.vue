<template>
    <div>
      <h2 class="tw-text-8xl tw-text-center tw-p-10">hello {{ firebaseUser.email }}</h2>
    </div>
    <div>
        {{ firebaseUser.uid }}
      <q-btn color="primary" label="Primary" />
      <QBtn color="secondary" label="Secondary" />
      <LazyQBtn color="amber" glossy label="Amber" />
    </div>
  </template>

<script setup>


    const firebaseUser = useFirebaseUser()
    const uid = firebaseUser.value.uid


</script>
  