<template>
    <div class="q-pa-md column items-center">
        <div class="column">
            Read
            <q-date multiple v-model="displayDates" />
            {{ displayDates }}
        </div>
        <div>
            Write
            <q-form @submit.prevent="saveDate">
                <DateTimePicker :date="shiftDate" @update:date="shiftUpdate" label="Shift Date" />
                <CarSelector @update:car="updateCar" />
                <q-btn label="Save" type="submit" color="primary" />

            </q-form>

        </div>
        <div class="text-h5">{{ shiftDate }}</div>
        <div class="text-h5"> {{ car }}</div>
    </div>
</template>
  
<script setup>

import { addDoc, getDocs, getFirestore, collection } from "firebase/firestore";

const displayDates = ref([])
const shiftDate = ref()
const car = ref()

const { showToast } = useNotification();
const db = getFirestore();

const querySnapshot = await getDocs(collection(db, "schedules"));
querySnapshot.forEach((doc) => {
    const d = doc.data()
    displayDates.value.push(
        d.shift.shiftDate = fromFirestoreSchedule(d.shift.shiftDate)
    )
});

const shiftUpdate = (newDate) => { shiftDate.value = newDate; };
const updateCar = (selectedCar) => { car.value = selectedCar };

const saveDate = async () => {
    try {
        const sD = await toFirestoreTimestamp(shiftDate.value)

        await addDoc(collection(db, "schedules"), {
            shift: { shiftDate: sD, shiftCar: car.value }
        });
        showToast('positive', 'check', 'Date Added');
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Error');
    }
};

</script>