<template>
    <div class="q-pa-md full-width">

        <q-card class="q-mt-md">
            <q-card-section>
                <div class="row justify-between">
                    <div class="text-h4">
                        ACP-Orientation Profile: {{ acpoProfile.firstName }} {{
                            acpoProfile.lastName }} ({{ acpoProfile.cohort }})
                    </div>
                    <div><q-btn icon="edit" flat @click="$emit('acpoMode', mID.selectedMenteeID, 'acpoEdit')" /></div>
                </div>
            </q-card-section>
            <q-list dense>
                <q-item>
                    <div class="text-h6"> Currently in {{ acpoProfile.currentMilestone }} - {{ acpoProfile.currentSupport }}
                        Support </div>
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
                        Development Plan Meeting: {{ acpoProfile.developmentPlanMeeting ? acpoProfile.developmentPlanMeeting
                            : 'N/A' }}
                    </q-item>
                    <q-item>
                        Close Development Plan Meeting: {{ acpoProfile.closeDevelopmentPlanMeeting ?
                            acpoProfile.developmentPlanMeeting : 'N/A' }}
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

let docACPOProfileRef = ref('')
let docACPOProfileSnap = ref('')
let acpoProfile = ref('')

watchEffect(async () => {
    docACPOProfileRef = doc(db, "acpoTracker", mID.selectedMenteeID);
    try {
        docACPOProfileSnap = await getDoc(docACPOProfileRef);
        acpoProfile.value = docACPOProfileSnap.data();

    } catch (error) {
        console.error(error)
    }
})

// 'O9ySQiiCCLRtOKv1MTKVb4FOEUF2_2023-3'
</script>
<style scoped></style>