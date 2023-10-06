<template>
    <div>
        <q-btn :label="avatar" round class="bg-secondary text-white">

            <q-menu color="secondary" transition-show="jump-down" transition-hide="jump-up" dropdown-icon="person"
                auto-close>
                <q-list>
                    <q-item clickable>
                        <q-item-section>
                            <q-item-label>
                                <q-icon name="dark_mode" size="22px" class="q-mr-sm" />Dark (later)</q-item-label>
                        </q-item-section>
                    </q-item>
                    <NuxtLink to="/profile">
                        <q-item clickable>
                            <q-item-section>
                                <q-item-label><q-icon name="person" size="22px" class="q-mr-sm" /> Profile</q-item-label>
                            </q-item-section>
                        </q-item>
                    </NuxtLink>
                    <q-separator />
                    <q-item clickable @click="logout">
                        <q-item-section>
                            <q-item-label><q-icon name="logout" size="22px" class="q-mr-sm" />Sign Out</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
    </div>
</template>

<script setup>
import { doc, getDoc, getFirestore } from "firebase/firestore";
const firebaseUser = useFirebaseUser()
const db = getFirestore();
const docRef = doc(db, "users", firebaseUser.value.uid);
const docSnap = await getDoc(docRef);
const avatar = ref(null)

if (docSnap.exists()) {
    avatar.value = docSnap.data().firstName.charAt(0) + docSnap.data().lastName.charAt(0)
}

const logout = () => {
    signOutUser();
}

const dark = ref(true)

</script>

<style scoped></style>