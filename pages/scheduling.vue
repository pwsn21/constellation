<template>
    <div>
        <q-splitter v-model="splitter" style="height: fit-content" unit="px">

            <template #before>
                <div>
                    <SchedulingFormShift :selectedShift="selectedShift" />
                </div>
            </template>

            <template #after>
                <q-tabs v-model="currentTab" align="left" inline-label stretch class="q-mt-sm text-grey-6" narrow-indicator>
                    <q-tab name="lastAdded" label="Last Added" icon="calendar_month" content-class="text-red-10" />
                    <q-tab name="byUser" label="View All" icon="people" class="text-deep-purple-10" />
                    <q-tab name="byStation" label="View By Station" icon="emoji_transportation" class="text-teal-10" />
                    <q-tab name="byDate" label="View By Date Range" icon="date_range" class="text-brown-10" />
                </q-tabs>
                <q-tab-panels v-model="currentTab" transition-next="jump-down" animated transition-prev="jump-down"
                    transition-duration="200">
                    <q-tab-panel name="lastAdded" class="q-px-xs">
                        <schedulingTableLastAdded @selected-shift="onShiftSelected" />
                    </q-tab-panel>
                    <q-tab-panel name="byUser" class="q-px-xs">
                        <schedulingTableByUser @selected-shift="onShiftSelected" />
                    </q-tab-panel>
                    <q-tab-panel name="byStation">
                        <schedulingTableByStation @selected-shift="onShiftSelected" />
                    </q-tab-panel>
                    <q-tab-panel name="byDate">
                        <schedulingTableByDate @selected-shift="onShiftSelected" />
                    </q-tab-panel>
                </q-tab-panels>
            </template>
        </q-splitter>
    </div>
</template>

<script setup>
const splitter = ref(505)
let selectedShift = ref('')
const currentTab = ref('lastAdded')

const onShiftSelected = (shift) => {
    selectedShift.value = shift
}


</script>

<style scoped></style>