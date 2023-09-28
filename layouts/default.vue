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
          <q-icon name="hub" size="32px" class="q-px-sm" />
          <h2 class="text-h4 text-weight-bold q-py-sm">Constellation</h2>
        </div>

        <ul class="text-h4 text-weight-light">
          <li class="q-py-sm">
            Admin
          </li>
          <li class="q-py-sm">
            <NuxtLink to="/"><q-icon name="dashboard" class="q-mx-sm" />Dashboard</NuxtLink>
          </li>
          <li class="q-py-sm">
            <NuxtLink to="/acpo"><q-icon name="groups" class="q-mx-sm" />ACP-Orientation</NuxtLink>
          </li>

          <li class="q-py-sm">
            <NuxtLink to="/users"><q-icon name="people" class="q-mx-sm" />Users</NuxtLink>
          </li>

        </ul>

        <ul class="text-h4 text-weight-light">
          <q-separator />
          <li class="q-py-sm">
            <NuxtLink to="/profile"><q-icon name="account_circle" class="q-mx-sm" />Profile</NuxtLink>
          </li>
          <li class="q-py-sm">
            <NuxtLink to="/" @click="logout"><q-icon name="logout" class="q-mx-sm" />Log-out</NuxtLink>
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
  
<script setup>

const logout = () => {
  signOutUser();
}

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>