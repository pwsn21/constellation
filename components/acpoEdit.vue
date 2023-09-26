<template>
    <div class="q-pa-md full-width">
        <q-page class="q-pa-md full-width row justify-center " padding>
            <q-form @submit.prevent="saveAcpOProfile" class="q-gutter-md">
                <div class="row">
                    <q-card class="w-full" style="width: 375px;">
                        <q-card-section>
                            <div class="text-h5 tw-pb-2">{{ acpoProfile.firstName }} {{ acpoProfile.lastName }} {{
                                acpoProfile.cohort }}
                            </div>
                            <div>Current Milestone: {{ acpoProfile.currentMilestone }}</div>
                            <div>Current Support Level: {{ acpoProfile.currentSupport }}</div>
                            <q-separator />
                            <q-select filled v-model="acpoProfile.pped" label="Assigned Practice Educator"
                                :options="options.ppeds" />
                        </q-card-section>
                    </q-card>
                </div>
                <div class="row">
                    <!-- Milestone Two -->
                    <q-card class="q-mt-sm q-mr-sm w-full" style="width: 375px;">
                        <q-card-section>
                            <div class="text-h6 q-pbt-sm">Milestone 2</div>
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
                    <q-card v-if="acpoProfile.milestoneMeetingTwo !== null" class="q-mt-sm q-mr-sm w-full"
                        style="width: 375px;">
                        <q-card-section>
                            <div class="text-h6 q-pbt-sm">Milestone 3</div>
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
                    <q-card v-if="acpoProfile.milestoneMeetingThree !== null" class="q-mt-sm q-mr-sm w-full"
                        style="width: 375px;">
                        <q-card-section>
                            <div class="text-h6 q-pbt-sm">Milestone 4</div>
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
                <div>

                    <q-btn class="q-mr-sm" label="Save" type="submit" color="primary" />
                </div>
            </q-form>
        </q-page>
    </div>
</template>


<script setup>
import { doc, setDoc, getDoc, query, where, getDocs, collection, updateDoc, getFirestore, Timestamp } from "firebase/firestore";

const firebaseUser = useFirebaseUser()
const db = getFirestore();

const docProfileRef = doc(db, "users", firebaseUser.value.uid);
const docProfileSnap = await getDoc(docProfileRef);
const up = docProfileSnap.data()

const mID = defineProps(['selectedMenteeID'])

const docRef = doc(db, "acpoTracker", mID.selectedMenteeID);
const docSnap = await getDoc(docRef);

const options = reactive({
    ppeds: [],
    supportLevelHigh: ['High', 'Medium', 'Low'],
    supportLevel: ['Medium', 'Low'],
})

const dateTimeMask = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
}

const data = docSnap.data();
let acpoProfile = reactive({
    firstName: data.firstName || null,
    lastName: data.lastName || null,
    cohort: data.cohort || null,
    pped: data.pped || null,
    developmentPlanMeeting: data.developmentPlanMeeting ? data.developmentPlanMeeting.toDate().toLocaleString('en-US', dateTimeMask) : null,
    closeDevelopmentPlanMeeting: data.closeDevelopmentPlanMeeting ? data.closeDevelopmentPlanMeeting.toDate().toLocaleString('en-US', dateTimeMask) : null,
    milestoneMeetingTwo: data.milestoneMeetingTwo ? data.milestoneMeetingTwo.toDate().toLocaleString('en-US', dateTimeMask) : null,
    milestoneMeetingThree: data.milestoneMeetingThree ? data.milestoneMeetingThree.toDate().toLocaleString('en-US', dateTimeMask) : null,
    milestoneMeetingFour: data.milestoneMeetingFour ? data.milestoneMeetingFour.toDate().toLocaleString('en-US', dateTimeMask) : null,
    supportLevelMSTwo: data.supportLevelMSTwo || null,
    supportLevelMSThree: data.supportLevelMSThree || null,
    supportLevelMSFour: data.supportLevelMSFour || null,
    currentMilestone: data.currentMilestone || null,
    currentSupport: data.currentSupport || null,
    threePerson: data.threePerson || 3,
});

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

let needDPMeeting = ref(false)

function needDPMeetingChecker() {
    if (acpoProfile.currentSupport === "High" && acpoProfile.developmentPlanMeeting == null) {
        needDPMeeting.value = true
    }
    else {
        needDPMeeting.value = false
    }
}

const updateMeetingDP = (newDate) => { acpoProfile.developmentPlanMeeting = newDate; };
const updateMeetingCloseDP = (newDate) => { acpoProfile.closeDevelopmentPlanMeeting = newDate; };
const updateMeetingTwo = (newDate) => { acpoProfile.milestoneMeetingTwo = newDate; };
const updateMeetingThree = (newDate) => { acpoProfile.milestoneMeetingThree = newDate; };
const updateMeetingFour = (newDate) => { acpoProfile.milestoneMeetingFour = newDate; };

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

const { showToast } = useNotification();

// Save Profile Function

const saveAcpOProfile = async () => {
    try {
        setCurrentSupport(acpoProfile)
        threePersonChecker()
        needDPMeetingChecker()
        await setDoc(doc(db, "acpoTracker", mID.selectedMenteeID),
            // acpoProfile
            {
                pped: acpoProfile.pped,
                needDPMeeting: needDPMeeting.value,
                closeDevelopmentPlanMeeting: acpoProfile.closeDevelopmentPlanMeeting ? new Date(acpoProfile.closeDevelopmentPlanMeeting) : null,
                developmentPlanMeeting: acpoProfile.developmentPlanMeeting ? new Date(acpoProfile.developmentPlanMeeting) : null,
                milestoneMeetingTwo: acpoProfile.milestoneMeetingTwo ? new Date(acpoProfile.milestoneMeetingTwo) : null,
                milestoneMeetingThree: acpoProfile.milestoneMeetingThree ? new Date(acpoProfile.milestoneMeetingThree) : null,
                milestoneMeetingFour: acpoProfile.milestoneMeetingFour ? new Date(acpoProfile.milestoneMeetingFour) : null,
                currentMilestone: acpoProfile.currentMilestone,
                currentSupport: acpoProfile.currentSupport,
                supportLevelMSTwo: acpoProfile.supportLevelMSTwo,
                supportLevelMSThree: acpoProfile.supportLevelMSThree,
                supportLevelMSFour: acpoProfile.supportLevelMSFour,
                threePerson: acpoProfile.threePerson,
            }
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