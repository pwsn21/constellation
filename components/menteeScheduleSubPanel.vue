<template>
    <div class="q-pa-xs">
        <div class="row justify-around">
            <div class="column justify-between items-center">
                <QDate :events="event" v-model="date" color="deep-orange-10" />
            </div>
            <div class="row justify-between" style="height:300px">
                <q-tab-panels v-model="date" animated transition-prev="fade" transition-next="fade">
                    <q-tab-panel v-for="shift in data" :key="shift.id" :name="shift.shiftEvent">
                        <q-card style="width:293px">
                            <q-card-section class="bg-deep-orange-10 text-white">
                                <div class="text-h5">{{ shift.car }} on {{ shift.platoon }} Platoon</div>
                                <div class="text-subtitle1">{{ shift.startTime }} - {{ shift.endTime }}</div>
                            </q-card-section>
                            <q-card-section>
                                <QList dense>
                                    <QItem>Address: {{ shift.address }}</QItem>
                                    <QItem>Mentor: {{ shift.mentorName }}</QItem>
                                    <QItem>Phone: {{ shift.mentorPhoneNumber }}</QItem>
                                </QList>
                            </q-card-section>
                        </q-card>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
            <!-- <div class="full-width">
                <q-table :rows="data" :columns="columns" table-header-class="bg-deep-orange-10 text-white" />
            </div> -->
        </div>
    </div>
    <pre>
        {{ menteeShifts }}
    </pre>
</template>
<script setup>

const mentee = defineProps(['selectedMentee'])
let menteeShifts = await qMenteeShifts(mentee.selectedMentee.uid)

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