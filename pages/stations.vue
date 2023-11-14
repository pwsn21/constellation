<template>
    <div class="flex justify-center">
        <div class="q-ma-lg" style="width: 800px;">
            <stationsTable :stations="allStationsData" />
        </div>
    </div>
</template>

<script setup>

const allStationsData = allStations()

</script>

<style scoped></style>