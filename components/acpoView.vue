<template>
    <div class="full-width">

        <q-card class="q-mt-md">
            <q-card-section>
                <div class="row justify-between">
                    <div class="text-h4">
                        Mentee Profile: {{ acpoProfile.firstName }} {{
                            acpoProfile.lastName }} ({{ acpoProfile.cohort }})
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
                <q-separator inset />
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
                <q-separator inset />
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
                <q-separator inset />
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
import { doc, getDoc, getFirestore, } from "firebase/firestore";
const db = getFirestore();

const emit = defineEmits(["acpoMode"])
const mID = defineProps(['selectedMenteeID'])

const acpoProfile = ref('')

watchEffect(async () => {
    const docACPOProfileRef = doc(db, "acpoTracker", mID.selectedMenteeID);
    try {
        const docACPOProfileSnap = await getDoc(docACPOProfileRef);
        acpoProfile.value = docACPOProfileSnap.data();
        //Is there a better way to convert these to dates??
        acpoProfile.value.developmentPlanMeeting = acpoProfile.value.developmentPlanMeeting ? acpoProfile.value.developmentPlanMeeting.toDate() : "N/A";
        acpoProfile.value.closeDevelopmentPlanMeeting = acpoProfile.value.closeDevelopmentPlanMeeting ? acpoProfile.value.closeDevelopmentPlanMeeting.toDate() : "N/A";
        acpoProfile.value.milestoneMeetingTwo = acpoProfile.value.milestoneMeetingTwo ? acpoProfile.value.milestoneMeetingTwo.toDate() : "TBD";
        acpoProfile.value.milestoneMeetingThree = acpoProfile.value.milestoneMeetingThree ? acpoProfile.value.milestoneMeetingThree.toDate() : "TBD";
        acpoProfile.value.milestoneMeetingFour = acpoProfile.value.milestoneMeetingFour ? acpoProfile.value.milestoneMeetingFour.toDate() : "TBD";
    } catch (error) {
        console.error(error)
    }
})

</script>
<style scoped></style>