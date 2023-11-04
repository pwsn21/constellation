<template>
    <div>
        <!-- <q-splitter v-model="splitter" style="height: fit-content" unit="px">

            <template #before>
                <div class="q-ma-xs">
                    <stationsFormAdd />
                </div>
            </template>

            <template #after> -->
        <div class="q-ma-xs">
            <stationsTable :stations="stations" />
        </div>
        <!-- </template>
        </q-splitter> -->
    </div>
</template>

<script setup>
import { collection, query, onSnapshot, getFirestore, deleteDoc, doc, limit, orderBy, where, updateDoc, arrayRemove } from "firebase/firestore";
const splitter = ref(505)
const stations = ref([])
const db = getFirestore();

onSnapshot(collection(db, "stations"), (snap) => {
    const arr = [];
    for (const [key, value] of Object.entries(snap.docs)) {
        let d = value.data()
        arr.push(d)
    }
    stations.value = arr
})


</script>

<style scoped></style>