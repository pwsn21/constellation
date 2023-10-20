<template>
    <div class="q-pa-md full-width" style="max-width: 500px;">
        <q-card>
            <q-card-section class="q-my-sm text-center text-h4 bg-primary text-white"> {{ title }} </q-card-section>
            <q-card-section>
                <q-form @submit.prevent="checkShift">
                    <div class="row q-gutter-xs">
                        <div class="col"><q-select filled v-model="shift.menteeOneName" label="Mentee One"
                                :options="options.mentee" @update:model-value="menteeOneSelected" clearable /></div>
                        <div class="col"><q-select filled v-model="shift.menteeTwoName" label="Mentee Two"
                                :options="options.mentee" @update:model-value="menteeTwoSelected" clearable />
                        </div>
                    </div>
                    <div>
                        <div class="q-my-xs q-gutter-xs">
                            <q-select filled v-model="shift.station" label="Station" :options="options.station"
                                @update:model-value="stationSelected" emit-value map-options />
                            <q-select filled v-model="shift.car" label="Car" :options="options.car"
                                @update:model-value="updateCar" />
                        </div>

                        <div class="flex justify-between q-gutter-xs no-wrap">
                            <div>
                                <q-date v-model="shift.startDate" @update:model-value="dateSelected" flat bordered />
                            </div>
                            <div class="column justify-end q-gutter-xs">
                                <q-input filled label="Start Date" v-model="shift.startDate">
                                    <template #append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="shift.startDate" @update:model-value="dateSelected">
                                                    <q-btn v-close-popup flat label="close" />
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                                <q-input filled label="Start Time" v-model="shift.startTime">
                                    <template #append>
                                        <q-icon name="access_time" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-time v-model="shift.startTime" text-color="white" color="primary"
                                                    format24h>
                                                    <q-btn v-close-popup flat label="close" />
                                                </q-time>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>

                                <q-input filled label="End Date" v-model="shift.endDate">
                                    <template #append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="shift.endDate">
                                                    <q-btn v-close-popup flat label="close" />
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                                <q-input filled label="End Time" v-model="shift.endTime">
                                    <template #append>
                                        <q-icon name="access_time" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-time v-model="shift.endTime" text-color="white" color="primary"
                                                    format24h>
                                                    <q-btn v-close-popup flat label="close" />
                                                </q-time>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                                <q-input filled label="Platoon" v-model="shift.platoon" readonly />
                            </div>
                        </div>
                        <div class="q-my-xs">
                            <q-select filled label='Mentor' v-model="shift.mentorName" :options="options.mentor" map-options
                                @update:model-value="mentorSelected" lazy-rules ondemand hide-bottom-space
                                :rules="[val => !!val || 'Mentor is required']">
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-italic">
                                            Please Select Station Car & Date First
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                    </div>

                    <div class="q-mt-xs row reverse q-gutter-sm">
                        <q-btn v-if="!shift.id" class="q-mr-sm" label="Add Shift" type="submit" color="primary" />
                        <q-btn v-if="shift.id" class="q-mr-sm" label="Update Shift" type="submit" color="primary" />
                        <q-space />
                        <q-btn label="Reset" @click="onReset" color="secondary" class="q-ml-sm" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>

        <!-- shift duplicate -->
        <q-dialog v-model="showDialog">
            <q-card>
                <q-toolbar class="bg-secondary text-white justify-center text-h5">
                    {{ dupicateMessage }}</q-toolbar>
                <q-card-section>
                    <div class="text-subtitle1">Either an employee is already scheduled or the shift exist with other
                        employees.</div>
                    <q-list bordered dense>
                        <q-item>
                            <q-item-section>
                                <q-item-label></q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-weight-bold">Original Shift </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-weight-bold">New Shift</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label class="text-weight-bold">Date: </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ originalShift.startDate }} </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ shift.startDate }} </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label class="text-weight-bold">Shift: </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ originalShift.car }} </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ shift.car }} </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label class="text-weight-bold">Mentee One: </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ originalShift.menteeOneName ? originalShift.menteeOneName : 'N/A'
                                }}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ shift.menteeOneName ? shift.menteeOneName : 'N/A' }} </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label class="text-weight-bold">Mentee Two: </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ originalShift.menteeTwoName ? originalShift.menteeTwoName : 'N/A' }}
                                </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ shift.menteeTwoName ? shift.menteeTwoName : 'N/A' }} </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label class="text-weight-bold">Mentor: </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ originalShift.mentorName }}
                                </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ shift.mentorName }} </q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
                <q-card-section>
                    <p>Overwriting will delete original shift with any other scheduled employees.</p>
                    <p>This cannot be undone.</p>
                </q-card-section>
                <q-card-actions>

                    <q-btn label="Cancel" color="primary" v-close-popup />
                    <q-btn label="Overwrite" color="secondary" @click="scheduleShift" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>

    </div>
</template>

<script setup>
import { setDoc, doc, deleteDoc, addDoc, getFirestore } from "firebase/firestore"
import { date } from 'quasar'
const { addToDate } = date

const db = getFirestore()

let shiftID = defineProps(['shiftID'])
let title = ref('Add Shift')

let shift = ref({
    startDate: undefined,
    endDate: undefined,
    startTime: undefined,
    endTime: undefined,
    station: undefined,
    car: undefined,
    platoon: '',
    menteeOneName: undefined,
    menteeOneID: undefined,
    menteeTwoName: null,
    menteeTwoID: null,
    mentorName: undefined,
    mentorID: undefined,
})

watchEffect(async () => {
    const docSnap = await getFSDoc("scheduledShifts", shiftID.shiftID)
    const shiftData = docSnap.data()
    shiftData.id = docSnap.id
    shift.value = shiftData
    title.value = `${shift.value.car} (${shift.value.startDate})`
})

const options = reactive({
    mentee: await optionsMenteeStatus("In Progress"),
    mentor: [],
    station: await getStations(),
    car: [],
})

const stationSelected = async (station) => {
    shift.value.car = undefined
    options.car = await getCars(station)
}

const mentorSelected = (selectedMentor) => {
    if (selectedMentor) {
        shift.value.mentorName = selectedMentor.label,
            shift.value.mentorID = selectedMentor.value
    } else {
        shift.value.mentorName = undefined,
            shift.value.mentorID = undefined
    }
}
const menteeOneSelected = (selectedMentee) => {
    if (selectedMentee) {
        shift.value.menteeOneName = selectedMentee.label,
            shift.value.menteeOneID = selectedMentee.value
    } else {
        shift.value.menteeOneName = undefined,
            shift.value.menteeOneID = undefined
    }
    if (shift.value.menteeOneID == shift.value.menteeTwoID) {
        shift.value.menteeTwoName = null
        shift.value.menteeTwoID = null
    }
}
const menteeTwoSelected = (selectedMentee) => {
    if (selectedMentee) {
        shift.value.menteeTwoName = selectedMentee.label,
            shift.value.menteeTwoID = selectedMentee.value
    } else {
        shift.value.menteeTwoName = null,
            shift.value.menteeTwoID = null
    }
    if (shift.value.menteeOneID == shift.value.menteeTwoID) {
        shift.value.menteeTwoName = null
        shift.value.menteeTwoID = null
    }
}

const updateCar = (car) => {
    shift.value.car = car.label,
        shift.value.endTime = car.endTime,
        shift.value.startTime = car.startTime,
        shift.value.startDate = null,
        shift.value.endDate = null,
        shift.value.mentorName = null
}

const dayNightChecker = ref('')
const dateSelected = async () => {
    shift.value.mentorName = ''
    dayNightChecker.value = shift.value.car ? shift.value.car.charAt(5) : null

    const pFD = platoonFromShift(shift.value.startDate)
    if (dayNightChecker.value == 'N') {
        shift.value.platoon = pFD.platoonNight
        shift.value.endDate = date.formatDate(addToDate(shift.value.startDate, { days: 1 }), 'YYYY/MM/DD')
    } else {
        shift.value.platoon = pFD.platoonDay
        shift.value.endDate = shift.value.startDate
    }
    const mentors = await mentorOptions(shift.value.station, shift.value.platoon)
    options.mentor = [...mentors.mentor, ...mentors.allMentors]
    if (mentors.mentor.length > 0) {
        shift.value.mentorName = options.mentor[0].label
        shift.value.mentorID = options.mentor[0].value
    } else {
        shift.value.mentorName = undefined
        shift.value.mentorID = undefined
    }
}

let showDialog = ref(false)
watch(showDialog, (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
        originalShift.value = ''
    }
})

const onReset = () => {
    console.log('reset hit!')
    shift.value.startDate = undefined
    shift.value.endDate = undefined
    shift.value.startTime = undefined
    shift.value.endTime = undefined
    shift.value.station = undefined
    shift.value.car = undefined
    shift.value.platoon = ''
    shift.value.menteeOneName = undefined
    shift.value.menteeOneID = undefined
    shift.value.menteeTwoName = null
    shift.value.menteeTwoID = null
    shift.value.mentorName = undefined
    shift.value.mentorID = undefined
    shift.value.id = null
    title.value = "Add Shift"
}

let originalShift = ref('')
let dupicateMessage = ref('')
const { showToast } = useNotification()

const checkShift = async () => {
    // check if mentee or mentor already scheduled
    // check if shift already exists
    try {
        const menteeOneAlreadyScheduled = await qShiftDuplicate(",", "menteeOneID", shift.value.menteeOneID, shift.value.startDate)
        const menteeTwoAlreadyScheduled = await qShiftDuplicate(",", "menteeOneID", shift.value.menteeTwoID, shift.value.startDate)
        const mentorAlreadyScheduled = await qShiftDuplicate(",", "mentorID", shift.value.mentorID, shift.value.startDate)
        const shiftAlreadyScheduled = await qShiftDuplicate(shift.value.car, ",", ",,", shift.value.startDate)
        if (shiftAlreadyScheduled.value.length > 0) {
            originalShift.value = shiftAlreadyScheduled.value[0]
            showDialog.value = true
            dupicateMessage.value = "Shift Exists"
        } else if (menteeOneAlreadyScheduled.value.length > 0) {
            originalShift.value = menteeOneAlreadyScheduled.value[0]
            showDialog.value = true
            dupicateMessage.value = "Mentee Scheduled on Another Car"
        } else if (menteeTwoAlreadyScheduled.value.length > 0) {
            originalShift.value = menteeTwoAlreadyScheduled.value[0]
            showDialog.value = true
            dupicateMessage.value = "Mentee Scheduled on Another Car"
        } else if (mentorAlreadyScheduled.value.length > 0) {
            originalShift.value = mentorAlreadyScheduled.value[0]
            showDialog.value = true
            dupicateMessage.value = "Mentor Scheduled on Another Car"
        } else {
            scheduleShift()
        }
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Scheduling Conflict')
    }
}

const scheduleShift = async () => {
    try {
        if (originalShift.value) { await deleteDoc(doc(db, "scheduledShifts", originalShift.value.id)) }
        if (shift.value.id) {
            await setDoc(doc(db, "scheduledShifts", shift.value.id), shift.value)
            onReset()
            showToast('positive', 'check', 'Shift Updated')
        }
        else {
            await addDoc(getCollection("scheduledShifts"), shift.value)
            showToast('positive', 'check', 'Shift Added')
        }
        originalShift.value = ''
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Please fill out all fields')
    }
}

</script>

<style scoped></style>