<template>
  <div class="flex justify-center">
    <div>
      <div class="flex justify-center">
        <h2 class="text-h4 center q-pa-md">ACP-Orientation</h2>
      </div>
      <div class="q-pa-md full-width" style="max-width: 900px;">
        <q-table title="Mentees" :rows="menteeRows" :columns="menteeColumns" row-key="id"
          table-header-class="bg-primary text-white">
        </q-table>
      </div>
      <div class="q-pa-md full-width" style="max-width: 900px;">
        <q-table title="Needs Development Plan Meeting" :rows="developmentPlanRows" :columns="developmentPlanColumns"
          row-key="id" table-header-class="bg-red-9 text-white" />
      </div>
    </div>
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
    name: d.firstName + ' ' + d.lastName,
    cohort: d.cohort,
    threePerson: d.threePerson,
    currentSupport: d.currentSupport,
    currentMilestone: d.currentMilestone,
    pped: d.pped.label,
  })
})

const q = query(acpoCollection,
  where("needDPMeeting", "==", true),
  // simple compound query
  where("pped.value", "==", firebaseUser.value.uid)
)
const dPMeeting = await getDocs(q);
dPMeeting.forEach((doc) => {
  const d = doc.data()
  needDPMeeting.value.push({
    name: d.firstName + ' ' + d.lastName,
    cohort: d.cohort,
    currentMilestone: d.currentMilestone,
    pped: d.pped.label,
    developmentPlanMeeting: d.developmentPlanMeeting,
  })
})


const menteeColumns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'cohort', label: 'Cohort', field: 'cohort', sortable: true, },
  { name: 'milestone', label: 'Milestone', field: 'currentMilestone' },
  { name: 'currentSupport', label: 'Support Level', field: 'currentSupport' },
  { name: 'threePerson', label: 'No. on car', field: 'threePerson' },
  { name: 'pped', label: 'Practice Educator', field: 'pped', sortable: true },

  // { name: 'id', label: 'id for dev', field: 'id', align: 'right' },
];
const menteeRows = mentees.value

const developmentPlanColumns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'cohort', label: 'Cohort', field: 'cohort', sortable: true, },
  { name: 'milestone', label: 'Milestone', field: 'currentMilestone' },
  { name: 'pped', label: 'Practice Educator', field: 'pped', sortable: true },
];
const developmentPlanRows = needDPMeeting.value

</script>
