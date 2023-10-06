<template>
  <div class="row justify-center">
    <div class="q-pa-md full-width" style="max-width: 850px;">
      <acpoTable @selected-mentee="onMenteeSelected" />
      <transition name="slide-fade">
        <div v-if="selectedMenteeID !== ''" class="full-width">

          <q-tabs v-model="currentTab" align="left" inline-label stretch class="q-pa-xs">
            <q-tab name="acpoProfileTab" label="Profile" icon="person" />
            <q-tab name="meetingMinutesTab" label="Meeting Minutes" icon="speaker_notes" />
            <q-tab name="scheduleTab" label="Schedule" icon="calendar_month" />
            <q-tab name="formsTab" label="Forms" icon="assignment" />
            <q-space />
            <q-btn icon="close" round flat @click="closeDrawer" dense />
          </q-tabs>

          <q-tab-panels v-model="currentTab" transition-next="jump-down" animated transition-prev="jump-down"
            transition-duration="200">
            <q-tab-panel name="acpoProfileTab" class="q-px-xs">
              <acpoView v-if="acpoMode == 'acpoView'" :selectedMenteeID="selectedMenteeID" @acpoMode="onMenteeSelected"
                transition />
              <acpoEdit v-if="acpoMode == 'acpoEdit'" :selectedMenteeID="selectedMenteeID" @acpoMode="onMenteeSelected"
                transition />
            </q-tab-panel>
            <q-tab-panel name="meetingMinutesTab">
              Meeting Minutes
            </q-tab-panel>
            <q-tab-panel name="formsTab">
              Forms
            </q-tab-panel>
            <q-tab-panel name="scheduleTab">
              Schedule
            </q-tab-panel>
          </q-tab-panels>

        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
const currentTab = ref('acpoProfileTab')
const acpoMode = ref('acpoView')
const selectedMenteeID = ref('')


const onMenteeSelected = (ID, mode) => {

  selectedMenteeID.value = ID
  acpoMode.value = mode
}
const closeDrawer = () => {
  selectedMenteeID.value = ''
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
  transform: translateY(-50px);
  opacity: 0;
}
</style>