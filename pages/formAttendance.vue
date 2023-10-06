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
import { addDoc, collection, getFirestore } from "firebase/firestore";
const db = getFirestore()
const firebaseUser = useFirebaseUser()

const profileData = reactive(await (userData(firebaseUser.value.uid)))
const menteeProfileData = reactive(await (menteeData(firebaseUser.value.uid + "_" + profileData.cohort)))

const shift = reactive({
    date: null,
    car: null,
    mentor: null,
    mentorApproval: 'pending',
    cohort: profileData.cohort,
    milestone: null,
    pped: menteeProfileData.pped,
    formType: 'attendance',
    // mID: firebaseUser.value.uid + "_" + profileData.cohort,
    mID: '0meA1S9c9yMoGYGjfoWUaJJrHQS2_2023-3',
    // name: profileData.firstName + " " + profileData.lastName
    name: 'Winnie Pooh'
})

const updateCar = (selectedCars) => { shift.car = selectedCars.label }
const updateMentor = (selectedMentor) => { shift.mentor = selectedMentor }
const updateShiftDate = (date) => { shift.date = date }

const { showToast } = useNotification();

const addAttendance = async () => {
    try {
        shift.date = new Date(shift.date)
        await addDoc(collection(db, "scheduledShifts"), shift)
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