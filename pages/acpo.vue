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

const userCollection = collection(db, 'users');
const queryMentee = query(userCollection, where("role", "==", "Mentee"));
const menteeUsers = ref();

onSnapshot(queryMentee, (querySnapshot) => {
  const fbMenteeUser = [];
  querySnapshot.forEach((doc) => {
    const user = {
      id: doc.id,
      name: doc.data().firstName + ' ' + doc.data().lastName,
      cohort: doc.data().cohort.label
    };
    fbMenteeUser.push(user);
  });
  menteeUsers.value = fbMenteeUser;
});

const columns = [
  { name: 'firstName', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'cohort', label: 'Cohort', field: 'cohort', sortable: true, },
  { name: 'milestone', label: 'Milestone', field: 'milestone', sortable: true, },
  { name: 'id', label: 'id', field: 'id', align: 'right' },
];

const rows = menteeUsers

</script>
