<template>
    <div class="q-pa-md full-width">
        <q-page class="q-pa-md full-width row justify-center " padding>
            <q-form @submit.prevent="saveAcpOProfile" class="q-gutter-md">
                <div class="row">
                    <q-card class="w-full" style="width: 375px;">
                        <q-card-section>
                            <div class="text-h5 tw-pb-2">{{ acpOProfileData.firstName }} {{ acpOProfileData.lastName }} {{
                                acpOProfileData.cohort }}
                            </div>
                            <div>Current Milestone: {{ acpOProfileData.currentMilestone }}</div>
                            <div>Current Support Level: {{ acpOProfileData.currentSupport }}</div>
                            <q-separator />
                            <q-select filled v-model="acpOProfileData.pped" label="Assigned Practice Educator"
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
                            <q-select filled v-model="acpOProfileData.supportLevelMSTwo" label="Milestone 2 Support Level"
                                :options="options.supportLevelHigh" />
                            <DateTimePicker v-if="acpOProfileData.supportLevelMSTwo === 'High'"
                                label="Development Plan Meeting Date" :date="acpOProfileData.developmentPlanMeeting"
                                @update:date="updateMeetingDP" />
                            <DateTimePicker v-if="acpOProfileData.supportLevelMSTwo === 'High'"
                                label="Closing Development Plan Meeting Date"
                                :date="acpOProfileData.closeDevelopmentPlanMeeting" @update:date="updateMeetingCloseDP" />
                            <q-toggle v-if="acpOProfileData.supportLevelMSTwo === 'High'" :false-value="2"
                                :label="`Mentee is in ${acpOProfileData.threePerson} person configuration`" :true-value="3"
                                color="blue" v-model="acpOProfileData.threePerson" />
                            <DateTimePicker :date="acpOProfileData.milestoneMeetingTwo" @update:date="updateMeetingTwo"
                                label="Milestone 2 Meeting Date" />
                        </q-card-section>
                    </q-card>

                    <!-- Milestone Three -->
                    <q-card class="q-mt-sm q-mr-sm w-full" style="width: 375px;">
                        <q-card-section>
                            <div class="text-h6 q-pbt-sm">Milestone 3</div>
                        </q-card-section>
                        <q-separator inset />
                        <q-card-section>
                            <q-select filled v-model="acpOProfileData.supportLevelMSThree" label="Milestone 3 Support Level"
                                :options="options.supportLevel" />
                            <DateTimePicker :date="acpOProfileData.milestoneMeetingThree" @update:date="updateMeetingThree"
                                label="Milestone 3 Meeting Date" />
                        </q-card-section>
                    </q-card>

                    <!-- Milestone Four -->
                    <q-card class="q-mt-sm q-mr-sm w-full" style="width: 375px;">
                        <q-card-section>
                            <div class="text-h6 q-pbt-sm">Milestone 4</div>
                        </q-card-section>
                        <q-separator inset />
                        <q-card-section>
                            <q-select filled v-model="acpOProfileData.supportLevelMSFour" label="Milestone 4 Support Level"
                                :options="options.supportLevel" />
                            <DateTimePicker :date="acpOProfileData.milestoneMeetingFour" @update:date="updateMeetingFour"
                                label="Milestone 4 Meeting Date" />
                        </q-card-section>
                    </q-card>

                </div>
                <div>
                    <q-btn label="Save" type="submit" color="primary" />
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

const docRef = doc(db, "acpoTracker", firebaseUser.value.uid + "_" + up.cohort);
const docSnap = await getDoc(docRef);

const options = reactive({
    ppeds: [],
    supportLevelHigh: ['High', 'Medium', 'Low'],
    supportLevel: ['Medium', 'Low'],
})

const data = docSnap.data();
let acpOProfileData = reactive({
    firstName: data.firstName || null,
    lastName: data.lastName || null,
    cohort: data.cohort || null,
    pped: data.pped || null,
    developmentPlanMeeting: data.developmentPlanMeeting || null,
    milestoneMeetingTwo: data.milestoneMeetingTwo || null,
    milestoneMeetingThree: data.milestoneMeetingThree || null,
    milestoneMeetingFour: data.milestoneMeetingFour || null,
    supportLevelMSTwo: data.supportLevelMSTwo || null,
    supportLevelMSThree: data.supportLevelMSThree || null,
    supportLevelMSFour: data.supportLevelMSFour || null,
    currentMilestone: data.currentMilestone || null,
    currentSupport: data.currentSupport || null,
    threePerson: data.threePerson || 3,
});

function setCurrentSupport(acpOProfileData) {
    if (acpOProfileData.supportLevelMSFour !== null) {
        acpOProfileData.currentSupport = acpOProfileData.supportLevelMSFour
        acpOProfileData.currentMilestone = 'Milestone 4'
    } else if (acpOProfileData.supportLevelMSThree !== null) {
        acpOProfileData.currentSupport = acpOProfileData.supportLevelMSThree;
        acpOProfileData.currentMilestone = 'Milestone 3'
        acpOProfileData.threePerson = 2
    } else if (acpOProfileData.supportLevelMSTwo !== null) {
        acpOProfileData.currentSupport = acpOProfileData.supportLevelMSTwo;
        acpOProfileData.currentMilestone = 'Milestone 2'
    } else {
        acpOProfileData.currentSupport = 'Awaiting CORA';
        acpOProfileData.currentMilestone = "Milestone 1"
    }
}

function threePersonChecker() {
    if (acpOProfileData.currentSupport != "High") {
        acpOProfileData.threePerson = 2;
    }
};

let needDPMeeting = ref(false)

function needDPMeetingChecker() {
    if (acpOProfileData.currentSupport === "High" && acpOProfileData.developmentPlanMeeting == null) {
        needDPMeeting.value = true
    }
    else {
        needDPMeeting.value = false
    }
}
console.log(needDPMeeting.value)

acpOProfileData.developmentPlanMeeting = fromFirestoreTimestamp(acpOProfileData.developmentPlanMeeting)
acpOProfileData.milestoneMeetingTwo = fromFirestoreTimestamp(acpOProfileData.milestoneMeetingTwo)
acpOProfileData.milestoneMeetingThree = fromFirestoreTimestamp(acpOProfileData.milestoneMeetingThree)
acpOProfileData.milestoneMeetingFour = fromFirestoreTimestamp(acpOProfileData.milestoneMeetingFour)

const updateMeetingDP = (newDate) => { acpOProfileData.developmentPlanMeeting = newDate; };
const updateMeetingCloseDP = (newDate) => { acpOProfileData.closeDevelopmentPlanMeeting = newDate; };
const updateMeetingTwo = (newDate) => { acpOProfileData.milestoneMeetingTwo = newDate; };
const updateMeetingThree = (newDate) => { acpOProfileData.milestoneMeetingThree = newDate; };
const updateMeetingFour = (newDate) => { acpOProfileData.milestoneMeetingFour = newDate; };

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
        const dPMeeting = await toFirestoreTimestamp(acpOProfileData.developmentPlanMeeting)
        const cDPMeeting = await toFirestoreTimestamp(acpOProfileData.closeDevelopmentPlanMeeting)
        const msMeetingTwo = await toFirestoreTimestamp(acpOProfileData.milestoneMeetingTwo)
        const msMeetingThree = await toFirestoreTimestamp(acpOProfileData.milestoneMeetingThree)
        const msMeetingFour = await toFirestoreTimestamp(acpOProfileData.milestoneMeetingFour)
        setCurrentSupport(acpOProfileData)
        threePersonChecker()
        needDPMeetingChecker()
        await setDoc(doc(db, "acpoTracker", firebaseUser.value.uid + "_" + up.cohort),
            // acpOProfileData
            {
                pped: acpOProfileData.pped,
                developmentPlanMeeting: dPMeeting,
                needDPMeeting: needDPMeeting.value,
                closeDevelopmentPlanMeeting: cDPMeeting,
                milestoneMeetingTwo: msMeetingTwo,
                milestoneMeetingThree: msMeetingThree,
                milestoneMeetingFour: msMeetingFour,
                currentMilestone: acpOProfileData.currentMilestone,
                currentSupport: acpOProfileData.currentSupport,
                supportLevelMSTwo: acpOProfileData.supportLevelMSTwo,
                supportLevelMSThree: acpOProfileData.supportLevelMSThree,
                supportLevelMSFour: acpOProfileData.supportLevelMSFour,
                threePerson: acpOProfileData.threePerson,
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