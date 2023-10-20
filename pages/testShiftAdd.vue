<template>
    <div>
        <q-splitter v-model="splitter" style="height: fit-content" unit="px">

            <template #before>
                <div>
                    <SchedulingFormShift :shiftID="shiftID" />
                </div>
            </template>

            <template #after>
                <div class="q-ma-lg">
                    <!-- From Parent: {{ shiftID }} -->
                    <div>
                        <schedulingTableShifts @selected-shift="onShiftSelected" />
                    </div>
                </div>
            </template>

        </q-splitter>
    </div>
</template>

<script setup>
const splitter = ref(505)
let shiftID = ref('')

const onShiftSelected = (id) => {
    shiftID.value = id
}


</script>

<style scoped></style>