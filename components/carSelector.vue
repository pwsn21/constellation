<template>
    <div>
        <q-select class="q-mt-xs" use-input filled v-model="station" :options="options.filteredStation"
            @filter="filterFunction" label="Station" lazy-rules :rules="[val => !!val || 'Station is required']"
            @update:model-value="stationSelected" />
        <q-select class="q-mt-xs" filled v-model="car" :options="options.car" label="Car" lazy-rules
            :rules="[val => !!val || 'Car is required']" :model-value="car"
            @update:model-value="(value) => emit('update:car', value)" />
    </div>
</template>

<script setup>
import { doc, getDocs, getDoc, collection, getFirestore } from 'firebase/firestore';

const db = getFirestore();
const station = ref([])
const car = ref([])

const options = reactive({
    station: [],
    car: [],
    filteredStation: [],
})

const stationCollection = await getDocs(collection(db, "stations"));

stationCollection.forEach((station) => {
    options.station.push({
        label: station.id + " - " + station.data().city,
        value: station.id
    });
});

async function filterFunction(val, update) {
    val = val.toLowerCase()
    if (val === '') {
        update(() => {
            options.filteredStation = options.station
        })
    }
    else {
        update(() => {
            options.filteredStation = options.station.filter(option => {
                return option.label.toLowerCase().includes(val)
            })
        })
    }
}

const stationSelected = async () => {
    car.value = [];
    while (options.car.length) { options.car.pop(); }
    const docRef = doc(db, "stations", station.value.value);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().cars)
    docSnap.data().cars.forEach((car) => {
        options.car.push(car);
    })
};

const emit = defineEmits(['update:car']);

</script>

<style scoped></style>