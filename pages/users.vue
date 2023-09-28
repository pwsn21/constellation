<template>
    <div class="flex justify-center">
        <div class="q-pa-md full-width" style="max-width: 900px;">
            <h2 class="text-h5 text-primary">All Users</h2>
            <div class="q-my-sm" style=" max-width: 250px">
                <q-input v-model="filterText" class="bg-grey-4" dense filled label="Search..." clearable />
            </div>
            <q-table :rows="filteredUsers" :columns="columns" row-key="id" table-header-class="bg-primary text-white" />
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


const filterText = ref('')

const filteredUsers = computed(() => {
    const searchText = filterText.value ? filterText.value.toLowerCase().trim() : ''
    return users.value.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchText) ||
            user.station.toString().includes(searchText) ||
            user.role.toLowerCase().includes(searchText)
        );
    });
});


</script>

<style scoped></style>