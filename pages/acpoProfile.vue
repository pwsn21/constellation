<template>
    <div class="q-pa-md">
        <q-page padding>
            <q-form @submit.prevent="saveAcpOProfile" class="q-gutter-md flex">
                <q-card class="tw-w-2/5">
                    <q-card-section>
                        <div class="text-h5 tw-pb-2">{{ acpOProfileData.firstName }} {{ acpOProfileData.lastName }} {{
                            acpOProfileData.cohort }}</div>
                        <q-input filled label="Milestone Two Meeting" v-model="acpOProfileData.milestoneMeetingTwo">
                            <template #append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date v-model="acpOProfileData.milestoneMeetingTwo" mask="ddd MMM DD YYYY" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                        <q-select filled v-model="acpOProfileData.pped" label="Assigned Practice Educator"
                            :options="options.ppeds" />
                    </q-card-section>
                    <q-card-section>
                    </q-card-section>
                </q-card>
                <div>
                    <q-btn label="Save" type="submit" color="primary" />
                </div>
            </q-form>
        </q-page>
    </div>
</template>


<script setup>
import { doc, setDoc, getDoc, query, where, getDocs, collection, onSnapshot, updateDoc, getFirestore, Timestamp } from "firebase/firestore";

const firebaseUser = useFirebaseUser()
const db = getFirestore();
const docRef = doc(db, "acpoTracker", 'O9ySQiiCCLRtOKv1MTKVb4FOEUF2_2023-1');
const docSnap = await getDoc(docRef);

let acpOProfileData = reactive({
    firstName: "",
    lastName: "",
    cohort: "",
    pped: "",
    milestoneMeetingTwo: "",
})

// ACP-Orientation Profile Check
if (docSnap.exists()) {
    acpOProfileData = reactive({
        firstName: docSnap.data().firstName,
        lastName: docSnap.data().lastName,
        cohort: docSnap.data().cohortID,
        pped: docSnap.data().pped,
        milestoneMeetingTwo: docSnap.data().milestoneMeetingTwo.toDate(),
    })
}

const options = reactive({
    ppeds: [],
})

const userCollection = collection(db, 'users');
const queryPPEd = query(userCollection, where("role", "==", "Paramedic Practice Educator"));
const ppedDocs = await getDocs(queryPPEd);

ppedDocs.forEach((pped) => {
    options.ppeds.push({
        value: pped.id,
        label: pped.data().firstName + " " + pped.data().lastName
    });
});

const { showToast } = useNotification();

// Save Profile Function

const saveAcpOProfile = async () => {
    try {

        await setDoc(doc(db, "acpoTracker", 'O9ySQiiCCLRtOKv1MTKVb4FOEUF2_2023-1'), {
            pped: acpOProfileData.pped,
            milestoneMeetingTwo: Timestamp.fromDate(new Date(acpOProfileData.milestoneMeetingTwo)),

        }, { merge: true });
        showToast('positive', 'check', 'Profile Saved');
    }
    catch (error) {
        console.error(error)
        showToast('negative', 'error', 'Error');
    }
};

</script>
<style scoped></style>