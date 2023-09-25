<template>
  <div class="flex justify-center">
    <acpoTable v-if="acpoMode == 'acpoTable'" @change="onChangeMode" @selected-mentee="onMenteeSelected" />
    <acpoView v-if="acpoMode == 'acpoView'" @change="onChangeMode" />
    <acpoEdit v-if="acpoMode == 'acpoEdit'" @change="onChangeMode" />

    {{ selectedMenteeID }}

  </div>
</template>

<script setup>
import { doc, getDoc, getFirestore } from "firebase/firestore";
const firebaseUser = useFirebaseUser()
const db = getFirestore();

const acpoMode = ref('acpoTable')
const selectedMenteeID = ref('')

const onChangeMode = (mode) => {
  acpoMode.value = mode
}

const onMenteeSelected = (ID) => {
  selectedMenteeID.value = ID
}


</script>
