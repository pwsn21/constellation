<template>
    <div class="flex justify-center">
        <div class="full-width" style="max-width: 900px;">
            <q-expansion-item label="Users" class="text-h5 text-primary" header-class="q-pa-none" header-style="bg-white"
                expand-icon-toggle expand-icon-class="text-primary" default-opened dense flat>
                <div class="q-my-sm" style=" max-width: 250px">
                    <q-input v-model="filter" class="bg-grey-4" color="primary" header-class="text-primary" dense filled
                        label="Search..." clearable />
                </div>
                <q-table :rows="users" :columns="columns" row-key="id" table-header-class="bg-primary text-white"
                    :filter="filter" @row-click="userSelection" />
            </q-expansion-item>
        </div>
    </div>
</template>

<script setup>
import { getDocs } from "firebase/firestore";

const emit = defineEmits(["selectedUser"])
const userSelection = (event, row) => {
    emit("selectedUser", row.id, "userView")
};

const userCollection = getCollection('users')
const users = ref([])
const filter = ref('')

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

</script>

<style scoped></style>