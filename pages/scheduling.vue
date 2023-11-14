<template>
    <div>
        <q-splitter v-model="splitter" style="height: fit-content" unit="px">
            <template #before>
                <div>
                    <SchedulingFormShift :allShiftData="allShiftData" />
                </div>
            </template>
            <template #after>
                <schedulingTable :allShiftData="allShiftData" />
            </template>
        </q-splitter>
    </div>
</template>

<script setup>
import { collection, onSnapshot, getFirestore, query, orderBy, limit } from "firebase/firestore";
import { date } from 'quasar'

const db = getFirestore()
const splitter = ref(505)
let allShiftData = ref([])

const q = query(collection(db, "scheduledShifts"), orderBy("creationDate", "desc"), limit(700))

onSnapshot(q, (snap) => {
    const arr = [];
    for (const [key, value] of Object.entries(snap.docs)) {
        let d = value.data()
        d.shiftID = value.id
        d.creationDate = d.creationDate?.toDate()?.toLocaleString()
        d.menteeOneName = getUD(d.menteeOneID.slice(0, -7)).name
        d.menteeOneEE = getUD(d.menteeOneID.slice(0, -7)).employeeNumber
        d.menteeTwoName = d.menteeTwoID ? getUD(d.menteeTwoID.slice(0, -7)).name : "N/A"
        d.menteeTwoEE = d.menteeTwoID ? getUD(d.menteeTwoID.slice(0, -7)).employeeNumber : "N/A"
        d.mentorName = getUD(d.mentorID).name ? getUD(d.mentorID).name : d.mentorID
        arr.push(d)
    }
    allShiftData.value = arr
})

// const onShiftSelected = (shift) => {
//     selectedShift.value = shift
// }

// const reset = (emit) => {
//     selectedShift.value = emit
// }

</script>

<style scoped></style>