<template>
    <div>
        <div class="row justify-between text-brown-10">

            <div class="row justify-start">
                <div class="text-h5" style="min-width: 100px;">
                    By Date
                </div>
                <div class="">
                    <q-input filled dense label="Date Range" v-model="inputDisplay" color="brown-10"
                        style="min-width: 225px;">
                        <template #append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="dateRange" @update:model-value="dateSelected" range color="brown-10">
                                        <q-btn v-close-popup flat label="close" />
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <q-btn color="brown-10" class="q-mx-md q-mb-xs" icon-right="sym_o_table" label="Export to CSV" no-caps
                    @click="exportTable" />
            </div>

            <div class="q-mb-xs flex">
                <q-input v-model="filter" color="brown-10" class="bg-grey-4" style="min-width: 175px;" dense filled
                    label="Search..." clearable> <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>

        </div>

        <div>
            <q-table table-header-class="bg-brown-10 text-white" :rows="shifts" row-key="id" :columns="columns" dense flat
                bordered :filter="filter" :pagination="{ sortBy: 'date', descending: true, rowsPerPage: 20 }"
                no-data-label="Please Select a Date Range" @row-click="menteeShift" rows-per-page-label="Shifts per page:">
            </q-table>
        </div>
    </div>
</template>

<script setup>

import { collection, query, onSnapshot, getFirestore, deleteDoc, doc, limit, orderBy, where } from "firebase/firestore";
import { exportFile, useQuasar } from 'quasar'

const shifts = ref([])
const dateRange = ref('')
const inputDisplay = ref('')

const dateSelected = () => {
    inputDisplay.value = `${dateRange.value.from} - ${dateRange.value.to}`
    let start = ref(new Date(dateRange.value.from))
    let end = ref(new Date(dateRange.value.to))

    const shiftsCollection = getCollection('scheduledShifts')
    const q = query(shiftsCollection, where('startTimestamp', '>=', start.value), where('startTimestamp', '<=', end.value), limit(500))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        shifts.value = [];
        querySnapshot.forEach((doc) => {
            const shiftData = doc.data();
            shiftData.id = doc.id;
            shifts.value.push(shiftData);
        })
    })
}

const emit = defineEmits(["selectedShift"])
const menteeShift = (event, row) => {
    emit("selectedShift", row.id)
};

const columns = [
    { name: 'date', label: 'Shift Date', field: 'startDate', align: 'left', sortable: true },
    { name: 'car', label: 'Car', field: 'car', align: 'left', sortable: true, },
    { name: 'startTime', label: 'Start Time', field: 'startTime', align: 'left' },
    { name: 'endTime', label: 'End Time', field: 'endTime', align: 'left' },
    { name: 'menteeOne', label: 'Mentee #1', field: 'menteeOneName', align: 'left', sortable: true, },
    { name: 'menteeOneEE', label: 'Mentee 1 EE', field: 'menteeOneEmployeeNumber', align: 'left' },
    { name: 'menteeTwo', label: 'Mentee #2', field: 'menteeTwoName', align: 'left', sortable: true, },
    { name: 'menteeTwoEE', label: 'Mentee 2 EE', field: 'menteeTwoEmployeeNumber', align: 'left' },
    { name: 'mentor', label: 'Mentor', field: 'mentorName', align: 'right', sortable: true, },
];

const filter = ref('')

function wrapCsvValue(val, formatFn, row) {
    let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val

    formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
}

const exportTable = () => {
    // naive encoding to csv format
    const content = [columns.map(col => wrapCsvValue(col.label))].concat(
        shifts.value.map(shift => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
                ? col.field(shift)
                : shift[col.field === void 0 ? col.name : col.field],
            col.format,
            shift
        )).join(','))
    ).join('\r\n')

    const status = exportFile(
        `ACP-Orientation ${inputDisplay.value}.csv`,
        content,
        'text/csv'
    )

    if (status !== true) {
        $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
        })
    }
}





</script>

<style scoped></style>