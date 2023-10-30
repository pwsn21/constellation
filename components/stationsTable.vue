<template>
    <div>
        <div class="row justify-between text-teal-10">
            <div class="row justify-start" style="min-width: 500px;">
                <div class="text-h5 col-3">
                    By Station
                </div>
                <div class="col-5">
                    <q-select label="Station" dense filled v-model="station" :options="stations" emit-value map-options
                        @update:model-value="stationSelected" color="teal-10" />
                </div>
            </div>
        </div>
        <div>

            <q-table :rows="cars" row-key="car.id" :columns="columns" grid hide-bottom
                no-data-label="Please Select a Station">
                <template v-slot:item="props">
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                        <q-card flat bordered>
                            <q-card-section class="bg-primary text-white text-h5 flex justify-between">
                                <strong>{{ props.row.label }}</strong>
                                <q-btn dense round flat color="red" @click="deleteShift(props.row)" icon="delete"></q-btn>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <q-list>
                                    <div>Shift Start: {{ props.row.startTime }}</div>
                                    <div>Shift End: {{ props.row.endTime }}</div>
                                </q-list>
                            </q-card-section>
                        </q-card>
                    </div>
                </template>
                <!-- <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                    </q-td>
                </template> -->
            </q-table>
        </div>
    </div>
</template>

<script setup>

import { collection, query, onSnapshot, getFirestore, deleteDoc, doc, limit, orderBy, where, updateDoc, arrayRemove } from "firebase/firestore";
const db = getFirestore()
const cars = ref([])
const station = ref('')
const stations = await getStations()

const stationSelected = () => {
    const unsub = onSnapshot(doc(db, "stations", station.value), (doc) => {
        cars.value = []
        doc.data().cars.forEach((car) => {
            cars.value.push(car)
        })
    })
}



const emit = defineEmits(["selectedShift"])
const menteeShift = (event, row) => {
    emit("selectedShift", row.id)
};

// const q = query(collection(db, "scheduledShifts"), where('menteeOneID', '==', mentee.value))


const columns = [
    { name: 'car', label: 'Car', field: 'label', align: 'left', sortable: true, },
    { name: 'startTime', label: 'Shift Start', field: 'startTime', align: 'left', sortable: true },
    { name: 'endTime', label: 'Shift End', field: 'endTime', align: 'left', sortable: true },
    // { name: 'actions', label: 'Actions', field: '', align: 'center' }
];

const filter = ref('')

const deleteShift = async (car) => {
    console.log(car)
    // await deleteDoc(doc(db, "station", car.id));
    await updateDoc(doc(db, 'stations', station.value), { cars: arrayRemove(car) })

}
</script>

<style scoped></style>