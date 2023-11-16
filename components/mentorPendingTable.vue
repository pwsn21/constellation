<template>
    <div>
        <div class="flex justify-start">
            <div class="text-h5 text-primary center q-pa-none">Pending Attendance Forms</div>
        </div>
        <div>
            <q-table :rows="forms" :columns="menteeColumns" row-key="id" title-class="text-h4" dense
                table-header-class="bg-primary text-white" no-data-label="No Pending Attendance Forms"
                :pagination="{ rowsPerPage: 20 }">
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn dense round flat color="green" @click="approveShift(props.row)" icon="check"></q-btn>
                        <q-btn dense round flat color="red" icon="block" :props="props">
                            <q-menu dense :props="props">
                                <q-item class="q-pa-xs" dense>
                                    <q-btn dense flat color="red" @click="denyShift(props.row, 'Did Not Show')" icon="block"
                                        label="Did Not Show" no-caps />
                                </q-item>
                                <q-item class="q-pa-xs" dense>

                                </q-item>
                            </q-menu>
                        </q-btn>
                    </q-td>
                </template>
                <template v-slot:no-data="{ message }">
                    <div class="full-width row flex-center text-primary">
                        <q-icon size="30px" name="mood" /> {{ message }}
                    </div>
                </template>
            </q-table>
        </div>
    </div>
</template>

<script setup>
const mentorID = defineProps(['mentorID'])

const forms = await mentorPendingAttendance(mentorID.mentorID)

const menteeColumns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'car', label: 'Car', field: 'car', align: 'left', sortable: true },
    { name: 'date', label: 'Shift Date', field: 'date', align: 'left', sortable: true },
    { name: 'actions', label: 'Actions', field: '', align: 'center' },
];

const approveShift = async (props) => {
    await setFSDoc("acpoFormsAttendance", props.id, { approvalStatus: 'Approved' }, { merge: true })
}

const denyShift = async (props, reason) => {
    await setFSDoc("acpoFormsAttendance", props.id, { approvalStatus: 'Denied', deniedReason: reason }, { merge: true })
}

</script>

<style scoped></style>