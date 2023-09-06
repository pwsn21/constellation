<template>
  <div>
    <div>
      <h2 class="tw-text-5xl tw-text-center tw-p-10">{{ firebaseUser ? firebaseUser.email : "Loading..." }}'s Dashboard
      </h2>
    </div>
    <!-- <div>
      <q-btn color="primary" label="Primary" />
      <QBtn color="secondary" label="Secondary" />
      <LazyQBtn color="amber" glossy label="Amber" />
    </div> -->
    <div class="flex justify-center">
      <div class="md:tw-w-1/2">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Mentee #1</div>
            <div class="text-subtitle2">Cohort: 24-01</div>
          </q-card-section>
          <q-card-section>
            <div>Mentee #1 is within 8 shifts of completing their current milestone</div>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat @click="schedulemeeting">Schedule Meeting</q-btn>
            <q-btn flat @click="reviewpaperwork">Review Forms\Paperwork</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>


const firebaseUser = useFirebaseUser()

const q = useQuasar()

const schedulemeeting = () => {
  q.notify({
    color: 'positive',
    textColor: 'white',
    icon: '',
    message: 'Meeting Scheduled for MM/DD/YYY',
    position: 'center'
  })
}

const reviewpaperwork = () => {
  q.notify({
    color: 'positive',
    textColor: 'white',
    icon: '',
    message: 'Link for reviewing paperwork',
    position: 'center'
  })
}


</script>
  