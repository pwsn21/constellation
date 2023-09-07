<template>
    <div class="q-pa-md" style="max-width: 400px">

        <q-form @submit.prevent="saveprofile" class="q-gutter-md">
            <q-input filled v-model="firstName" label="First Name" lazy-rules :rules="[
                val => val && val.length > 0 || 'Please type something']" />
            <q-input filled v-model="lastName" label="Last Name" lazy-rules :rules="[
                val => val && val.length > 0 || 'Please type something']" />
            <q-select filled v-model="role" :options="roleoptions" label="Role" />
            <div>
                <q-btn label="Save" type="submit" color="primary" />
            </div>
        </q-form>

    </div>
</template>

<script setup>

const roleoptions = ['Mentee', 'Mentor', 'Admin']

import { doc, setDoc, getDoc, updateDoc, getFirestore } from "firebase/firestore";

const firebaseUser = useFirebaseUser()
const db = getFirestore();

const docRef = doc(db, "users", firebaseUser.value.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data())
    const firstName = docSnap.data().firstName
    const lastName = docSnap.data().lastName
    const role = docSnap.data().role
} else {
    setDoc(doc(db, "users", firebaseUser.value.uid), {
        firstName: '',
        lastName: '',
        role: ''
    })
    const firstName = ref('')
    const lastName = ref('')
    const role = ref('')
}

const firstName = ref(docSnap.data().firstName)
const lastName = ref(docSnap.data().lastName)
const role = ref(docSnap.data().role)

const saveprofile = () => {
    updateDoc(doc(db, "users", firebaseUser.value.uid), {
        firstName: firstName.value,
        lastName: lastName.value,
        role: role.value
    })
    console.log("savedprofile")
}

</script>

<style scoped></style>