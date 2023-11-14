<template>
    <div class="q-ma-md">
        <div>
            <q-table table-header-class="bg-secondary text-white" :rows="rows" row-key="shiftID" :columns="columns" dense
                flat bordered :filter="filter" ref="myTable"
                :pagination="{ sortBy: 'creationDate', descending: true, rowsPerPage: 20 }"
                rows-per-page-label="Shifts per page:">
                <template v-slot:top="props">
                    <div class="flex justify-between full-width">
                        <div class="text-h5 text-secondary">Scheduled Shifts</div>
                        <div class="flex items-center">
                            <q-input filled dense label="Date Range" v-model="inputDisplay" color="green-10"
                                class="bg-grey-4" style="min-width: 250px;">
                                <template #append>
                                    <!-- <q-icon name="close" class="cursor-pointer" round flat /> -->
                                    <q-btn v-if="inputDisplay" icon="close" size="7px" round flat
                                        class="bg-grey-6 text-grey-4" @click="clearDateFilter" />
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date v-model="dateRange" @update:model-value="dateSelected" range
                                                color="green-10">
                                                <q-btn v-close-popup flat label="Close" />
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                            <q-btn color="green-10" class="q-mx-md q-mb-xs" icon-right="sym_o_table" label="Export to CSV"
                                no-caps @click="exportTable" />
                            <q-input v-model="filter" class="bg-grey-4" dense filled label="Search..." clearable
                                color="red-10">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                </template>
                <template v-slot:body-cell-car="props">
                    <q-td :props="props">
                        <q-badge color="yellow-10" v-if="props.row.car.charAt(props.row.car.length - 1) === 'D'">
                            {{ props.row.car }}
                        </q-badge>
                        <q-badge color="primary" v-else-if="props.row.car.charAt(props.row.car.length - 1) === 'N'">
                            {{ props.row.car }}
                        </q-badge>
                        <q-badge color="pink-8" v-else>
                            {{ props.row.car }}
                        </q-badge>
                    </q-td>
                </template>
                <template v-slot:body-cell-menteeTwo="props">
                    <q-td :props="props">
                        <div v-if="props.row.menteeTwoName === 'N/A'" class="text-grey-5">
                            {{ props.row.menteeTwoName }}
                        </div>
                        <div v-else>
                            {{ props.row.menteeTwoName }}
                        </div>
                    </q-td>
                </template>
                <template v-slot:body-cell-menteeTwoEE="props">
                    <q-td :props="props">
                        <div v-if="props.row.menteeTwoName === 'N/A'" class="text-grey-5">
                            {{ props.row.menteeTwoEE }}
                        </div>
                        <div v-else>
                            {{ props.row.menteeTwoEE }}
                        </div>
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn flat dense size="10px" round icon="menu" :props="props">
                            <q-menu dense :props="props">
                                <q-btn @click="deleteShift(props)" flat color="red" icon="delete" no-wrap label="Delete" />
                            </q-menu>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
    </div>
</template>

<script setup>

import { collection, query, onSnapshot, getFirestore, deleteDoc, doc, limit, orderBy } from "firebase/firestore"
import { exportFile, useQuasar } from 'quasar'


const db = getFirestore()

const props = defineProps(['allShiftData'])
const dateRange = ref('');
const startDateFilter = ref([])
const rows = ref([])

watch(() => props.allShiftData, (newVal) => {
    rows.value = newVal;
});

const inputDisplay = ref('');
const clearDateFilter = () => {
    rows.value = props.allShiftData
    inputDisplay.value = ''
}

const dateSelected = () => {
    inputDisplay.value = `${dateRange.value.from} - ${dateRange.value.to}`;
    const start = new Date(dateRange.value.from);
    const end = new Date(dateRange.value.to);

    rows.value = props.allShiftData.filter(shift => {
        const shiftStartDate = new Date(shift.startDate);
        return shiftStartDate >= start && shiftStartDate <= end;
    });
};


const columns = [
    { name: 'date', label: 'Shift Date', field: 'startDate', align: 'left', sortable: true },
    { name: 'car', label: 'Car', field: 'car', align: 'left', sortable: true, },
    { name: 'time', label: 'Shift Time', field: 'startTime', align: 'left', sortable: true },
    { name: 'menteeOne', label: 'Mentee 1', field: 'menteeOneName', align: 'left', sortable: true, },
    { name: 'menteeOneEE', label: 'Mentee 1 EE#', field: 'menteeOneEE', align: 'left', sortable: true, },
    { name: 'menteeTwo', label: 'Mentee 2', field: 'menteeTwoName', align: 'left', sortable: true, },
    { name: 'menteeTwoEE', label: 'Mentee 2 EE#', field: 'menteeTwoEE', align: 'left', sortable: true, },
    { name: 'mentor', label: 'Mentor', field: 'mentorName', align: 'right', sortable: true, },
    { name: 'actions', label: 'Actions', field: '', align: 'center' }
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

    return `"${formatted}"`
}

const myTable = ref(null)

const exportTable = () => {
    const content = [columns.map(col => wrapCsvValue(col.label))].concat(
        myTable.value.filteredSortedRows.map(row =>
            columns.map(col =>
                wrapCsvValue(
                    typeof col.field === 'function'
                        ? col.field(row)
                        : row[col.field === void 0 ? col.name : col.field],
                    col.format,
                    row
                )
            ).join(',')
        )
    ).join('\r\n')

    const status = exportFile(`ACP-Orientation ${inputDisplay.value}.csv`, content, 'text/csv')
}

const deleteShift = async (shift) => {
    await deleteDoc(doc(db, "scheduledShifts", shift.key));
};

</script>

<style scoped></style>