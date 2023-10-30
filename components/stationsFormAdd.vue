<template>
    <div>
        <q-card>
            <q-card-section class="q-my-sm text-center text-h4 bg-primary text-white">Add Station</q-card-section>
            <q-card-section>
                <q-form @submit.prevent="addStation" class="q-gutter-sm">
                    <q-input label="Station Number" v-model="station.number" filled @update:model-value="stationUpdate"
                        hint="e.g. 249" />
                    <q-input label="City" v-model="station.city" filled hint="e.g. Surrey" />
                    <div class="row justify-between items-center ">
                        <q-input class="col-8" label="Cars" v-model="car" filled hint="e.g. 249A1" />
                        <q-btn class="col-3" @click="pushCar" color="primary">Add Car</q-btn>
                    </div>
                    <div class="flex q-gutter-sm">
                        <div v-for="car in station.cars" :key="car.id">
                            <q-card style="max-width: 220px;">
                                <q-card-section class="bg-primary text-white text-h5 q-py-xs">
                                    <div class="flex justify-between">
                                        {{ car.label }}<q-btn icon="delete" flat dense @click="deleteCar(car)" />
                                    </div>
                                </q-card-section>
                                <q-card-section class="q-gutter-xs">
                                    <q-input filled dense label="Day\Night" v-model="car.label"
                                        hint="e.g. 249A1D, 291P3N" />
                                    <q-input filled dense label="Start Time" v-model="car.startTime" mask="##:##">
                                        <template #append>
                                            <q-icon name="access_time" class="cursor-pointer">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    <q-time v-model="car.startTime" text-color="white" color="primary"
                                                        format24h>
                                                        <q-btn v-close-popup flat label="close" />
                                                    </q-time>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                    <q-input filled dense label="End Time" v-model="car.endTime" mask="##:##">
                                        <template #append>
                                            <q-icon name="access_time" class="cursor-pointer">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    <q-time v-model="car.endTime" text-color="white" color="primary"
                                                        format24h>
                                                        <q-btn v-close-popup flat label="close" />
                                                    </q-time>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                    <div class="q-mt-xs row reverse q-gutter-sm">
                        <q-btn class="q-mr-sm" label="Add Station" type="submit" color="primary" />
                        <q-space />
                        <q-btn label="Reset" @click="onReset" color="primary" class="q-ml-sm" flat />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </div>
    <pre>{{ station }}</pre>
</template>

<script setup>
const station = ref({
    number: '',
    city: '',
    carLabel: [],
    cars: []
})
const car = ref('')

const pushCar = () => {
    const dayCar = {
        label: car.value.toUpperCase() + "D",
        startTime: '06:30',
        endTime: '18:30'
    }
    const nightCar = {
        label: car.value.toUpperCase() + "N",
        startTime: '18:30',
        endTime: '06:30'
    }
    station.value.carLabel.push(car.value.toUpperCase());
    station.value.cars.push(dayCar, nightCar);
    car.value = '';
}

const stationUpdate = () => {
    car.value = station.value.number
}

const deleteCar = (car) => {
    const index = station.value.cars.indexOf(car)
    station.value.cars.splice(index, 1)
}

const onReset = () => {
    station.value.number = ''
    station.value.city = ''
    station.value.carLabel = []
    station.value.cars = []
    car.value = ''
}

const { showToast } = useNotification()

const addStation = () => {
    try {
        setFSDoc('stations', station.value.number, station.value, true)
        showToast('positive', 'check', 'Station Added')
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Please fill out all fields')
    }
}

</script>

<style scoped></style>