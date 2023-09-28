<template>
    <div class="full-width">
        <q-page>
            <q-form @submit.prevent="saveAcpOProfile">
                <div class="row justify-center q-gutter-sm q-mt-sm">
                    <q-card class="w-full" style="width: 405px;">
                        <q-card-section>
                            <div class="text-h5">{{ acpoProfile.firstName }} {{ acpoProfile.lastName }} ({{
                                acpoProfile.cohort }})
                            </div>
                            <q-separator />
                            <q-select filled v-model="acpoProfile.pped" label="Assigned Practice Educator"
                                :options="options.ppeds" />
                        </q-card-section>
                    </q-card>

                    <!-- Milestone Two -->
                    <q-card class="w-full" style="width: 405px;">
                        <q-card-section>
                            <div class="text-h6">Milestone 2</div>
                        </q-card-section>
                        <q-separator inset />
                        <q-card-section>
                            <q-select filled v-model="acpoProfile.supportLevelMSTwo" label="Milestone 2 Support Level"
                                :options="options.supportLevelHigh" />
                            <DateTimePicker v-if="acpoProfile.supportLevelMSTwo === 'High'"
                                label="Development Plan Meeting Date" :date="acpoProfile.developmentPlanMeeting"
                                @update:date="updateMeetingDP" />

                            <DateTimePicker v-if="acpoProfile.supportLevelMSTwo === 'High'"
                                label="Closing Development Plan Meeting Date"
                                :date="acpoProfile.closeDevelopmentPlanMeeting" @update:date="updateMeetingCloseDP" />

                            <q-toggle v-if="acpoProfile.supportLevelMSTwo === 'High'" :false-value="2"
                                :label="`Mentee is in ${acpoProfile.threePerson} person configuration`" :true-value="3"
                                color="blue" v-model="acpoProfile.threePerson" />
                            <dateTimePicker :date="acpoProfile.milestoneMeetingTwo" @update:date="updateMeetingTwo"
                                label="Milestone 2 Meeting Date" />
                        </q-card-section>
                    </q-card>

                    <!-- Milestone Three -->
                    <q-card class="w-full" style="width: 405px;">
                        <q-card-section>
                            <div class="text-h6">Milestone 3</div>
                        </q-card-section>
                        <q-separator inset />
                        <q-card-section>
                            <q-select filled v-model="acpoProfile.supportLevelMSThree" label="Milestone 3 Support Level"
                                :options="options.supportLevel" />
                            <DateTimePicker :date="acpoProfile.milestoneMeetingThree" @update:date="updateMeetingThree"
                                label="Milestone 3 Meeting Date" />
                        </q-card-section>
                    </q-card>

                    <!-- Milestone Four -->
                    <q-card class="w-full" style="width: 405px;">
                        <q-card-section>
                            <div class="text-h6">Milestone 4</div>
                        </q-card-section>
                        <q-separator inset />
                        <q-card-section>
                            <q-select filled v-model="acpoProfile.supportLevelMSFour" label="Milestone 4 Support Level"
                                :options="options.supportLevel" />

                            <DateTimePicker :date="acpoProfile.milestoneMeetingFour" @update:date="updateMeetingFour"
                                label="Milestone 4 Meeting Date" />
                        </q-card-section>
                    </q-card>
                </div>


                <div class="q-mt-xs row reverse q-gutter-sm">
                    <q-btn label="Save" type="submit" color="primary" />
                    <q-btn label="Close" color="red-6" @click="$emit('acpoMode', mID.selectedMenteeID, 'acpoView')" />
                </div>

            </q-form>
        </q-page>
    </div>
</template>


<script setup>
import { doc, setDoc, getDoc, query, where, getDocs, collection, getFirestore, } from "firebase/firestore";

// Emits and Props
const mID = defineProps(['selectedMenteeID'])
const emit = defineEmits(["acpoMode"])

const db = getFirestore();
const docRef = doc(db, "acpoTracker", mID.selectedMenteeID);
const docSnap = await getDoc(docRef);

const data = docSnap.data();
let acpoProfile = reactive({
    firstName: data.firstName || null,
    lastName: data.lastName || null,
    cohort: data.cohort || null,
    pped: data.pped || null,
    //Is there a better way to do these to dates?
    developmentPlanMeeting: data.developmentPlanMeeting ? data.developmentPlanMeeting.toDate() : null,
    closeDevelopmentPlanMeeting: data.closeDevelopmentPlanMeeting ? data.closeDevelopmentPlanMeeting.toDate() : null,
    milestoneMeetingTwo: data.milestoneMeetingTwo ? data.milestoneMeetingTwo.toDate() : null,
    milestoneMeetingThree: data.milestoneMeetingThree ? data.milestoneMeetingThree.toDate() : null,
    milestoneMeetingFour: data.milestoneMeetingFour ? data.milestoneMeetingFour.toDate() : null,
    supportLevelMSTwo: data.supportLevelMSTwo || null,
    supportLevelMSThree: data.supportLevelMSThree || null,
    supportLevelMSFour: data.supportLevelMSFour || null,
    currentMilestone: data.currentMilestone || null,
    currentSupport: data.currentSupport || null,
    threePerson: data.threePerson || 3,
    needDPMeeting: data.needDPMeeting || false,
});

const options = reactive({
    ppeds: [],
    supportLevelHigh: ['High', 'Medium', 'Low'],
    supportLevel: ['Medium', 'Low'],
})
// Options for PPEd
const userCollection = collection(db, 'users');
const queryPPEd = query(userCollection, where("role", "==", "Paramedic Practice Educator"));
const ppedDocs = await getDocs(queryPPEd);

ppedDocs.forEach((pped) => {
    options.ppeds.push({
        value: pped.id,
        label: pped.data().firstName + " " + pped.data().lastName,
        station: pped.data().station,
    });
});

//Support, 3 person config, and development meeting checker
function setCurrentSupport(acpoProfile) {
    if (acpoProfile.supportLevelMSFour !== null) {
        acpoProfile.currentSupport = acpoProfile.supportLevelMSFour
        acpoProfile.currentMilestone = 'Milestone 4'
    } else if (acpoProfile.supportLevelMSThree !== null) {
        acpoProfile.currentSupport = acpoProfile.supportLevelMSThree;
        acpoProfile.currentMilestone = 'Milestone 3'
        acpoProfile.threePerson = 2
    } else if (acpoProfile.supportLevelMSTwo !== null) {
        acpoProfile.currentSupport = acpoProfile.supportLevelMSTwo;
        acpoProfile.currentMilestone = 'Milestone 2'
    } else {
        acpoProfile.currentSupport = 'Awaiting CORA';
        acpoProfile.currentMilestone = "Milestone 1"
    }
}

function threePersonChecker() {
    if (acpoProfile.currentSupport != "High" || acpoProfile.closeDevelopmentPlanMeeting != null) {
        acpoProfile.threePerson = 2;
    }

};

function needDPMeetingChecker() {
    if (acpoProfile.currentSupport === "High" && acpoProfile.developmentPlanMeeting == null) {
        acpoProfile.needDPMeeting = true
    }

    else {
        acpoProfile.needDPMeeting = false
    }
}

const updateMeetingDP = (newDate) => { acpoProfile.developmentPlanMeeting = newDate; };
const updateMeetingCloseDP = (newDate) => { acpoProfile.closeDevelopmentPlanMeeting = newDate; };
const updateMeetingTwo = (newDate) => { acpoProfile.milestoneMeetingTwo = newDate; };
const updateMeetingThree = (newDate) => { acpoProfile.milestoneMeetingThree = newDate; };
const updateMeetingFour = (newDate) => { acpoProfile.milestoneMeetingFour = newDate; };

const { showToast } = useNotification();

// Save Profile
const saveAcpOProfile = async () => {
    try {
        setCurrentSupport(acpoProfile)
        threePersonChecker()
        needDPMeetingChecker()
        await setDoc(doc(db, "acpoTracker", mID.selectedMenteeID),
            acpoProfile
            , { merge: true });
        showToast('positive', 'check', 'Saved');
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Error');
    }
};

</script>
<style scoped></style>