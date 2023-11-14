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
const splitter = ref(500)
let allShiftData = scheduledShifts()

</script>

<style scoped></style>