<template>
    <div>
        <profileView v-if="profileMode == 'profileView'" @profileMode="onProfileMode" />
        <profileEdit v-if="profileMode == 'profileEdit'" @profileMode="onProfileMode" />
    </div>
</template>

<script setup>
import { doc, getDoc, getFirestore } from "firebase/firestore";
const firebaseUser = useFirebaseUser()
const db = getFirestore();
const docRef = doc(db, "users", firebaseUser.value.uid);
const docSnap = await getDoc(docRef);

const profileMode = ref('profileView')

let needsProfile = false
if (!docSnap.exists()) {
    needsProfile = true
}

if (needsProfile == true) {
    profileMode.value = 'profileEdit'
}

const onProfileMode = (mode) => {
    profileMode.value = mode
}

</script>

<style scoped></style>