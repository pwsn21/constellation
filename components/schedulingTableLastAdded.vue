<template>
    <div>
        <div class="q-mb-xs" style=" max-width: 250px">
            <q-input v-model="filter" class="bg-grey-4" color="primary" header-class="text-primary" dense filled
                label="Search..." clearable> <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
        <q-table table-header-class="bg-primary text-white" :rows="shifts" row-key="id" :columns="columns" dense
            :filter="filter" :pagination="{ sortBy: 'date', descending: true, rowsPerPage: 15 }" @row-click="menteeShift">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense round flat color="red" @click="deleteShift(props.row)" icon="delete"></q-btn>
                </q-td>
            </template>
        </q-table>
    </div>
</template>

<script setup>

import { collection, query, onSnapshot, getFirestore, deleteDoc, doc, limit, orderBy } from "firebase/firestore";
const db = getFirestore()
const shifts = ref([])

const emit = defineEmits(["selectedShift"])
const menteeShift = (event, row) => {
    emit("selectedShift", row.id)
};

const q = query(collection(db, "scheduledShifts"), orderBy("creationDate", "desc"), limit(30))
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    shifts.value = [];
    querySnapshot.forEach((doc) => {
        const shiftData = doc.data();
        shiftData.id = doc.id;
        shifts.value.push(shiftData);
    })
})

const columns = [
    { name: 'date', label: 'Shift Date', field: 'startDate', align: 'left', sortable: true },
    { name: 'car', label: 'Car', field: 'car', align: 'left', sortable: true, },
    { name: 'time', label: 'Shift Time', field: 'startTime', align: 'left', sortable: true },
    { name: 'menteeOne', label: 'Mentee #1', field: 'menteeOneName', align: 'left', sortable: true, },
    { name: 'menteeTwo', label: 'Mentee #2', field: 'menteeTwoName', align: 'left', sortable: true, },
    { name: 'mentor', label: 'Mentor', field: 'mentorName', align: 'right', sortable: true, },
    { name: 'actions', label: 'Actions', field: '', align: 'center' }
];

const filter = ref('')

const deleteShift = async (shift) => {
    await deleteDoc(doc(db, "scheduledShifts", shift.id));
};
</script>

<style scoped></style>