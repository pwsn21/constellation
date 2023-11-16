<template>
    <div>
        <q-expansion-item :label="`Mentees Close to Milestone Completion - ${mentees.length}`" class="text-h5 text-primary"
            header-class="q-pa-none" header-style="bg-white" expand-icon-class="text-primary" dense flat>
            <div>
                <q-table :rows="mentees" :columns="columns" row-key="id" title-class="text-h4"
                    table-header-class="bg-primary text-white" @row-click="menteeSelection"
                    no-data-label="No Mentees Finishing Soon"
                    :pagination="{ sortBy: 'cohort', descending: false, rowsPerPage: 10 }">
                    <template v-slot:no-data="{ message }">
                        <div class="full-width row flex-center text-primary">
                            <q-icon size="30px" name="emoji_people" /> {{ message }}
                        </div>
                    </template>
                </q-table>
            </div>
        </q-expansion-item>
    </div>
</template>

<script setup>
const emit = defineEmits(["selectedMentee"])
let showTable = ref(true)

const mentees = ref()
mentees.value = await msMeetingTable()

const columns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'currentSupport', label: 'Support', align: 'left', field: 'currentSupport' },
    { name: 'currentMilestone', label: 'Milestone', align: 'left', field: 'currentMilestone' },
    { name: 'currentCount', label: '# Completed', field: 'currentCount', sortable: true },
    { name: 'currentRequired', label: '# Required', field: 'currentRequired' },
    { name: 'meetingType', label: 'Meeting Type', field: 'meetingType' },
    { name: 'pped', label: 'Practice Educator', field: 'pped' },
];

const menteeSelection = (event, row) => {
    emit("selectedMentee", row, "acpoView", "menteeProgressTab", false)
    showTable.value = false
}

</script>

<style scoped></style>