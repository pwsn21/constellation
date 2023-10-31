<template>
    <div class="row justify-center">
        <div class="q-pa-md full-width" style="max-width: 850px;">
            <usersTable @selected-user="onUserSelected" />

            <transition name="slide-fade">
                <div v-if="selectedUserID !== ''" class="full-width">
                    <q-tabs v-model="currentTab" align="left" inline-label stretch class="q-pa-xs">
                        <q-tab name="profile" label="Profile" icon="person" />
                        <q-tab name="schedule" label="Schedule" icon="calendar_month" />
                        <q-space />
                        <q-btn icon="close" round flat @click="closeDrawer" dense />
                    </q-tabs>
                    <q-tab-panels v-model="currentTab" transition-next="jump-down" animated transition-prev="jump-down"
                        transition-duration="200">
                        <q-tab-panel name="profile" class="q-px-xs">
                            <userProfileView v-if="adminUserMode == 'userView'" :selectedUserID="selectedUserID"
                                @adminUserMode="onUserSelected" transition />
                            <userProfileEdit v-if="adminUserMode == 'userEdit'" :selectedUserID="selectedUserID"
                                @adminUserMode="onUserSelected" transition />
                        </q-tab-panel>
                        <q-tab-panel name="schedule">
                            Schedule
                        </q-tab-panel>
                    </q-tab-panels>
                </div>
            </transition>
        </div>
    </div>
</template>
  
<script setup>
const currentTab = ref('profile')
const adminUserMode = ref('userEdit')
const selectedUserID = ref('')


const onUserSelected = (ID, mode) => {
    selectedUserID.value = ID
    adminUserMode.value = mode
}

const closeDrawer = () => {
    selectedUserID.value = ''
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
    transform: translateY(200px);
    opacity: 0;
}
</style>