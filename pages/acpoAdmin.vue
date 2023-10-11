<template>
  <div class="row justify-center">
    <div class="q-pa-md full-width" style="max-width: 850px;">
      <menteesTable @selected-mentee="onMenteeSelected" :openTable="openTable" />

      <div v-if="selectedMenteeID !== ''" class="full-width">

        <q-tabs v-model="currentTab" align="left" inline-label stretch class="q-mt-sm text-grey-6" narrow-indicator>
          <q-tab name="menteeProfileTab" label="Profile" icon="person" content-class="text-red-10" />
          <q-tab name="menteeFormsTab" label="Forms" icon="assignment" class="text-purple-10" />
          <q-tab name="menteeScheduleTab" label="Schedule" icon="calendar_month" />
          <q-tab name="menteeMeetingMinutesTab" label="Meeting Minutes" icon="speaker_notes" />
          <q-space />
          <q-btn icon="close" class="text-black" round flat @click="closeDrawer" dense />
        </q-tabs>

        <q-tab-panels v-model="currentTab" transition-next="jump-down" animated transition-prev="jump-down"
          transition-duration="200">

          <q-tab-panel name="menteeProfileTab" class="q-px-xs">
            <menteeProfileView v-if="acpoMode == 'acpoView'" :selectedMenteeID="selectedMenteeID"
              @acpoMode="onMenteeSelected" transition />
            <menteeProfileEdit v-if="acpoMode == 'acpoEdit'" :selectedMenteeID="selectedMenteeID"
              @acpoMode="onMenteeSelected" transition />
          </q-tab-panel>

          <q-tab-panel name="menteeFormsTab">
            <menteeFormsSubPanel :selectedMenteeID="selectedMenteeID" />
          </q-tab-panel>

          <q-tab-panel name="menteeMeetingMinutesTab">
            Meeting Minutes
          </q-tab-panel>

          <q-tab-panel name="menteeScheduleTab">
            Schedule
          </q-tab-panel>
        </q-tab-panels>

      </div>

    </div>
  </div>
</template>

<script setup>
const currentTab = ref('menteeProfileTab')
const acpoMode = ref('acpoView')
const selectedMenteeID = ref('')
let openTable = ref()

const onMenteeSelected = (ID, mode, tab, table) => {
  selectedMenteeID.value = ID
  acpoMode.value = mode
  currentTab.value = tab
  openTable.value = table
}

const closeDrawer = () => {
  selectedMenteeID.value = ''
  openTable.value = true
}

</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>