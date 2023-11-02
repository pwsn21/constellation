<template>
  <div class="column items-center">
    <div>
      <h2 class="text-h4 center q-mt-md">ACP-Orientation</h2>
      <q-separator class="q-my-xs" />
    </div>
    <div v-if="profileData.role.includes('admin') || profileData.role.includes('pped')">
      <div v-if="!selectedMentee" class="q-pa-md full-width" style="min-width: 850px;">
        <AcpoDashboard />
        <q-separator class="q-mt-xs" />
      </div>
      <div v-if="!selectedMentee" class="q-pa-md full-width" style="min-width: 850px;">
        <AcpoTableMSMeetings @selected-mentee="onMenteeSelected" transition />
        <q-separator class="q-mt-xs" />
      </div>
    </div>

    <div class="q-pa-md full-width" style="max-width: 850px;">
      <div
        v-if="profileData.role.includes('admin') || profileData.role.includes('pped') || profileData.role.includes('scheduler')">
        <AcpoTableMentees @selected-mentee="onMenteeSelected" :openTable="openTable" />

      </div>
      <div v-if="selectedMentee !== '' || profileData.role.includes('mentee')" class="full-width">

        <q-tabs v-model="currentTab" align="left" inline-label stretch class="q-mt-sm text-grey-6" narrow-indicator
          mobile-arrows>
          <q-tab name="menteeProgressTab" label="Progress" icon="person" content-class="text-red-10" />
          <q-tab name="menteeFormsTab" label="Forms" icon="assignment" class="text-purple-10"
            v-if="profileData.role.includes('admin') || profileData.role.includes('pped') || profileData.role.includes('mentee')" />
          <q-tab name="menteeScheduleTab" label="Schedule" icon="calendar_month" class="text-deep-orange-10" />
          <q-tab name="menteeMeetingMinutesTab" label="Meeting Minutes" icon="speaker_notes"
            v-if="profileData.role.includes('admin') || profileData.role.includes('pped')" />
          <q-space />
          <q-btn v-if="!profileData.role.includes('mentee')" icon="close" class="text-black" round flat
            @click="closeDrawer" dense />
        </q-tabs>

        <q-tab-panels v-model="currentTab" transition-next="jump-down" animated transition-prev="jump-down"
          transition-duration="200">

          <q-tab-panel name="menteeProgressTab" class="q-px-xs">
            <menteeProfileView v-if="acpoMode == 'acpoView'" :selectedMentee="selectedMentee"
              @acpoMode="onMenteeSelected" />
            <menteeProfileEdit v-if="acpoMode == 'acpoEdit'" :selectedMentee="selectedMentee" @acpoMode="onMenteeSelected"
              transition />
          </q-tab-panel>

          <q-tab-panel name="menteeFormsTab" class="q-px-none">
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
const firebaseUser = await useFirebaseUser()
const profileData = await getUD(firebaseUser.value.uid)


const currentTab = ref('menteeProgressTab')
const acpoMode = ref('acpoView')
const selectedMentee = ref('')
let openTable = ref()

if (profileData.role.includes('mentee')) {
  selectedMentee.value = {
    menteeID: `${profileData.uid}_${profileData.cohort}`,
    name: `${profileData.name}`,
    uid: profileData.uid
  }
}

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