<template>
  <div class="flex justify-center">
    <acpoTable @selected-mentee="onMenteeSelected" />
    <acpoView v-if="acpoMode == 'acpoView' && selectedMenteeID !== ''" :selectedMenteeID="selectedMenteeID"
      @acpoMode="onMenteeSelected" />
    <acpoEdit v-if="acpoMode == 'acpoEdit' && selectedMenteeID !== ''" :selectedMenteeID="selectedMenteeID"
      @acpoMode="onMenteeSelected" />
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
