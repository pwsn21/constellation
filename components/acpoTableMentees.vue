<template>
    <div class="full-width">
        <div>

            <q-expansion-item label="Mentees" class="text-h5 text-primary" header-class="q-pa-none" header-style="bg-white"
                expand-icon-toggle expand-icon-class="text-primary" default-opened dense flat v-model="showTable">

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
                        :pagination="{ sortBy: 'cohort', descending: false, rowsPerPage: 10 }">
                    </q-table>
                </div>
            </q-expansion-item>
        </div>
    </div>
</template>
  
<script setup>
import { getDocs, query, collection, getFirestore, onSnapshot } from "firebase/firestore";

let showTable = ref(true)
const db = getFirestore()

const emit = defineEmits(["selectedMentee"])
const menteeSelection = (event, row) => {
    emit("selectedMentee", row.id, "acpoView", "menteeProfileTab", false)
    showTable.value = false
};

const table = defineProps(['openTable'])


const acpoCollection = getCollection('acpoMentees')
const mentees = ref([])
const filter = ref('')


watchEffect(async () => {
    showTable.value = table.openTable
    try {
    } catch (error) {
        console.error(error)
    }
})


// const querySnapshot = await getDocs(acpoCollection);
// querySnapshot.forEach((doc) => {
//     const d = doc.data()
//     mentees.value.push({
//         id: doc.id,
//         name: d.firstName + ' ' + d.lastName || null,
//         acpoStatus: d.acpoStatus || null,
//         cohort: d.cohort || null,
//         threePerson: d.threePerson || null,
//         currentSupport: d.currentSupport || null,
//         currentMilestone: d.currentMilestone || null,
//         pped: d.pped?.label || null,
//     })
// })

const q = query(collection(db, "acpoMentees"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
        const d = doc.data()
        mentees.value.push({
            id: doc.id,
            name: d.firstName + ' ' + d.lastName || null,
            acpoStatus: d.acpoStatus || null,
            cohort: d.cohort || null,
            threePerson: d.threePerson || null,
            currentSupport: d.currentSupport || null,
            currentMilestone: d.currentMilestone || null,
            pped: d.pped?.label || null,
        })
    })
})

const menteeColumns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'acpoStatus', label: 'Status', field: 'acpoStatus', sortable: true, },
    { name: 'cohort', label: 'Cohort', field: 'cohort', sortable: true, },
    { name: 'milestone', label: 'Milestone', field: 'currentMilestone' },
    { name: 'currentSupport', label: 'Support Level', field: 'currentSupport' },
    { name: 'threePerson', label: 'No. on car', field: 'threePerson' },
    { name: 'pped', label: 'Practice Educator', field: 'pped', sortable: true },
];

</script>
 
