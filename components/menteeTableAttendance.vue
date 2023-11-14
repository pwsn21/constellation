<template>
    <div>
        <q-table :rows="forms" row-key="id" :columns="attendanceColumns" title-class="text-h4" dense
            table-header-class="bg-purple-10 text-grey-4" no-data-label="No Attendance Forms Submitted"
            :pagination="{ rowsPerPage: 20 }">
            <template v-if="profileData.role.includes('mentee')" v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn v-if="props.row.approvalStatus == 'Pending'" dense round flat color="red" icon="delete"
                        :props="props">
                        <q-menu dense :props="props">
                            <q-item class="q-pa-xs" dense>
                                <q-btn dense flat color="red" @click="deleteForm(props.row)" icon="delete"
                                    label="Delete Form" no-caps />
                            </q-item>
                            <!-- <q-item class="q-pa-xs" dense>
                            </q-item> -->
                        </q-menu>
                    </q-btn>
                    <div v-else-if="props.row.approvalStatus == 'Denied'" class="text-grey-5">
                        {{ props.row.deniedReason }}
                    </div>
                </q-td>
            </template>
            <template v-else v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense round flat color="green" @click="approveShift(props.row)" icon="check"></q-btn>
                    <q-btn dense round flat color="red" icon="block" :props="props">
                        <q-menu dense :props="props">
                            <q-item class="q-pa-xs" dense>
                                <q-btn dense flat color="red" @click="denyShift(props.row, 'Did Not Show')" icon="block"
                                    label="Did Not Show" no-caps />
                            </q-item>
                            <!-- <q-item class="q-pa-xs" dense>
                            </q-item> -->
                        </q-menu>
                    </q-btn>
                </q-td>
            </template>
            <template v-slot:body-cell-approvalStatus="props">
                <q-td :props="props">
                    {{ props.row.approvalStatus }}
                    <q-tooltip v-if="props.row.approvalStatus == 'Denied'">
                        {{ props.row.deniedReason }}
                    </q-tooltip>
                </q-td>
            </template>
            <template v-slot:no-data="{ message }">
                <div class="full-width row flex-center text-primary">
                    <q-icon size="30px" name="sym_o_sentiment_dissatisfied" /> {{ message }}
                </div>
            </template>
        </q-table>
    </div>
</template>

<script setup>
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
const db = getFirestore()

const firebaseUser = await useFirebaseUser()
const profileData = await getUD(firebaseUser.value.uid)

const mentee = defineProps(['selectedMentee'])
const forms = await menteeAttendanceForms(mentee.selectedMentee.menteeID)

const attendanceColumns = [
    { name: 'milestone', label: 'Name', field: 'milestone', align: 'left', sortable: true },
    { name: 'date', label: 'Shift Date', field: 'date', align: 'left', sortable: true },
    { name: 'car', label: 'Car', field: 'car', align: 'left', sortable: true },
    { name: 'mentorName', label: 'Mentor', field: 'mentorName', align: 'left', sortable: true },
    { name: 'submittedOn', label: 'Submitted On', field: 'submittedOn', align: 'left' },
    { name: 'approvalStatus', label: 'Status', field: 'approvalStatus', align: 'left', sortable: true },

    { name: 'actions', label: 'Misc', field: '', align: 'center' }
];

const approveShift = async (props) => {
    await setFSDoc("acpoFormsAttendance", props.id, { approvalStatus: 'Approved' }, { merge: true })
}

const denyShift = async (props, reason) => {
    await setFSDoc("acpoFormsAttendance", props.id, { approvalStatus: 'Denied', deniedReason: reason }, { merge: true })
}
const deleteForm = async (props) => {
    await deleteDoc(doc(db, "acpoFormsAttendance", props.id));
}

</script>

<style scoped></style>