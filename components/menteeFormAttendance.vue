<template>
    <div class="q-pa-md full-width" style="max-width: 450px;">
        <q-card>
            <q-card-section class="q-my-sm text-center text-h4 bg-primary text-white"> Add Attendance </q-card-section>
            <q-card-section>
                <q-form @submit.prevent="addAttendance">
                    <div>
                        <q-select label="Milestone" v-model="shift.milestone"
                            :options="['Milestone 2', 'Milestone 3', 'Milestone 4']" filled />

                        <q-input filled label="Date" v-model="shift.date" @update:model-value="dateSelected">
                            <template #append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date v-model="shift.date" @update:model-value="dateSelected" today-btn>
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
                        <q-select filled label='Mentor' v-model="shift.mentorName" :options="options.mentor"
                            :rules="[val => !!val || 'Mentor is required']" />
                    </div>
                    <div class="q-mt-xs row reverse q-gutter-sm">
                        <q-btn class="q-mr-sm" label="Add Attendance" type="submit" color="primary" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
        <pre>{{ shift }}</pre>
    </div>
</template>

<script setup>
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
const db = getFirestore()
const firebaseUser = useFirebaseUser()

const profileData = reactive(await (userData(firebaseUser.value.uid)))
const menteeProfileData = reactive(await (menteeData('1gvuIqcoVafmikRg10U95rp7pnz1_2023-3')))
const menteeShifts = await qMenteeShifts('1gvuIqcoVafmikRg10U95rp7pnz1_2023-3')

const shift = reactive({
    date: undefined,
    car: undefined,
    station: undefined,
    mentorName: 'Patrick',
    mentorID: 'CYHU9R0b9RWF93RpOm5lGpHLCm02',
    approvalStatus: 'Pending',
    cohort: menteeProfileData.cohort,
    milestone: menteeProfileData.currentMilestone,
    ppedName: menteeProfileData.pped.label,
    ppedID: menteeProfileData.pped.value,
    formType: 'attendance',
    // mID: firebaseUser.value.uid + "_" + menteeProfileData.cohort,
    menteeID: '1gvuIqcoVafmikRg10U95rp7pnz1_2023-3',
    // name: menteeProfileData.firstName + " " + menteeProfileData.lastName,
    name: 'Mentee Zulu',
    submittedOn: serverTimestamp(),
})

const options = reactive({
    station: await getStations(),
    car: [],
    mentor: [],
})

const stationSelected = async (car) => {
    shift.car = undefined
    options.car = await getCars(shift.station)
}

const dateSelected = async (date) => {
    const scheduledShift = menteeShifts.shiftData.value.find(item => item.shiftEvent === date)
    shift.mentorName = scheduledShift.mentorName
    shift.mentorID = scheduledShift.mentorID
    shift.station = scheduledShift.station
    shift.car = scheduledShift.car
}

const updateCar = (selectedCars) => { shift.car = selectedCars.label }
const updateMentor = (selectedMentor) => { shift.mentorName = selectedMentor.label, shift.mentorID = selectedMentor.value }

const { showToast } = useNotification();

const addAttendance = async () => {
    try {
        await addDoc(collection(db, "acpoFormsAttendance"), shift)
        showToast('positive', 'check', 'Form Added');
        navigateTo('/')
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Please fill out all fields');
    }
};

</script>



<style scoped></style>