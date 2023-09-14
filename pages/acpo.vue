<template>
  <div>
    <div>
      <h2 class="tw-text-8xl tw-text-center tw-p-10">ACP-Orientation</h2>
    </div>
    <div class="q-pa-md">
      <q-table title="Mentees" :rows="rows" :columns="columns" row-key="id" table-header-class="bg-primary text-white" />
    </div>
  </div>
</template>

<script setup>
import { doc, where, query, onSnapshot, collection, getFirestore } from "firebase/firestore";

const db = getFirestore();

const acpoCollection = collection(db, 'acpoTracker')
const mentees = ref([])

onSnapshot(acpoCollection, (querySnapshot) => {
  mentees.value = querySnapshot.docs.map((doc) => ({
    name: doc.data().firstName + ' ' + doc.data().lastName,
    cohort: doc.data().cohortID,
    pped: doc.data().pped.label,
    id: doc.id,
  }));
});

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'cohort', label: 'Cohort', field: 'cohort', sortable: true, },
  { name: 'milestone', label: 'Milestone', field: 'milestone' },
  { name: 'pped', label: 'Practice Educator', field: 'pped' },
  { name: 'id', label: 'id for dev', field: 'id', align: 'right' },
];
const rows = mentees

</script>
