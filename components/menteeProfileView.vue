<template>
    <div class="q-mb-md">
        <q-card class="q-mt-none" style="min-width: 400px; max-width: 850px;">
            <q-card-section>
                <div class="row justify-between items-center">
                    <div class="col">
                        <div class="text-h4 text-secondary">
                            {{ menteeID.selectedMentee.name }} ({{ menteeProfile.cohort }})
                        </div>
                        <div v-if="!profileData.role.includes('mentee')" class="text-subtitle1 text-secondary">
                            {{ menteeProfile.acpoStatus }}
                        </div>
                    </div>

                    <div v-if="profileData.role.includes('admin') || profileData.role.includes('pped')">
                        <q-btn icon="edit" round flat
                            @click="$emit('acpoMode', menteeID.selectedMentee, 'acpoEdit', 'menteeProgressTab')" />
                    </div>
                </div>
            </q-card-section>
            <q-list class="bg-grey-3" dense>
                <q-item>
                    <div>
                        <div class="text-subtitle1">
                            {{ menteeProfile.currentMilestone }} -
                            {{ menteeProfile.currentSupport }} Support
                        </div>
                        <div class="text-subtitle1">
                        </div>
                    </div>
                </q-item>
            </q-list>
            <q-separator />
        </q-card>
    </div>


    <div class="full-width">
        <div class="row justify-between q-gutter-sm">
            <q-card style="min-width: 400px; max-width: 400px; width: 100%;">
                <q-card-section>
                    <div class="text-h6 text-weight-bold">Milestone 2 </div>

                    <q-linear-progress :value="msTwoData.progress" size="20px" color="secondary" track-color="secondary">
                        <div class="text-caption text-white text-weight-bold absolute-full flex flex-center">
                            {{ msTwoData.count }}/{{ msTwoData.required }} {{ msTwoData.modifiers === 0 ? '' : `+
                            ${msTwoData.modifiers}` }}

                        </div>
                    </q-linear-progress>

                    <q-list dense>
                        <q-item>
                            Support Level: {{ menteeProfile.supportLevelMSTwo }}
                        </q-item>
                        <q-item v-if="menteeProfile.supportLevelMSTwo == 'High'">
                            Development Plan Meeting: {{ menteeProfile.developmentPlanMeeting }}
                        </q-item>
                        <q-item v-if="menteeProfile.supportLevelMSTwo == 'High'">
                            Close Development Plan Meeting: {{ menteeProfile.closeDevelopmentPlanMeeting }}
                        </q-item>
                        <q-item>
                            Milestone Meeting: {{ menteeProfile.milestoneMeetingTwo }}
                        </q-item>
                    </q-list>
                </q-card-section>
            </q-card>

            <q-card style="min-width: 400px; max-width: 400px; width: 100%;">
                <q-card-section>
                    <div class="text-h6 text-weight-bold">Milestone 3 </div>
                    <q-linear-progress :value="msThreeData.progress" size="20px" color="secondary" track-color="secondary">
                        <div class="text-caption text-white text-weight-bold absolute-full flex flex-center">
                            {{ msThreeData.count }}/{{ msThreeData.required }} {{ msThreeData.modifiers === 0 ? '' : `+
                            ${msThreeData.modifiers}` }}
                        </div>
                    </q-linear-progress>

                    <q-list dense>
                        <q-item>
                            Support Level: {{ menteeProfile.supportLevelMSThree }}
                        </q-item>
                        <q-item>
                            Milestone Meeting: {{ menteeProfile.milestoneMeetingThree }}
                        </q-item>
                    </q-list>
                </q-card-section>
            </q-card>
            <q-card style="min-width: 400px; max-width: 400px; width: 100%;">
                <q-card-section>
                    <div class="text-h6 text-weight-bold">Milestone 4 </div>
                    <q-linear-progress :value="msFourData.progress" size="20px" color="secondary" track-color="secondary">
                        <div class="text-caption text-white text-weight-bold absolute-full flex flex-center">
                            {{ msFourData.count }}/{{ msFourData.required }} {{ msFourData.modifiers === 0 ? '' : `+
                            ${msFourData.modifiers}` }}
                        </div>
                    </q-linear-progress>

                    <q-list dense>
                        <q-item>
                            Support Level: {{ menteeProfile.supportLevelMSFour }}
                        </q-item>
                        <q-item>
                            Milestone Meeting: {{ menteeProfile.milestoneMeetingFour }}
                        </q-item>
                    </q-list>
                </q-card-section>


                <q-separator inset />
            </q-card>
        </div>
    </div>
</template>

<script setup>
const firebaseUser = await useFirebaseUser()
const profileData = getUD(firebaseUser.value.uid)

const msCardStyle = "width=100%; min-width: 400px; max-width: 850px;"

const emit = defineEmits(["acpoMode"])
const menteeID = defineProps(['selectedMentee'])
let menteeProfile = ref('')
let msTwoData = ref('')
let msThreeData = ref('')
let msFourData = ref('')

watchEffect(async () => {
    try {
        menteeProfile.value = await (menteeData(menteeID.selectedMentee.menteeID))
        menteeProfile.value.developmentPlanMeeting = await dateLongFormat(menteeProfile.value.developmentPlanMeeting)
        menteeProfile.value.closeDevelopmentPlanMeeting = await dateLongFormat(menteeProfile.value.closeDevelopmentPlanMeeting)
        menteeProfile.value.milestoneMeetingTwo = await dateLongFormat(menteeProfile.value.milestoneMeetingTwo)
        menteeProfile.value.milestoneMeetingThree = await dateLongFormat(menteeProfile.value.milestoneMeetingThree)
        menteeProfile.value.milestoneMeetingFour = await dateLongFormat(menteeProfile.value.milestoneMeetingFour)

        msTwoData.value = await calcProgress(menteeProfile.value.supportLevelMSTwo, qMenteeAttendance(menteeID.selectedMentee.menteeID, 'Milestone 2'), menteeProfile.value.msTwoRequiredShiftModifier)
        msThreeData.value = await calcProgress(menteeProfile.value.supportLevelMSThree, qMenteeAttendance(menteeID.selectedMentee.menteeID, 'Milestone 3'), menteeProfile.value.msThreeRequiredShiftModifier)
        msFourData.value = await calcProgress(menteeProfile.value.supportLevelMSFour, qMenteeAttendance(menteeID.selectedMentee.menteeID, 'Milestone 4'), menteeProfile.value.msFourRequiredShiftModifier)
    } catch (error) {
        console.error(error)
    }
})

</script>
<style scoped></style>