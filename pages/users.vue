<template>
    <div>
        <div class="tw-p-10">
            <h2 class="text-h5 text-primary">All Users</h2>
            <q-table :rows="rows" :columns="columns" row-key="id" table-header-class="bg-primary text-white" />
        </div>
    </div>
</template>

<script setup>
import { doc, where, query, onSnapshot, collection, getFirestore } from "firebase/firestore";

const firebaseUser = useFirebaseUser()
const db = getFirestore();

const userCollection = collection(db, 'users')
const users = ref([])

onSnapshot(userCollection, (querySnapshot) => {
    users.value = querySnapshot.docs.map((doc) => ({
        name: doc.data().firstName + ' ' + doc.data().lastName,
        station: doc.data().station,
        role: doc.data().role,
        id: doc.id,
    }));
});

const columns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'station', label: 'Station', field: 'station', sortable: true, },
    { name: 'role', label: 'Role', field: 'role', sortable: true, },
    { name: 'id', label: 'ID - For dev', field: 'id', align: 'right' },
];


const rows = users

</script>

<style scoped></style>