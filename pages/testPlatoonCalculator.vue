<template>
    <div>
        <q-date v-model="shiftDate" @update:model-value="convert" today-btn>
            <div class="q-pt-none column items-center">
                <q-badge color="yellow-10">
                    Days: {{ platoon.platoonDay }} Platoon
                </q-badge>
                <q-badge color="blue-10">
                    Nights: {{ platoon.platoonNight }} Platoon
                </q-badge>
            </div>
        </q-date>
    </div>
</template>

<script setup>
import { date } from 'quasar'

const timeStamp = date.formatDate(new Date(Date.now()), 'YYYY/MM/DD')
let shiftDate = ref(timeStamp)
const platoon = ref('')

const convert = async () => {
    platoon.value = platoonFromShift(shiftDate.value)
}
convert()

</script>

<style scoped></style>