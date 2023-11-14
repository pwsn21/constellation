<template>
  <div>
    <q-layout view="lHh lpR fFf">

      <q-header reveal class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <div class="flex justify-between items-center" style="width: 100%;">
            <div class="flex items-center justify-start">
              <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
              <q-toolbar-title class="lg:tw-hidden">
                Constellation
              </q-toolbar-title>
            </div>
            <avatarDropdown class="q-mx-sm" clickable />
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above :width="334" :breakpoint="1000" v-model="leftDrawerOpen" side="left" elevated>
        <!-- drawer content -->
        <div class="flex items-center bg-primary text-white justify-center">
          <h2 class="q-pa-xs text-h4 text-weight-bold">Constellation</h2>
        </div>

        <q-list class="text-h4 text-weight-light q-mt-md q-px-none">
          <q-item clickable>
            <NuxtLink to="/"><q-icon name="dashboard" class="q-mx-sm" />Dashboard</NuxtLink>
          </q-item>
          <q-item clickable>
            <NuxtLink to="/acpo"><q-icon name="groups" class="q-mx-sm" />ACP-Orientation</NuxtLink>
          </q-item>
          <q-item clickable v-if="profileData.role.includes('admin') || profileData.role.includes('pped')">
            <NuxtLink to="/users"><q-icon name="manage_accounts" class="q-mx-sm" />Users</NuxtLink>
          </q-item>
          <q-item clickable v-if="profileData.role.includes('admin') || profileData.role.includes('scheduler')">
            <NuxtLink to="/scheduling"><q-icon name="calendar_today" class="q-mx-sm" />Scheduling</NuxtLink>
          </q-item>
          <q-item clickable v-if="profileData.role.includes('admin')">
            <NuxtLink to="/stations"><q-icon name="emoji_transportation" class="q-mx-sm" />Stations</NuxtLink>
          </q-item>
          <q-item clickable>
            <NuxtLink to="/testPlatoonCalculator"><q-icon name="cruelty_free" class="q-mx-sm" />Platoon
              Calculator (test)
            </NuxtLink>
          </q-item>
        </q-list>

      </q-drawer>


      <q-page-container>
        <slot />
      </q-page-container>

    </q-layout>
  </div>
</template>
  
<script setup>

const firebaseUser = await useFirebaseUser()
const profileData = getUD(firebaseUser.value.uid)

const logout = () => {
  signOutUser();
}

const leftDrawerOpen = ref(false)
</script>