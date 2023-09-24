<template>
    <div class="q-pa-md row justify-center full-width">

        <q-page padding>
            <q-form @submit.prevent="saveprofile" class="q-gutter-md">
                <div class="row">
                    <div>
                        <q-card class="q-mt-sm q-mr-sm w-full" style="width: 350px;">
                            <q-card-section>
                                <div class="text-h5 tw-pb-2">Personal</div>
                                <q-input filled dense v-model="profileData.firstName" label="First Name" lazy-rules :rules="[
                                    val => (isValidFirstName(val).valid) || (isValidFirstName(val).message),]" />
                                <q-input filled dense v-model="profileData.lastName" label="Last Name" lazy-rules :rules="[
                                    val => (isValidLastName(val).valid) || (isValidLastName(val).message),]" />


                                <q-input filled dense type="tel" mask="(###) ### - ####" hint="(###) ### - ####"
                                    v-model="profileData.phoneNumber" label="Phone Number" lazy-rules
                                    :rules="[val => (isValidPhone(val).valid) || (isValidPhone(val).message),]" />
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <!-- Address Fields -->
                                <q-input filled dense v-model="profileData.address" label="Address" lazy-rules
                                    :rules="[val => !!val || 'Address is required']" />

                                <q-select filled dense v-model="profileData.country" :options="options.filteredCountry"
                                    label="Country" option-label="name" lazy-rules
                                    :rules="[val => !!val || 'Country is required']" @update:model-value="countrySelected"
                                    @filter="filterCountry" use-input input-debounce="250" />

                                <q-select filled dense v-model="profileData.state" :options="options.filteredState"
                                    option-label="name" label="Province\State" lazy-rules
                                    :rules="[val => !!val || 'Province\State is required']"
                                    @update:model-value="stateSelected" @filter="filterState" use-input
                                    input-debounce="250" />

                                <q-select filled dense v-model="profileData.city" :options="options.filteredCity"
                                    label="City" lazy-rules :rules="[val => !!val || 'City is required']"
                                    @filter="filterCity" use-input input-debounce="250" />

                            </q-card-section>
                        </q-card>
                    </div>
                    <div>
                        <q-card class="q-mt-sm q-mr-sm w-full" style="width: 350px;">
                            <q-card-section>
                                <div class="text-h5 tw-pb-2">Employee Information</div>
                                <q-input filled dense mask="######" v-model="profileData.employeeNumber"
                                    label="Employee Number" lazy-rules
                                    :rules="[val => (isValidEmployeeNumber(val).valid) || (isValidEmployeeNumber(val).message),]" />


                                <q-select filled dense v-model="profileData.station" :options="options.station"
                                    label="Station" emit-value lazy-rules :rules="[val => !!val || 'Station is required']"
                                    @update:model-value="stationSelected" />

                                <q-select filled dense v-model="profileData.status" :options="options.status" label="Status"
                                    lazy-rules :rules="[val => !!val || 'Status is required']" />

                                <q-select filled dense v-model="profileData.car" :options="options.car" label="Car"
                                    lazy-rules v-if="profileData.status === 'Full-time Regularly Scheduled'"
                                    :rules="[val => !!val || 'Car is required']" />
                                <q-select filled dense v-model="profileData.platoon" :options="options.platoon"
                                    label="Platoon" lazy-rules
                                    v-if="profileData.status === 'Full-time Regularly Scheduled' || profileData.status === 'Full-time Irregularly Scheduled'"
                                    :rules="[val => !!val || 'Platoon is required']" />
                                <q-select filled dense v-model="profileData.rotation" :options="options.rotation"
                                    label="Rotation" lazy-rules
                                    v-if="profileData.status === 'Full-time Regularly Scheduled' || profileData.status === 'Full-time Irregularly Scheduled'"
                                    :rules="[val => !!val || 'Rotation is required']" />


                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <q-select filled dense v-model="profileData.role" :options="options.role" label="Role"
                                    lazy-rules :rules="[val => !!val || 'Role is required']" />

                                <q-select filled dense v-model="profileData.cohort" :options="options.cohort" label="Cohort"
                                    v-if="profileData.role === 'Mentee'" lazy-rules
                                    :rules="[val => !!val || 'Cohort is required']" />
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
                <div>
                    <q-btn class="q-mr-sm" label="Cancel" color="red-5" @click="$emit('change', 'profileView')" />
                    <q-btn class="q-mr-sm" label="Save" type="submit" color="primary" />
                </div>
            </q-form>
        </q-page>
    </div>
</template>


<script setup>
import { doc, setDoc, getDoc, getDocs, collection, getFirestore } from "firebase/firestore";
import { Country, State, City } from 'country-state-city';

const emit = defineEmits(["change"])

let profileData = reactive({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    employeeNumber: "",
    station: "",
    status: "",
    role: "",
    cohort: "",
    car: "",
    platoon: "",
    rotation: "",
})

const options = reactive({
    country: Country.getAllCountries(),
    state: [],
    city: [],
    filteredCountry: [],
    filteredState: [],
    filteredCity: [],
    station: [],
    status: ['Casual', 'Full-time Irregularly Scheduled', 'Full-time Regularly Scheduled'],
    car: [],
    platoon: ['A', 'B', 'C', 'D'],
    rotation: ['R1', 'R2', 'R3', 'R4'],
    cohort: [],
    role: ['Mentee', 'Mentor', 'Paramedic Practice Educator', 'Admin']
})

const firebaseUser = useFirebaseUser()
const db = getFirestore();
const docRef = doc(db, "users", firebaseUser.value.uid);
const docSnap = await getDoc(docRef);

// Profile Check
if (docSnap.exists()) {


    profileData = reactive(docSnap.data())

    // profileData = reactive({
    //     firstName: docSnap.data().firstName,
    //     lastName: docSnap.data().lastName,
    //     phoneNumber: docSnap.data().phoneNumber,
    //     address: docSnap.data().address,
    //     city: docSnap.data().city,
    //     state: docSnap.data().state,
    //     country: docSnap.data().country,
    //     employeeNumber: docSnap.data().employeeNumber,
    //     station: docSnap.data().station,
    //     status: docSnap.data().status,
    //     car: docSnap.data().car,
    //     role: docSnap.data().role,
    //     cohort: docSnap.data().cohort,
    // })
}

const countrySelected = async () => {
    profileData.state = ""
    options.state.length = 0
    const statesByCountry = State.getStatesOfCountry(profileData.country.isoCode)
    statesByCountry.forEach((state) => {
        options.state.push(state)
    })
};

const stateSelected = async () => {
    profileData.city = ""
    options.city.length = 0
    const citiesByState = City.getCitiesOfState(profileData.state.countryCode, profileData.state.isoCode)
    citiesByState.forEach((city) => {
        options.city.push(city.name)
    })
};

async function filterCountry(val, update) {
    val = val.toLowerCase();
    if (val === '') {
        update(() => {
            options.filteredCountry = options.country;
        });
    } else {
        update(() => {
            options.filteredCountry = options.country.filter(option => {
                return option.name.toLowerCase().includes(val);
            });
        });
    }
}

async function filterState(val, update) {
    val = val.toLowerCase();
    if (val === '') {
        update(() => {
            options.filteredState = options.state
        })
    } else {
        update(() => {
            options.filteredState = options.state.filter(option => {
                return option.name.toLowerCase().includes(val)
            })
        })
    }
}

async function filterCity(val, update) {
    val = val.toLowerCase();
    if (val === '') {
        update(() => {
            options.filteredCity = options.city
        })
    } else {
        update(() => {
            options.filteredCity = options.city.filter(option => {
                return option.toLowerCase().includes(val)
            })
        })
    }
}

const stationCollection = await getDocs(collection(db, "stations"));

stationCollection.forEach((station) => {
    options.station.push({
        label: station.id + " - " + station.data().city,
        value: station.id
    });
});

const stationSelected = async () => {
    profileData.car = "";
    while (options.car.length) { options.car.pop(); }
    const docRef = doc(db, "stations", profileData.station);
    const docSnap = await getDoc(docRef);
    docSnap.data().cars.forEach((car) => {
        options.car.push(car);
    })
};

const acpoCohortCollection = await getDocs(collection(db, "acpoCohort"));

acpoCohortCollection.forEach((cohort) => {
    options.cohort.push(
        cohort.id
    );
});

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
            state: profileData.state,
            country: profileData.country,
            employeeNumber: profileData.employeeNumber,
            station: profileData.station,
            status: profileData.status,
            car: profileData.car,
            role: profileData.role,
            cohort: profileData.cohort,
            platoon: profileData.platoon,
            rotation: profileData.rotation,
        }, { merge: true });
        showToast('positive', 'check', 'Profile Saved');
        if (profileData.role === 'Mentee') {
            await setDoc(doc(db, "acpoTracker", firebaseUser.value.uid + "_" + profileData.cohort), {
                userID: firebaseUser.value.uid,
                cohort: profileData.cohort,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
            }, { merge: true });
            showToast('positive', 'check', 'Mentee Profile Updated');
        }

    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Error');
    }
};

</script>
<style scoped></style>