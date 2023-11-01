<template>
    <div>
        <div class="row justify-between text-secondary">
            <div class="text-h5 ">Last 40 Shifts Added</div>
            <div class="q-mb-xs" style=" max-width: 250px">
                <q-input v-model="filter" class="bg-grey-4" dense filled label="Search..." clearable color="red-10">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
        </div>
        <div>
            <q-table table-header-class="bg-secondary text-white" :rows="shifts" row-key="id" :columns="columns" dense flat
                bordered :filter="filter" :pagination="{ sortBy: 'creationDate', descending: true, rowsPerPage: 20 }"
                @row-click="menteeShift" rows-per-page-label="Shifts per page:">
                <template v-slot:body-cell-car="props">
                    <q-td :props="props">
                        <q-badge>
                            {{ props.row.car }}
                        </q-badge>
                    </q-td>
                </template>
                <template v-slot:body-cell-menteeTwo="props">
                    <q-td :props="props">
                        <div v-if="props.row.menteeTwoName === 'N/A'" class="text-grey-5">
                            {{ props.row.menteeTwoName }}
                        </div>
                        <div v-else>
                            {{ props.row.menteeTwoName }}
                        </div>
                    </q-td>
                </template>
            </q-table>
        </div>
    </div>
</template>

<script setup>

import { collection, query, onSnapshot, getFirestore, deleteDoc, doc, limit, orderBy } from "firebase/firestore";
const db = getFirestore()
const shifts = ref([])

const emit = defineEmits(["selectedShift"])
const menteeShift = (event, row) => {
    emit("selectedShift", row)
};

const q = query(collection(db, "scheduledShifts"), orderBy("creationDate", "desc"), limit(40))
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    shifts.value = []
    querySnapshot.forEach((doc) => {
        const shiftData = doc.data();
        shiftData.id = doc.id;
        shiftData.menteeOneName = getUD(shiftData.menteeOneID).name
        shiftData.menteeTwoName = shiftData.menteeTwoID ? getUD(shiftData.menteeTwoID).name : "N/A"
        shiftData.mentorName = getUD(shiftData.mentorID).name
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
    // { name: 'actions', label: 'Actions', field: '', align: 'center' }
];

const filter = ref('')

// const deleteShift = async (shift) => {
//     await deleteDoc(doc(db, "scheduledShifts", shift.id));
// };
</script>

<style scoped></style>