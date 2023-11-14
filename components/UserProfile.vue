<template>
    <div style="min-width: 375px; max-width: 850px;">
        <q-form @submit.prevent="saveProfile">
            <div class="text-subtitle1 text-weight-bold flex justify-between">
                <div> Name : {{ props.user.name }} </div>
                <q-btn size="sm" v-if="!isEdit" flat color="primary" icon="edit" label="Edit" @click="isEdit = !isEdit" />
            </div>
            <q-separator inset />

            <div class="full-width">
                <div class="flex-center q-gutter-sm">
                    <q-card class="q-pa-sm" style="width:375px;">
                        <div class="text-subtitle1 text-weight-bold">Contact Information </div>
                        <q-separator inset />
                        <div v-if="props.user">
                            <div>
                                <div class="row items-center">
                                    <div class="col-3 text-right q-pr-sm">First Name:</div>
                                    <Transition name="fade" mode="out-in">
                                        <div v-if="!isEdit" class="row items-center">
                                            {{ props.user ? props.user.firstName : 'loading' }}
                                        </div>
                                        <div v-else>
                                            <q-input filled dense v-model="props.user.firstName" label="First Name"
                                                :style="inputWidth" />
                                        </div>
                                    </Transition>
                                </div>
                                <div class="row items-center">
                                    <div class="col-3 text-right q-pr-sm">Last Name:</div>
                                    <Transition name="fade" mode="out-in">
                                        <div v-if="!isEdit" class="row items-center">
                                            {{ props.user ? props.user.lastName : 'loading' }}
                                        </div>
                                        <div v-else>
                                            <q-input filled dense v-model="props.user.lastName" label="Last Name"
                                                :style="inputWidth" />
                                        </div>
                                    </Transition>
                                </div>
                                <div class="row items-center">
                                    <div class="col-3 text-right q-pr-sm">Phone:</div>
                                    <Transition name="fade" mode="out-in">
                                        <div v-if="!isEdit" class="row items-center">
                                            {{ props.user ? props.user.phoneNumber : 'loading' }}
                                        </div>
                                        <div v-else>
                                            <q-input filled dense type="tel" mask="###-###-####" :style="inputWidth"
                                                v-model="props.user.phoneNumber" label="Phone Number" hide-bottom-space
                                                lazy-rules
                                                :rules="[val => (isValidPhone(val).valid) || (isValidPhone(val).message),]" />
                                        </div>
                                    </Transition>
                                </div>
                                <div class="row items-center q-mt-sm">
                                    <div class="col-3 text-right q-pr-sm">Address:</div>
                                    <Transition name="fade" mode="out-in">
                                        <div v-if="!isEdit">
                                            <div>
                                                {{ props.user.address }}
                                            </div>
                                            <div>
                                                {{ props.user.city }}
                                            </div>
                                            <div>
                                                {{ props.user.state.label }}
                                            </div>
                                            <div>
                                                {{ props.user.state.countryCode }}
                                            </div>
                                        </div>
                                        <div v-else>
                                            <q-input filled dense v-model="props.user.address" label="Address" type="text"
                                                :style="inputWidth" hide-bottom-space lazy-rules
                                                :rules="[val => !!val || 'Address is required']" />
                                            <q-select filled dense v-model="props.user.country" hide-bottom-space
                                                :style="inputWidth" :options="options.filteredCountry" label="Country"
                                                lazy-rules :rules="[val => !!val || 'Country is required']"
                                                @update:model-value="countrySelected" @filter="filterCountry" use-input
                                                input-debounce="250" />
                                            <q-select filled dense v-model="props.user.state"
                                                :options="options.filteredState" :style="inputWidth" hide-bottom-space
                                                label="Province\State" lazy-rules
                                                :rules="[val => !!val || 'Province\State is required']"
                                                @update:model-value="stateSelected" @filter="filterState" use-input
                                                input-debounce="250" />
                                            <q-select filled dense v-model="props.user.city" :options="options.filteredCity"
                                                :style="inputWidth" hide-bottom-space label="City" lazy-rules
                                                :rules="[val => !!val || 'City is required']" @filter="filterCity" use-input
                                                input-debounce="250" />
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                    </q-card>
                    <q-card class="q-pa-sm" style="width:375px;">
                        <div class="text-subtitle1 text-weight-bold">Employee Information </div>
                        <q-separator inset />
                        <div v-if="props.user">
                            <div>
                                <div class="row items-center">
                                    <div class="col-3 text-right q-pr-sm">PHSA#:</div>
                                    <Transition name="fade" mode="out-in">
                                        <div v-if="!isEdit" class="row items-center">
                                            {{ props.user.employeeNumber }}
                                        </div>
                                        <div v-else>
                                            <q-input v-model="props.user.employeeNumber" filled dense mask="######"
                                                label="Employee Number" lazy-rules hide-bottom-space :style="inputWidth"
                                                :rules="[val => (isValidEmployeeNumber(val).valid) || (isValidEmployeeNumber(val).message),]" />
                                        </div>
                                    </Transition>
                                </div>
                                <div class="row items-center">
                                    <div class="col-3 text-right q-pr-sm">Station:</div>
                                    <Transition name="fade" mode="out-in">
                                        <div v-if="!isEdit" class="row items-center">
                                            {{ props.user.station }}
                                        </div>
                                        <div v-else>
                                            <q-select filled dense v-model="props.user.station" :options="options.station"
                                                label="Station" :style="inputWidth" emit-value lazy-rules hide-bottom-space
                                                :rules="[val => !!val || 'Station is required']"
                                                @update:model-value="stationSelected" map-options />
                                        </div>
                                    </Transition>
                                </div>
                                <div class="row items-center">
                                    <div class="col-3 text-right q-pr-sm">Status:</div>
                                    <Transition name="fade" mode="out-in">
                                        <div v-if="!isEdit" class="row items-center">
                                            {{ props.user.status }}
                                        </div>
                                        <div v-else>
                                            <q-select filled dense v-model="props.user.status" :options="options.status"
                                                :style="inputWidth" label="Status" lazy-rules hide-bottom-space
                                                :rules="[val => !!val || 'Status is required']" />
                                        </div>
                                    </Transition>
                                </div>
                                <div class="row items-center" v-if="props.user.status === 'Full-time Regularly Scheduled'">
                                    <div class="col-3 text-right q-pr-sm">Car:</div>
                                    <Transition name="fade" mode="out-in">
                                        <div v-if="!isEdit" class="row items-center">
                                            {{ props.user.car }}
                                        </div>
                                        <div v-else>
                                            <q-select filled dense v-model="props.user.car" :options="options.car"
                                                label="Car" hide-bottom-space lazy-rules :style="inputWidth"
                                                :rules="[val => !!val || 'Car is required']" />
                                        </div>
                                    </Transition>
                                </div>
                                <div class="row items-center"
                                    v-if="profileData.status === 'Full-time Regularly Scheduled' || profileData.status === 'Full-time Irregularly Scheduled'">
                                    <div class="col-3 text-right q-pr-sm">Platoon:</div>
                                    <Transition name="fade" mode="out-in">
                                        <div v-if="!isEdit" class="row items-center">
                                            {{ props.user.platoon }}
                                        </div>
                                        <div v-else>
                                            <q-select filled dense v-model="props.user.platoon" :options="options.platoon"
                                                label="Platoon" lazy-rules :style="inputWidth" hide-bottom-space
                                                :rules="[val => !!val || 'Platoon is required']" />
                                        </div>
                                    </Transition>
                                </div>
                                <div class="row items-center"
                                    v-if="profileData.status === 'Full-time Regularly Scheduled' || profileData.status === 'Full-time Irregularly Scheduled'">
                                    <div class="col-3 text-right q-pr-sm">Rotation:</div>
                                    <Transition name="fade" mode="out-in">
                                        <div v-if="!isEdit" class="row items-center">
                                            {{ props.user.rotation }}
                                        </div>
                                        <div v-else>
                                            <q-select filled dense v-model="props.user.rotation" :options="options.rotation"
                                                label="Rotation" lazy-rules :style="inputWidth" hide-bottom-space
                                                :rules="[val => !!val || 'Rotation is required']" />
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                    </q-card>
                </div>
                <div v-if="isEdit" class="flex justify-end q-gutter-sm">
                    <q-btn size="sm" color="positive" label="Save" type="submit" />
                    <q-btn size="sm" color="negative" label="Cancel" @click="isEdit = !isEdit" />
                </div>
            </div>
            <!-- <div class="text-subtitle1 text-weight-bold">Assigned Roles</div> -->
            <q-separator inset />
            <div v-if="props.user">
                <div class="row q-my-md">
                    <div class="col-2 q-pr-sm" style="width: 125px">Assigned Role(s):</div>
                    <div v-if="isEdit && profileData.role.includes('admin')" class="col">
                        <UserRoleAdmin :user="props.user" />
                    </div>
                    <div v-else>
                        <div v-for="r in props.user.role">
                            <q-badge v-if="roles(r)[0].value === 'admin'" color="red">
                                {{ roles(r)[0].label }}
                            </q-badge>
                            <q-badge v-else color="blue">
                                {{ roles(r)[0].label }}
                            </q-badge>
                        </div>
                    </div>
                </div>
            </div>
        </q-form>
    </div>
</template>
<script setup>
import { doc, getDoc, getDocs, collection, getFirestore } from "firebase/firestore";
import { Country, State, City } from 'country-state-city';

const db = getFirestore()
const props = defineProps(['user'])
const isEdit = ref(false)
const inputWidth = 'width: 222px'

const firebaseUser = await useFirebaseUser()
const profileData = await getUD(firebaseUser.value.uid)

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
})

//Options 
const stationCollection = await getDocs(collection(db, "stations"));
stationCollection.forEach((station) => {
    options.station.push({
        label: station.id + " - " + station.data().city,
        value: station.id
    });
});

const stationSelected = async () => {
    props.user.car = "";
    while (options.car.length) { options.car.pop(); }
    const docRef = doc(db, "stations", props.user.station);
    const docSnap = await getDoc(docRef);
    docSnap.data().carLabel.forEach((car) => {
        options.car.push(car);
    })
};

//Country State Picker
const countryList = Country.getAllCountries()
countryList.forEach((country) => {
    options.country.push({
        label: country.name,
        value: country.isoCode,
    })
})

const countrySelected = async () => {
    props.user.state = ""
    options.state.length = 0
    const statesByCountry = State.getStatesOfCountry(props.user.country.value)
    statesByCountry.forEach((state) => {
        options.state.push({
            label: state.name,
            value: state.isoCode,
            countryCode: state.countryCode,
        })
    })
};

const stateSelected = async () => {
    props.user.city = ""
    options.city.length = 0
    const citiesByState = City.getCitiesOfState(props.user.state.countryCode, props.user.state.value)
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

const { showToast } = useNotification();

const saveProfile = async () => {
    try {
        await setFSDoc("users", props.user.uid, props.user, true)
        isEdit.value = false
        showToast('positive', 'check', 'Profile Saved')
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Error')
    }
}


</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>