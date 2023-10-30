<template>
    <div>
        <div class="row justify-between text-deep-purple-10">
            <div class="row justify-between" style="min-width: 500px;">
                <div class="text-h5 col-3">
                    By User
                </div>
                <div class="col-4">
                    <q-select label="Mentee" dense filled v-model="mentee" color="deep-purple-10" :options="activeMentees"
                        emit-value map-options @update:model-value="menteeSelected" />
                </div>
                <div class="col-4">
                    <q-select label="Mentor" dense filled v-model="mentor" color="deep-purple-10"
                        :options="activeMentors.allMentors" emit-value map-options @update:model-value="mentorSelected" />
                </div>
            </div>
            <div class="q-mb-xs" style=" max-width: 250px">
                <q-input v-model="filter" class="bg-grey-4" style="min-width: 200px;" dense filled label="Search..."
                    clearable color="deep-purple-10"> <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
        </div>
        <div>

            <q-table table-header-class="text-white bg-deep-purple-10" :rows="shifts" row-key="id" :columns="columns" dense
                flat bordered :filter="filter" :pagination="{ sortBy: 'date', descending: true, rowsPerPage: 20 }"
                no-data-label="Please Select a Mentee or Mentor" @row-click="menteeShift"
                rows-per-page-label="Shifts per page:">
                <!-- <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn dense round flat color="red" @click="deleteShift(props.row)" icon="delete"></q-btn>
                    </q-td>
                </template> -->
            </q-table>
        </div>
    </div>
</template>

<script setup>

import { collection, query, onSnapshot, getFirestore, deleteDoc, doc, limit, orderBy, where } from "firebase/firestore";
const db = getFirestore()
const shifts = ref([])
const mentee = ref('')
const activeMentees = await optionsMenteeStatus('In Progress')
const mentor = ref('')
const activeMentors = await mentorOptions('', '')

const menteeSelected = () => {
    mentor.value = ''
    const q = queryOr('scheduledShifts', 'menteeOneID', mentee.value, 'menteeTwoID', mentee.value)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        shifts.value = []
        querySnapshot.forEach((doc) => {
            const shiftData = doc.data();
            shiftData.id = doc.id;
            shifts.value.push(shiftData);
        })
    })
}

const mentorSelected = () => {
    mentee.value = ''
    const q = query(collection(db, "scheduledShifts"), where('mentorID', '==', mentor.value), orderBy("creationDate", "desc"), limit(60))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        shifts.value = [];
        querySnapshot.forEach((doc) => {
            const shiftData = doc.data();
            shiftData.id = doc.id;
            shifts.value.push(shiftData);
        })
    })
}

const emit = defineEmits(["selectedShift"])
const menteeShift = (event, row) => {
    emit("selectedShift", row.id)
};

// const q = query(collection(db, "scheduledShifts"), where('menteeOneID', '==', mentee.value))


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