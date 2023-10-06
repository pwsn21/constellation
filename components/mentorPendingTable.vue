<template>
    <div class="full-width">
        <div>
            <div class="flex justify-center">
                <h2 class="text-h4 center q-pa-md">ACP-Orientation</h2>
            </div>

            <q-expansion-item label="Pending Forms" class="text-h5 text-primary" header-class="q-pa-none"
                header-style="bg-white" expand-icon-toggle expand-icon-class="text-primary" default-opened dense flat>

                <div class="q-my-sm" style=" max-width: 250px">
                    <!-- <q-input v-model="filterText" class="bg-grey-4" color="primary" header-class="text-primary" dense filled
                        label="Search..." clearable /> -->
                </div>
                <div>
                    <q-table :rows="mentees" :columns="menteeColumns" row-key="id" title-class="text-h4"
                        table-header-class="bg-primary text-white" no-data-label="No Pending Attendance Forms">
                        <template v-slot:body-cell-actions="props">
                            <q-td :props="props">
                                <q-btn dense round flat color="green" @click="approveShift(props.row)" icon="check"></q-btn>
                            </q-td>
                        </template>
                        <template v-slot:no-data="{ message }">
                            <div class="full-width row flex-center text-primary">
                                <q-icon size="350px" name="mood" /> {{ message }}
                            </div>
                        </template>
                    </q-table>
                </div>
            </q-expansion-item>
        </div>
    </div>
    <pre>{{ mentees }}</pre>
</template>

<script setup>
import { collection, getDocs, setDoc, doc, getFirestore, query, where, onSnapshot } from "firebase/firestore";


const firebaseUser = useFirebaseUser()
const db = getFirestore()

const pendingAttendance = collection(db, 'scheduledShifts')
const menteeShifts = query(pendingAttendance, where("mentor", "==", firebaseUser.value.uid), where("mentorApproval", "==", "pending"))

const mentees = ref([])

const unsubscribe = onSnapshot(menteeShifts, (querySnapshot) => {
    mentees.value = []
    querySnapshot.forEach((doc) => {
        const d = doc.data()
        mentees.value.push({
            id: doc.id,
            milestone: d.milestone,
            formType: d.formType,
            pped: d.pped.label,
            name: d.name,
            car: d.car,
            date: d.date.toDate().toDateString(),
        })
    });
});

const menteeColumns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'date', label: 'Date', field: 'date', align: 'left', sortable: true },
    { name: 'car', label: 'Car', field: 'car', align: 'left', sortable: true },
    { name: 'milestone', label: 'Milestone', field: 'milestone' },
    { name: 'pped', label: 'Practice Educator', field: 'pped', sortable: true },
    { name: 'actions', label: 'Actions', field: '', align: 'center' }
];

const approveShift = async (props) => {
    await setDoc(doc(db, "scheduledShifts", props.id), {
        mentorApproval: 'approved',
    },
        { merge: true }
    )
};

</script>

<style scoped></style>