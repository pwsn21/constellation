<template>
    <div class="full-width">
        <div>
            <q-expansion-item label="Cohorts" class="text-h5 text-primary" header-class="q-pa-none" header-style="bg-white"
                expand-icon-class="text-primary" dense flat>
                <div>
                    <q-table :rows="cohorts" row-key="id" :columns="cohortColumns" title-class="text-h4"
                        :filter="filterCohort" table-header-class="bg-primary text-white" dense
                        :pagination="{ sortBy: 'cohortID', descending: true, rowsPerPage: 5 }">

                        <template v-slot:top>
                            <div class="row justify-between" style="width:100%">
                                <q-form @submit.prevent="addCohort">
                                    <div class="flex q-gutter-sm items-center">
                                        <q-input v-model="newCohort.name" filled label="New Cohort (e.g. 2024-1)" dense
                                            mask="####-#" style="width:200px" lazy-rules hide-bottom-space clearable
                                            :rules="[val => (isValidCohort(val).valid) || (isValidCohort(val).message),]" />
                                        <q-btn color="primary" label="Add Cohort" icon="add" type="submit" />
                                    </div>
                                </q-form>

                                <div>
                                    <q-input v-model="filterCohort" class="bg-grey-4" color="primary"
                                        header-class="text-primary" dense filled label="Search..." clearable>
                                        <template v-slot:append>
                                            <q-icon name="search" />
                                        </template>
                                    </q-input>
                                </div>
                            </div>
                        </template>

                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td key="cohortID" :props="props">
                                    {{ props.row.cohortID }}
                                </q-td>
                                <q-td key="status" :props="props">
                                    <q-chip v-if="props.row.status === 'Active'" dense class="bg-green-10 text-white"
                                        clickable>
                                        {{ props.row.status }}
                                    </q-chip>
                                    <q-chip v-else class="bg-red-10 text-white" dense clickable>
                                        {{ props.row.status }}
                                    </q-chip>

                                    <q-popup-edit v-model="props.row.status" v-slot="scope">
                                        <q-select filled v-model="scope.value" dense autofocus :options="cohortStatus"
                                            @update:model-value="updateCohort(props, scope)" />
                                    </q-popup-edit>
                                </q-td>
                                <q-td key="actions" :props="props">
                                    <q-btn icon="delete" color="red" round flat @click="deleteCohort(props)" />
                                </q-td>
                            </q-tr>
                        </template>
                    </q-table>
                </div>
            </q-expansion-item>
        </div>
    </div>
</template>

<script setup>
import { getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore"
const { showToast } = useNotification()
const db = getFirestore()

const filterCohort = ref('')
const cohorts = cohortData()
const cohortStatus = ['Active', 'Inactive']

const newCohort = ref({
    name: '',
    status: 'Active'
})

const cohortColumns = [
    { name: 'cohortID', label: 'Cohort', field: 'cohortID', align: 'left', sortable: true },
    { name: 'status', label: 'Status', field: 'status', sortable: true, },
    { name: 'actions', label: 'Actions', field: 'actions', sortable: true, align: 'center' },
]


const updateCohort = async (props, scope) => {
    await setDoc(doc(db, "acpoCohort", props.row.cohortID), { status: scope.value }, { merge: true })
}

const addCohort = async () => {
    try {
        await setDoc(doc(db, "acpoCohort", newCohort.value.name), newCohort.value)
        showToast('positive', 'check', 'Cohort Added')
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Please fill in Cohort to be added')
    }
}
const deleteCohort = async (props) => {
    await deleteDoc(doc(db, "acpoCohort", props.row.cohortID))
}

</script>

<style scoped></style>