<template>
    <div class="row justify-center">
        <div class="q-pa-md full-width" style="max-width: 850px;">
            <userProfileView v-if="profileMode == 'userView'" @adminUserMode="onProfileMode" />
            <userProfileEdit v-if="profileMode == 'userEdit'" @adminUserMode="onProfileMode" />
        </div>
    </div>
</template>

<script setup>
import { doc, getDoc, getFirestore } from "firebase/firestore";
const firebaseUser = useFirebaseUser()
const db = getFirestore();
const docRef = doc(db, "users", firebaseUser.value.uid);
const docSnap = await getDoc(docRef);

const profileMode = ref('userView')

if (!docSnap.firstName) {
    profileMode.value = 'userEdit'
}

const onProfileMode = (id, mode) => {
    profileMode.value = mode
}

</script>

<style scoped></style>