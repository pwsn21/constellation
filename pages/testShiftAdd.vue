<template>
    <div class="q-pa-md full-width" style="max-width: 550px;">
        <q-card class="q-pa-md">
            <q-form @submit.prevent="checkShift">
                <div>
                    <selectorCar v-model="shift.car" @update:car="updateCar" />
                    <div class="flex justify-center q-gutter-xs">
                        <q-date v-model="shift.startDate" @update:model-value="dateSelected" landscape flat />
                        <q-input filled label="Start Date" v-model="shift.startDate">
                            <template #prepend>
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
                                        <q-time v-model="shift.startTime" text-color="white" color="primary" format24h>
                                            <q-btn v-close-popup flat label="close" />
                                        </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                        <q-input filled label="End Date" v-model="shift.endDate">
                            <template #prepend>
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
                                        <q-time v-model="shift.endTime" text-color="white" color="primary" format24h>
                                            <q-btn v-close-popup flat label="close" />
                                        </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>
                    <q-select label='Mentor' v-model="shift.mentorName" :options="options.mentor" filled map-options
                        @update:model-value="mentorSelected" />
                </div>
                <div class="row">
                    <div class="col"><q-select filled v-model="shift.menteeOneName" label="Mentee One"
                            :options="options.mentee" @update:model-value="menteeOneSelected" /></div>
                    <div class="col"><q-select filled v-model="shift.menteeTwoName" label="Mentee Two"
                            :options="options.mentee" @update:model-value="menteeTwoSelected" />
                    </div>
                </div>

                <div class="q-mt-xs row reverse q-gutter-sm">
                    <q-btn class="q-mr-sm" label="Add Shift" type="submit" color="primary" />
                </div>
            </q-form>
        </q-card>

        <!-- mentee duplicate -->
        <q-dialog v-model="showDialogMentee">
            <q-card>
                <q-toolbar class="bg-secondary text-white text-h4">
                    Mentee Already Scheduled
                </q-toolbar>
                <q-card-section>
                    <div class="text-subtitle1">The mentee is already scheduled for that day.</div>
                    <p>Please double check the date and shift. </p>
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

                    <p>If you'd like to overwrite the shift with the new information
                        click 'Overwrite'</p>
                    <p>Please note: The original shift will be deleted. Any other mentees in the shift will be removed.</p>
                </q-card-section>
                <q-card-actions>
                    <q-btn label="Cancel" color="primary" v-close-popup />
                    <q-btn label="Overwrite" color="secondary" @click="overwriteShift" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- shift duplicate -->
        <q-dialog v-model="showDialogShift">
            <q-card>
                <q-toolbar class="bg-secondary text-white text-h4">
                    Shift Already Exists
                </q-toolbar>
                <q-card-section>
                    <div class="text-subtitle1">This shift already exists with the following.</div>
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
                    <p>Please double check the date and shift. </p>
                    <p>If you'd like to overwrite the shift with the new information
                        click 'Overwrite'</p>
                    <pre>{{ originalShift }}</pre>
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
import { getFirestore, getDoc, setDoc, doc, query, where, deleteDoc, updateDoc } from "firebase/firestore";
import { date } from 'quasar'
const { addToDate } = date

const db = getFirestore()
const docName = ref('')

const shift = reactive({
    startDate: undefined,
    endDate: undefined,
    startTime: undefined,
    endTime: undefined,
    station: undefined,
    car: undefined,
    platoon: '',

    menteeOneName: null,
    menteeOneID: null,

    menteeTwoName: null,
    menteeTwoID: null,

    mentorName: null,
    mentorID: '',
})

const options = reactive({
    mentee: await activeMenteeOptions(),
    mentor: ''
})


const mentorSelected = (selectedMentor) => {
    shift.mentorName = selectedMentor.label,
        shift.mentorID = selectedMentor.value
}
const menteeOneSelected = (selectedMentee) => {
    shift.menteeOneName = selectedMentee.label,
        shift.menteeOneID = selectedMentee.value
}
const menteeTwoSelected = (selectedMentee) => {
    shift.menteeTwoName = selectedMentee.label,
        shift.menteeTwoID = selectedMentee.value
}

const updateCar = (car) => {
    shift.car = car.label,
        shift.endTime = car.endTime,
        shift.startTime = car.startTime,
        shift.station = car.station,
        shift.startDate = null,
        shift.endDate = null,
        shift.mentorName = null
}

const dayNightChecker = ref('')
const dateSelected = async () => {
    shift.mentorName = ''
    dayNightChecker.value = shift.car ? shift.car.charAt(5) : null
    docName.value = shift.car + "-" + date.formatDate(shift.startDate, 'YYYY-MM-DD')
    const pFD = platoonFromShift(shift.startDate)
    if (dayNightChecker.value == 'N') {
        shift.platoon = pFD.platoonNight
        shift.endDate = date.formatDate(addToDate(shift.startDate, { days: 1 }), 'YYYY/MM/DD')
    } else {
        shift.platoon = pFD.platoonDay
        shift.endDate = shift.startDate
    }
    const mentors = await mentorOptions(shift.station, shift.platoon)
    options.mentor = [...mentors.mentor, ...mentors.allMentors]
    if (mentors.mentor.length > 0) {
        shift.mentorName = options.mentor[0].label
        shift.mentorID = options.mentor[0].value
    }
}

let showDialogShift = ref(false)
let showDialogMentee = ref(false)
let originalShift = ref('')
const { showToast } = useNotification();

const checkShift = async () => {
    // check if mentee\mentor already scheduled
    // check if shift already exists
    try {
        const menteeOneAlreadyScheduled = await qMenteeDupe(shift.menteeOneID, shift.startDate)


        const docRef = doc(db, "scheduledShifts", docName.value);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('shift already exists')
            originalShift.value = docSnap.data()
            showDialogShift.value = true
        }
        else if (menteeOneAlreadyScheduled.value.length > 0) {
            console.log('mentee duplicate')
            originalShift.value = menteeOneAlreadyScheduled.value[0]
            showDialogMentee.value = true

        } else {
            scheduleShift()
        }
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Please fill out all fields');
    }
}

const overwriteShift = async () => {
    try {

        if (originalShift.value.menteeOneName == null && originalShift.value.menteeTwoName == null) {
            await setDoc(doc(db, "scheduledShifts", originalShift.value.id), { menteeOneName: null, menteeOneID: null }, { merge: true })
        }
        await deleteDoc(doc(db, "scheduledShifts", originalShift.value.id))
        await setDoc(doc(db, "scheduledShifts", docName.value), shift)
        showToast('positive', 'check', 'Shift Added');
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Please fill out all fields');
    }

}

const scheduleShift = async () => {
    try {
        await setDoc(doc(db, "scheduledShifts", docName.value), shift)
        showToast('positive', 'check', 'Shift Added');
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Please fill out all fields');
    }
}

</script>



<style scoped></style>