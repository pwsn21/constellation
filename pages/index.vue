<template>
  <div>
    <div class="q-py-lg flex justify-center">
      <h2 class="text-h3 text-primary">{{ firstName }}'s Dashboard
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
          <q-card v-if="!profileData" class="my-card">
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
const firebaseUser = useFirebaseUser()
const profileData = await userData(firebaseUser.value.uid);
let firstName = ref('')
firstName.value = profileData ? profileData.firstName : firebaseUser.value.email

const pendingForms = await mentorPendingApproval(firebaseUser.value.uid)
</script>
  