<template>
    <div class="q-pa-md tw-grid-cols-2" style="max-width: 600px">

        <q-page padding>
            <q-form @submit.prevent="saveprofile" class="q-gutter-md">
                <q-card>

                    <q-card-section>
                        <div class="text-h5 tw-pb-2">Personal</div>
                        <q-input filled v-model="profileData.firstName" label="First Name" lazy-rules :rules="[
                            val => (isValidFirstName(val).valid) || (isValidFirstName(val).message),]" />
                        <q-input filled v-model="profileData.lastName" label="Last Name" lazy-rules :rules="[
                            val => (isValidLastName(val).valid) || (isValidLastName(val).message),]" />


                        <q-input filled type="tel" mask="(###) ### - ####" hint="(###) ### - ####"
                            v-model="profileData.phoneNumber" label="Phone Number" lazy-rules
                            :rules="[val => (isValidPhone(val).valid) || (isValidPhone(val).message),]" />
                    </q-card-section>

                    <q-card-section>
                        <!-- Address Fields -->
                        <q-input filled v-model="profileData.address" label="Address" lazy-rules
                            :rules="[val => !!val || 'Address is required']" />
                        <q-input filled v-model="profileData.city" label="City" lazy-rules
                            :rules="[val => !!val || 'City is required']" />
                        <q-input filled v-model="profileData.province" label="Province" lazy-rules
                            :rules="[val => !!val || 'Province is required']" />
                        <q-input filled v-model="profileData.country" label="Country" lazy-rules
                            :rules="[val => !!val || 'Country is required']" />
                    </q-card-section>
                </q-card>
                <q-card>
                    <q-card-section>
                        <div class="text-h5 tw-pb-2">Employee Information</div>
                        <q-input filled mask="######" v-model="profileData.employeeNumber" label="Employee Number"
                            lazy-rules
                            :rules="[val => (isValidEmployeeNumber(val).valid) || (isValidEmployeeNumber(val).message),]" />


                        <q-select filled v-model="profileData.station" :options="stationOptions" label="Station" lazy-rules
                            :rules="[val => !!val || 'Station is required']" @update:model-value="stationSelected" />

                        <q-select filled v-model="profileData.status" :options="statusOptions" label="Status" lazy-rules
                            :rules="[val => !!val || 'Status is required']" />

                        <q-select filled v-model="profileData.car" :options="carOptions" label="Car" lazy-rules
                            option-label="unit" v-if="profileData.status === 'Full-time Regularly Scheduled'"
                            :rules="[val => !!val || 'car is required']" />
                    </q-card-section>
                    <q-card-section>
                        <q-select filled v-model="profileData.role" :options="roleOptions" label="Role" lazy-rules
                            :rules="[val => !!val || 'Role is required']" />

                        <q-select filled v-model="profileData.cohort" :options="cohortOptions" label="Cohort"
                            v-if="profileData.role === 'Mentee'" lazy-rules
                            :rules="[val => !!val || 'Cohort is required']" />
                    </q-card-section>
                </q-card>
                <div>
                    <q-btn label="Save" type="submit" color="primary" />
                </div>
            </q-form>
        </q-page>
    </div>
</template>


<script setup>
import { doc, setDoc, getDoc, getDocs, collection, onSnapshot, updateDoc, getFirestore } from "firebase/firestore";

const stationOptions = []
const cohortOptions = []
const statusOptions = ['Casual', 'Full-time Irregularly Scheduled', 'Full-time Regularly Scheduled']
const roleOptions = ['Mentee', 'Mentor', 'Admin']
const carOptions = ref([])

let profileData = reactive({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
    country: "",
    employeeNumber: "",
    station: "",
    status: "",
    role: "",
    cohort: "",
    car: "",
})

const firebaseUser = useFirebaseUser()
const db = getFirestore();
const docRef = doc(db, "users", firebaseUser.value.uid);
const docSnap = await getDoc(docRef);


// Profile Check
if (docSnap.exists()) {
    profileData = reactive({
        firstName: docSnap.data().firstName,
        lastName: docSnap.data().lastName,
        phoneNumber: docSnap.data().phoneNumber,
        address: docSnap.data().address,
        city: docSnap.data().city,
        province: docSnap.data().province,
        country: docSnap.data().country,
        employeeNumber: docSnap.data().employeeNumber,
        station: docSnap.data().station,
        status: docSnap.data().status,
        car: docSnap.data().car,
        role: docSnap.data().role,
        cohort: docSnap.data().cohort,
    })
}


const stationCollection = await getDocs(collection(db, "stations"));

stationCollection.forEach((station) => {
    stationOptions.push({
        label: station.id + " - " + station.data().city,
        value: station.id
    });
});

const acpoCohortCollection = await getDocs(collection(db, "acpoCohort"));

acpoCohortCollection.forEach((cohort) => {
    cohortOptions.push({
        label: cohort.id,
        value: cohort.id
    });
});


const stationSelected = async () => {
    profileData.car = "";
    while (carOptions.value.length) { carOptions.value.pop(); }
    const docRef = doc(db, "stations", profileData.station.value);
    const docSnap = await getDoc(docRef);
    docSnap.data().cars.forEach((car) => {
        carOptions.value.push(car);
    })
};

const { showToast } = useNotification();

// Save Profile Function
const saveprofile = async () => {
    try {
        await setDoc(doc(db, "users", firebaseUser.value.uid), {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            phoneNumber: profileData.phoneNumber,
            address: profileData.address,
            city: profileData.city,
            province: profileData.province,
            country: profileData.country,
            employeeNumber: profileData.employeeNumber,
            station: profileData.station,
            status: profileData.status,
            car: profileData.car,
            role: profileData.role,
            cohort: profileData.cohort
        }, { merge: true });
        showToast('positive', 'check', 'Profile Saved');
    }

    //doesn't do anything....
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Error');
    }
};

</script>
<style scoped></style>