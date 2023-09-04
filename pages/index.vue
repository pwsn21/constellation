<template>
  <div>
    <div>
      <h2 class="tw-text-8xl tw-text-center tw-p-10">hello {{ firebaseUser ? firebaseUser.email : "Loading..." }}</h2>
    </div>
    <div>
      {{ firebaseUser ? firebaseUser.uid : "Loading..." }}
      <q-btn color="primary" label="Primary" />
      <QBtn color="secondary" label="Secondary" />
      <LazyQBtn color="amber" glossy label="Amber" />
    </div>
  </div>
</template>

<script setup>


const firebaseUser = useFirebaseUser()



</script>
  