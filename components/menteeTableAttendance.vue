<template>
    <div>
        <q-table :rows="shiftData" row-key="id" :columns="attendanceColumns" title-class="text-h4"
            table-header-class="bg-purple-10 text-grey-4" no-data-label="No Attendance Forms Submitted">
            <template v-slot:body-cell-actions="props">
                <!-- <q-td :props="props">
                    <q-btn dense round flat color="green" @click="approveShift(props.row)" icon="check"></q-btn>
                    <q-btn dense round flat color="red" @click="denyShift(props.row)" icon="close"></q-btn>
                </q-td> -->
            </template>
            <template v-slot:no-data="{ message }">
                <div class="full-width row flex-center text-primary">
                    <q-icon size="30px" name="sym_o_sentiment_very_dissatisfied" /> {{ message }}
                </div>
            </template>
        </q-table>
    </div>
</template>

<script setup>
import { getDocs } from 'firebase/firestore';

const mID = defineProps(['selectedMenteeID'])
const shiftData = ref([])

const getShifts = qMenteeAttendance(mID.selectedMenteeID, null)
const queryShifts = await getDocs(getShifts.menteeShifts)
console.log(queryShifts)

queryShifts.forEach((shift) => {
    const d = shift.data()
    shiftData.value.push({
        milestone: d.milestone,
        car: d.car,
        date: d.date,
        mentorName: d.mentorName,
        approvalStatus: d.approvalStatus,
        submittedOn: d.submittedOn.toDate().toDateString(),
        id: shift.id,
    })
})

const attendanceColumns = [
    { name: 'milestone', label: 'Name', field: 'milestone', align: 'left', sortable: true },
    { name: 'date', label: 'Shift Date', field: 'date', align: 'left', sortable: true },
    { name: 'car', label: 'Car', field: 'car', align: 'left', sortable: true },
    { name: 'mentorName', label: 'Mentor', field: 'mentorName', align: 'left', sortable: true },
    { name: 'submittedOn', label: 'Submitted On', field: 'submittedOn', align: 'left' },
    { name: 'approvalStatus', label: 'Status', field: 'approvalStatus', align: 'left', sortable: true },

    // { name: 'actions', label: 'Actions', field: '', align: 'center' }
];

</script>

<style scoped></style>