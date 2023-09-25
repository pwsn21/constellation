<template>
    <div class="flex justify-center">
        <div>
            <div class="flex justify-center">
                <h2 class="text-h4 center q-pa-md">ACP-Orientation</h2>
            </div>
            <div class="q-pa-md full-width" style="max-width: 900px;">
                <q-table title="Mentees" :rows="menteeRows" :columns="menteeColumns" row-key="id"
                    table-header-class="bg-primary text-white" @row-click="menteeSelection">
                </q-table>

            </div>
        </div>
        <pre>

            {{ selectedMenteeID }}
        </pre>
    </div>
</template>
  
<script setup>
import { doc, where, query, collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseUser = useFirebaseUser()
const db = getFirestore()
const acpoCollection = collection(db, 'acpoTracker')
const mentees = ref([])
const needDPMeeting = ref([])

const querySnapshot = await getDocs(acpoCollection);
querySnapshot.forEach((doc) => {
    const d = doc.data()
    mentees.value.push({
        id: doc.id,
        name: d.firstName + ' ' + d.lastName || null,
        cohort: d.cohort || null,
        threePerson: d.threePerson || null,
        currentSupport: d.currentSupport || null,
        currentMilestone: d.currentMilestone || null,
        pped: d.pped?.label || null,
    })
})

const selectedMenteeID = ref()

const menteeSelection = (event, row) => {
    selectedMenteeID.value = row.id;

};

const menteeColumns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'cohort', label: 'Cohort', field: 'cohort', sortable: true, },
    { name: 'milestone', label: 'Milestone', field: 'currentMilestone' },
    { name: 'currentSupport', label: 'Support Level', field: 'currentSupport' },
    { name: 'threePerson', label: 'No. on car', field: 'threePerson' },
    { name: 'pped', label: 'Practice Educator', field: 'pped', sortable: true },
];
const menteeRows = mentees.value

</script>
  