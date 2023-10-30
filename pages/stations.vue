<template>
    <div>
        <q-splitter v-model="splitter" style="height: fit-content" unit="px">

            <template #before>
                <div class="q-ma-xs">
                    <stationsFormAdd />
                </div>
            </template>

            <template #after>
                <div class="q-ma-xs">
                    <stationsTable />
                </div>
            </template>
        </q-splitter>
    </div>
</template>

<script setup>
const splitter = ref(505)



</script>

<style scoped></style>