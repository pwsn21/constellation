<template>
    <div>
        <q-tabs v-model="currentFormTab" align="left" inline-label class="text-purple-10" narrow-indicator mobile-arrows
            dense>
            <q-tab name="attendance" label="Attendance" icon="sym_o_local_shipping" />
            <!-- <q-tab name="dOPS" label="dOPS" icon="sym_o_ecg" />
            <q-tab name="miniCEx" label="MiniCEx" icon="sym_o_cognition" />
            <q-tab name="preceptorReports" label="Preceptor Reports" icon="sym_o_overview" /> -->
        </q-tabs>

        <q-tab-panels v-model="currentFormTab" transition-next="jump-down" animated transition-prev="jump-down"
            transition-duration="200">
            <q-tab-panel name="attendance" class="q-px-none">
                <MentorPendingTable :mentorID="mentorID" />
            </q-tab-panel>
            <q-tab-panel name="dOPS">
                DOPS
            </q-tab-panel>
            <q-tab-panel name="miniCEx">
                MINI CEX
            </q-tab-panel>
            <q-tab-panel name="preceptorReports">
                Preceptor Reports
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script setup>
const firebaseUser = await useFirebaseUser()
const profileData = await getUD(firebaseUser.value.uid)
const mentorID = firebaseUser.value.uid

const currentFormTab = ref('attendance')

let formType = ref('')

const addForm = (type) => {
    currentFormTab.value = type
}


</script>
<style scoped></style>