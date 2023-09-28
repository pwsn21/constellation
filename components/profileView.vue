<template>
    <div class="full-width">
        <q-card>
            <q-card-section>
                <div class="row justify-between">
                    <div class="text-h4">
                        Employee Profile: {{ userProfile.firstName }} {{
                            userProfile.lastName }}
                    </div>
                    <div><q-btn icon="edit" flat @click="$emit('profileMode', 'profileEdit')" /></div>
                </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">Contact Information </div>
                <q-separator inset />
                <q-list dense>
                    <q-item>
                        Phone: {{ userProfile.phoneNumber }}
                    </q-item>
                    <q-item>
                        Address: {{ userProfile.address }}, {{ userProfile.city }}, {{ userProfile.state.name }}, {{
                            userProfile.country.name }}
                    </q-item>
                </q-list>

            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">Employee Information </div>
                <q-separator inset />
                <q-list dense>
                    <q-item>
                        Employee Number: {{ userProfile.employeeNumber }}
                    </q-item>
                    <q-item>
                        {{ userProfile.car ? 'Car : ' + userProfile.car : 'Station: ' + userProfile.station }}
                    </q-item>
                    <q-item>
                        Role: {{ userProfile.role }}
                    </q-item>
                    <q-item>
                        Status: {{ userProfile.status }}
                    </q-item>
                    <q-item>
                        Platoon\Rotation: {{ userProfile.platoon }}{{ userProfile.rotation }}
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </div>
</template>


<script setup>
import { doc, getDoc, getFirestore, } from "firebase/firestore";

const emit = defineEmits(["profileMode"])

const firebaseUser = useFirebaseUser()
const db = getFirestore();

const docProfileRef = doc(db, "users", firebaseUser.value.uid);
const docProfileSnap = await getDoc(docProfileRef);
const userProfile = docProfileSnap.data()


</script>
<style scoped></style>