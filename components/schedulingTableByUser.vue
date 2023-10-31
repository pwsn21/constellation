<template>
    <div>
        <div class="row justify-between text-deep-purple-10">
            <div class="row justify-between" style="min-width: 500px;">
                <div class="text-h5 col-3">
                    By User
                </div>
                <!-- <div class="col-4">
                    <q-select label="Mentee" dense filled v-model="mentee" color="deep-purple-10" :options="activeMentees"
                        emit-value map-options @update:model-value="menteeSelected" />
                </div>
                <div class="col-4">
                    <q-select label="Mentor" dense filled v-model="mentor" color="deep-purple-10"
                        :options="activeMentors.allMentors" emit-value map-options @update:model-value="mentorSelected" />
                </div> -->
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

            <q-table table-header-class="text-white bg-deep-purple-10" :rows="shifts" row-key="id" dense flat bordered
                :columns="columns" :filter="filter" :pagination="{ sortBy: 'date', descending: true, rowsPerPage: 20 }"
                no-data-label="Please Select a Mentee or Mentor" @row-click="menteeShift"
                rows-per-page-label="Shifts per page:">
                <!-- <template v-slot:body-cell-mentor="props">
                    <q-td :props="props">
                        {{ getUserDetails(props.row.mentorID).name }}
                    </q-td>
                </template> -->
            </q-table>
        </div>
    </div>
</template>

<script setup>



import { collection, query, onSnapshot, getFirestore, deleteDoc, doc, limit, orderBy, where } from "firebase/firestore";
const db = getFirestore()
initUsers()
const au = useAllUsersData();
const shifts = ref([])
const mentee = ref('')
const activeMentees = await optionsMenteeStatus('In Progress')
const mentor = ref('')
const activeMentors = await mentorOptions('', '')

function getUserDetails(uid) {
    const user = au.value.find((data) => data.uid === uid);
    if (user) {
        return user
        // {
        //     name: user.name,
        //     employeeNumber: user.employeeNumber,
        //     phoneNumber: user.phoneNumber
        // };
    } else {
        return {
            name: "",
            employeeNumber: "",
            phoneNumber: ""
        };
    }
}

const q = queryOr('scheduledShifts', 'car', '249A1D', 'station', '249')
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    shifts.value = []
    querySnapshot.forEach((doc) => {
        const shiftData = doc.data();
        shiftData.id = doc.id;
        shiftData.menteeOneName = getUserDetails(shiftData.menteeOneID).name
        shiftData.menteeTwoName = getUserDetails(shiftData.menteeTwoID).name
        shiftData.mentorName = getUserDetails(shiftData.mentorID).name
        shifts.value.push(shiftData);
    })
})

const menteeSelected = () => {

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