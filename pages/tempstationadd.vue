<template>
    <div>
        <q-form @submit.prevent="addStation" class="q-gutter-md">
            <div class="flex">
                <div>
                    <q-card class="full-width" style="max-width: 400px;">
                        <q-card-section>
                            <div class="text-h5 tw-pb-2">Station Add Temp</div>
                            <q-input filled v-model="stnNumber" label="Station Number" />

                            <q-input filled v-model="station.city" label="City" />

                            <q-input filled v-model="carInput" label="Cars (comma-separated)" />
                            <q-btn label="Add Cars" @click="addCars" color="primary" />
                            <q-btn label="Clear" @click="reset" color="primary" />

                            {{ station.cars }}
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <div>
                <q-btn label="Save" type="submit" color="primary" />
            </div>
        </q-form>
    </div>
</template>

<script setup>

import { doc, setDoc, getDoc, getDocs, collection, onSnapshot, updateDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();

const stnNumber = ref('')
const carInput = ref(''); // Add this line to define carInput
const addCars = () => {
    if (carInput.value) {
        const newCars = carInput.value.split(',');
        station.cars = [...station.cars, ...newCars];
        carInput.value = '';
    }
}

const reset = () => {
    station.cars = []
}


const station = reactive({
    city: '',
    cars: [],
})

const { showToast } = useNotification();

const addStation = async () => {
    try {
        await setDoc(doc(db, "stations", stnNumber.value),
            station
            , { merge: true })
        station.cars = []
        showToast('positive', 'check', 'Station Added');
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Error');
    }
};



</script>

<style scoped></style>