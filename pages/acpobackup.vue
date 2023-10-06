<template>
  <div class="row justify-center">
    <div class="q-pa-md full-width" style="max-width: 850px;">
      <acpoTable @selected-mentee="onMenteeSelected" />
      <div v-if="selectedMenteeID !== ''">

        <acpoView v-if="acpoMode == 'acpoView'" :selectedMenteeID="selectedMenteeID" @acpoMode="onMenteeSelected" />

        <acpoEdit v-if="acpoMode == 'acpoEdit'" :selectedMenteeID="selectedMenteeID" @acpoMode="onMenteeSelected" />
      </div>
    </div>
  </div>
</template>

<script setup>
const acpoMode = ref('acpoView')
const selectedMenteeID = ref('')

const onMenteeSelected = (ID, mode) => {
  selectedMenteeID.value = ID
  acpoMode.value = mode
}

</script>
