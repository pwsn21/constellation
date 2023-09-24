<template>
    <div>
        <profileView v-if="profileMode == 'profileView'" @change="onChangeMode" />
        <!-- <acpoEdit v-if="profileMode == 'acpoEdit'" @change="onChangeMode" /> -->
        <userEdit v-if="profileMode == 'userEdit'" @change="onChangeMode" />
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
    profileMode.value = 'userEdit'
}

console.log(profileMode.value)

const onChangeMode = (mode) => {
    profileMode.value = mode
}

</script>

<style scoped></style>