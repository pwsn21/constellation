<template>
    <div>
        <q-splitter v-model="splitterModel">
            <template #before>
                <div class="q-pa-md column items-center">
                    <div class="column">
                        Number of Shifts: {{ count }}
                        <q-date v-model="selectedDate" :events="calendarDates" event-color="red-5" />
                    </div>
                    <q-card class="q-mt-lg">
                        <q-card-section class="bg-primary text-white">
                            <div class="text-h5">
                                Add Shift
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-form @submit.prevent="saveDate">
                                <DateTimePicker :date="shiftDate" @update:date="shiftUpdate" label="Shift Date" />
                                <CarSelector @update:car="updateCar" />
                                <q-btn flat label="Add Shift" type="submit" color="primary" />
                            </q-form>
                        </q-card-section>
                    </q-card>
                </div>
            </template>
            <template #after>
                <q-tab-panels v-model="selectedDate" animated transition="jump-down" transition-next="jump-down">
                    <q-tab-panel v-for="tab in shiftData" :name="tab.value">
                        <q-card class="q-mt-lg">
                            <q-card-section class="bg-primary text-white">
                                <div class="text-h5">
                                    {{ tab.date }}
                                </div>
                            </q-card-section>
                            <q-card-section>
                                <p>{{ tab.label }}</p>
                            </q-card-section>
                        </q-card>
                    </q-tab-panel>
                </q-tab-panels>
            </template>
        </q-splitter>
    </div>
</template>
  
<script setup>

import { addDoc, getDocs, getFirestore, collection, getCountFromServer } from "firebase/firestore";

const db = getFirestore();

const car = ref()
const calendarDates = ref([])
const shiftDate = ref()
const selectedDate = ref()
const shiftData = ref([])
const splitterModel = ref(40);

//Retrieve existing shifts
const querySnapshot = await getDocs(collection(db, "schedules"));
querySnapshot.forEach((doc) => {
    const d = doc.data()
    calendarDates.value.push(
        d.shiftDate = formatFirestoreTimestamp(d.shiftDate, 'qDate')
    )
    shiftData.value.push({
        id: doc.id,
        value: d.shiftDate,
        label: d.shiftCar,
        date: formatFirestoreTimestamp(d.dDate, 'longDateTime')
    }
    )
});

//Shift Counter
const coll = collection(db, "schedules")
const numberOfShifts = await getCountFromServer(coll)
const count = numberOfShifts.data().count

//Listener
const shiftUpdate = (newDate) => { shiftDate.value = newDate; };
const updateCar = (selectedCar) => { car.value = selectedCar };

const { showToast } = useNotification();

const saveDate = async () => {
    try {

        await addDoc(collection(db, "schedules"), {
            shiftDate: new Date(shiftDate.value) || null,
            shiftCar: car.value,
            dDate: new Date(shiftDate.value) || null,
        });
        showToast('positive', 'check', 'Date Added');
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Error');
    }
};

</script>