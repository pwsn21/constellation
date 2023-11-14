<template>
    <div class="full-width" style="max-width: 450px;">
        <q-card>
            <q-card-section class="q-my-sm text-center text-h4 bg-primary text-white"> Add Attendance </q-card-section>
            <q-card-section>
                <q-form @submit.prevent="checkAttendance">
                    <div>
                        <q-select label="Milestone" v-model="shift.milestone" :options="options.milestone" filled />

                        <q-input filled label="Date" v-model="shift.date" @update:model-value="dateSelected">
                            <template #append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date v-model="shift.date" @update:model-value="dateSelected" today-btn
                                            :events="eventsFn" :event-color="customEventColor">
                                            <q-btn v-close-popup flat label="close" />
                                        </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                        <div class="q-my-xs q-gutter-xs">
                            <q-select filled v-model="shift.station" label="Station" :options="options.station"
                                @update:model-value="stationSelected" emit-value map-options />
                            <q-select filled v-model="shift.car" label="Car" :options="options.car"
                                @update:model-value="updateCar" />
                        </div>
                        <q-select filled label='Mentor' v-model="shift.mentorID" :options="options.mentor"
                            :rules="[val => !!val || 'Mentor is required']" emit-value map-options />
                    </div>
                    <div class="q-mt-xs row reverse q-gutter-sm">
                        <q-btn class="q-mr-sm" label="Add Attendance" type="submit" color="primary" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

const db = getFirestore()
const firebaseUser = useFirebaseUser()

const userProfile = getUD(firebaseUser.value.uid)
const prop = defineProps(['selectedMentee'])

const forms = await menteeAttendanceForms(prop.selectedMentee.menteeID)

let menteeShifts = await qMenteeShifts(prop.selectedMentee.menteeID)

const eventDay = menteeShifts.shiftDay
const eventNight = menteeShifts.shiftNight
const eventsFn = (date) => {
    return eventDay.value.includes(date) || eventNight.value.includes(date);
};

const customEventColor = computed(() => (date) => {
    if (eventDay.value.includes(date)) {
        return 'yellow-10'
    } else if (eventNight.value.includes(date)) {
        return 'primary'
    } else {
        return 'pink-8'
    }
});

const shift = reactive({
    date: undefined,
    car: undefined,
    station: undefined,
    mentorID: undefined,
    approvalStatus: 'Pending',
    cohort: prop.selectedMentee.cohort,
    milestone: prop.selectedMentee.currentMilestone,
    formType: 'attendance',
    menteeID: prop.selectedMentee.menteeID,
    name: userProfile.firstName + " " + userProfile.lastName,
    submittedOn: serverTimestamp(),
})

const mentoroptions = await mentorOptions()
const options = reactive({
    station: await getStations(),
    car: [],
    mentor: mentoroptions.allMentors,
    milestone: ['Milestone 2', 'Milestone 3', 'Milestone 4']
})

const stationSelected = async (car) => {
    shift.car = undefined
    options.car = await getCars(shift.station)
}

const dateSelected = async (date) => {
    const scheduledShift = menteeShifts.shiftData.value.find(item => item.startDate === date)
    if (scheduledShift) {
        shift.mentorID = scheduledShift.mentorID
        shift.station = scheduledShift.station
        shift.car = scheduledShift.car
    }
}

const updateCar = (selectedCars) => { shift.car = selectedCars.label }

const { showToast } = useNotification();

const checkAttendance = () => {
    if (forms.value.find(item => (item.date === shift.date && (item.approvalStatus === 'Approved' || item.approvalStatus === 'Pending')))) {
        showToast('negative', 'error', 'Attendance already submitted for this date');
    } else {
        addAttendance()
    }
}

const addAttendance = async () => {
    try {
        await addDoc(collection(db, "acpoFormsAttendance"), shift)
        showToast('positive', 'check', 'Form Added');
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Please fill out all fields');
    }
};

</script>



<style scoped></style>