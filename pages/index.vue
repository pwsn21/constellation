<template>
  <div class="q-py-lg">
    <div>
      <h2 class="text-h3 text-primary text-center">
        {{ firstName }}'s Dashboard
      </h2>
    </div>

    <div>
      <div class="q-py-sm q-gutter-sm" v-if="profileData.name">
        <div class="row justify-center">
          <div class="col-6" style="min-width: 400px; max-width: 850;">
            <q-card>
              <q-img src="~/assets/images/261.jpg" :ratio="2 / 1" />
              <q-card-section class="bg-blue-1">
                <p class="q-py-sm"> Welcome to Constellation, your access to the ACP Orientation Program!</p>
                <p class="q-py-sm">Constellation is meant to consolidate all program information into one convenient
                  location, provide a
                  user-friendly platform for all members involved, and ensure accurate tracking of information. The goal
                  is to minimize time spent on technical issues and invest more time in mentoring paramedics.</p>
                <p class="q-py-sm">We're excited to have you here. A few notes before we begin.</p>
              </q-card-section>
              <q-card-section>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label>
                        1. Create Your Profile:
                        To get started, you'll need to create a personalized profile.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label>
                        2. Access Control:
                        Please be aware that access to the Constellation is handled by the ACP-Orientation Team.
                        Access will be granted after reviewing your profile.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn to="/profile" flat label="Go to profile" color="primary" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <div>
      <!-- admin -->
      <div class="q-py-sm q-gutter-sm" v-if="profileData.role.includes('admin')">
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
      <div class="q-py-sm q-gutter-sm" v-if="profileData.role.includes('pped')">
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
      <div class="q-py-sm q-gutter-sm" v-if="profileData.role.includes('mentor')">
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
      <div class="q-py-sm q-gutter-sm" v-if="profileData.role.includes('mentee')">
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
      <div class="q-py-sm q-gutter-sm" v-if="profileData.role.includes('scheduler')">
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
const profileData = getUD(firebaseUser.value.uid)


let firstName = ref('')
firstName.value = profileData.firstName ? profileData.firstName : firebaseUser.value.email

const pendingForms = await mentorFormsPendingApproval(firebaseUser.value.uid)




</script>
  