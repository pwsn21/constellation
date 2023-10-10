<template>
    <div class="q-pa-md full-width" style="max-width: 450px;">
        <q-card class="q-pa-md">
            <q-form @submit.prevent="addAttendance">
                <div>
                    <q-select label="Milestone" v-model="shift.milestone"
                        :options="['Milestone 2', 'Milestone 3', 'Milestone 4']" filled />
                    <dateTimePicker v-model="shift.date" :date="shift.date" @update:date="updateShiftDate"
                        label="Shift Date" />
                    <selectorCar v-model="shift.car" @update:car="updateCar" />
                    <selectorMentor v-model="shift.mentor" @update:mentor="updateMentor" />
                </div>
                <div class="q-mt-xs row reverse q-gutter-sm">
                    <q-btn class="q-mr-sm" label="Add Attendance" type="submit" color="primary" />
                </div>
            </q-form>
        </q-card>
    </div>
</template>

<script setup>
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
const db = getFirestore()
const firebaseUser = useFirebaseUser()

const profileData = reactive(await (userData(firebaseUser.value.uid)))
const menteeProfileData = reactive(await (menteeData('1gvuIqcoVafmikRg10U95rp7pnz1_2023-3')))

const shift = reactive({
    date: undefined,
    car: undefined,
    mentorName: undefined,
    mentorID: undefined,
    approvalStatus: 'Pending',
    cohort: profileData.cohort,
    milestone: undefined,
    ppedName: menteeProfileData.pped.label,
    ppedID: menteeProfileData.pped.value,
    formType: 'attendance',
    // mID: firebaseUser.value.uid + "_" + profileData.cohort,
    mID: '1gvuIqcoVafmikRg10U95rp7pnz1_2023-3',
    // name: profileData.firstName + " " + profileData.lastName,
    name: 'Mentee Zulu',
    submittedOn: undefined,
})

const updateCar = (selectedCars) => { shift.car = selectedCars.label }
const updateMentor = (selectedMentor) => { shift.mentorName = selectedMentor.label, shift.mentorID = selectedMentor.value }
const updateShiftDate = (date) => { shift.date = date }

const { showToast } = useNotification();

const addAttendance = async () => {
    try {
        shift.date = new Date(shift.date)
        shift.submittedOn = serverTimestamp()
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