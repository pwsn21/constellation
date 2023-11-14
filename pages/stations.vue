<template>
    <div class="flex justify-center">
        <!-- <q-splitter v-model="splitter" style="height: fit-content" unit="px">

            <template #before>
                <div class="q-ma-xs">
                    <stationsFormAdd />
                </div>
            </template>

            <template #after> -->
        <div class="q-ma-lg" style="width: 800px;">
            <stationsTable :stations="allStationsData" />
        </div>
        <!-- </template>
        </q-splitter> -->
    </div>
</template>

<script setup>
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
const allStationsData = ref([])
const db = getFirestore();

onSnapshot(collection(db, "stations"), (snap) => {
    const arr = [];
    for (const [key, value] of Object.entries(snap.docs)) {
        let d = value.data()
        arr.push(d)
    }
    allStationsData.value = arr
})


</script>

<style scoped></style>