<template>
    <div class="full-width">
        <div>
            <div class="flex justify-center">
                <h2 class="text-h4 center q-pa-md">ACP-Orientation</h2>
            </div>

            <q-expansion-item label="Pending Forms" class="text-h5 text-primary" header-class="q-pa-none"
                header-style="bg-white" expand-icon-toggle expand-icon-class="text-primary" default-opened dense flat>

                <div class="q-my-sm" style=" max-width: 250px">
                </div>
                <div>
                    <q-table :rows="mentees" :columns="menteeColumns" row-key="id" title-class="text-h4"
                        table-header-class="bg-primary text-white" no-data-label="No Pending Attendance Forms">
                        <template v-slot:body-cell-actions="props">
                            <q-td :props="props">
                                <q-btn dense round flat color="green" @click="approveShift(props.row)" icon="check"></q-btn>
                                <q-btn dense round flat color="red" @click="denyShift(props.row)" icon="close"></q-btn>
                            </q-td>
                        </template>
                        <template v-slot:no-data="{ message }">
                            <div class="full-width row flex-center text-primary">
                                <q-icon size="30px" name="mood" /> {{ message }}
                            </div>
                        </template>
                    </q-table>
                </div>
            </q-expansion-item>
        </div>
    </div>
</template>

<script setup>
import { collection, setDoc, doc, getFirestore, query, where, onSnapshot, orderBy } from "firebase/firestore";


const firebaseUser = useFirebaseUser()
const db = getFirestore()

const pendingAttendance = collection(db, 'acpoFormsAttendance')
const menteeShifts = query(pendingAttendance, where("mentorID", "==", firebaseUser.value.uid), where("approvalStatus", "==", "Pending"), orderBy('submittedOn'))

const mentees = ref([])

const unsubscribe = onSnapshot(menteeShifts, (querySnapshot) => {
    mentees.value = []
    querySnapshot.forEach((doc) => {
        const d = doc.data()
        mentees.value.push({
            id: doc.id,
            name: d.name,
            date: d.date.toDate().toDateString(),
            car: d.car,
            milestone: d.milestone,
            formType: d.formType,
            pped: d.ppedName,
            submittedOn: d.submittedOn.toDate().toDateString(),
        })
    });
});

const menteeColumns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'date', label: 'Date', field: 'date', align: 'left', sortable: true },
    { name: 'car', label: 'Car', field: 'car', align: 'left', sortable: true },
    { name: 'milestone', label: 'Milestone', field: 'milestone' },
    { name: 'pped', label: 'Practice Educator', field: 'pped', sortable: true },
    { name: 'submittedOn', label: 'Submitted On', field: 'submittedOn', align: 'left' },
    { name: 'actions', label: 'Actions', field: '', align: 'center' }
];

const approveShift = async (props) => {
    await setDoc(doc(db, "acpoFormsAttendance", props.id), {
        approvalStatus: 'Approved',
    },
        { merge: true }
    )
};

const denyShift = async (props) => {
    await setDoc(doc(db, "acpoFormsAttendance", props.id), {
        approvalStatus: 'Denied',
    },
        { merge: true }
    )
};

</script>

<style scoped></style>