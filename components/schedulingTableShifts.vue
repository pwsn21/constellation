<template>
    <div>

        <q-table table-header-class="bg-primary text-white" :rows="shifts" row-key="id" :columns="columns"
            :pagination="{ sortBy: 'date', descending: true, rowsPerPage: 14 }" @row-click="menteeShift">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense round flat color="red" @click="deleteShift(props.row)" icon="delete"></q-btn>
                </q-td>
            </template>
        </q-table>
    </div>
</template>

<script setup>

import { collection, query, onSnapshot, getFirestore, deleteDoc, doc } from "firebase/firestore";
const db = getFirestore()
const shifts = ref([])

const emit = defineEmits(["selectedShift"])
const menteeShift = (event, row) => {
    emit("selectedShift", row.id)
};

const q = query(collection(db, "scheduledShifts"));
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

const deleteShift = async (shift) => {
    await deleteDoc(doc(db, "scheduledShifts", shift.id));
};
</script>

<style scoped></style>