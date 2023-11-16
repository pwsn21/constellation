<template>
    <div>
        <div>
            <q-table :rows="stations.stations" row-key="number" :columns="columns" @row-click="edit" :filter="filter"
                table-header-class="bg-primary text-white">
                <template v-slot:top="props" class="bg-primary">
                    <div class="row justify-between" style="width:100%">
                        <div class="text-h4">Stations</div>
                        <div class="flex q-gutter-md">
                            <q-btn color="primary" label="Add Station" icon="add" @click="addStation" />
                            <q-input v-model="filter" class="bg-grey-4" dense debounce="300" color="primary"
                                header-class="text-primary" filled label="Search..." clearable style="300px;">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn dense round flat color="red" icon="delete" :props="props">
                            <q-menu dense :props="props">
                                <q-item class="q-pa-xs" dense>
                                    <q-btn dense flat color="red" @click="deleteStation(props)" icon="delete"
                                        label="Delete Station" no-caps />
                                </q-item>
                            </q-menu>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <div v-if="selectedStation" class="flex justify-center q-ma-md">
            <q-form @submit.prevent="saveStation">
                <q-card style="max-width: 100%">

                    <q-card-section class="bg-primary text-white flex justify-between">
                        <div>
                            <div v-if="!isEdit" class="text-h5">{{ selectedStation.number }} - {{ selectedStation.city }}
                            </div>
                            <div v-else class="flex justify-left">
                                <q-input v-model="selectedStation.number" dense label="Station Number" label-color="white"
                                    mask="###" input-class="text-white" lazy-rules
                                    :rules="[val => (isValidStation(val).valid) || (isValidStation(val).message),]"
                                    hide-bottom-space>
                                </q-input>
                                <q-input v-model="selectedStation.city" dense label="City" label-color="white"
                                    input-class="text-white" mask="Aaaaaaaaaaaaaaaaaaaa">
                                </q-input>
                            </div>
                            <div v-if="!isEdit" class="text-subtitle1">{{ selectedStation.address }}</div>
                            <div v-else><q-input v-model="selectedStation.address" dense label="Address" label-color="white"
                                    input-class="text-white" lazy-rules
                                    :rules="[val => (isValidAddress(val).valid) || (isValidAddress(val).message),]"
                                    hide-bottom-space>
                                </q-input>
                            </div>
                        </div>
                        <div>
                            <q-btn icon="check" v-if="isEdit" color="green" flat round type="submit" />
                            <q-btn icon="edit" v-else flat round @click="isEdit = !isEdit" />
                        </div>
                    </q-card-section>

                    <q-card-section dense class="q-pb-none">
                        <div v-if="isEdit">
                            <q-card style="min-width: 200px;" class="q-ma-sm">
                                <q-card-section class="bg-primary text-white">
                                    <div class="flex justify-between items-center">
                                        <q-input v-model="newCar.label" dense label="New Car" label-color="white"
                                            bottom-slots input-class="text-white" mask="###A#A" lazy-rules
                                            :rules="[val => (isValidCar(val).valid) || (isValidCar(val).message),]">
                                            <template v-slot:hint>
                                                <div class="text-grey-5">e.g. 247A1D</div>
                                            </template>
                                        </q-input>
                                        <q-btn color="secondary" label="Add Car" icon="add" type="submit" @click="addCar" />
                                    </div>
                                </q-card-section>
                                <q-card-section>
                                    <div>
                                        <q-input v-model="newCar.startTime" dense label="Shift Start"
                                            input-class="text-black" color="primary" hint="In 24H Format" mask="##:##"
                                            lazy-rules
                                            :rules="[val => (isValidTime(val).valid) || (isValidTime(val).message),]"
                                            hide-bottom-space>

                                        </q-input>
                                        <q-input v-model="newCar.endTime" dense label="Shift End" input-class="text-black"
                                            color="primary" hint="In 24H Format" mask="##:##" lazy-rules
                                            :rules="[val => (isValidTime(val).valid) || (isValidTime(val).message),]"
                                            hide-bottom-space>>
                                        </q-input>
                                    </div>
                                </q-card-section>
                            </q-card>

                        </div>
                    </q-card-section>

                    <q-card-section class="flex q-pt-none" dense>
                        <div v-for="car in selectedStation.cars">
                            <q-card style="min-width: 200px;" class="q-ma-sm">
                                <q-card-section class="bg-primary text-white">
                                    <div v-if="!isEdit" class="text-h6">
                                        {{ car.label }}
                                    </div>
                                    <div v-else class="flex justify-between items-center">
                                        <q-input v-model="car.label" dense label="Car" label-color="white" bottom-slots
                                            input-class="text-white" mask="###A#A" lazy-rules
                                            :rules="[val => (isValidCar(val).valid) || (isValidCar(val).message),]">
                                            <template v-slot:hint>
                                                <div class="text-grey-5">e.g. 247A1D</div>
                                            </template>
                                        </q-input>
                                        <q-btn icon="delete" v-if="isEdit" color="red" flat round @click="deleteCar(car)" />
                                    </div>
                                </q-card-section>
                                <q-card-section>
                                    <div v-if="!isEdit" class="text-subtitle2">
                                        <div>Shift Start: {{ car.startTime }}</div>
                                        <div>Shift End: {{ car.endTime }}</div>
                                    </div>
                                    <div v-else>
                                        <q-input v-model="car.startTime" dense label="Shift Start" input-class="text-black"
                                            color="primary" hint="In 24H Format" mask="##:##" lazy-rules
                                            :rules="[val => (isValidTime(val).valid) || (isValidTime(val).message),]"
                                            hide-bottom-space>
                                        </q-input>
                                        <q-input v-model="car.endTime" dense label="Shift End" input-class="text-black"
                                            color="primary" hint="In 24H Format" mask="##:##" lazy-rules
                                            :rules="[val => (isValidTime(val).valid) || (isValidTime(val).message),]"
                                            hide-bottom-space>
                                        </q-input>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </q-card-section>
                </q-card>
            </q-form>
        </div>
    </div>
</template>

<script setup>
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
const db = getFirestore()

const { showToast } = useNotification()
const stations = defineProps(['stations'])
const filter = ref('')
const isEdit = ref(false)

const selectedStation = ref('')

const edit = (event, row) => {
    isEdit.value = false
    selectedStation.value = row
}

const newCar = ref({
    label: '',
    startTime: '06:30',
    endTime: '18:30'
})
const carLabel = ref('')

const addCar = async () => {
    newCar.value.label = newCar.value.label.toUpperCase()
    carLabel.value = newCar.value.label.slice(0, -1)
    if (!selectedStation.value.carLabel) {
        selectedStation.value.carLabel = []
    }
    if (!selectedStation.value.carLabel.includes(carLabel.value)) {
        selectedStation.value.carLabel.push(carLabel.value)
        carLabel.value = ''
    }
    if (!selectedStation.value.cars.some(car => car.label === newCar.value.label)) {
        selectedStation.value.cars.push(newCar.value)
        newCar.value = {
            label: '',
            startTime: '06:30',
            endTime: '18:30'
        }
        showToast('positive', 'check', 'Car Added')
    } else {
        showToast('negative', 'error', 'Car Already Exists, Please edit the car instead')
    }
}

const deleteCar = (car) => {
    const index = selectedStation.value.cars.indexOf(car)
    selectedStation.value.cars.splice(index, 1)
    selectedStation.value.carLabel = []
    selectedStation.value.carLabel = [...new Set(selectedStation.value.cars.map(car => car.label.slice(0, -1)))];
}

const columns = [
    { name: 'number', label: 'Station', field: 'number', align: 'left', sortable: true, },
    { name: 'city', label: 'City', field: 'city', align: 'left', sortable: true },
    { name: 'address', label: 'Address', field: 'address', align: 'left', sortable: true },
    { name: 'actions', label: 'Misc', field: '', align: 'center' }
];

const saveStation = async () => {
    isEdit.value = false
    await setFSDoc("stations", selectedStation.value.number, selectedStation.value, true)
}

const addStation = () => {
    selectedStation.value = { cars: [] }
    isEdit.value = true
}

const deleteStation = async (row) => {
    await deleteDoc(doc(db, "stations", row.key))
}


</script>

<style scoped></style>