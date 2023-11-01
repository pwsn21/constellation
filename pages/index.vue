<template>
  <div class="q-py-lg">

    <div class="q-pb-lg flex justify-center">
      <h2 class="text-h3 text-primary">
        {{ firstName }}'s Dashboard
      </h2>

    </div>

    <div>
      <!-- admin -->
      <div class="q-py-sm" v-if="profileData.role.includes('admin')">
        <div class="row justify-center">
          <div class="col-6">
            <q-card>
              -- Is Admin Card 1
            </q-card>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-6">
            <q-card>
              -- Is Admin Card 2
            </q-card>
          </div>
        </div>
      </div>

      <!-- pped -->
      <div class="q-py-sm" v-if="profileData.role.includes('pped')">
        <div class="row justify-center">
          <div class="col-6">
            <q-card>
              -- Is pped Card 1
            </q-card>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-6">
            <q-card>
              -- Is pped Card 2
            </q-card>
          </div>
        </div>
      </div>

      <!-- mentor -->
      <div class="q-py-sm" v-if="profileData.role.includes('mentor')">
        <div class="row justify-center">
          <div class="col-6">
            <q-card>
              -- Is mentor Card 1
            </q-card>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-6">
            <q-card>
              -- Is mentor Card 2
            </q-card>
          </div>
        </div>
      </div>

      <!-- mentee -->
      <div class="q-py-sm" v-if="profileData.role.includes('mentee')">
        <div class="row justify-center">
          <div class="col-6">
            <q-card>
              -- Is mentee Card 1
            </q-card>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-6">
            <q-card>
              -- Is mentee Card 2
            </q-card>
          </div>
        </div>
      </div>

      <!-- scheduler -->
      <div class="q-py-sm" v-if="profileData.role.includes('scheduler')">
        <div class="row justify-center">
          <div class="col-6">
            <q-card>
              -- Is scheduler Card 1
            </q-card>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-6">
            <q-card>
              -- Is scheduler Card 2
            </q-card>
          </div>
        </div>
      </div>

      <!-- <div>
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
      </div> -->
      <!-- <div>
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
      </div> -->
      <!-- <div>
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
</div> -->


    </div>


  </div>
</template>

<script setup>

const firebaseUser = await useFirebaseUser()
const profileData = await userData(firebaseUser.value.uid)


let firstName = ref('')
firstName.value = profileData.firstName ? profileData.firstName : firebaseUser.value.email

const pendingForms = await mentorFormsPendingApproval(firebaseUser.value.uid)




</script>
  