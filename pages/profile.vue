<template>
    <div class="row justify-center">
        <div class="q-pa-md full-width" style="max-width: 850px;">
            <UserProfile :user="userProfile" />
            <!-- <userProfileView v-if="profileMode == 'userView'" @adminUserMode="onProfileMode" />
            <userProfileEdit v-if="profileMode == 'userEdit'" @adminUserMode="onProfileMode" /> -->
        </div>
    </div>
    <pre>
        {{ userProfile }}
    </pre>
</template>

<script setup>
initUsers()
const au = useAllUsersData()
const firebaseUser = useFirebaseUser()

async function getUD(uid) {
    await au.value
    const user = au.value.find((data) => data.uid === uid);
    if (user) {
        return user
    } else {
        return null
    }
}
const userProfile = await getUD(firebaseUser.value.uid)

// const docSnap = await getFSDoc("users", firebaseUser.value.uid);
// const userProfile = docSnap.data()

</script>

<style scoped></style>