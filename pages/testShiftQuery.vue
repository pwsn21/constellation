<template>
    <div class="q-pa-md">
        <div class="column justify-center items-center">
            <QDate :events="event" v-model="date" />
        </div>
        <div class="row justify-center" style="height:300px">
            <q-tab-panels v-model="date" animated transition-prev="jump-up" transition-next="jump-up">
                <q-tab-panel v-for="shift in data" :key="shift.id" :name="shift.shiftEvent">
                    <q-card>
                        <q-card-section class="bg-primary text-white">
                            <div class="text-h5">{{ shift.dateDisplay }}</div>
                            <div class="text-subtitle2">{{ shift.startTime }} - {{ shift.endTime }}</div>
                        </q-card-section>
                        <q-card-section>
                            <QList dense>
                                <QItem>Car: {{ shift.car }} on {{ shift.platoon }}</QItem>
                                <QItem>Mentor: {{ shift.mentorName }}</QItem>
                            </QList>
                        </q-card-section>
                    </q-card>
                </q-tab-panel>
            </q-tab-panels>
        </div>
        <div>
            <q-table :rows="data" :columns="columns" />
        </div>
    </div>
    <pre>
        {{ menteeShifts }}

    </pre>
</template>
<script setup>

let menteeShifts = await qMenteeShifts('1gvuIqcoVafmikRg10U95rp7pnz1_2023-3')
// let mentorShiftData = await qMentorShifts('CYHU9R0b9RWF93RpOm5lGpHLCm02')
const date = ref('')
const event = menteeShifts.shiftEvent
const data = menteeShifts.shiftData

const columns = [
    { name: 'date', label: 'Date', field: 'dateDisplay', align: 'left' },
    { name: 'car', label: 'Car', field: 'car', align: 'left' },
    { name: 'startTime', label: 'Shift Start', field: 'startTime', align: 'left' },
    { name: 'endTime', label: 'Shift End', field: 'endTime', align: 'left' },
    { name: 'platoon', label: 'Platoon', field: 'platoon', align: 'left' },
    { name: 'mentor', label: 'Mentor', field: 'mentorName', align: 'left' },
];

</script>
<style scoped></style>