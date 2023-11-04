<template>
    <div>
        <q-tabs v-model="currentFormTab" align="left" inline-label class="text-purple-10" narrow-indicator mobile-arrows
            dense>
            <q-btn name="formAdd" label='Add Forms' class="bg-purple-10 text-white" icon-right="expand_more" no-wrap>
                <q-menu transition-show="jump-down" transition-hide="jump-up" auto-close>
                    <q-list>
                        <q-item clickable @click="addForm('formAttendance')">
                            <q-item-section>
                                <q-item-label><q-icon name="sym_o_local_shipping" size="22px" class="q-mr-sm" />
                                    Attendance</q-item-label>
                            </q-item-section>
                        </q-item>
                        <!-- <q-item clickable @click="addForm('formDOPS')">
                            <q-item-section>
                                <q-item-label><q-icon name="sym_o_local_shipping" size="22px" class="q-mr-sm" />
                                    DOPS</q-item-label>
                            </q-item-section>
                        </q-item> -->
                    </q-list>
                </q-menu>
            </q-btn>
            <q-tab name="attendance" label="Attendance" icon="sym_o_local_shipping" />
            <!-- <q-tab name="dOPS" label="dOPS" icon="sym_o_ecg" />
            <q-tab name="miniCEx" label="MiniCEx" icon="sym_o_cognition" />
            <q-tab name="preceptorReports" label="Preceptor Reports" icon="sym_o_overview" /> -->
        </q-tabs>

        <q-tab-panels v-model="currentFormTab" transition-next="jump-down" animated transition-prev="jump-down"
            transition-duration="200">
            <q-tab-panel name="formAttendance">
                <MenteeFormAttendance :selectedMentee="selectedMentee" />
            </q-tab-panel>
            <q-tab-panel name="formDOPS">
                DOPS Form
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

const currentFormTab = ref('formAdd')
const mentee = defineProps(['selectedMentee'])
let formType = ref('')

const addForm = (type) => {
    currentFormTab.value = type
}


</script>
<style scoped></style>