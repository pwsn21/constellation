<template>
    <div class="flex justify-center">
        <div class="q-pa-md full-width" style="max-width: 900px;">
            <h2 class="text-h5 text-primary">All Users</h2>
            <q-table :rows="rows" :columns="columns" row-key="id" table-header-class="bg-primary text-white" />
        </div>
    </div>
</template>

<script setup>
import { doc, where, query, onSnapshot, getDocs, collection, getFirestore } from "firebase/firestore";

const firebaseUser = useFirebaseUser()
const db = getFirestore();

const userCollection = collection(db, 'users')
const users = ref([])

const querySnapshot = await getDocs(userCollection);
querySnapshot.forEach((doc) => {
    const d = doc.data()
    users.value.push({
        id: doc.id,
        name: d.firstName + ' ' + d.lastName,
        station: d.station,
        role: d.role,
    })
})

const columns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'station', label: 'Station', field: 'station', sortable: true, },
    { name: 'role', label: 'Role', field: 'role', sortable: true, },
    { name: 'id', label: 'ID - For dev', field: 'id', align: 'right' },
];

const rows = users.value

</script>

<style scoped></style>