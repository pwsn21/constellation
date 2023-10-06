<template>
    <div class="flex justify-center">
        <div class="full-width" style="max-width: 900px;">
            <q-expansion-item label="Users" class="text-h5 text-primary" header-class="q-pa-none" header-style="bg-white"
                expand-icon-toggle expand-icon-class="text-primary" default-opened dense flat>
                <div class="q-my-sm" style=" max-width: 250px">
                    <q-input v-model="filterText" class="bg-grey-4" color="primary" header-class="text-primary" dense filled
                        label="Search..." clearable />
                </div>
                <q-table :rows="filteredUsers" :columns="columns" row-key="id" table-header-class="bg-primary text-white"
                    @row-click="userSelection" />
            </q-expansion-item>
        </div>
    </div>
</template>

<script setup>
import { getDocs, collection, getFirestore } from "firebase/firestore";

const emit = defineEmits(["selectedUser"])
const userSelection = (event, row) => {
    emit("selectedUser", row.id, "userView")
};

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