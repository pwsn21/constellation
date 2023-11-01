<template>
    <div>
        <q-expansion-item label="Needs Meeting Scheduled" class="text-h5 text-primary" header-class="q-pa-none"
            header-style="bg-white" expand-icon-toggle expand-icon-class="text-primary" default-opened dense flat>
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

const mentees = await msMeetingTable()

const columns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'currentSupport', label: 'Support Level', align: 'left', field: 'currentSupport' },
    { name: 'currentMilestone', label: 'Milestone', align: 'left', field: 'currentMilestone' },


    { name: 'currentCount', label: 'Shifts Completed in Milestone', field: 'currentCount', sortable: true },
    { name: 'currentRequired', label: 'Required Shifts', field: 'currentRequired' },
];

const menteeSelection = (event, row) => {
    console.log(row)
}

</script>

<style scoped></style>