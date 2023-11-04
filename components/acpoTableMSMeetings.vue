<template>
    <div>
        <q-expansion-item :label="`Mentees Needing Meeting - ${mentees.length}`" class="text-h5 text-primary"
            header-class="q-pa-none" header-style="bg-white" expand-icon-class="text-primary" dense flat>
            <div>
                <q-table :rows="mentees" :columns="columns" row-key="id" title-class="text-h4"
                    table-header-class="bg-primary text-white" @row-click="menteeSelection"
                    :pagination="{ sortBy: 'cohort', descending: false, rowsPerPage: 10 }">
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
    { name: 'currentSupport', label: 'Support Level', align: 'left', field: 'currentSupport' },
    { name: 'currentMilestone', label: 'Milestone', align: 'left', field: 'currentMilestone' },
    { name: 'currentCount', label: 'Shifts Completed in Milestone', field: 'currentCount', sortable: true },
    { name: 'currentRequired', label: 'Required Shifts', field: 'currentRequired' },
];

const menteeSelection = (event, row) => {
    emit("selectedMentee", row, "acpoView", "menteeProgressTab", false)
    showTable.value = false
}

</script>

<style scoped></style>