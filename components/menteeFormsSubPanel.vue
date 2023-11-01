<template>
    <div>
        <q-tabs v-model="currentMenteeTab" align="justify" inline-label class="q-pa-none text-purple-10" narrow-indicator
            mobile-arrows>
            <q-tab name="dashboard" label="Forms" icon="assignment" />
            <q-tab name="attendance" label="Attendance" icon="sym_o_local_shipping" />
            <q-tab name="dOPS" label="dOPS" icon="sym_o_ecg" />
            <q-tab name="miniCEx" label="MiniCEx" icon="sym_o_cognition" />
            <q-tab name="preceptorReports" label="Preceptor Reports" icon="sym_o_overview" />
        </q-tabs>

        <q-tab-panels v-model="currentMenteeTab" transition-next="jump-down" animated transition-prev="jump-down"
            transition-duration="200">
            <q-tab-panel name="dashboard">
                Dashboard
            </q-tab-panel>
            <q-tab-panel name="attendance">
                <MenteeTableAttendance :selectedMentee="selectedMentee" />
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

const currentMenteeTab = ref('dashboard')
const mentee = defineProps(['selectedMentee'])

</script>
<style scoped></style>