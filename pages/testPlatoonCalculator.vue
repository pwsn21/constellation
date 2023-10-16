<template>
    <div class="q-pa-lg row justify-center">
        <q-date v-model="shiftDate" @update:model-value="convert" />
    </div>
    <pre>
        <!-- {{ shiftDate }} -->
        {{ platoon }}
        <!-- Day: {{ platoonDay }}
        Night: {{ platoonNight }}
         -->
    </pre>
</template>

<script setup>
// const shiftDate = ref('')
// let dayNumber = ref('')
// const dayInMilli = 1000 * 60 * 60 * 24
// let platoonDay = ref('')
// let platoonNight = ref('')

// const convert = () => {
//     shiftDate.value = new Date(shiftDate.value).getTime()
//     dayNumber.value = Math.floor((shiftDate.value / dayInMilli) % 8)
//     if (dayNumber.value === 1 || dayNumber.value === 2) {
//         platoonDay.value = 'A'
//         platoonNight.value = 'D'
//     } else if (dayNumber.value === 3 || dayNumber.value === 4) {
//         platoonDay.value = 'B'
//         platoonNight.value = 'A'
//     } else if (dayNumber.value === 5 || dayNumber.value === 6) {
//         platoonDay.value = 'C'
//         platoonNight.value = 'B'
//     } else if (dayNumber.value === 7 || dayNumber.value === 0) {
//         platoonDay.value = 'D'
//         platoonNight.value = 'C'

//     }
// }
let shiftDate = ref('')
const platoon = ref('')
const convert = async () => {
    platoon.value = platoonFromShift(shiftDate.value)
}


</script>

<style scoped></style>