<template>
    <div>
        <q-expansion-item v-model="ppedExpand" label="Practice Educators - Mentoring Tab"
            header-class="q-pa-none text-primary text-h5" header-style="bg-white" expand-icon-class=" text-primary" dense
            flat>
            <q-tabs v-model="currentTab" align="left" inline-label stretch class="q-mt-sm text-grey-6" narrow-indicator
                mobile-arrows>
                <q-tab name="mentorFormsTab" label="Forms (Mentor)" icon="assignment" class="text-purple-10"
                    v-if="profileData.role.includes('pped')" />
                <q-tab name="mentorScheduleTab" label="Schedule (Mentor)" icon="calendar_month" class="text-deep-orange-10"
                    v-if="profileData.role.includes('pped')" />
            </q-tabs>
            <q-tab-panels v-model="currentTab" transition-next="jump-down" animated transition-prev="jump-down"
                transition-duration="200">
                <q-tab-panel name="mentorFormsTab" class="q-px-none">
                    <mentorFormsSubPanel />
                </q-tab-panel>
                <q-tab-panel name="mentorScheduleTab">
                    <mentorScheduleSubPanel />
                </q-tab-panel>
            </q-tab-panels>
        </q-expansion-item>
    </div>
</template>

<script setup>
const firebaseUser = await useFirebaseUser()
const profileData = await getUD(firebaseUser.value.uid)
const forms = await mentorPendingAttendance(firebaseUser.value.uid)
let ppedExpand = ref(false)
const currentTab = ref('mentorFormsTab')

watch(() => forms.value, (newVal) => {
    if (newVal.length > 0) {
        ppedExpand.value = true
    } else {
        ppedExpand.value = false
    }
});



</script>

<style scoped></style>