<template>
    <div class="full-width">
        <q-page>
            <q-form @submit.prevent="saveAcpOProfile">
                <div class="row justify-center q-gutter-sm q-mt-sm">
                    <q-card class="w-full" style="width: 400px;">
                        <q-card-section>
                            <div class="text-h5 text-secondary">{{ menteeProfile.firstName }} {{ menteeProfile.lastName }}
                                ({{
                                    menteeProfile.cohort }})
                            </div>
                            <q-separator />
                        </q-card-section>
                        <q-card-section>
                            <q-select filled v-model="menteeProfile.acpoStatus" label="ACP-O Status"
                                :options="options.acpoStatus" lazy-rules
                                :rules="[val => !!val || 'Status is required. Please select from options.']" />
                            <q-select filled v-model="menteeProfile.pped" label="Assigned Practice Educator"
                                :options="options.ppeds" />
                            <DateTimePicker label="Hire Date" :date="menteeProfile.hireDate"
                                @update:date="updateHireDate" />

                        </q-card-section>
                    </q-card>
                    <q-card class="w-full" style="width: 400px;">
                        <q-list bordered>
                            <q-expansion-item group="milestones" label="Milestone 2" default-opened
                                :header-class="expansionHeader">
                                <!-- Milestone Two -->
                                <q-card>

                                    <q-separator inset />
                                    <q-card-section>
                                        <q-select filled v-model="menteeProfile.supportLevelMSTwo"
                                            label="Milestone 2 Support Level" :options="options.supportLevelHigh" />
                                        <DateTimePicker v-if="menteeProfile.supportLevelMSTwo === 'High'"
                                            label="Development Plan Meeting Date"
                                            :date="menteeProfile.developmentPlanMeeting" @update:date="updateMeetingDP" />

                                        <DateTimePicker v-if="menteeProfile.supportLevelMSTwo === 'High'"
                                            label="Closing Development Plan Meeting Date"
                                            :date="menteeProfile.closeDevelopmentPlanMeeting"
                                            @update:date="updateMeetingCloseDP" />

                                        <q-toggle v-if="menteeProfile.supportLevelMSTwo === 'High'" :false-value="2"
                                            :label="`Mentee is in ${menteeProfile.threePerson} person configuration`"
                                            :true-value="3" color="secondary" v-model="menteeProfile.threePerson" />
                                        <dateTimePicker :date="menteeProfile.milestoneMeetingTwo"
                                            @update:date="updateMeetingTwo" label="Milestone 2 Meeting Date" />
                                    </q-card-section>
                                </q-card>
                            </q-expansion-item>
                            <q-separator />
                            <q-expansion-item group="milestones" label="Milestone 3" :header-class="expansionHeader">
                                <!-- Milestone Three -->
                                <q-card>

                                    <q-separator inset />
                                    <q-card-section>
                                        <q-select filled v-model="menteeProfile.supportLevelMSThree"
                                            label="Milestone 3 Support Level" :options="options.supportLevel" />
                                        <DateTimePicker :date="menteeProfile.milestoneMeetingThree"
                                            @update:date="updateMeetingThree" label="Milestone 3 Meeting Date" />
                                    </q-card-section>
                                </q-card>
                            </q-expansion-item>
                            <q-separator />
                            <q-expansion-item group="milestones" label="Milestone 4" :header-class="expansionHeader">

                                <!-- Milestone Four -->
                                <q-card>

                                    <q-separator inset />
                                    <q-card-section>
                                        <q-select filled v-model="menteeProfile.supportLevelMSFour"
                                            label="Milestone 4 Support Level" :options="options.supportLevel" />

                                        <DateTimePicker :date="menteeProfile.milestoneMeetingFour"
                                            @update:date="updateMeetingFour" label="Milestone 4 Meeting Date" />
                                    </q-card-section>
                                </q-card>
                            </q-expansion-item>
                        </q-list>
                    </q-card>
                </div>


                <div class="q-mt-xs row reverse q-gutter-sm">
                    <q-btn label="Save" type="submit" color="primary" />
                    <q-btn label="Close" color="secondary"
                        @click="$emit('acpoMode', mID.selectedMenteeID, 'acpoView', 'menteeProfileTab')" />
                </div>

            </q-form>
        </q-page>
    </div>
</template>


<script setup>
import { doc, setDoc, query, where, getDocs, getFirestore, } from "firebase/firestore";


const mID = defineProps(['selectedMenteeID'])
const emit = defineEmits(["acpoMode"])
const db = getFirestore();

const expansionHeader = "text-h5 text-secondary"

const data = await (menteeData(mID.selectedMenteeID))
let menteeProfile = reactive({
    firstName: data.firstName || null,
    lastName: data.lastName || null,
    cohort: data.cohort || null,
    pped: data.pped || null,
    acpoStatus: data.acpoStatus || null,
    hireDate: data.hireDate || null,
    developmentPlanMeeting: data.developmentPlanMeeting || null,
    closeDevelopmentPlanMeeting: data.closeDevelopmentPlanMeeting || null,
    milestoneMeetingTwo: data.milestoneMeetingTwo || null,
    milestoneMeetingThree: data.milestoneMeetingThree || null,
    milestoneMeetingFour: data.milestoneMeetingFour || null,
    supportLevelMSTwo: data.supportLevelMSTwo || null,
    supportLevelMSThree: data.supportLevelMSThree || null,
    supportLevelMSFour: data.supportLevelMSFour || null,
    currentMilestone: data.currentMilestone || null,
    currentSupport: data.currentSupport || null,
    threePerson: data.threePerson || 3,
    needDPMeeting: data.needDPMeeting || false,
    needMSMeeting: data.needMSMeeting || false,
});

const options = reactive({
    ppeds: [],
    acpoStatus: ['In Progress', 'Signed Off', 'On Hold', 'Exited'],
    supportLevelHigh: ['High', 'Medium', 'Low'],
    supportLevel: ['Medium', 'Low'],
})
// Options for PPEd
const userCollection = getCollection('users')
const queryPPEd = query(userCollection, where("role", "==", "Paramedic Practice Educator"))
const ppedDocs = await getDocs(queryPPEd)

ppedDocs.forEach((pped) => {
    options.ppeds.push({
        value: pped.id,
        label: pped.data().firstName + " " + pped.data().lastName,
        station: pped.data().station,
    });
});

//Support, 3 person config, and development meeting checker
function setCurrentSupport(menteeProfile) {
    if (menteeProfile.supportLevelMSFour !== null) {
        menteeProfile.currentSupport = menteeProfile.supportLevelMSFour
        menteeProfile.currentMilestone = 'Milestone 4'
    } else if (menteeProfile.supportLevelMSThree !== null) {
        menteeProfile.currentSupport = menteeProfile.supportLevelMSThree;
        menteeProfile.currentMilestone = 'Milestone 3'
        menteeProfile.threePerson = 2
    } else if (menteeProfile.supportLevelMSTwo !== null) {
        menteeProfile.currentSupport = menteeProfile.supportLevelMSTwo;
        menteeProfile.currentMilestone = 'Milestone 2'
    } else {
        menteeProfile.currentSupport = 'Awaiting CORA';
        menteeProfile.currentMilestone = "Milestone 1"
    }
}

function threePersonChecker() {
    if (menteeProfile.currentSupport != "High" || menteeProfile.closeDevelopmentPlanMeeting != null) {
        menteeProfile.threePerson = 2;
    }

};

function needMeetingChecker() {
    if (menteeProfile.currentSupport === "High" && menteeProfile.developmentPlanMeeting == null) {
        menteeProfile.needDPMeeting = true
    } else {
        menteeProfile.needDPMeeting = false
    }
    if (
        (menteeProfile.supportLevelMSTwo != null && menteeProfile.milestoneMeetingTwo == null) ||
        (menteeProfile.supportLevelMSThree != null && menteeProfile.milestoneMeetingThree == null) ||
        (menteeProfile.supportLevelMSFour != null && menteeProfile.milestoneMeetingFour == null)
    ) {
        menteeProfile.needMSMeeting = true
    }
    else {
        menteeProfile.needMSMeeting = false
    }

}

const updateHireDate = (date) => { menteeProfile.hireDate = date; };
const updateMeetingDP = (date) => { menteeProfile.developmentPlanMeeting = date; };
const updateMeetingCloseDP = (date) => { menteeProfile.closeDevelopmentPlanMeeting = date; };
const updateMeetingTwo = (date) => { menteeProfile.milestoneMeetingTwo = date; };
const updateMeetingThree = (date) => { menteeProfile.milestoneMeetingThree = date; };
const updateMeetingFour = (date) => { menteeProfile.milestoneMeetingFour = date; };

const { showToast } = useNotification();


// Save Profile
const saveAcpOProfile = async () => {
    try {
        setCurrentSupport(menteeProfile)
        threePersonChecker()
        needMeetingChecker()
        await setFSDoc("acpoMentees", mID.selectedMenteeID, menteeProfile, true)
        showToast('positive', 'check', 'Saved')
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Error');
    }
};

</script>
<style scoped></style>