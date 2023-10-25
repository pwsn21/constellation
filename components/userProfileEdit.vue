<template>
    <div class="full-width">
        <q-page>
            <q-form @submit.prevent="saveprofile">
                <div class="row justify-between q-gutter-sm q-mt-sm">
                    <q-card class="w-full" style="width: 400px;">
                        <q-card-section>
                            <div class="text-h5">Personal</div>
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
                                label="Country" lazy-rules :rules="[val => !!val || 'Country is required']"
                                @update:model-value="countrySelected" @filter="filterCountry" use-input
                                input-debounce="250" />

                            <q-select filled dense v-model="profileData.state" :options="options.filteredState"
                                label="Province\State" lazy-rules :rules="[val => !!val || 'Province\State is required']"
                                @update:model-value="stateSelected" @filter="filterState" use-input input-debounce="250" />

                            <q-select filled dense v-model="profileData.city" :options="options.filteredCity" label="City"
                                lazy-rules :rules="[val => !!val || 'City is required']" @filter="filterCity" use-input
                                input-debounce="250" />

                        </q-card-section>
                    </q-card>

                    <q-card class="w-full" style="width: 400px;">
                        <q-card-section>
                            <div class="text-h5">Employee Information</div>
                            <q-input filled dense mask="######" v-model="profileData.employeeNumber" label="Employee Number"
                                lazy-rules
                                :rules="[val => (isValidEmployeeNumber(val).valid) || (isValidEmployeeNumber(val).message),]" />

                            <q-select filled dense v-model="profileData.station" :options="options.station" label="Station"
                                emit-value lazy-rules :rules="[val => !!val || 'Station is required']"
                                @update:model-value="stationSelected" map-options />

                            <q-select filled dense v-model="profileData.status" :options="options.status" label="Status"
                                lazy-rules :rules="[val => !!val || 'Status is required']"
                                @update:model-value="statusSelected" />

                            <q-select filled dense v-model="profileData.car" :options="options.car" label="Car" lazy-rules
                                v-if="profileData.status === 'Full-time Regularly Scheduled'"
                                :rules="[val => !!val || 'Car is required']" />
                            <q-select filled dense v-model="profileData.platoon" :options="options.platoon" label="Platoon"
                                lazy-rules
                                v-if="profileData.status === 'Full-time Regularly Scheduled' || profileData.status === 'Full-time Irregularly Scheduled'"
                                :rules="[val => !!val || 'Platoon is required']" />
                            <q-select filled dense v-model="profileData.rotation" :options="options.rotation"
                                label="Rotation" lazy-rules
                                v-if="profileData.status === 'Full-time Regularly Scheduled' || profileData.status === 'Full-time Irregularly Scheduled'"
                                :rules="[val => !!val || 'Rotation is required']" />
                        </q-card-section>
                        <q-separator />
                        <q-card-section v-if="isRole = 'admin'">
                            <q-select filled dense v-model="profileData.role" :options="options.role" label="Role"
                                lazy-rules :rules="[val => !!val || 'Role is required']"
                                @update:model-value="roleSelected" />
                            <q-select filled dense v-model="profileData.cohort" :options="options.cohort" label="Cohort"
                                v-if="profileData.role === 'Mentee'" lazy-rules
                                :rules="[val => !!val || 'Cohort is required']" />
                        </q-card-section>
                    </q-card>
                </div>

                <div class="q-mt-xs row reverse q-gutter-sm">
                    <q-btn class="q-mr-sm" label="Save" type="submit" color="primary" />
                    <q-btn class="q-mr-sm" label="Close" color="secondary"
                        @click="$emit('adminUserMode', userID.selectedUserID, 'userView')" />
                </div>
            </q-form>
        </q-page>
    </div>
</template>


<script setup>
import { doc, setDoc, getDoc, getDocs, collection, getFirestore, query, where, updateDoc, arrayUnion } from "firebase/firestore";
import { Country, State, City } from 'country-state-city';


const emit = defineEmits(["adminUserMode"])
const userID = defineProps(['selectedUserID'])

const db = getFirestore()
const firebaseUser = useFirebaseUser()
const isAdmin = useIsAdminUser()
const isRole = await useIsRole()
const toEdit = ref('')
toEdit.value = userID.selectedUserID ? userID.selectedUserID : firebaseUser.value.uid

let profileData = await (userData(toEdit.value)) ? reactive(await (userData(toEdit.value))) :
    reactive({
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
    country: [],
    state: [],
    city: [],
    filteredCountry: [],
    filteredState: [],
    filteredCity: [],
    station: [],
    status: ['Casual', 'Full-time Irregularly Scheduled', 'Full-time Regularly Scheduled'],
    car: [],
    platoon: ['A', 'B', 'C', 'D', 'Off Platoon'],
    rotation: ['R1', 'R2', 'R3', 'R4', 'Off Platoon'],
    cohort: [],
    role: [
        {
            label: 'Mentee',
            value: 'mentee',
        },
        {
            label: 'Mentor',
            value: 'mentor',
        },
        {
            label: 'Paramedic Practice Educator',
            value: 'pped',
        },
        {
            label: 'Admin',
            value: 'admin',
        },
    ]
})

//Country-State-City Picker
const countryList = Country.getAllCountries()
countryList.forEach((country) => {
    options.country.push({
        label: country.name,
        value: country.isoCode,
    })
})

const countrySelected = async () => {
    profileData.state = ""
    options.state.length = 0
    const statesByCountry = State.getStatesOfCountry(profileData.country.value)
    statesByCountry.forEach((state) => {
        options.state.push({
            label: state.name,
            value: state.isoCode,
            countryCode: state.countryCode,
        })
    })
};

const stateSelected = async () => {
    profileData.city = ""
    options.city.length = 0
    const citiesByState = City.getCitiesOfState(profileData.state.countryCode, profileData.state.value)
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
                return option.label.toLowerCase().includes(val);
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
                return option.label.toLowerCase().includes(val)
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

//Options 
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
        options.car.push(car.label);
    })
};

const statusSelected = () => {
    profileData.car = ""
    profileData.platoon = ""
    profileData.rotation = ""
}

const roleSelected = () => {
    profileData.cohort = ""
}

//Display only active cohorts as options
const acpoCohortCollection = collection(db, "acpoCohort");
const qActiveCohorts = query(acpoCohortCollection, where("status", "==", "active"));
const cohortsActive = await getDocs(qActiveCohorts);
cohortsActive.forEach((cohort) => {
    options.cohort.push(
        cohort.id
    );
});

const { showToast } = useNotification();

// Save Profile Function
const saveprofile = async () => {
    try {
        await setFSDoc("users", toEdit.value, profileData, true)
        await updateDoc(doc(db, 'groups', 'conRoles'), { [profileData.role]: arrayUnion(toEdit.value) })

        showToast('positive', 'check', 'Profile Saved')
        if (profileData.role === 'Mentee') {
            await setDoc(doc(db, "acpoMentees", toEdit.value + "_" + profileData.cohort), {
                userID: toEdit.value,
                cohort: profileData.cohort,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
            }, { merge: true })
            showToast('positive', 'check', 'Mentee Profile Updated')
        }
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Error')
    }
};

</script>
<style scoped></style>