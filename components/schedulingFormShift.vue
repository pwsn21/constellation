<template>
    <div class="q-pa-md full-width" style="max-width: 500px;">
        <q-card>
            <q-card-section class="q-my-sm text-center text-h4 bg-primary text-white"> {{ title }} </q-card-section>
            <q-card-section>
                <q-form @submit.prevent="shiftCheck">
                    <div class="row q-gutter-xs">
                        <div class="col"><q-select filled v-model="shift.menteeOneID" label="Mentee One"
                                :options="options.mentee" @update:model-value="menteeOneSelected" clearable emit-value
                                map-options />
                        </div>
                        <div class="col"><q-select filled v-model="shift.menteeTwoID" label="Mentee Two"
                                :options="options.mentee" @update:model-value="menteeTwoSelected" clearable emit-value
                                map-options />
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
                                <q-date v-model="shift.startDate" @update:model-value="dateSelected" flat bordered
                                    :default-year-month="defaultMonth" no-unset today-btn />
                            </div>
                            <div class="column justify-end q-gutter-xs">
                                <q-input filled label="Start Date" v-model="shift.startDate" mask="####/##/##">
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
                                <q-input filled label="Start Time" v-model="shift.startTime" mask="##:##">
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

                                <q-input filled label="End Date" v-model="shift.endDate" mask="####/##/##">
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
                                <q-input filled label="End Time" v-model="shift.endTime" mask="##:##">
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
                            <q-select filled label='Mentor' v-model="shift.mentorID" :options="options.mentor" emit-value
                                map-options lazy-rules ondemand hide-bottom-space
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
                        <q-btn class="q-mr-sm" label="Add Shift" type="submit" color="primary" />
                        <q-space />
                        <q-btn label="Reset" @click="onReset" color="primary" type="reset" class="q-ml-sm" flat />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>

        <!-- shift duplicate dialog -->
        <q-dialog v-model="showDialog">
            <q-card>
                <q-toolbar class="bg-secondary text-white justify-center text-h5">
                    {{ duplicateMessage }}</q-toolbar>
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
                                <q-item-label>{{ originalShift.menteeOneName }}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ getUD(shift.menteeOneID.slice(0, -7)).name }} </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label class="text-weight-bold">Mentee Two: </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>
                                    {{ originalShift.menteeTwoID ? originalShift.menteeTwoName : 'N/A' }}
                                </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ shift.menteeTwoID ? getUD(shift.menteeTwoID.slice(0, -7)).name : 'N/A'
                                }}</q-item-label>
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
                                <q-item-label>{{ getUD(shift.mentorID).name }} </q-item-label>
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
                    <q-btn label="Overwrite" color="secondary" @click="shiftOverwrite" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { setDoc, doc, deleteDoc, addDoc, getFirestore, serverTimestamp } from "firebase/firestore"
import { date } from 'quasar'
const { addToDate } = date

const db = getFirestore()

const defaultMonth = date.formatDate(date.addToDate(Date.now(), { months: 1 }), 'YYYY/MM')

let props = defineProps(['allShiftData'])

let title = ref('Add Shift')

let shift = ref({
    startDate: undefined,
    endDate: undefined,
    startTime: undefined,
    endTime: undefined,
    station: undefined,
    car: undefined,
    platoon: '',
    menteeOneID: undefined,
    menteeTwoID: null,
    mentorID: undefined,
    creationDate: serverTimestamp()
})

const mentoroptions = await mentorOptions()
const miscShifts = ['Holidays', 'Sick']
const observationShifts = ['Observation']
const stationsList = await getStations()

const options = reactive({
    mentee: await optionsMenteeStatus("In Progress"),
    mentor: [...mentoroptions.allMentors, ...miscShifts, ...observationShifts],
    station: [...stationsList, ...miscShifts],
    car: [],
})


const stationSelected = async (station) => {
    if (miscShifts.some(shift => station.includes(shift))) {
        shift.value.car = station
        shift.value.mentorID = station
    } else {
        shift.value.car = undefined
        options.car = await getCars(station)
    }
}

const menteeOneSelected = () => {
    if (shift.value.menteeOneID == shift.value.menteeTwoID) {
        shift.value.menteeTwoID = null
    }
}
const menteeTwoSelected = () => {
    if (shift.value.menteeOneID == shift.value.menteeTwoID) {
        shift.value.menteeTwoID = null
    }
}

const updateCar = (car) => {
    shift.value.car = car.label,
        shift.value.endTime = car.endTime,
        shift.value.startTime = car.startTime,
        shift.value.startDate = null,
        shift.value.endDate = null,
        shift.value.mentorID = null
}

const dayNightChecker = ref('')
const dateSelected = async () => {
    if (miscShifts.some(shiftType => shift.value.station.includes(shiftType))) {
        shift.value.endDate = shift.value.startDate
        shift.value.startTime = '00:00'
        shift.value.endTime = '00:00'
    } else if (shift.value.startDate) {
        shift.value.mentorID = undefined

        dayNightChecker.value = shift.value.car ? shift.value.car.charAt(5) : null

        const pFD = platoonFromShift(shift.value.startDate)
        if (dayNightChecker.value == 'N') {
            shift.value.platoon = pFD.platoonNight
            shift.value.endDate = date.formatDate(addToDate(shift.value.startDate, { days: 1 }), 'YYYY/MM/DD')
        } else if (dayNightChecker.value == 'D') {
            shift.value.platoon = pFD.platoonDay
            shift.value.endDate = shift.value.startDate
        } else {
            console.log("Unselected or have to label car as either D or N")
        }

        const mentors = await mentorOptions(shift.value.station, shift.value.platoon)
        options.mentor = [...mentors.mentor, ...mentors.allMentors, ...miscShifts, ...observationShifts]
        if (mentors.mentor.length > 0) {
            shift.value.mentorID = options.mentor[0].value
        } else {
            shift.value.mentorID = undefined
        }
    }
}

let showDialog = ref(false)

const onReset = () => {
    shift.value.startDate = undefined
    shift.value.endDate = undefined
    shift.value.startTime = undefined
    shift.value.endTime = undefined
    shift.value.station = undefined
    shift.value.car = undefined
    shift.value.platoon = ''
    shift.value.menteeOneID = undefined
    shift.value.menteeTwoID = null
    shift.value.mentorID = undefined
}


let originalShift = ref('')
let duplicateMessage = ref('')
const { showToast } = useNotification()

function findDuplicate(objToCheck) {
    const checkDuplicate = (property, message) => {
        const duplicateItem = props.allShiftData.find(item => item.startDate === objToCheck.startDate && item[property] === objToCheck[property])
        if (duplicateItem) {
            duplicateMessage.value = message;
        }
        return duplicateItem;
    }
    const carDuplicate = checkDuplicate('car', 'Car already exists for that date')
    if (carDuplicate) {
        return carDuplicate;
    }
    const mentorDuplicate = checkDuplicate('mentorID', 'Mentor already scheduled that day')
    if (mentorDuplicate) {
        return mentorDuplicate;
    }
    const menteeDuplicate = checkDuplicate('menteeOneID', 'Mentee already scheduled that day') || checkDuplicate('menteeTwoID', 'Mentee already scheduled that day');
    return menteeDuplicate;
}


const shiftOverwrite = async () => {
    await deleteDoc(doc(db, "scheduledShifts", originalShift.value.shiftID));
    originalShift.value = ''
    shiftCheck()
}

const shiftCheck = async () => {
    try {
        if (findDuplicate(shift.value)) {
            showDialog.value = true
            originalShift.value = findDuplicate(shift.value)
        } else {
            shiftSchedule()
        }
    }

    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Scheduling Conflict')
    }
}

const shiftSchedule = async () => {
    try {
        await addDoc(getCollection("scheduledShifts"), shift.value)
        showToast('positive', 'check', 'Shift Added')
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Please fill out all fields')
    }
}
</script>

<style scoped></style>