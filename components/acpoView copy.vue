<template>
    <div class="full-width">
        <q-card class="q-mt-md">
            <q-card-section>
                <div class="row justify-between">
                    <div class="text-h4">
                        {{ acpoProfile.firstName }} {{ acpoProfile.lastName }} ({{ acpoProfile.cohort }})
                    </div>
                    <div>
                        <q-btn icon="edit" round flat @click="$emit('acpoMode', mID.selectedMenteeID, 'acpoEdit')" />
                        <q-btn icon="close" round flat @click="$emit('acpoMode', '', '')" />
                    </div>
                </div>
            </q-card-section>
            <q-list class="bg-grey-3" dense>
                <q-item class="row justify-between items-center">
                    <div class="text-h6"> Currently in {{ acpoProfile.currentMilestone }} - {{
                        acpoProfile.currentSupport }}
                        Support </div>
                    <div v-if="acpoProfile.needDPMeeting === true" class="text-subtitle1 text-red-5">Needs Development Plan
                        Meeting
                    </div>
                </q-item>
            </q-list>
            <q-separator />
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">Milestone 2 </div>
                <q-linear-progress :value="progress.msTwoProgress" size="20px" color="red-9" track-color="red-9">
                    <div class="text-caption text-weight-bold absolute-full flex flex-center">
                        {{ count.msTwoShifts }}/{{ required.supportLevelMSTwo }}
                    </div>
                </q-linear-progress>

                <q-list dense>
                    <q-item>
                        Support Level: {{ acpoProfile.supportLevelMSTwo }}
                    </q-item>
                    <q-item>
                        Development Plan Meeting: {{ acpoProfile.developmentPlanMeeting }}
                    </q-item>
                    <q-item>
                        Close Development Plan Meeting: {{ acpoProfile.closeDevelopmentPlanMeeting }}
                    </q-item>
                    <q-item>
                        Milestone Meeting: {{ acpoProfile.milestoneMeetingTwo }}
                    </q-item>
                </q-list>
            </q-card-section>
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">Milestone 3 </div>
                <q-linear-progress :value="progress.msThreeProgress" size="20px" color="red-9" track-color="red-9">
                    <div class="text-caption text-weight-bold absolute-full flex flex-center">
                        {{ count.msThreeShifts }}/{{ required.supportLevelMSThree }}
                    </div>
                </q-linear-progress>
                <q-list dense>
                    <q-item>
                        Support Level: {{ acpoProfile.supportLevelMSThree }}
                    </q-item>
                    <q-item>
                        Milestone Meeting: {{ acpoProfile.milestoneMeetingThree }}
                    </q-item>
                </q-list>
            </q-card-section>
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">Milestone 4 </div>
                <q-linear-progress :value="progress.msFourProgress" size="20px" color="red-9" track-color="red-9">
                    <div class="text-caption text-weight-bold absolute-full flex flex-center">
                        {{ count.msFourShifts }}/{{ required.supportLevelMSFour }}
                    </div>
                </q-linear-progress>
                <q-list dense>
                    <q-item>
                        Support Level: {{ acpoProfile.supportLevelMSFour }}
                    </q-item>
                    <q-item>
                        Milestone Meeting: {{ acpoProfile.milestoneMeetingFour }}
                    </q-item>
                </q-list>
            </q-card-section>

            <q-separator inset />
        </q-card>

    </div>
</template>

<script setup>
import { doc, getDoc, getFirestore, query, where, collection, getCountFromServer } from "firebase/firestore";

const db = getFirestore();

const emit = defineEmits(["acpoMode"])
const mID = defineProps(['selectedMenteeID'])

const acpoProfile = ref('')
const coll = collection(db, "scheduledShifts")

const count = reactive({
    msTwoShifts: 0,
    msThreeShifts: 0,
    msFourShifts: 0,
})

const required = reactive({
    supportLevelMSTwo: 24,
    supportLevelMSThree: 20,
    supportLevelMSFour: 8,
})

const progress = reactive({
    msTwoProgress: 0,
    msThreeProgress: 0,
    msFourProgress: 0,
})

watchEffect(async () => {
    const docACPOProfileRef = doc(db, "acpoTracker", mID.selectedMenteeID);

    const q2 = query(coll, where("mID", "==", mID.selectedMenteeID), where("milestone", "==", "Milestone 2"))
    const q3 = query(coll, where("mID", "==", mID.selectedMenteeID), where("milestone", "==", "Milestone 3"))
    const q4 = query(coll, where("mID", "==", mID.selectedMenteeID), where("milestone", "==", "Milestone 4"))
    try {
        const docACPOProfileSnap = await getDoc(docACPOProfileRef)
        acpoProfile.value = docACPOProfileSnap.data();
        //Is there a better way to convert these to dates??
        acpoProfile.value.developmentPlanMeeting = acpoProfile.value.developmentPlanMeeting ? acpoProfile.value.developmentPlanMeeting.toDate() : "N/A";
        acpoProfile.value.closeDevelopmentPlanMeeting = acpoProfile.value.closeDevelopmentPlanMeeting ? acpoProfile.value.closeDevelopmentPlanMeeting.toDate() : "N/A";
        acpoProfile.value.milestoneMeetingTwo = acpoProfile.value.milestoneMeetingTwo ? acpoProfile.value.milestoneMeetingTwo.toDate() : "TBD";
        acpoProfile.value.milestoneMeetingThree = acpoProfile.value.milestoneMeetingThree ? acpoProfile.value.milestoneMeetingThree.toDate() : "TBD";
        acpoProfile.value.milestoneMeetingFour = acpoProfile.value.milestoneMeetingFour ? acpoProfile.value.milestoneMeetingFour.toDate() : "TBD";

        const noMSTwoShifts = await getCountFromServer(q2)
        const noMSThreeShifts = await getCountFromServer(q3)
        const noMSFourShifts = await getCountFromServer(q4)
        count.msTwoShifts = noMSTwoShifts.data().count
        count.msThreeShifts = noMSThreeShifts.data().count
        count.msFourShifts = noMSFourShifts.data().count
        progress.msTwoProgress = count.msTwoShifts / required.supportLevelMSTwo;
        progress.msThreeProgress = count.msThreeShifts / required.supportLevelMSThree;
        progress.msFourProgress = count.msFourShifts / required.supportLevelMSFour;

    } catch (error) {
        console.error(error)
    }
})

</script>
<style scoped></style>