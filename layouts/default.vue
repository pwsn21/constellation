<template>
  <div>
    <q-layout view="lHh lpR fFf">

      <q-header reveal class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <div class="flex justify-between items-center tw-w-screen">
            <div class="flex items-center justify-start">
              <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
              <q-toolbar-title class="lg:tw-hidden">
                Constellation
              </q-toolbar-title>
            </div>
            <div>
              <NuxtLink to="/"><q-toolbar-title @click="logout">Log-out</q-toolbar-title></NuxtLink>
            </div>
          </div>
        </q-toolbar>


        <!-- <q-tabs align="left">
          <q-route-tab to="/page1" label="Page One" />
          <q-route-tab to="/page2" label="Page Two" />
          <q-route-tab to="/page3" label="Page Three" />
        </q-tabs> -->
      </q-header>

      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
        <!-- drawer content -->
        <div class="flex items-center bg-primary text-white">
          <q-icon name="hub" size="32px" class="tw-mx-2" />
          <h2 class="tw-text-4xl tw-font-bold tw-py-5">Constellation</h2>
        </div>

        <ul class="tw-text-3xl">
          <li class="tw-py-2">
            Admin
          </li>
          <li class="tw-py-2">
            <NuxtLink to="/"><q-icon name="dashboard" class="tw-mx-2" />Dashboard</NuxtLink>
          </li>
          <li class="tw-py-2">
            <NuxtLink to="/acpo"><q-icon name="groups" class="tw-mx-2" />ACP-Orientation</NuxtLink>
          </li>
          <li class="tw-py-2">
            <NuxtLink to="/acpoprofile"><q-icon name="face" class="tw-mx-2" />ACP-O Profile</NuxtLink>
          </li>
          <li class="tw-py-2">
            <NuxtLink to="/users"><q-icon name="people" class="tw-mx-2" />Users</NuxtLink>
          </li>
          <q-separator />
          <li class="tw-py-2">
            Mentee
          </li>
          <li class="tw-py-2">
            <NuxtLink to="/"><q-icon name="dashboard" class="tw-mx-2" />Dashboard</NuxtLink>
          </li>
          <li class="tw-py-2">
            <NuxtLink to="/acpoprofile"><q-icon name="assignment" class="tw-mx-2" />ACP-O Forms</NuxtLink>
          </li>
        </ul>

        <ul class="tw-text-3xl">
          <q-separator />
          <li class="tw-py-2">
            <NuxtLink to="/profile"><q-icon name="account_circle" class="tw-mx-2" />Profile</NuxtLink>
          </li>
          <li class="tw-py-2">
            <NuxtLink to="/" @click="logout"><q-icon name="logout" class="tw-mx-2" />Log-out</NuxtLink>
          </li>
          <li></li>
        </ul>
      </q-drawer>


      <q-page-container>
        <slot />
      </q-page-container>

    </q-layout>
  </div>
</template>
  
  <!-- <script>
  import { ref } from 'vue'
  
  export default {
    setup () {
      const leftDrawerOpen = ref(false)
  
      return {
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  }
  </script> -->

<script setup>






const logout = () => {
  signOutUser();
}
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {

  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>