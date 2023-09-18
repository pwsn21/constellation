<template>
  <div>
    <div>
      <h2 class="tw-text-5xl tw-text-center tw-p-10">{{ firebaseUser ? firebaseUser.email : "Loading..." }}'s Dashboard
      </h2>
    </div>

    <div class="flex justify-center">
      <div>

        <div>
          <q-card v-if="needsProfile" class="my-card">
            <q-card-section class="bg-primary text-white">
              <div class="text-h5">Create Profile</div>
              <div class="text-subtitle2"></div>
            </q-card-section>
            <q-img src="https://picsum.photos/300/200" />
            <q-card-section class="tw-bg-gray-200">
              <p>Welcome to Constellation.</p>
              <p>Please create a user profile following the button below.</p>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn to="/profile" flat label="Go to profile" />
            </q-card-actions>
          </q-card>
        </div>

        <div class="tw-mt-10">
          <q-card class="my-card">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Debuggin</div>
              <div class="text-subtitle2"></div>
            </q-card-section>
            <q-card-section>
              <div>Email verified: {{ firebaseUser.emailVerified }}</div>
              <div>{{ firebaseUser.uid }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { doc, getDoc, getFirestore } from "firebase/firestore";
const firebaseUser = useFirebaseUser()
const db = getFirestore();
const docRef = doc(db, "users", firebaseUser.value.uid);
const docSnap = await getDoc(docRef);

let needsProfile = false

if (!docSnap.exists()) {
  needsProfile = true
}

</script>
  