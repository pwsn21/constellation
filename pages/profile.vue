<template>
    <div class="q-pa-md full-width flex justify-center" style="max-width: 800px;">
        <UserProfile :user="userProfile" />
    </div>
</template>

<script setup>
const au = useAllUsersData()
const firebaseUser = useFirebaseUser()
const userProfile = ref('')

userProfile.value = getUD(firebaseUser.value.uid)

</script>

<style scoped></style>