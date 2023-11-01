<template>
  <div class="column items-center">
    <div>
      <h2 class="text-h4 center q-mt-md">ACP-Orientation</h2>
      <q-separator class="q-my-xs" />
    </div>
    <div v-if="!selectedMentee" class="q-pa-md full-width" style="max-width: 850px;">
      <AcpoDashboard />
      <q-separator class="q-mt-xs" />
    </div>
    <div v-if="!selectedMentee" class="q-pa-md full-width" style="max-width: 850px;">
      <AcpoTableMSMeetings />
      <q-separator class="q-mt-xs" />
    </div>

    <div class="q-pa-md full-width" style="max-width: 850px;">
      <AcpoTableMentees @selected-mentee="onMenteeSelected" :openTable="openTable" />

      <div v-if="selectedMentee !== ''" class="full-width">
        <q-tabs v-model="currentTab" align="left" inline-label stretch class="q-mt-sm text-grey-6" narrow-indicator
          mobile-arrows>
          <q-tab name="menteeProfileTab" label="Profile" icon="person" content-class="text-red-10" />
          <q-tab name="menteeFormsTab" label="Forms" icon="assignment" class="text-purple-10" />
          <q-tab name="menteeScheduleTab" label="Schedule" icon="calendar_month" class="text-green-10" />
          <q-tab name="menteeMeetingMinutesTab" label="Meeting Minutes" icon="speaker_notes" />
          <q-space />
          <q-btn icon="close" class="text-black" round flat @click="closeDrawer" dense />
        </q-tabs>

        <q-tab-panels v-model="currentTab" transition-next="jump-down" animated transition-prev="jump-down"
          transition-duration="200">

          <q-tab-panel name="menteeProfileTab" class="q-px-xs">
            <menteeProfileView v-if="acpoMode == 'acpoView'" :selectedMentee="selectedMentee" @acpoMode="onMenteeSelected"
              transition />
            <menteeProfileEdit v-if="acpoMode == 'acpoEdit'" :selectedMentee="selectedMentee" @acpoMode="onMenteeSelected"
              transition />
          </q-tab-panel>

          <q-tab-panel name="menteeFormsTab">
            <menteeFormsSubPanel :selectedMentee="selectedMentee" />
          </q-tab-panel>

          <q-tab-panel name="menteeMeetingMinutesTab">
            Meeting Minutes
          </q-tab-panel>

          <q-tab-panel name="menteeScheduleTab">
            <MenteeScheduleSubPanel :selectedMentee="selectedMentee" />
          </q-tab-panel>
        </q-tab-panels>

      </div>
    </div>
  </div>
</template>

<script setup>
const currentTab = ref('menteeProfileTab')
const acpoMode = ref('acpoView')
const selectedMentee = ref('')
let openTable = ref()

const onMenteeSelected = (ID, mode, tab, table) => {
  selectedMentee.value = ID
  acpoMode.value = mode
  currentTab.value = tab
  openTable.value = table
}

const closeDrawer = () => {
  selectedMentee.value = ''
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