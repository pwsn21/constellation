<template>
    <div class="full-width">
        <div>

            <q-expansion-item label="Mentees" class="text-h5 text-primary" header-class="q-pa-none" header-style="bg-white"
                expand-icon-class="text-primary" default-opened dense flat v-model="showTable">

                <div class="q-my-sm" style=" max-width: 250px">
                    <q-input v-model="filter" class="bg-grey-4" color="primary" header-class="text-primary" dense filled
                        label="Search..." clearable> <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>

                <div>
                    <q-table :rows="mentees" :columns="menteeColumns" row-key="id" title-class="text-h4" :filter="filter"
                        table-header-class="bg-primary text-white" @row-click="menteeSelection"
                        :pagination="{ sortBy: 'cohort', descending: true, rowsPerPage: 10 }">
                    </q-table>
                </div>
            </q-expansion-item>
        </div>
    </div>
</template>
  
<script setup>

let showTable = ref(true)

const emit = defineEmits(["selectedMentee"])
const menteeSelection = (event, row) => {
    emit("selectedMentee", row, "acpoView", "menteeProgressTab", false)
    showTable.value = false
};

const table = defineProps(['openTable'])

const filter = ref('')
const mentees = menteesData()

watchEffect(async () => {
    showTable.value = table.openTable
    try {
    } catch (error) {
        console.error(error)
    }
})

const menteeColumns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'acpoStatus', label: 'Status', field: 'acpoStatus', sortable: true, },
    { name: 'cohort', label: 'Cohort', field: 'cohort', sortable: true, },
    { name: 'milestone', label: 'Milestone', field: 'currentMilestone' },
    { name: 'currentSupport', label: 'Support Level', field: 'currentSupport' },
    { name: 'threePerson', label: 'No. on car', field: 'threePerson' },
    { name: 'pped', label: 'Practice Educator', field: 'pped', sortable: true },
]
</script>
 
