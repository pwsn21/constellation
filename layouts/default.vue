<template>
  <div>
    <q-layout view="lHh lpR fFf">

      <q-header reveal class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <div class="flex justify-between items-center" style="width: 100%;">
            <div class="flex items-center justify-start">
              <q-btn dense flat round icon="hub" @click="toggleLeftDrawer" />
              <q-toolbar-title class="lg:tw-hidden">
                Constellation
              </q-toolbar-title>
            </div>
            <avatarDropdown class="q-mx-sm" clickable />
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
        <!-- drawer content -->
        <div class="flex items-center bg-primary text-white">
          <q-icon name="hub" size="32px" class="q-pa-sm" />
          <h2 class="text-h4 text-weight-bold">Constellation</h2>
        </div>

        <ul class="text-h4 text-weight-light q-mt-md q-px-none">

          <li class="q-py-sm">
            <NuxtLink to="/"><q-icon name="dashboard" class="q-mx-sm" />Dashboard</NuxtLink>
          </li>
          <li class="q-py-sm">
            <NuxtLink to="/acpoAdmin"><q-icon name="groups" class="q-mx-sm" />ACP-Orientation</NuxtLink>
          </li>
          <!-- <li class="q-py-sm">
            <NuxtLink to="/acpoMentor"><q-icon name="groups" class="q-mx-sm" />ACP-O (Mentor)</NuxtLink>
          </li>
          <li class="q-py-sm">
            <NuxtLink to="/acpoMentee"><q-icon name="person" class="q-mx-sm" />ACP-O (Mentee)</NuxtLink>
          </li> -->
          <li class="q-py-sm" v-if="profileData.role.includes('admin') || profileData.role.includes('pped')">
            <NuxtLink to="/users"><q-icon name="people" class="q-mx-sm" />Users</NuxtLink>
          </li>
          <li class="q-py-sm" v-if="profileData.role.includes('admin') || profileData.role.includes('scheduler')">
            <NuxtLink to="/scheduling"><q-icon name="calendar_today" class="q-mx-sm" />Scheduling</NuxtLink>
          </li>
          <li class="q-py-sm" v-if="profileData.role.includes('admin')">
            <NuxtLink to="/stations"><q-icon name="emoji_transportation" class="q-mx-sm" />Stations</NuxtLink>
          </li>
          <li class="q-py-sm">
            <NuxtLink to="/testPlatoonCalculator"><q-icon name="cruelty_free" class="q-mx-sm" />Platoon Calculator (test)
            </NuxtLink>
          </li>
          <!-- <li class="q-py-sm">
            <NuxtLink to="/UserAdmin"><q-icon name="manage_accounts" class="q-mx-sm" />User Admin
            </NuxtLink>
          </li> -->

        </ul>

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
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>