<template>
    <div class="q-pa-md full-width">
        <q-page class="flex" padding>
            <q-form @submit.prevent="saveAcpOProfile" class="q-gutter-md">
                <q-card class="w-full">
                    <q-card-section>
                        <div class="text-h5 tw-pb-2">{{ acpOProfileData.firstName }} {{ acpOProfileData.lastName }} {{
                            acpOProfileData.cohort }} </div>
                        <div>Current Milestone: {{ acpOProfileData.currentMilestone }}</div>
                        <div>Current Support Level: {{ acpOProfileData.currentSupport }}</div>
                        <q-separator />

                        <q-select filled v-model="acpOProfileData.pped" label="Assigned Practice Educator"
                            :options="options.ppeds" />
                    </q-card-section>
                </q-card>
                <!-- Milestone Two -->
                <q-card>

                    <q-card-section>
                        <div class="text-h6 q-pbt-sm">Milestone 2</div>
                    </q-card-section>
                    <q-separator inset />
                    <q-card-section>
                        <q-select filled v-model="acpOProfileData.supportLevelMSTwo" label="Milestone 2 Support Level"
                            :options="options.supportLevelHigh" />
                        <q-input filled label="Development Plan Meeting" clearable
                            v-model="acpOProfileData.developmentPlanMeeting">
                            <template #prepend>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date today-btn v-model="acpOProfileData.developmentPlanMeeting"
                                            :mask="datetimemask">
                                            <q-btn v-close-popup flat label="close" />
                                        </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                            <template #append>
                                <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-time v-model="acpOProfileData.developmentPlanMeeting" :mask="datetimemask"
                                            format24h>
                                            <q-btn v-close-popup flat label="close" />
                                        </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                        <q-toggle v-if="acpOProfileData.supportLevelMSTwo === 'High'" :false-value="2"
                            :label="`Mentee is in ${acpOProfileData.threePerson} person configuration`" :true-value="3"
                            color="blue" v-model="acpOProfileData.threePerson" />
                        <q-input filled label="Milestone Two Meeting" clearable
                            v-model="acpOProfileData.milestoneMeetingTwo">
                            <template #prepend>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date today-btn v-model="acpOProfileData.milestoneMeetingTwo"
                                            :mask="datetimemask">
                                            <q-btn v-close-popup flat label="close" />
                                        </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                            <template #append>
                                <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-time v-model="acpOProfileData.milestoneMeetingTwo" :mask="datetimemask"
                                            format24h>
                                            <q-btn v-close-popup flat label="close" />
                                        </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </q-card-section>
                </q-card>

                <!-- Milestone Three -->
                <q-card>

                    <q-card-section class="bg-primary text-white">
                        <div class="text-h6 q-pa-sm">Milestone 3</div>
                    </q-card-section>
                    <q-select filled v-model="acpOProfileData.supportLevelMSThree" label="Milestone 3 Support Level"
                        :options="options.supportLevel" />
                    <q-input filled label="Milestone Three Meeting" clearable
                        v-model="acpOProfileData.milestoneMeetingThree">
                        <template #prepend>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date today-btn v-model="acpOProfileData.milestoneMeetingThree" :mask="datetimemask">
                                        <q-btn v-close-popup flat label="close" />
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                        <template #append>
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="acpOProfileData.milestoneMeetingThree" :mask="datetimemask" format24h>
                                        <q-btn v-close-popup flat label="close" />
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>

                </q-card>
                <!-- Milestone Four -->
                <q-card>

                    <q-card-section class="bg-primary text-white">
                        <div class="text-h6 q-pa-sm">Milestone 4</div>
                    </q-card-section>
                    <q-select filled v-model="acpOProfileData.supportLevelMSFour" label="Milestone 4 Support Level"
                        :options="options.supportLevel" />
                    <q-input filled label="Milestone Four Meeting" clearable v-model="acpOProfileData.milestoneMeetingFour">
                        <template #prepend>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date today-btn v-model="acpOProfileData.milestoneMeetingFour" :mask="datetimemask">
                                        <q-btn v-close-popup flat label="close" />
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                        <template #append>
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="acpOProfileData.milestoneMeetingFour" :mask="datetimemask" format24h>
                                        <q-btn v-close-popup flat label="close" />
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>

                </q-card>



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
let profileData = reactive({
    cohort: "",
})
profileData = up

const docRef = doc(db, "acpoTracker", firebaseUser.value.uid + "_" + profileData.cohort);
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

// function supportLevelSelected() {
//     if (acpOProfileData.currentSupport != "High") {
//         acpOProfileData.threePerson = 2;
//     }
// };

acpOProfileData.developmentPlanMeeting = fromFirestoreTimestamp(acpOProfileData.developmentPlanMeeting)
acpOProfileData.milestoneMeetingTwo = fromFirestoreTimestamp(acpOProfileData.milestoneMeetingTwo)
acpOProfileData.milestoneMeetingThree = fromFirestoreTimestamp(acpOProfileData.milestoneMeetingThree)
acpOProfileData.milestoneMeetingFour = fromFirestoreTimestamp(acpOProfileData.milestoneMeetingFour)

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
        const msMeetingTwo = await toFirestoreTimestamp(acpOProfileData.milestoneMeetingTwo)
        const msMeetingThree = await toFirestoreTimestamp(acpOProfileData.milestoneMeetingThree)
        const msMeetingFour = await toFirestoreTimestamp(acpOProfileData.milestoneMeetingFour)
        setCurrentSupport(acpOProfileData)
        await setDoc(doc(db, "acpoTracker", firebaseUser.value.uid + "_" + profileData.cohort),
            // acpOProfileData
            {
                pped: acpOProfileData.pped,
                developmentPlanMeeting: dPMeeting,
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