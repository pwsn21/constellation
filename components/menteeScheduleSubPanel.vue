<template>
    <div class="q-pa-xs">
        <div class="row justify-around">
            <div class="column justify-between items-center q-my-xs">
                <QDate :events="eventsFn" :event-color="customEventColor" v-model="shift" color="deep-orange-10"
                    today-btn />
            </div>
            <div class="row justify-between" style="height:300px">
                <q-tab-panels v-model="shift" animated transition-prev="fade" transition-next="fade">
                    <q-tab-panel v-for="shift in data" :key="shift.id" :name="shift.shiftEvent">
                        <q-card flat v-if="shift.car == 'Sick' || shift.car == 'Holidays'">
                            <q-card-section>
                                <q-chip class="text-h5 bg-pink-8 text-white">{{ shift.car }}</q-chip>
                            </q-card-section>

                        </q-card>
                        <q-card v-else style="width:293px">
                            <q-card-section class="bg-deep-orange-10 text-white">
                                <div class="text-h5">{{ shift.car }} on {{ shift.platoon }} Platoon</div>
                                <div class="text-subtitle1">{{ shift.startTime }} - {{ shift.endTime }}</div>
                            </q-card-section>
                            <q-card-section>
                                <QList dense>
                                    <QItem>Address:
                                        <NuxtLink :to="`https://www.google.com/maps/search/?api=1&query=${shift.address}`">
                                            {{ shift.address }}
                                        </NuxtLink>
                                    </QItem>
                                    <QItem>Mentor: {{ shift.mentorName }}</QItem>
                                    <QItem>Phone:
                                        <NuxtLink :to="`tel:${shift.mentorPhoneNumber}`">
                                            {{ shift.mentorPhoneNumber }}
                                        </NuxtLink>
                                    </QItem>
                                </QList>
                            </q-card-section>
                        </q-card>
                    </q-tab-panel>
                </q-tab-panels>
            </div>

        </div>
    </div>
</template>
<script setup>
import { date } from 'quasar'

const mentee = defineProps(['selectedMentee'])
let menteeShifts = await qMenteeShifts(mentee.selectedMentee.menteeID)

const shift = ref(date.formatDate(new Date(Date.now()), 'YYYY/MM/DD'))
const eventDay = menteeShifts.shiftDay
const eventNight = menteeShifts.shiftNight
const eventMisc = menteeShifts.shiftMisc
const data = menteeShifts.shiftData

const eventsFn = (date) => {
    return eventDay.value.includes(date) || eventNight.value.includes(date) || eventMisc.value.includes(date);
};

const customEventColor = computed(() => (date) => {
    if (eventDay.value.includes(date)) {
        return 'yellow-10';
    } else if (eventNight.value.includes(date)) {
        return 'primary'
    } else {
        return 'pink-8'
    }
});

</script>
<style scoped></style>