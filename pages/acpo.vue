<template>
  <div class="flex justify-center">
    <!-- <acpoTable @selected-mentee="onMenteeSelected" /> -->
    <acpoView v-if="acpoMode == 'acpoView'" :selectedMenteeID="selectedMenteeID" />
    <acpoEdit v-if="acpoMode == 'acpoEdit'" />
  </div>
</template>

<script setup>
const acpoMode = ref('acpoEdit')
const selectedMenteeID = ref('')

const onMenteeSelected = (ID, mode) => {
  selectedMenteeID.value = ID
  acpoMode.value = mode
}


</script>
