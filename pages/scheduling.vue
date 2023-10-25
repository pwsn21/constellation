<template>
    <div>
        <q-splitter v-model="splitter" style="height: fit-content" unit="px">

            <template #before>
                <div>
                    <SchedulingFormShift :shiftID="shiftID" />
                </div>
            </template>

            <template #after>
                <q-tabs v-model="currentTab" align="left" inline-label stretch class="q-mt-sm text-grey-6" narrow-indicator>
                    <q-tab name="lastAdded" label="Last Added" icon="calendar_month" content-class="text-red-10" />
                    <q-tab name="byMentee" label="View By Mentee" icon="person" class="text-purple-10" />
                    <q-tab name="byStation" label="View By Station" icon="emoji_transportation" class="text-green-10" />
                </q-tabs>
                <q-tab-panels v-model="currentTab" transition-next="jump-down" animated transition-prev="jump-down"
                    transition-duration="200">
                    <q-tab-panel name="lastAdded" class="q-px-xs">
                        <schedulingTableLastAdded @selected-shift="onShiftSelected" />
                    </q-tab-panel>
                    <q-tab-panel name="byMentee">
                        by Mentee
                    </q-tab-panel>
                    <q-tab-panel name="byStation">
                        by Station
                    </q-tab-panel>
                </q-tab-panels>
            </template>
        </q-splitter>
    </div>
</template>

<script setup>
const splitter = ref(505)
let shiftID = ref('')
const currentTab = ref('lastAdded')

const onShiftSelected = (id) => {
    shiftID.value = id
}


</script>

<style scoped></style>