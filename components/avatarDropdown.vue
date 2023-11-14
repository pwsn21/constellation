<template>
    <div>
        <q-btn :label="avatar" round class="bg-secondary text-white">
            <q-menu color="secondary" transition-show="jump-down" transition-hide="jump-up" dropdown-icon="person"
                auto-close>
                <q-list>
                    <!-- <q-item clickable>
                        <q-item-section>
                            <q-item-label>
                                <q-icon name="dark_mode" size="22px" class="q-mr-sm" />Dark (later)</q-item-label>
                        </q-item-section>
                    </q-item> -->
                    <NuxtLink to="/profile">
                        <q-item clickable>
                            <q-item-section>
                                <q-item-label><q-icon name="person" size="22px" class="q-mr-sm" />
                                    Profile</q-item-label>
                            </q-item-section>
                        </q-item>
                    </NuxtLink>
                    <q-separator />
                    <q-item clickable @click="logout">
                        <q-item-section>
                            <q-item-label><q-icon name="logout" size="22px" class="q-mr-sm" />Sign Out</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
    </div>
</template>

<script setup>

const firebaseUser = await useFirebaseUser()
const profileData = getUD(firebaseUser.value.uid);
let avatar = ref('')

if (profileData.firstName.length > 0 && profileData.lastName.length > 0) {
    avatar.value = profileData.firstName?.charAt(0) + profileData.lastName?.charAt(0)
} else {
    avatar.value = 'user'
}

const logout = () => {
    signOutUser();
}

</script>

<style scoped></style>