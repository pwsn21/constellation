<template>
    <div class="q-pa-md" style="max-width: 400px">

        <q-form @submit.prevent="saveprofile" class="q-gutter-md">
            <div class="flex justify-center">
                <q-input filled v-model="firstName" label="First Name" lazy-rules :rules="[
                    val => (isValidFirstName(val).valid) || (isValidFirstName(val).message),]" />
                <q-input filled v-model="lastName" label="Last Name" lazy-rules :rules="[
                    val => (isValidLastName(val).valid) || (isValidLastName(val).message),]" />
            </div>
            <q-input filled type="tel" mask="(###) ### - ####" hint="(###) ### - ####" v-model="phoneNumber"
                label="Phone Number" lazy-rules
                :rules="[val => (isValidPhone(val).valid) || (isValidPhone(val).message),]" />

            <q-input filled mask="######" v-model="employeeNumber" label="Employee Number" lazy-rules
                :rules="[val => (isValidEmployeeNumber(val).valid) || (isValidEmployeeNumber(val).message),]" />

            <q-select filled v-model="station" :options="stationOptions" label="Station" option-label="name" lazy-rules
                :rules="[val => !!val || 'Station is required']" />

            <q-select filled v-model="status" :options="statusOptions" label="Status" lazy-rules
                :rules="[val => !!val || 'Status is required']" />

            <q-select filled v-model="car" :options="carOptions" label="Car" lazy-rules option-label="unit"
                :rules="[val => !!val || 'car is required']" />

            <q-select filled v-model="role" :options="roleOptions" label="Role" lazy-rules
                :rules="[val => !!val || 'Role is required']" />

            <q-select filled v-model="cohort" :options="cohortOptions" label="Cohort" v-if="role === 'Mentee'" lazy-rules
                :rules="[val => !!val || 'Cohort is required']" />
            <div>
                <q-btn label="Save" type="submit" color="primary" />
            </div>
        </q-form>
        {{ station }}
    </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { doc, setDoc, getDoc, getDocs, collection, onSnapshot, updateDoc, getFirestore } from "firebase/firestore";

const firebaseUser = useFirebaseUser()
const db = getFirestore();

// Inputs
const firstName = ref();
const lastName = ref();
const phoneNumber = ref();
const employeeNumber = ref();
const station = ref();
const status = ref();
const car = ref();
const role = ref();
const cohort = ref();


// Toast Function
const q = useQuasar()
function showToast(color, message) {
    q.notify({
        color: color,
        textColor: 'white',
        icon: 'check',
        message: message,
        position: 'top'
    });
}

const docRef = doc(db, "users", firebaseUser.value.uid);
const docSnap = await getDoc(docRef);


// Profile Check
if (docSnap.exists()) {
    firstName.value = docSnap.data().firstName
    lastName.value = docSnap.data().lastName
    employeeNumber.value = docSnap.data().employeeNumber
    phoneNumber.value = docSnap.data().phoneNumber
    station.value = docSnap.data().station
    status.value = docSnap.data().status
    car.value = docSnap.data().car
    role.value = docSnap.data().role
    cohort.value = docSnap.data().cohort
}
// else {
//     setDoc(doc(db, "users", firebaseUser.value.uid), {
//         // firstName: '',
//         // lastName: '',
//         // role: ''
//         cohort: 'notmentee'
//     })
//     // firstName.value = ""
//     // lastName.value = ""
//     // role.value = ""
// }

// Select Options
const roleOptions = ['Mentee', 'Mentor', 'Admin']
const cohortOptions = ['2023-1', '2023-2', '2023-3']
const statusOptions = ['Casual', 'Full-time Irregularly Scheduled', 'Full-time Regularly Scheduled']

console.log(station.value.id)

const stationCollection = collection(db, 'stations')
const carsCollection = collection(db, 'stations', station.value.id, 'cars')
const stationOptions = []
const carOptions = []

const querystnSnapshot = await getDocs(stationCollection);
querystnSnapshot.forEach((doc) => {
    stationOptions.push({
        id: doc.id,
        name: doc.data().number + ' - ' + doc.data().city
    })
});

const querycarSnapshot = await getDocs(carsCollection);
querycarSnapshot.forEach((doc) => {
    carOptions.push({
        id: doc.id,
        unit: doc.data().unit
    })
});

// Save Profile Function
const saveprofile = async () => {
    try {
        if (role.value === 'Mentee') {
            await setDoc(doc(db, "users", firebaseUser.value.uid), {
                firstName: firstName.value,
                lastName: lastName.value,
                phoneNumber: phoneNumber.value,
                employeeNumber: employeeNumber.value,
                station: station.value,
                status: status.value,
                car: car.value,
                role: role.value,
                cohort: cohort.value
            });
            showToast('positive', 'Saved Mentee');
            console.log("savedmentee");
        }

        else {
            await setDoc(doc(db, "users", firebaseUser.value.uid), {
                firstName: firstName.value,
                lastName: lastName.value,
                phoneNumber: phoneNumber.value,
                employeeNumber: employeeNumber.value,
                station: station.value,
                status: status.value,
                car: car.value,
                role: role.value,
            }, { merge: true });
            showToast('positive', 'Saved Non Mentee');
            console.log("savednonmentee");
        }
    }
    //doesn't do anything....
    catch (error) {
        console.error(error)
        showToast('negative', 'Error');
    }
};

</script>
<style scoped></style>