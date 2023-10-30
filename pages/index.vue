<template>
  <div>
    <div class="q-py-lg flex justify-center">
      <h2 class="text-h3 text-primary">
        {{ firstName }}'s Dashboard
      </h2>
    </div>

    <div class="flex justify-center">
      <div>

        <div>
          <q-card v-if="pendingForms" class="my-card">
            <q-card-section class="bg-primary text-white">
              <div class="text-h5">Forms Pending</div>
              <div class="text-subtitle2"></div>
            </q-card-section>
            <q-img src="https://picsum.photos/300/200" />
            <q-card-section class="tw-bg-gray-200">
              <p>There are forms waiting for your approval</p>

            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn to="/acpoMentor" flat label="Go to forms" />
            </q-card-actions>
          </q-card>
        </div>
        <div>
          <q-card v-if="!profileData.firstName" class="my-card">
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
          <div v-if="isAdmin" class="text-h3">
            Is Admin!
            <div v-if="profileData.role.includes('admin')">
              -- IS ADMIN the other way
            </div>
            <div v-if="profileData.role.includes('mentee')">
              -- IS Mentee
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { query, where, getDocs, getFirestore, doc, getDoc } from 'firebase/firestore'
const firebaseUser = await useFirebaseUser()
const isAdmin = await useIsAdminUser()
const profileData = await userData(firebaseUser.value.uid)
const db = getFirestore()

let firstName = ref('')
firstName.value = profileData.firstName ? profileData.firstName : firebaseUser.value.email

const pendingForms = await mentorFormsPendingApproval(firebaseUser.value.uid)

const adminCollection = getCollection('groups')

const q = query(adminCollection, where("admin", "array-contains", firebaseUser.value.uid))
const docSnap = await getDocs(q)
if (docSnap.size > 0) {
  isAdmin.value = true
} else {
  isAdmin.value = false
}

</script>
  